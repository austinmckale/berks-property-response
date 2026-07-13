/**
 * Low-friction spam protection for /api/submit-lead.
 * Works without Redis or Turnstile. Optional Upstash rate limiting when configured.
 */

export const MIN_SUBMIT_MS = 800;
export const MAX_NAME_LENGTH = 120;
export const MAX_CITY_LENGTH = 80;
export const MAX_DESCRIPTION_LENGTH = 4000;
export const MAX_EMAIL_LENGTH = 200;
export const MAX_BODY_BYTES = 32_000;

export type SpamRejectReason =
  | "honeypot"
  | "too_fast"
  | "missing_timestamp"
  | "invalid_timestamp"
  | "payload_too_large"
  | "field_too_long"
  | "rate_limited"
  | "turnstile_failed";

export interface SpamCheckInput {
  /** Opaque honeypot — must stay empty (also accepts legacy companyWebsite) */
  bprHpField?: string;
  companyWebsite?: string;
  formStartedAt?: string | number;
  name?: string;
  city?: string;
  problemDescription?: string;
  email?: string;
  now?: number;
}

export interface SpamCheckResult {
  ok: boolean;
  reason?: SpamRejectReason;
}

/** Client/server-shared field-length and timing checks (no secrets). */
export function checkSpamFields(input: SpamCheckInput): SpamCheckResult {
  const honeypot = input.bprHpField ?? input.companyWebsite;
  if (honeypot && String(honeypot).trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }

  if (
    (input.name && input.name.length > MAX_NAME_LENGTH) ||
    (input.city && input.city.length > MAX_CITY_LENGTH) ||
    (input.problemDescription &&
      input.problemDescription.length > MAX_DESCRIPTION_LENGTH) ||
    (input.email && input.email.length > MAX_EMAIL_LENGTH)
  ) {
    return { ok: false, reason: "field_too_long" };
  }

  if (input.formStartedAt == null || input.formStartedAt === "") {
    return { ok: false, reason: "missing_timestamp" };
  }

  const started =
    typeof input.formStartedAt === "number"
      ? input.formStartedAt
      : Number(input.formStartedAt);

  if (!Number.isFinite(started) || started <= 0) {
    return { ok: false, reason: "invalid_timestamp" };
  }

  const now = input.now ?? Date.now();
  const elapsed = now - started;
  if (elapsed < MIN_SUBMIT_MS) {
    return { ok: false, reason: "too_fast" };
  }

  // Reject timestamps more than 24h in the past or in the future
  if (elapsed > 86_400_000 || elapsed < -60_000) {
    return { ok: false, reason: "invalid_timestamp" };
  }

  return { ok: true };
}

export function logSpamRejection(params: {
  reason: SpamRejectReason;
  ipHash?: string;
}): void {
  console.warn("[lead] spam rejected", {
    reason: params.reason,
    ipHash: params.ipHash ?? "n/a",
  });
}

/** Stable non-reversible-ish fingerprint for logs (not cryptographic identity). */
export function hashIpForLog(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash * 31 + ip.charCodeAt(i)) >>> 0;
  }
  return `ip_${hash.toString(16)}`;
}

/**
 * Optional Upstash Redis REST rate limit.
 * Returns { limited: false } when Upstash is not configured.
 */
export async function checkDistributedRateLimit(ip: string): Promise<{
  limited: boolean;
  configured: boolean;
}> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    return { limited: false, configured: false };
  }

  const windowSec = Number(process.env.LEAD_RATE_LIMIT_WINDOW_SEC ?? "60");
  const max = Number(process.env.LEAD_RATE_LIMIT_MAX ?? "8");
  const key = `bpr:lead:${hashIpForLog(ip)}`;

  try {
    const incrRes = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (!incrRes.ok) {
      console.warn("[lead] rate limit incr failed", incrRes.status);
      return { limited: false, configured: true };
    }
    const incrJson = (await incrRes.json()) as { result?: number };
    const count = Number(incrJson.result ?? 0);

    if (count === 1) {
      await fetch(
        `${url}/expire/${encodeURIComponent(key)}/${Number.isFinite(windowSec) ? windowSec : 60}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(2000),
        }
      ).catch(() => undefined);
    }

    if (count > (Number.isFinite(max) ? max : 8)) {
      return { limited: true, configured: true };
    }
    return { limited: false, configured: true };
  } catch (err) {
    console.warn(
      "[lead] rate limit check error",
      err instanceof Error ? err.message : "unknown"
    );
    return { limited: false, configured: true };
  }
}

/**
 * Optional Cloudflare Turnstile verification.
 * Skips (ok) when secret/token not configured.
 */
export async function verifyTurnstileIfConfigured(
  token: string | undefined,
  ip: string
): Promise<{ ok: boolean; configured: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, configured: false };
  }
  if (!token?.trim()) {
    return { ok: false, configured: true };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    });
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(4000),
      }
    );
    const json = (await res.json()) as { success?: boolean };
    return { ok: Boolean(json.success), configured: true };
  } catch {
    // Fail open on network errors so customers are not blocked by Turnstile outages
    console.warn("[lead] turnstile verify error — allowing request");
    return { ok: true, configured: true };
  }
}

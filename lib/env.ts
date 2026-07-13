/**
 * Production environment validation for soft launch.
 * Secrets are never printed — only which keys are missing/invalid.
 *
 * Durable lead destinations (production): LEAD_WEBHOOK_URL (Sheets) or full Resend admin email.
 * Discord is a secondary notification channel — not sufficient alone.
 */

/**
 * Confirmed Berks Property Response business number.
 * Used as the local/dev fallback when NEXT_PUBLIC_PHONE is unset.
 * Production must set NEXT_PUBLIC_PHONE explicitly (this value is valid when configured).
 */
export const DEFAULT_DEV_PHONE = "(484) 509-0748";

export interface EnvIssue {
  level: "error" | "warn";
  code: string;
  message: string;
}

export interface CollectEnvOptions {
  /** Preview deploys may use *.vercel.app without treating it as a production error */
  allowVercelPreviewHost?: boolean;
}

function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

function isConfigured(value: string | undefined): boolean {
  return Boolean(trim(value));
}

/** Durable ops ledger — Sheets or complete Resend admin email. Discord alone is not enough. */
export function hasDurableLeadDestination(
  env: NodeJS.ProcessEnv = process.env
): boolean {
  if (isConfigured(env.LEAD_WEBHOOK_URL)) return true;
  return (
    isConfigured(env.RESEND_API_KEY) &&
    isConfigured(env.LEAD_EMAIL_FROM) &&
    isConfigured(env.LEAD_NOTIFICATION_EMAIL)
  );
}

function validateSiteUrl(
  siteUrl: string,
  options: CollectEnvOptions = {}
): EnvIssue[] {
  const issues: EnvIssue[] = [];
  if (!siteUrl) {
    issues.push({
      level: "error",
      code: "SITE_URL_MISSING",
      message: "NEXT_PUBLIC_SITE_URL is required in production.",
    });
    return issues;
  }

  let url: URL;
  try {
    url = new URL(siteUrl);
  } catch {
    issues.push({
      level: "error",
      code: "SITE_URL_INVALID",
      message: "NEXT_PUBLIC_SITE_URL must be a valid absolute URL.",
    });
    return issues;
  }

  if (url.protocol !== "https:") {
    issues.push({
      level: "error",
      code: "SITE_URL_NOT_HTTPS",
      message: "NEXT_PUBLIC_SITE_URL must use HTTPS in production.",
    });
  }

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    issues.push({
      level: "error",
      code: "SITE_URL_LOCALHOST",
      message: "NEXT_PUBLIC_SITE_URL must not be localhost in production.",
    });
  }

  if (url.hostname.endsWith(".vercel.app") && !options.allowVercelPreviewHost) {
    issues.push({
      level: "error",
      code: "SITE_URL_VERCEL_PREVIEW",
      message:
        "NEXT_PUBLIC_SITE_URL must be the custom production domain, not a *.vercel.app URL.",
    });
  }

  return issues;
}

/** Collect production env issues. Safe to call in any environment. No network I/O. */
export function collectProductionEnvIssues(
  env: NodeJS.ProcessEnv = process.env,
  options: CollectEnvOptions = {}
): EnvIssue[] {
  const issues: EnvIssue[] = [];
  const siteUrl = trim(env.NEXT_PUBLIC_SITE_URL);
  const phone = trim(env.NEXT_PUBLIC_PHONE);

  issues.push(...validateSiteUrl(siteUrl, options));

  if (!phone) {
    issues.push({
      level: "error",
      code: "PHONE_MISSING",
      message:
        "NEXT_PUBLIC_PHONE is required in production. Set it explicitly in Vercel (local/dev may fall back to DEFAULT_DEV_PHONE).",
    });
  }

  if (!hasDurableLeadDestination(env)) {
    issues.push({
      level: "error",
      code: "NO_DURABLE_LEAD_DESTINATION",
      message:
        "Configure a durable lead destination: LEAD_WEBHOOK_URL (Google Sheets) or complete Resend admin email (RESEND_API_KEY + LEAD_EMAIL_FROM + LEAD_NOTIFICATION_EMAIL). Discord alone is not sufficient.",
    });
  }

  if (!isConfigured(env.NEXT_PUBLIC_GA_MEASUREMENT_ID)) {
    issues.push({
      level: "warn",
      code: "GA_MISSING",
      message: "NEXT_PUBLIC_GA_MEASUREMENT_ID is not set — analytics will be inactive.",
    });
  }

  if (!isConfigured(env.DISCORD_WEBHOOK_URL) && hasDurableLeadDestination(env)) {
    issues.push({
      level: "warn",
      code: "DISCORD_OPTIONAL",
      message: "DISCORD_WEBHOOK_URL is optional when Sheets or admin email is configured.",
    });
  }

  if (
    isConfigured(env.DISCORD_WEBHOOK_URL) &&
    !hasDurableLeadDestination(env)
  ) {
    // Already covered by NO_DURABLE_LEAD_DESTINATION; keep a clarifying warn
    issues.push({
      level: "warn",
      code: "DISCORD_NOT_DURABLE",
      message:
        "Discord is configured but is only a notification channel — add Sheets or Resend admin email for durable capture.",
    });
  }

  if (
    !isConfigured(env.RESEND_API_KEY) ||
    !isConfigured(env.LEAD_EMAIL_FROM) ||
    !isConfigured(env.LEAD_NOTIFICATION_EMAIL)
  ) {
    issues.push({
      level: "warn",
      code: "EMAIL_OPTIONAL",
      message:
        "Resend admin/customer email is optional when Google Sheets is configured.",
    });
  }

  if (
    isConfigured(env.TURNSTILE_SECRET_KEY) !==
    isConfigured(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  ) {
    issues.push({
      level: "warn",
      code: "TURNSTILE_PARTIAL",
      message:
        "Turnstile requires both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY. Form works without them.",
    });
  }

  if (
    isConfigured(env.UPSTASH_REDIS_REST_URL) !==
    isConfigured(env.UPSTASH_REDIS_REST_TOKEN)
  ) {
    issues.push({
      level: "warn",
      code: "RATE_LIMIT_PARTIAL",
      message:
        "Distributed rate limiting needs both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Honeypot/timing still apply without them.",
    });
  }

  return issues;
}

/**
 * Abort production builds when critical env is missing.
 * Preview deploys (VERCEL_ENV=preview) never hard-fail for preview hostnames.
 * Production (VERCEL_ENV=production) or FORCE_PRODUCTION_ENV_CHECK=1 hard-fails.
 */
export function assertProductionEnv(): void {
  const forced = process.env.FORCE_PRODUCTION_ENV_CHECK === "1";
  const isVercelProduction = process.env.VERCEL_ENV === "production";
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    const previewIssues = collectProductionEnvIssues(process.env, {
      allowVercelPreviewHost: true,
    });
    for (const issue of previewIssues) {
      const log = issue.level === "error" ? console.warn : console.warn;
      log(`[env:preview] ${issue.code}: ${issue.message}`);
    }
    return;
  }

  if (!forced && !isVercelProduction && process.env.NODE_ENV !== "production") {
    return;
  }

  const issues = collectProductionEnvIssues();
  for (const issue of issues.filter((i) => i.level === "warn")) {
    console.warn(`[env] ${issue.code}: ${issue.message}`);
  }

  const errors = issues.filter((i) => i.level === "error");
  if (errors.length === 0) return;

  for (const issue of errors) {
    console.error(`[env] ${issue.code}: ${issue.message}`);
  }

  if (forced || isVercelProduction) {
    throw new Error(
      `Production environment validation failed (${errors.length} error(s)). See [env] logs above.`
    );
  }

  console.warn(
    `[env] ${errors.length} critical issue(s) — production deploy will fail until fixed. Set FORCE_PRODUCTION_ENV_CHECK=1 to fail this local build.`
  );
}

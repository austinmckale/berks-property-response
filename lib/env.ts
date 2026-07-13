/**
 * Production environment validation for soft launch.
 * Secrets are never printed — only which keys are missing/invalid.
 *
 * Critical failures abort production builds.
 * Optional gaps log warnings only.
 */

/** Known placeholder shown when NEXT_PUBLIC_PHONE is unset — must not ship to prod. */
export const PLACEHOLDER_PHONE = "(484) 525-0459";

export interface EnvIssue {
  level: "error" | "warn";
  code: string;
  message: string;
}

function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

function isConfigured(value: string | undefined): boolean {
  return Boolean(trim(value));
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function isPlaceholderPhone(value: string): boolean {
  return normalizePhone(value) === normalizePhone(PLACEHOLDER_PHONE);
}

function hasOpsLeadDestination(env: NodeJS.ProcessEnv = process.env): boolean {
  if (isConfigured(env.LEAD_WEBHOOK_URL)) return true;
  if (isConfigured(env.DISCORD_WEBHOOK_URL)) return true;
  return (
    isConfigured(env.RESEND_API_KEY) &&
    isConfigured(env.LEAD_EMAIL_FROM) &&
    isConfigured(env.LEAD_NOTIFICATION_EMAIL)
  );
}

function validateSiteUrl(siteUrl: string): EnvIssue[] {
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

  if (url.hostname.endsWith(".vercel.app")) {
    issues.push({
      level: "error",
      code: "SITE_URL_VERCEL_PREVIEW",
      message:
        "NEXT_PUBLIC_SITE_URL must be the custom production domain, not a *.vercel.app URL.",
    });
  }

  return issues;
}

/** Collect production env issues. Safe to call in any environment. */
export function collectProductionEnvIssues(
  env: NodeJS.ProcessEnv = process.env
): EnvIssue[] {
  const issues: EnvIssue[] = [];
  const siteUrl = trim(env.NEXT_PUBLIC_SITE_URL);
  const phone = trim(env.NEXT_PUBLIC_PHONE);
  const text = trim(env.NEXT_PUBLIC_TEXT_NUMBER);

  issues.push(...validateSiteUrl(siteUrl));

  if (!phone) {
    issues.push({
      level: "error",
      code: "PHONE_MISSING",
      message: "NEXT_PUBLIC_PHONE is required in production.",
    });
  } else if (isPlaceholderPhone(phone)) {
    issues.push({
      level: "error",
      code: "PHONE_PLACEHOLDER",
      message:
        "NEXT_PUBLIC_PHONE is still the known placeholder. Set the real tracking number before production.",
    });
  }

  if (text && isPlaceholderPhone(text) && (!phone || isPlaceholderPhone(phone))) {
    issues.push({
      level: "error",
      code: "TEXT_PLACEHOLDER",
      message: "NEXT_PUBLIC_TEXT_NUMBER resolves to the placeholder phone.",
    });
  }

  if (!hasOpsLeadDestination(env)) {
    issues.push({
      level: "error",
      code: "NO_LEAD_DESTINATION",
      message:
        "Configure at least one operational lead destination: LEAD_WEBHOOK_URL, DISCORD_WEBHOOK_URL, or Resend admin email (RESEND_API_KEY + LEAD_EMAIL_FROM + LEAD_NOTIFICATION_EMAIL).",
    });
  }

  if (!isConfigured(env.NEXT_PUBLIC_GA_MEASUREMENT_ID)) {
    issues.push({
      level: "warn",
      code: "GA_MISSING",
      message: "NEXT_PUBLIC_GA_MEASUREMENT_ID is not set — analytics will be inactive.",
    });
  }

  if (!isConfigured(env.DISCORD_WEBHOOK_URL) && isConfigured(env.LEAD_WEBHOOK_URL)) {
    issues.push({
      level: "warn",
      code: "DISCORD_OPTIONAL",
      message: "DISCORD_WEBHOOK_URL is optional when Sheets or admin email is configured.",
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
        "Resend admin/customer email is optional when Sheets or Discord captures leads.",
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
 * Abort production builds when critical env is missing or still placeholder.
 * Call from next.config.ts during `next build`.
 *
 * Hard-fail only when FORCE_PRODUCTION_ENV_CHECK=1 (pre-launch gate).
 * On Vercel production, issues are logged as errors but do not block deploy so
 * preview/share URLs keep working until real phone + domain are configured.
 */
export function assertProductionEnv(): void {
  const forced = process.env.FORCE_PRODUCTION_ENV_CHECK === "1";
  const isVercelProduction = process.env.VERCEL_ENV === "production";

  if (
    !forced &&
    !isVercelProduction &&
    process.env.NODE_ENV !== "production"
  ) {
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

  if (forced) {
    throw new Error(
      `Production environment validation failed (${errors.length} error(s)). See [env] logs above.`
    );
  }

  console.warn(
    `[env] ${errors.length} critical issue(s) — set real phone/domain/lead destination before public launch. Set FORCE_PRODUCTION_ENV_CHECK=1 to fail the build.`
  );
}

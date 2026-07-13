import type { LeadFormData } from "./formSchema";
import {
  sendAdminEmailNotification,
  sendCustomerEmailConfirmation,
  sendDiscordLeadNotification,
  type LeadNotificationPayload,
} from "./leadNotifications";
import type { RouteResult } from "./routing";
import type { WebhookPayload } from "./webhookMapper";

export interface DestinationResult {
  configured: boolean;
  ok: boolean;
  error?: string;
}

export interface LeadCaptureResult {
  captured: boolean;
  destinations: {
    googleSheets: DestinationResult;
    discord: DestinationResult;
    adminEmail: DestinationResult;
    customerEmail: DestinationResult;
  };
}

const SHEETS_TIMEOUT_MS = 8000;
const NOTIFY_TIMEOUT_MS = 6000;

function isConfigured(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  return fetch(url, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function postGoogleSheetsWebhook(
  webhookPayload: WebhookPayload
): Promise<DestinationResult> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!isConfigured(url)) {
    return { configured: false, ok: false };
  }

  try {
    const res = await fetchWithTimeout(
      url!,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      },
      SHEETS_TIMEOUT_MS
    );
    const text = await res.text();
    let body: { ok?: boolean; error?: string } = {};
    try {
      body = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      // Non-JSON response — rely on HTTP status only
    }

    if (res.ok && body.ok !== false) {
      return { configured: true, ok: true };
    }

    const error = body.error ?? `HTTP ${res.status}`;
    console.error("[lead] Google Sheets webhook failed:", error);
    return { configured: true, ok: false, error };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[lead] Google Sheets webhook failed:", error);
    return { configured: true, ok: false, error };
  }
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function postDiscord(
  payload: LeadNotificationPayload
): Promise<DestinationResult> {
  if (!isConfigured(process.env.DISCORD_WEBHOOK_URL)) {
    return { configured: false, ok: false };
  }

  try {
    const ok = await withTimeout(
      sendDiscordLeadNotification(payload),
      NOTIFY_TIMEOUT_MS,
      "discord"
    );
    if (ok) return { configured: true, ok: true };
    console.error("[lead] Discord webhook failed: HTTP error");
    return { configured: true, ok: false, error: "HTTP error" };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[lead] Discord webhook failed:", error);
    return { configured: true, ok: false, error };
  }
}

async function postAdminEmail(
  payload: LeadNotificationPayload
): Promise<DestinationResult> {
  const configured =
    isConfigured(process.env.RESEND_API_KEY) &&
    isConfigured(process.env.LEAD_EMAIL_FROM) &&
    isConfigured(process.env.LEAD_NOTIFICATION_EMAIL);

  if (!configured) {
    return { configured: false, ok: false };
  }

  try {
    const ok = await withTimeout(
      sendAdminEmailNotification(payload),
      NOTIFY_TIMEOUT_MS,
      "adminEmail"
    );
    if (ok) return { configured: true, ok: true };
    console.error("[lead] Admin email notification failed: HTTP error");
    return { configured: true, ok: false, error: "HTTP error" };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[lead] Admin email notification failed:", error);
    return { configured: true, ok: false, error };
  }
}

async function postCustomerEmail(
  payload: LeadNotificationPayload,
  shouldSend: boolean
): Promise<DestinationResult> {
  if (!payload.form.email?.trim()) {
    return { configured: false, ok: false };
  }

  if (!shouldSend) {
    return { configured: true, ok: false, error: "skipped — lead not captured" };
  }

  const resendConfigured =
    isConfigured(process.env.RESEND_API_KEY) &&
    isConfigured(process.env.LEAD_EMAIL_FROM);

  if (!resendConfigured) {
    return { configured: false, ok: false };
  }

  try {
    const ok = await withTimeout(
      sendCustomerEmailConfirmation(payload),
      NOTIFY_TIMEOUT_MS,
      "customerEmail"
    );
    if (ok) return { configured: true, ok: true };
    return { configured: true, ok: false, error: "HTTP error" };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return { configured: true, ok: false, error };
  }
}

function anyDurableDestinationCaptured(
  destinations: LeadCaptureResult["destinations"]
): boolean {
  return (
    (destinations.googleSheets.configured && destinations.googleSheets.ok) ||
    (destinations.adminEmail.configured && destinations.adminEmail.ok)
  );
}

/**
 * Persist a lead to configured destinations.
 * Google Sheets (LEAD_WEBHOOK_URL) is the preferred durable ledger.
 * Admin email is an alternate durable destination.
 * Discord is a secondary notification — success there alone does not count as captured.
 * Customer email sends only after durable capture succeeds.
 */
export async function captureLead(params: {
  form: LeadFormData;
  routing: RouteResult;
  webhookPayload: WebhookPayload;
}): Promise<LeadCaptureResult> {
  const notificationPayload: LeadNotificationPayload = {
    form: params.form,
    routing: params.routing,
  };

  const googleSheets = await postGoogleSheetsWebhook(params.webhookPayload);

  const [discord, adminEmail] = await Promise.all([
    postDiscord(notificationPayload),
    postAdminEmail(notificationPayload),
  ]);

  const destinations = {
    googleSheets,
    discord,
    adminEmail,
    customerEmail: { configured: false, ok: false } as DestinationResult,
  };

  const captured = anyDurableDestinationCaptured(destinations);

  destinations.customerEmail = await postCustomerEmail(notificationPayload, captured);

  return { captured, destinations };
}

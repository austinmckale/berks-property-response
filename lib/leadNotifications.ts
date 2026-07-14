import type { LeadFormData } from "./formSchema";
import { getProblemType } from "./problemTypes";
import { getProvider } from "./providers";
import type { RouteResult } from "./routing";
import { PHONE_NUMBER, SITE_NAME, SITE_URL, TEXT_NUMBER } from "./siteConfig";
import { phoneHref, smsHref } from "./tracking";

export interface LeadNotificationPayload {
  form: LeadFormData;
  routing: RouteResult;
}

function providerLabel(route: RouteResult["primaryRoute"]): string {
  if (route === "manual_review") return "Manual review";
  return getProvider(route)?.name ?? route;
}

function urgencyLabel(urgency?: string): string {
  const map: Record<string, string> = {
    emergency: "Emergency",
    "same-day": "Need help today",
    "this-week": "This week",
    "estimate-only": "Getting info",
  };
  return map[urgency ?? ""] ?? urgency ?? "—";
}

export function buildLeadSummary({ form, routing }: LeadNotificationPayload) {
  const lines = [
    `Lead ID: ${routing.leadId}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : null,
    `Location: ${form.city}, PA ${form.zip || ""}`.trim(),
    `Urgency: ${urgencyLabel(form.urgency)}`,
    `Problem: ${form.problemDescription}`,
    `Route: ${providerLabel(routing.primaryRoute)}`,
    form.landingPage ? `Page: ${form.landingPage}` : null,
    form.utmSource ? `UTM: ${form.utmSource}/${form.utmMedium || "—"}/${form.utmCampaign || "—"}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function sendDiscordLeadNotification(
  payload: LeadNotificationPayload
): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const { form, routing } = payload;
  const isEmergency = form.urgency === "emergency";

  const body = {
    embeds: [
      {
        title: isEmergency
          ? "Emergency lead — Berks Property Response"
          : "New lead — Berks Property Response",
        color: isEmergency ? 0xdc2626 : 0x44403c,
        description: form.problemDescription.slice(0, 500),
        fields: [
          { name: "Lead ID", value: routing.leadId, inline: true },
          { name: "Name", value: form.name, inline: true },
          { name: "Phone", value: form.phone, inline: true },
          { name: "City", value: `${form.city}, PA ${form.zip || ""}`.trim(), inline: true },
          {
            name: "Issue type",
            value: getProblemType(form.problemType).title,
            inline: true,
          },
          {
            name: "Urgency",
            value: urgencyLabel(form.urgency),
            inline: true,
          },
          {
            name: "Suggested route",
            value: providerLabel(routing.primaryRoute),
            inline: true,
          },
          {
            name: "Source page",
            value: form.landingPage?.trim() || "—",
            inline: false,
          },
          {
            name: "UTM",
            value: [form.utmSource, form.utmMedium, form.utmCampaign, form.utmTerm]
              .filter(Boolean)
              .join(" / ") || "—",
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000),
  });

  return res.ok;
}

function buildAdminEmailHtml(payload: LeadNotificationPayload): string {
  const { form, routing } = payload;
  const rows = [
    ["Lead ID", routing.leadId],
    ["Name", form.name],
    ["Phone", form.phone],
    ["Email", form.email || "—"],
    ["City / ZIP", `${form.city}, PA ${form.zip || ""}`.trim()],
    ["Problem type", getProblemType(form.problemType).title],
    ["Urgency", urgencyLabel(form.urgency)],
    ["Description", form.problemDescription],
    ["Suggested route", providerLabel(routing.primaryRoute)],
    ["Landing page", form.landingPage || "—"],
    ["UTM source", form.utmSource || "—"],
    ["UTM medium", form.utmMedium || "—"],
    ["UTM campaign", form.utmCampaign || "—"],
    ["UTM term", form.utmTerm || "—"],
    ["Referrer", form.referrer || "—"],
    ["Call", phoneHref(form.phone)],
    ["Text", smsHref(form.phone)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#57534e;width:140px">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#1c1917">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#fafaf9;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:24px"><h1 style="margin:0 0 8px;font-size:20px;color:#1c1917">New help request</h1><p style="margin:0 0 20px;color:#57534e">${SITE_NAME}</p><table style="width:100%;border-collapse:collapse">${tableRows}</table></div></body></html>`;
}

function buildCustomerEmailHtml(payload: LeadNotificationPayload): string {
  const { form, routing } = payload;
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#fafaf9;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:24px"><h1 style="margin:0 0 12px;font-size:20px;color:#1c1917">Request sent</h1><p style="color:#44403c;line-height:1.6">Hi ${escapeHtml(form.name)},</p><p style="color:#44403c;line-height:1.6">Your reference number is <strong>${escapeHtml(routing.leadId)}</strong>.</p><p style="color:#44403c;line-height:1.6">Have photos? Text them to <a href="${smsHref(TEXT_NUMBER)}" style="color:#1c1917">${escapeHtml(TEXT_NUMBER)}</a> and include your reference ID.</p><p style="color:#44403c;line-height:1.6">Need to reach us by phone? Call <a href="${phoneHref(PHONE_NUMBER)}" style="color:#1c1917">${escapeHtml(PHONE_NUMBER)}</a>.</p><p style="margin-top:24px;font-size:13px;color:#78716c"><a href="${SITE_URL}/disclosure" style="color:#44403c">Disclosure</a> · <a href="${SITE_URL}/privacy-policy" style="color:#44403c">Privacy Policy</a></p></div></body></html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendResendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
    }),
    signal: AbortSignal.timeout(6000),
  });

  return res.ok;
}

export async function sendAdminEmailNotification(
  payload: LeadNotificationPayload
): Promise<boolean> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!to) return false;

  const { form, routing } = payload;
  const subject =
    form.urgency === "emergency"
      ? `[Emergency] ${routing.leadId} — ${form.name} — ${form.city}`
      : `New lead ${routing.leadId} — ${form.name} — ${form.city}`;

  return sendResendEmail({
    to,
    subject,
    html: buildAdminEmailHtml(payload),
  });
}

export async function sendCustomerEmailConfirmation(
  payload: LeadNotificationPayload
): Promise<boolean> {
  const { form } = payload;
  if (!form.email?.trim()) return false;

  return sendResendEmail({
    to: form.email.trim(),
    subject: `We received your request — ${SITE_NAME}`,
    html: buildCustomerEmailHtml(payload),
  });
}

export async function notifyLeadSubmitted(
  payload: LeadNotificationPayload
): Promise<{ discord: boolean; adminEmail: boolean; customerEmail: boolean }> {
  const [discord, adminEmail, customerEmail] = await Promise.all([
    sendDiscordLeadNotification(payload).catch(() => false),
    sendAdminEmailNotification(payload).catch(() => false),
    sendCustomerEmailConfirmation(payload).catch(() => false),
  ]);

  return { discord, adminEmail, customerEmail };
}

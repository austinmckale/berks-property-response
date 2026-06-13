import type { LeadFormData } from "./formSchema";
import { getProvider } from "./providers";
import type { RouteResult } from "./routing";
import { SITE_NAME, SITE_URL } from "./siteConfig";

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
    `Location: ${form.city}, PA ${form.zip}`,
    `Urgency: ${urgencyLabel(form.urgency)}`,
    `Problem: ${form.problemDescription}`,
    `Route: ${providerLabel(routing.primaryRoute)} (${routing.qualifiedStatus})`,
    `Score: ${routing.leadScore}`,
    form.landingPage ? `Page: ${form.landingPage}` : null,
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
  const summary = buildLeadSummary(payload);

  const body = {
    embeds: [
      {
        title: isEmergency
          ? "Emergency lead — Berks Property Response"
          : "New lead — Berks Property Response",
        color: isEmergency ? 0xdc2626 : 0x44403c,
        description: form.problemDescription.slice(0, 500),
        fields: [
          { name: "Name", value: form.name, inline: true },
          { name: "Phone", value: form.phone, inline: true },
          { name: "City", value: `${form.city}, ${form.zip}`, inline: true },
          {
            name: "Urgency",
            value: urgencyLabel(form.urgency),
            inline: true,
          },
          {
            name: "Route",
            value: providerLabel(routing.primaryRoute),
            inline: true,
          },
          {
            name: "Lead ID",
            value: routing.leadId,
            inline: true,
          },
        ],
        footer: { text: summary.split("\n").slice(-2).join(" · ") },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
    ["City", `${form.city}, PA ${form.zip}`],
    ["Urgency", urgencyLabel(form.urgency)],
    ["Route", providerLabel(routing.primaryRoute)],
    ["Status", routing.qualifiedStatus],
    ["Score", String(routing.leadScore)],
    ["Problem", form.problemDescription],
    ["Page", form.landingPage || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#57534e;width:120px">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#1c1917">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#fafaf9;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:24px"><h1 style="margin:0 0 8px;font-size:20px;color:#1c1917">New help request</h1><p style="margin:0 0 20px;color:#57534e">${SITE_NAME}</p><table style="width:100%;border-collapse:collapse">${tableRows}</table></div></body></html>`;
}

function buildCustomerEmailHtml(payload: LeadNotificationPayload): string {
  const { form } = payload;
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#fafaf9;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:24px"><h1 style="margin:0 0 12px;font-size:20px;color:#1c1917">We received your request</h1><p style="color:#44403c;line-height:1.6">Hi ${escapeHtml(form.name)},</p><p style="color:#44403c;line-height:1.6">Thanks for reaching out to ${SITE_NAME}. We received your message and will connect you with local help in Berks County. Someone should contact you at <strong>${escapeHtml(form.phone)}</strong> soon.</p><p style="color:#44403c;line-height:1.6">If sewage or water is actively backing up, call now rather than waiting for email.</p><p style="margin-top:24px;font-size:13px;color:#78716c"><a href="${SITE_URL}/disclosure" style="color:#44403c">Referral disclosure</a></p></div></body></html>`;
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
      ? `[Emergency] New lead from ${form.name} — ${form.city}`
      : `New lead from ${form.name} — ${form.city}`;

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

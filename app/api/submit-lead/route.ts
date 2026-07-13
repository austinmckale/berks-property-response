import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/formSchema";
import { captureLead } from "@/lib/leadCapture";
import { mapToGoogleSheetRow } from "@/lib/googleSheetsMapper";
import { getProblemType } from "@/lib/problemTypes";
import { routeLead } from "@/lib/routing";
import { mapToWebhookPayload } from "@/lib/webhookMapper";
import { PHONE_NUMBER } from "@/lib/siteConfig";
import { resolveUrgency } from "@/lib/urgency";
import {
  checkDistributedRateLimit,
  checkSpamFields,
  hashIpForLog,
  logSpamRejection,
  MAX_BODY_BYTES,
  verifyTurnstileIfConfigured,
} from "@/lib/spamProtection";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      logSpamRejection({ reason: "payload_too_large" });
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const body = await request.json();
    const ip = clientIp(request);
    const ipHash = hashIpForLog(ip);

    const spam = checkSpamFields({
      bprHpField: body?.bprHpField,
      companyWebsite: body?.companyWebsite,
      formStartedAt: body?.formStartedAt,
      name: body?.name,
      city: body?.city,
      problemDescription: body?.problemDescription,
      email: body?.email,
    });
    if (!spam.ok && spam.reason) {
      logSpamRejection({ reason: spam.reason, ipHash });
      return NextResponse.json(
        { error: "Unable to process this request. Please try again or call us." },
        { status: 400 }
      );
    }

    const rate = await checkDistributedRateLimit(ip);
    if (rate.limited) {
      logSpamRejection({ reason: "rate_limited", ipHash });
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment or call us." },
        { status: 429 }
      );
    }

    const turnstile = await verifyTurnstileIfConfigured(body?.turnstileToken, ip);
    if (!turnstile.ok) {
      logSpamRejection({ reason: "turnstile_failed", ipHash });
      return NextResponse.json(
        { error: "Unable to verify this request. Please try again or call us." },
        { status: 400 }
      );
    }

    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Unable to process this request. Please try again or call us." },
        { status: 400 }
      );
    }

    const problem = getProblemType(parsed.data.problemType);
    const urgency = resolveUrgency({
      categoryDefault: parsed.data.urgency ?? problem.urgency,
      waterOrSewagePresent: parsed.data.waterOrSewagePresent,
    });
    const form = {
      ...parsed.data,
      urgency,
      serviceRequested:
        parsed.data.serviceRequested || problem.defaultService,
      serviceCategory: parsed.data.serviceCategory ?? problem.serviceCategory,
      defaultRoute: parsed.data.defaultRoute || problem.defaultRoute,
      propertyType: parsed.data.propertyType ?? "residential",
      smsOptIn: parsed.data.smsOptIn === true,
      waterOrSewagePresent: parsed.data.waterOrSewagePresent,
    };
    const photoUploaded = false;
    const routing = routeLead({
      ...form,
      photoUploaded,
      problemDescription: form.problemDescription,
      serviceRequested: `${problem.defaultService}. ${form.problemDescription}`,
    });

    const sheetRow = mapToGoogleSheetRow(form, routing);
    const webhookPayload = mapToWebhookPayload(form, routing, sheetRow);

    const capture = await captureLead({ form, routing, webhookPayload });

    console.info("[lead] capture", {
      leadId: routing.leadId,
      sheets: capture.destinations.googleSheets,
      discord: capture.destinations.discord,
      adminEmail: capture.destinations.adminEmail,
      customerEmail: {
        configured: capture.destinations.customerEmail.configured,
        ok: capture.destinations.customerEmail.ok,
      },
      captured: capture.captured,
    });

    if (!capture.captured) {
      return NextResponse.json(
        {
          error: `We could not save your request. Please call ${PHONE_NUMBER} so we can help right away.`,
          leadId: routing.leadId,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: routing.leadId,
      message: "Request received.",
    });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

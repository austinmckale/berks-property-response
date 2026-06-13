import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/formSchema";
import { mapToGoogleSheetRow } from "@/lib/googleSheetsMapper";
import { notifyLeadSubmitted } from "@/lib/leadNotifications";
import { getProblemType } from "@/lib/problemTypes";
import { routeLead } from "@/lib/routing";
import { mapToWebhookPayload } from "@/lib/webhookMapper";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const problem = getProblemType(parsed.data.problemType);
    const form = {
      ...parsed.data,
      urgency: parsed.data.urgency ?? problem.urgency,
      serviceRequested:
        parsed.data.serviceRequested || problem.defaultService,
      serviceCategory: parsed.data.serviceCategory ?? problem.serviceCategory,
      defaultRoute: parsed.data.defaultRoute || problem.defaultRoute,
      propertyType: parsed.data.propertyType ?? "residential",
      smsOptIn: parsed.data.smsOptIn === true,
    };
    const photoUploaded = Boolean(form.photoUpload);
    const routing = routeLead({
      ...form,
      photoUploaded,
      problemDescription: form.problemDescription,
      serviceRequested: `${problem.defaultService}. ${form.problemDescription}`,
    });

    const webhookPayload = mapToWebhookPayload(form, routing);
    const sheetRow = mapToGoogleSheetRow(form, routing);

    const notificationResults = await notifyLeadSubmitted({ form, routing });

    if (process.env.LEAD_WEBHOOK_URL) {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      }).catch(() => {
        // Webhook failures should not block user confirmation
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[lead]", { routing, sheetRow, notificationResults });
    }

    return NextResponse.json({
      success: true,
      routing,
      message: "Request received.",
    });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

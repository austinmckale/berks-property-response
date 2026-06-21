import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/formSchema";
import { captureLead } from "@/lib/leadCapture";
import { mapToGoogleSheetRow } from "@/lib/googleSheetsMapper";
import { getProblemType } from "@/lib/problemTypes";
import { routeLead } from "@/lib/routing";
import { mapToWebhookPayload } from "@/lib/webhookMapper";
import { PHONE_NUMBER } from "@/lib/siteConfig";

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

    if (process.env.NODE_ENV === "development") {
      console.log("[lead]", { routing, sheetRow, capture });
    }

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
      routing,
      leadId: routing.leadId,
      message: "Request received.",
    });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

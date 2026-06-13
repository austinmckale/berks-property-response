import type { LeadFormData } from "./formSchema";
import type { RouteResult } from "./routing";

export interface WebhookPayload {
  event: "lead_submitted";
  timestamp: string;
  lead: {
    leadId: string;
    customer: {
      name: string;
      phone: string;
      email?: string;
      streetAddress?: string;
      city: string;
      zip: string;
      propertyType: string;
    };
    request: {
      serviceRequested: string;
      urgency: string;
      problemDescription: string;
      fixturesAffected?: string;
      waterOrSewagePresent?: string;
      photoUploadUrl?: string;
    };
    consent: {
      smsOptIn: boolean;
      partnerShareConsent: boolean;
    };
    routing: RouteResult;
    tracking: {
      landingPage?: string;
      pageType?: string;
      serviceCategory?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmTerm?: string;
      gclid?: string;
      referrer?: string;
    };
  };
}

export function mapToWebhookPayload(
  form: LeadFormData,
  routing: RouteResult,
  photoUploadUrl?: string
): WebhookPayload {
  return {
    event: "lead_submitted",
    timestamp: new Date().toISOString(),
    lead: {
      leadId: routing.leadId,
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        streetAddress: form.streetAddress,
        city: form.city,
        zip: form.zip,
        propertyType: form.propertyType,
      },
      request: {
        serviceRequested: form.serviceRequested,
        urgency: form.urgency,
        problemDescription: form.problemDescription,
        fixturesAffected: form.fixturesAffected,
        waterOrSewagePresent: form.waterOrSewagePresent,
        photoUploadUrl,
      },
      consent: {
        smsOptIn: form.smsOptIn ?? false,
        partnerShareConsent: form.partnerShareConsent,
      },
      routing,
      tracking: {
        landingPage: form.landingPage,
        pageType: form.pageType,
        serviceCategory: form.serviceCategory,
        utmSource: form.utmSource,
        utmMedium: form.utmMedium,
        utmCampaign: form.utmCampaign,
        utmTerm: form.utmTerm,
        gclid: form.gclid,
        referrer: form.referrer,
      },
    },
  };
}

import type { LeadFormData } from "./formSchema";
import type { RouteResult } from "./routing";

export interface GoogleSheetRow {
  lead_id: string;
  created_at: string;
  channel: string;
  lead_source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  landing_page: string;
  customer_name: string;
  phone: string;
  email: string;
  street_address: string;
  city: string;
  zip: string;
  property_type: string;
  service_requested: string;
  urgency: string;
  problem_type: string;
  fixtures_affected: string;
  water_or_sewage_present: string;
  photo_upload_url: string;
  sms_opt_in: string;
  partner_share_consent: string;
  primary_route: string;
  secondary_route: string;
  lead_score: number;
  qualified_status: string;
  disposition: string;
  payout_category: string;
  payout_rate: string;
  payout_due: string;
  invoice_month: string;
  notes_internal: string;
}

export function mapToGoogleSheetRow(
  form: LeadFormData,
  routing: RouteResult,
  photoUploadUrl?: string
): GoogleSheetRow {
  const now = new Date();
  return {
    lead_id: routing.leadId,
    created_at: now.toISOString(),
    channel: "web_form",
    lead_source: form.utmSource ?? "direct",
    utm_source: form.utmSource ?? "",
    utm_medium: form.utmMedium ?? "",
    utm_campaign: form.utmCampaign ?? "",
    utm_term: form.utmTerm ?? "",
    landing_page: form.landingPage ?? "",
    customer_name: form.name,
    phone: form.phone,
    email: form.email ?? "",
    street_address: form.streetAddress ?? "",
    city: form.city,
    zip: form.zip,
    property_type: form.propertyType ?? "residential",
    service_requested: form.serviceRequested ?? form.problemDescription,
    urgency: form.urgency ?? "same-day",
    problem_type: routing.serviceCategory,
    fixtures_affected: form.fixturesAffected ?? "",
    water_or_sewage_present: form.waterOrSewagePresent ?? "",
    photo_upload_url: photoUploadUrl ?? "",
    sms_opt_in: form.smsOptIn ? "yes" : "no",
    partner_share_consent: "yes",
    primary_route: routing.primaryRoute,
    secondary_route: routing.secondaryRoute ?? "",
    lead_score: routing.leadScore,
    qualified_status: routing.qualifiedStatus,
    disposition: "new",
    payout_category: routing.payoutCategory,
    payout_rate: "",
    payout_due: "",
    invoice_month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    notes_internal: routing.notesInternal.join("; "),
  };
}

export const GOOGLE_SHEET_COLUMNS: (keyof GoogleSheetRow)[] = [
  "lead_id",
  "created_at",
  "channel",
  "lead_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "landing_page",
  "customer_name",
  "phone",
  "email",
  "street_address",
  "city",
  "zip",
  "property_type",
  "service_requested",
  "urgency",
  "problem_type",
  "fixtures_affected",
  "water_or_sewage_present",
  "photo_upload_url",
  "sms_opt_in",
  "partner_share_consent",
  "primary_route",
  "secondary_route",
  "lead_score",
  "qualified_status",
  "disposition",
  "payout_category",
  "payout_rate",
  "payout_due",
  "invoice_month",
  "notes_internal",
];

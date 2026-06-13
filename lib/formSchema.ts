import { z } from "zod";

export const propertyTypes = [
  "residential",
  "commercial",
  "rental",
  "multi-unit",
  "property-manager",
] as const;

export const urgencyLevels = [
  "emergency",
  "same-day",
  "this-week",
  "estimate-only",
] as const;

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP code is required"),
  streetAddress: z.string().optional(),
  propertyType: z.enum(propertyTypes),
  serviceRequested: z.string().min(2, "Please describe the service needed"),
  urgency: z.enum(urgencyLevels),
  fixturesAffected: z.string().optional(),
  waterOrSewagePresent: z.enum(["yes", "no", "unknown"]).optional(),
  problemDescription: z.string().min(10, "Please describe the problem"),
  photoUpload: z.any().optional(),
  smsOptIn: z.boolean().optional(),
  partnerShareConsent: z.literal(true, {
    message: "Partner share consent is required",
  }),
  referralDisclosureAck: z.literal(true, {
    message: "Please acknowledge the referral disclosure",
  }),
  landingPage: z.string().optional(),
  pageType: z.string().optional(),
  serviceCategory: z.string().optional(),
  defaultRoute: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  gclid: z.string().optional(),
  referrer: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const routeLeadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  streetAddress: z.string().optional(),
  propertyType: z.string().optional(),
  serviceRequested: z.string().optional(),
  urgency: z.string().optional(),
  fixturesAffected: z.string().optional(),
  waterOrSewagePresent: z.string().optional(),
  problemDescription: z.string().optional(),
  photoUploaded: z.boolean().optional(),
  landingPage: z.string().optional(),
  pageType: z.string().optional(),
  serviceCategory: z.string().optional(),
  defaultRoute: z.string().optional(),
});

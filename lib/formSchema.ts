import { z } from "zod";
import { problemTypeOptions } from "./problemTypes";

const problemTypeIds = problemTypeOptions.map((p) => p.id) as [
  (typeof problemTypeOptions)[number]["id"],
  ...(typeof problemTypeOptions)[number]["id"][],
];

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

export const urgencyOptions = [
  { value: "emergency", label: "Emergency" },
  { value: "same-day", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "estimate-only", label: "Just researching" },
] as const;

export const leadFormSchema = z.object({
  problemType: z.enum(problemTypeIds, {
    message: "Please choose what you need help with",
  }),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  zip: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.replace(/\D/g, "").length >= 5, {
      message: "Enter a valid ZIP or leave blank",
    }),
  problemDescription: z.string().min(5, "A few words about the problem helps"),
  urgency: z.enum(urgencyLevels).optional(),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  /** Derived or prefilled — not shown on the simplified form */
  propertyType: z.enum(propertyTypes).optional(),
  serviceRequested: z.string().optional(),
  streetAddress: z.string().optional(),
  fixturesAffected: z.string().optional(),
  // Hidden inputs can submit "" — treat blank like unset (same pattern as zip/email)
  waterOrSewagePresent: z
    .enum(["yes", "no", "unknown"])
    .optional()
    .or(z.literal("")),
  smsOptIn: z.boolean().optional(),
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
  activeConditions: z.string().optional(),
  submittedAt: z.string().optional(),
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

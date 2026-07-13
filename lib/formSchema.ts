import { z } from "zod";
import { problemTypeOptions } from "./problemTypes";
import { isValidPhoneDigits } from "./phone";
import {
  MAX_CITY_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
} from "./spamProtection";

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

const zipPattern = /^(\d{5})(-\d{4})?$/;

export const leadFormSchema = z.object({
  problemType: z.enum(problemTypeIds, {
    message: "Please choose what you need help with",
  }),
  name: z
    .string()
    .min(2, "Name is required")
    .max(MAX_NAME_LENGTH, "Name is too long"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine(isValidPhoneDigits, "Enter a valid 10-digit phone number"),
  city: z
    .string()
    .min(2, "City is required")
    .max(MAX_CITY_LENGTH, "City is too long"),
  zip: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || zipPattern.test(v.trim()), {
      message: "Enter a 5-digit ZIP or ZIP+4, or leave blank",
    }),
  problemDescription: z
    .string()
    .min(5, "A few words about the problem helps")
    .max(MAX_DESCRIPTION_LENGTH, "Description is too long"),
  urgency: z.enum(urgencyLevels).optional(),
  email: z
    .string()
    .max(MAX_EMAIL_LENGTH)
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),
  propertyType: z.enum(propertyTypes).optional(),
  serviceRequested: z.string().optional(),
  streetAddress: z.string().optional(),
  fixturesAffected: z.string().optional(),
  waterOrSewagePresent: z.enum(["yes", "no", "unknown"], {
    message: "Please tell us if water or sewage is active right now",
  }),
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
  /** Opaque honeypot — must stay empty (legacy companyWebsite still accepted) */
  bprHpField: z.string().optional(),
  companyWebsite: z.string().optional(),
  /** Client render timestamp (ms) for timing checks */
  formStartedAt: z.union([z.string(), z.number()]).optional(),
  /** Optional Cloudflare Turnstile token */
  turnstileToken: z.string().optional(),
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

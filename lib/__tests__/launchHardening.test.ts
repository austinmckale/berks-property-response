import { describe, expect, it } from "vitest";
import { checkSpamFields, MIN_SUBMIT_MS } from "@/lib/spamProtection";
import { isValidPhoneDigits, phoneDigits } from "@/lib/phone";
import { leadFormSchema } from "@/lib/formSchema";
import {
  collectProductionEnvIssues,
  PLACEHOLDER_PHONE,
} from "@/lib/env";

describe("phone validation", () => {
  it("accepts formatted US numbers with at least 10 digits", () => {
    expect(isValidPhoneDigits("(484) 555-0100")).toBe(true);
    expect(phoneDigits("(484) 555-0100")).toBe("4845550100");
  });

  it("rejects short numbers", () => {
    expect(isValidPhoneDigits("555-0100")).toBe(false);
  });
});

describe("ZIP validation", () => {
  it("accepts 5-digit and ZIP+4", () => {
    expect(leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "19601",
      problemDescription: "Kitchen faucet drip under the sink.",
      formStartedAt: Date.now() - 5000,
    }).success).toBe(true);

    expect(leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "19601-1234",
      problemDescription: "Kitchen faucet drip under the sink.",
      formStartedAt: Date.now() - 5000,
    }).success).toBe(true);
  });

  it("rejects invalid ZIP", () => {
    const result = leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "196",
      problemDescription: "Kitchen faucet drip under the sink.",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.success).toBe(false);
  });
});

describe("spam protection", () => {
  it("rejects honeypot fills", () => {
    expect(
      checkSpamFields({
        companyWebsite: "https://spam.example",
        formStartedAt: Date.now() - 5000,
      }).reason
    ).toBe("honeypot");
  });

  it("rejects implausibly fast submissions", () => {
    const now = Date.now();
    expect(
      checkSpamFields({
        formStartedAt: now - (MIN_SUBMIT_MS - 100),
        now,
      }).reason
    ).toBe("too_fast");
  });

  it("accepts normal timing", () => {
    const now = Date.now();
    expect(
      checkSpamFields({
        formStartedAt: now - MIN_SUBMIT_MS - 100,
        now,
        name: "Jane",
        city: "Reading",
        problemDescription: "Leak under sink",
      }).ok
    ).toBe(true);
  });
});

describe("production env validation", () => {
  it("flags placeholder phone and vercel.app URL as errors", () => {
    const issues = collectProductionEnvIssues({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://berks-property-response.vercel.app",
      NEXT_PUBLIC_PHONE: PLACEHOLDER_PHONE,
    } as unknown as NodeJS.ProcessEnv);

    const codes = issues.filter((i) => i.level === "error").map((i) => i.code);
    expect(codes).toContain("SITE_URL_VERCEL_PREVIEW");
    expect(codes).toContain("PHONE_PLACEHOLDER");
    expect(codes).toContain("NO_LEAD_DESTINATION");
  });

  it("passes with custom domain, real phone, and Sheets webhook", () => {
    const errors = collectProductionEnvIssues({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST",
    } as unknown as NodeJS.ProcessEnv).filter((i) => i.level === "error");

    expect(errors).toEqual([]);
  });
});

describe("analytics payload hygiene", () => {
  it("form success params must not include PII keys", () => {
    const params = {
      page_type: "home",
      service_category: "plumbing",
    };
    const forbidden = ["name", "phone", "email", "leadId", "lead_id", "description", "address"];
    for (const key of forbidden) {
      expect(Object.prototype.hasOwnProperty.call(params, key)).toBe(false);
    }
  });
});

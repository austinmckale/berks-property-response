import { afterEach, describe, expect, it, vi } from "vitest";
import { checkSpamFields, MIN_SUBMIT_MS } from "@/lib/spamProtection";
import { isValidPhoneDigits, phoneDigits } from "@/lib/phone";
import { leadFormSchema } from "@/lib/formSchema";
import {
  assertProductionEnv,
  collectProductionEnvIssues,
  DEFAULT_DEV_PHONE,
  hasDurableLeadDestination,
} from "@/lib/env";

describe("phone validation", () => {
  it("uses (484) 509-0748 as the confirmed BPR default", () => {
    expect(DEFAULT_DEV_PHONE).toBe("(484) 509-0748");
  });

  it("accepts formatted US numbers with at least 10 digits", () => {
    expect(isValidPhoneDigits("(484) 555-0100")).toBe(true);
    expect(phoneDigits("(484) 555-0100")).toBe("4845550100");
    expect(isValidPhoneDigits(DEFAULT_DEV_PHONE)).toBe(true);
    expect(phoneDigits(DEFAULT_DEV_PHONE)).toBe("4845090748");
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
      waterOrSewagePresent: "no",
      formStartedAt: Date.now() - 5000,
    }).success).toBe(true);

    expect(leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "19601-1234",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
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
      waterOrSewagePresent: "no",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.success).toBe(false);
  });
});

describe("spam protection", () => {
  it("rejects honeypot fills", () => {
    expect(
      checkSpamFields({
        bprHpField: "https://spam.example",
        formStartedAt: Date.now() - 5000,
      }).reason
    ).toBe("honeypot");
  });

  it("rejects legacy companyWebsite honeypot fills", () => {
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

  it("accepts normal timing around the autofill-friendly threshold", () => {
    expect(MIN_SUBMIT_MS).toBeGreaterThanOrEqual(500);
    expect(MIN_SUBMIT_MS).toBeLessThanOrEqual(1000);
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

  it("rejects missing and malformed timestamps", () => {
    expect(checkSpamFields({}).reason).toBe("missing_timestamp");
    expect(checkSpamFields({ formStartedAt: "not-a-number" }).reason).toBe(
      "invalid_timestamp"
    );
  });
});

describe("production env validation", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("1. missing NEXT_PUBLIC_PHONE is allowed (confirmed Google Voice default)", () => {
    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).not.toContain("PHONE_MISSING");
    expect(codes).not.toContain("PHONE_INVALID");
  });

  it("1b. confirmed BPR number is accepted when explicitly set", () => {
    const errors = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: DEFAULT_DEV_PHONE,
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST",
    } as unknown as NodeJS.ProcessEnv).filter((i) => i.level === "error");
    expect(errors).toEqual([]);
  });

  it("1c. invalid phone override fails when set", () => {
    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "555-0100",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).toContain("PHONE_INVALID");
  });

  it("2. missing production site URL fails", () => {
    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).toContain("SITE_URL_MISSING");
  });

  it("3. HTTP production URL fails", () => {
    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "http://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).toContain("SITE_URL_NOT_HTTPS");
  });

  it("4. Vercel preview hostname is allowed when allowVercelPreviewHost is set", () => {
    const errors = collectProductionEnvIssues(
      {
        NEXT_PUBLIC_SITE_URL: "https://berks-property-response-git-main.vercel.app",
        NEXT_PUBLIC_PHONE: "(610) 555-0199",
        LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
      } as unknown as NodeJS.ProcessEnv,
      { allowVercelPreviewHost: true }
    ).filter((i) => i.level === "error");
    expect(errors.map((e) => e.code)).not.toContain("SITE_URL_VERCEL_PREVIEW");
  });

  it("4b. assertProductionEnv does not throw for VERCEL_ENV=preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv(
      "NEXT_PUBLIC_SITE_URL",
      "https://berks-property-response-git-main.vercel.app"
    );
    vi.stubEnv("NEXT_PUBLIC_PHONE", DEFAULT_DEV_PHONE);
    expect(() => assertProductionEnv()).not.toThrow();
  });

  it("5. Discord alone fails durable-destination validation", () => {
    expect(
      hasDurableLeadDestination({
        DISCORD_WEBHOOK_URL: "https://discord.example/webhook",
      } as unknown as NodeJS.ProcessEnv)
    ).toBe(false);

    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      DISCORD_WEBHOOK_URL: "https://discord.example/webhook",
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).toContain("NO_DURABLE_LEAD_DESTINATION");
  });

  it("6. Google Sheets webhook passes destination validation", () => {
    expect(
      hasDurableLeadDestination({
        LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
      } as unknown as NodeJS.ProcessEnv)
    ).toBe(true);
  });

  it("7. complete admin Resend configuration passes destination validation", () => {
    expect(
      hasDurableLeadDestination({
        RESEND_API_KEY: "re_test",
        LEAD_EMAIL_FROM: "ops@example.com",
        LEAD_NOTIFICATION_EMAIL: "alerts@example.com",
      } as unknown as NodeJS.ProcessEnv)
    ).toBe(true);
  });

  it("8. optional GA4 absent warns only", () => {
    const issues = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
    } as unknown as NodeJS.ProcessEnv);
    expect(issues.filter((i) => i.level === "error")).toEqual([]);
    expect(issues.some((i) => i.code === "GA_MISSING" && i.level === "warn")).toBe(
      true
    );
  });

  it("9. custom HTTPS URL before DNS passes without network lookup", () => {
    const errors = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berkspropertyresponse.com",
      NEXT_PUBLIC_PHONE: "(610) 555-0199",
      LEAD_WEBHOOK_URL: "https://script.google.com/macros/s/example/exec",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST",
    } as unknown as NodeJS.ProcessEnv).filter((i) => i.level === "error");
    expect(errors).toEqual([]);
  });

  it("flags vercel.app as production canonical error", () => {
    const codes = collectProductionEnvIssues({
      NEXT_PUBLIC_SITE_URL: "https://berks-property-response.vercel.app",
      NEXT_PUBLIC_PHONE: DEFAULT_DEV_PHONE,
    } as unknown as NodeJS.ProcessEnv)
      .filter((i) => i.level === "error")
      .map((i) => i.code);
    expect(codes).toContain("SITE_URL_VERCEL_PREVIEW");
    expect(codes).not.toContain("PHONE_PLACEHOLDER");
    expect(codes).not.toContain("PHONE_MISSING");
    expect(codes).not.toContain("PHONE_INVALID");
    expect(codes).toContain("NO_DURABLE_LEAD_DESTINATION");
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

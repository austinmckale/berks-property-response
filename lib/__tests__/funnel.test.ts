import { describe, expect, it } from "vitest";
import { isActiveProblem, resolveUrgency } from "@/lib/urgency";
import { getProblemType } from "@/lib/problemTypes";
import { routeLead } from "@/lib/routing";
import { leadFormSchema } from "@/lib/formSchema";
import { checkSpamFields, MIN_SUBMIT_MS } from "@/lib/spamProtection";
import { triageCards } from "@/lib/problems";
import { isProblemTypeId } from "@/lib/intakeLinks";
import {
  GOOGLE_SHEET_COLUMNS,
  mapToGoogleSheetRow,
} from "@/lib/googleSheetsMapper";
import { ANALYTICS_EVENT_NAMES } from "@/lib/analytics";

describe("resolveUrgency", () => {
  it("elevates to emergency when water/sewage is active", () => {
    expect(
      resolveUrgency({
        categoryDefault: "same-day",
        waterOrSewagePresent: "yes",
      })
    ).toBe("emergency");
  });

  it("preserves category default when answer is no", () => {
    expect(
      resolveUrgency({
        categoryDefault: "this-week",
        waterOrSewagePresent: "no",
      })
    ).toBe("this-week");
  });

  it("preserves category default when not sure", () => {
    expect(
      resolveUrgency({
        categoryDefault: "same-day",
        waterOrSewagePresent: "unknown",
      })
    ).toBe("same-day");
  });
});

describe("isActiveProblem", () => {
  it("treats water yes as active even if category was not emergency", () => {
    expect(
      isActiveProblem({ waterOrSewagePresent: "yes", urgency: "same-day" })
    ).toBe(true);
  });

  it("treats emergency urgency as active", () => {
    expect(isActiveProblem({ urgency: "emergency" })).toBe(true);
  });
});

describe("homepage triage categories", () => {
  it("keeps valid query-string problem preselection IDs", () => {
    expect(isProblemTypeId("plumbing-leak")).toBe(true);
    expect(isProblemTypeId("not-a-problem")).toBe(false);
  });

  it("maps triage cards to correct provider defaults", () => {
    const expected: Record<string, string> = {
      "drain-emergency": "apex",
      "plumbing-leak": "evan",
      "water-damage": "rhi",
      "major-property": "manual_review",
    };
    for (const card of triageCards) {
      expect(getProblemType(card.problem).defaultRoute).toBe(expected[card.problem]);
    }
  });
});

describe("lead form requires water triage", () => {
  it("rejects missing waterOrSewagePresent", () => {
    const result = leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      problemDescription: "Kitchen faucet drip under the sink.",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.success).toBe(false);
  });

  it("accepts yes/no/unknown with required fields", () => {
    for (const water of ["yes", "no", "unknown"] as const) {
      const result = leadFormSchema.safeParse({
        problemType: "plumbing-leak",
        name: "Jane Smith",
        phone: "4845550100",
        city: "Reading",
        problemDescription: "Kitchen faucet drip under the sink.",
        waterOrSewagePresent: water,
        formStartedAt: Date.now() - 5000,
      });
      expect(result.success).toBe(true);
    }
  });

  it("accepts requests without email or ZIP", () => {
    const result = leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.success).toBe(true);
  });

  it("continues to accept valid email and ZIP in inbound payloads", () => {
    const result = leadFormSchema.safeParse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "19601-1234",
      email: "jane@example.com",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.success).toBe(true);
  });
});

describe("Sheets mapping compatibility", () => {
  const routing = routeLead({
    serviceRequested: "small plumbing repair",
    problemDescription: "Kitchen faucet drip under the sink.",
    city: "Reading",
    phone: "4845550100",
    defaultRoute: "evan",
  });

  it("keeps email and ZIP columns in the deployed header order", () => {
    expect(GOOGLE_SHEET_COLUMNS.indexOf("email")).toBe(11);
    expect(GOOGLE_SHEET_COLUMNS.indexOf("zip")).toBe(14);
  });

  it("maps omitted email and ZIP to blank strings", () => {
    const form = leadFormSchema.parse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
    });
    const row = mapToGoogleSheetRow(form, routing);
    expect(row.email).toBe("");
    expect(row.zip).toBe("");
  });

  it("maps the submitted name and phone into their Sheets fields", () => {
    const form = leadFormSchema.parse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
    });
    const row = mapToGoogleSheetRow(form, routing);
    expect(row.customer_name).toBe("Jane Smith");
    expect(row.phone).toBe("4845550100");
  });

  it("keeps supplied email and ZIP for existing inbound payloads", () => {
    const form = leadFormSchema.parse({
      problemType: "plumbing-leak",
      name: "Jane Smith",
      phone: "4845550100",
      city: "Reading",
      zip: "19601",
      email: "jane@example.com",
      problemDescription: "Kitchen faucet drip under the sink.",
      waterOrSewagePresent: "no",
    });
    const row = mapToGoogleSheetRow(form, routing);
    expect(row.email).toBe("jane@example.com");
    expect(row.zip).toBe("19601");
  });
});

describe("analytics event contract", () => {
  it("keeps the conversion event names stable", () => {
    expect(ANALYTICS_EVENT_NAMES).toEqual([
      "phone_click",
      "text_click",
      "click_request_help",
      "click_partner_website",
      "select_problem_category",
      "form_started",
      "form_submitted",
      "form_error",
      "generate_lead",
    ]);
  });
});

describe("active water elevates routing urgency signals", () => {
  it("scores emergency urgency higher for plumbing with active water", () => {
    const baseline = routeLead({
      serviceRequested: "small plumbing repair",
      problemDescription: "Dripping faucet in kitchen, single fixture only",
      city: "Reading",
      phone: "4845550100",
      urgency: "same-day",
      waterOrSewagePresent: "no",
      defaultRoute: "evan",
    });
    const active = routeLead({
      serviceRequested: "small plumbing repair",
      problemDescription: "Dripping faucet in kitchen, single fixture only",
      city: "Reading",
      phone: "4845550100",
      urgency: resolveUrgency({
        categoryDefault: "same-day",
        waterOrSewagePresent: "yes",
      }),
      waterOrSewagePresent: "yes",
      defaultRoute: "evan",
    });
    expect(active.primaryRoute).toBe("evan");
    expect(active.leadScore).toBeGreaterThan(baseline.leadScore);
    expect(active.suggestedSLA).toBe("Immediate callback");
  });
});

describe("spam protection still intact", () => {
  it("rejects honeypot and too-fast", () => {
    expect(
      checkSpamFields({
        bprHpField: "x",
        formStartedAt: Date.now() - 5000,
      }).reason
    ).toBe("honeypot");
    const now = Date.now();
    expect(
      checkSpamFields({
        formStartedAt: now - (MIN_SUBMIT_MS - 50),
        now,
      }).reason
    ).toBe("too_fast");
  });
});

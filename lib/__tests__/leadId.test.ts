import { describe, expect, it } from "vitest";
import {
  generateLeadId,
  getCustomerReference,
  isLeadId,
  LEAD_ID_PATTERN,
} from "@/lib/leadId";

describe("generateLeadId", () => {
  it("matches BPR-YYYYMMDD-HHMMSS-RAND4 in Eastern Time", () => {
    const id = generateLeadId(new Date("2026-06-21T14:20:00.000Z"));
    expect(id).toMatch(LEAD_ID_PATTERN);
    expect(id.startsWith("BPR-20260621-")).toBe(true);
    expect(isLeadId(id)).toBe(true);
  });

  it("uses a four-digit random suffix", () => {
    const id = generateLeadId(new Date("2026-06-21T14:20:00.000Z"));
    expect(id.split("-").at(-1)).toMatch(/^\d{4}$/);
  });

  it("creates a shorter customer reference without changing the canonical ID", () => {
    expect(getCustomerReference("BPR-20260621-102000-4821")).toBe("BPR-0621-4821");
  });
});

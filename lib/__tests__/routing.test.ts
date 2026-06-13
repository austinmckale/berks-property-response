import { describe, expect, it } from "vitest";
import { routeLead } from "@/lib/routing";
import { evanConfirmedServices } from "@/lib/services";

describe("routeLead", () => {
  it("1. Emergency sewer backup in Reading routes to Apex with high priority", () => {
    const result = routeLead({
      serviceRequested: "emergency sewer backup",
      problemDescription: "Sewage backing up through basement floor drain in Reading",
      city: "Reading",
      urgency: "emergency",
      phone: "6105551234",
      waterOrSewagePresent: "yes",
    });
    expect(result.primaryRoute).toBe("apex");
    expect(result.leadScore).toBeGreaterThanOrEqual(50);
    expect(result.payoutCategory).toBe("Apex emergency sewer lead");
  });

  it("2. Hydro jetting in Birdsboro routes to Apex", () => {
    const result = routeLead({
      serviceRequested: "hydro jetting",
      problemDescription: "Recurring grease clog in main line, Birdsboro PA",
      city: "Birdsboro",
    });
    expect(result.primaryRoute).toBe("apex");
    expect(result.payoutCategory).toBe("Apex hydro jetting lead");
  });

  it("3. Commercial grease line issue routes to Apex", () => {
    const result = routeLead({
      serviceRequested: "commercial drain cleaning",
      problemDescription: "Restaurant grease line backup, floor drain clogged",
      city: "Wyomissing",
    });
    expect(result.primaryRoute).toBe("apex");
    expect(result.payoutCategory).toBe("Apex commercial drain lead");
  });

  it("4. Isolated faucet leak routes to Evan only if leak repair is confirmed", () => {
    const result = routeLead({
      serviceRequested: "faucet repair",
      problemDescription: "Dripping faucet in kitchen, single fixture only",
      city: "Reading",
    });
    if (evanConfirmedServices["faucet repair"]) {
      expect(result.primaryRoute).toBe("evan");
    } else {
      expect(result.primaryRoute).toBe("manual_review");
      expect(result.notesInternal.some((n) => n.includes("CONFIRMATION REQUIRED"))).toBe(true);
    }
  });

  it("5. Running toilet with no other symptoms routes to Evan only if toilet repair is confirmed", () => {
    const result = routeLead({
      serviceRequested: "running toilet",
      problemDescription: "Single toilet runs constantly, no other drains affected",
      city: "Exeter",
    });
    if (evanConfirmedServices["running toilet"]) {
      expect(result.primaryRoute).toBe("evan");
    } else {
      expect(result.primaryRoute).toBe("manual_review");
    }
  });

  it("6. Toilet bubbling and tub backing up routes to Apex", () => {
    const result = routeLead({
      serviceRequested: "drain issue",
      problemDescription: "Toilet bubbling and tub backing up when flushing",
      city: "Reading",
      urgency: "emergency",
    });
    expect(result.primaryRoute).toBe("apex");
  });

  it("7. Water damage to ceiling after pipe leak routes to RHI", () => {
    const result = routeLead({
      serviceRequested: "water damage repair",
      problemDescription: "Ceiling stain and drywall damage after upstairs pipe leak",
      city: "Wyomissing",
    });
    expect(result.primaryRoute).toBe("rhi");
    expect(result.payoutCategory).toBe("RHI water damage repair lead");
  });

  it("8. Drywall and flooring repair after sewer backup routes to RHI", () => {
    const result = routeLead({
      serviceRequested: "repair after backup",
      problemDescription: "Need drywall repair and flooring repair after water damage from sewer backup",
      city: "Sinking Spring",
    });
    expect(result.primaryRoute).toBe("rhi");
  });

  it("9. Broad bathroom remodel routes to manual review", () => {
    const result = routeLead({
      serviceRequested: "bathroom remodel",
      problemDescription: "Want a full bathroom remodel with new tile and vanity",
      city: "Reading",
    });
    expect(result.primaryRoute).toBe("manual_review");
    expect(result.notesInternal.some((n) => n.includes("remodel"))).toBe(true);
  });

  it("10. Unknown plumbing issue routes to manual review", () => {
    const result = routeLead({
      serviceRequested: "plumbing issue",
      problemDescription: "plumbing issue",
      city: "Reading",
    });
    expect(result.primaryRoute).toBe("manual_review");
  });
});

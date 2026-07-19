import { describe, expect, it } from "vitest";
import {
  getStickyCtaConfig,
  isStickyCtaEligible,
  shouldHideStickyBar,
} from "@/lib/stickyCta";

describe("getStickyCtaConfig", () => {
  it("uses Text us / Call on the homepage", () => {
    expect(getStickyCtaConfig("/")).toEqual({
      variant: "hub",
      primaryLabel: "Text us",
      secondaryLabel: "Call",
      primaryAction: "sms",
      secondaryAction: "call",
    });
  });

  it("uses Text us / Call on standard hubs", () => {
    for (const path of [
      "/drains",
      "/plumbing-and-leaks",
      "/after-leak",
      "/property-repairs-berks-county-pa",
    ]) {
      expect(getStickyCtaConfig(path)).toMatchObject({
        primaryLabel: "Text us",
        secondaryLabel: "Call",
        primaryAction: "sms",
        secondaryAction: "call",
      });
    }
  });

  it("uses Text us / Call on standard service pages", () => {
    expect(getStickyCtaConfig("/faucet-repair-berks-county-pa")).toMatchObject({
      variant: "standard",
      primaryLabel: "Text us",
      secondaryLabel: "Call",
      primaryAction: "sms",
      secondaryAction: "call",
    });
  });

  it("uses Text us / Call on city pages", () => {
    expect(getStickyCtaConfig("/service-areas/wyomissing-pa")).toEqual({
      variant: "city",
      primaryLabel: "Text us",
      secondaryLabel: "Call",
      primaryAction: "sms",
      secondaryAction: "call",
    });
  });

  it("preserves Call now / Text photos on emergency pages", () => {
    expect(getStickyCtaConfig("/emergency")).toEqual({
      variant: "emergency",
      primaryLabel: "Call now",
      secondaryLabel: "Text photos",
      primaryAction: "call",
      secondaryAction: "sms",
    });
    expect(getStickyCtaConfig("/emergency-sewer-backup-berks-county-pa")).toMatchObject({
      variant: "emergency",
      primaryLabel: "Call now",
      secondaryLabel: "Text photos",
    });
  });

  it("preserves Get local help / Call on guide pages", () => {
    expect(getStickyCtaConfig("/guides/sewer-backup-checklist")).toEqual({
      variant: "guide",
      primaryLabel: "Get local help",
      secondaryLabel: "Call",
      primaryAction: "request",
      secondaryAction: "call",
    });
  });
});

describe("isStickyCtaEligible", () => {
  it("allows homepage, hubs, services, cities, guides, and emergency pages", () => {
    expect(isStickyCtaEligible("/")).toBe(true);
    expect(isStickyCtaEligible("/drains")).toBe(true);
    expect(isStickyCtaEligible("/faucet-repair-berks-county-pa")).toBe(true);
    expect(isStickyCtaEligible("/service-areas/reading-pa")).toBe(true);
    expect(isStickyCtaEligible("/guides/example")).toBe(true);
    expect(isStickyCtaEligible("/emergency")).toBe(true);
  });

  it("keeps /request-help ineligible", () => {
    expect(isStickyCtaEligible("/request-help")).toBe(false);
  });
});

describe("shouldHideStickyBar", () => {
  const visibleState = {
    menuOpen: false,
    isEligible: true,
    pastMarker: true,
    formFocused: false,
    formInView: false,
  };

  it("shows the bar when eligible and no blocking UI state is active", () => {
    expect(shouldHideStickyBar(visibleState)).toBe(false);
  });

  it("hides when the menu is open", () => {
    expect(shouldHideStickyBar({ ...visibleState, menuOpen: true })).toBe(true);
  });

  it("hides when the page is ineligible", () => {
    expect(shouldHideStickyBar({ ...visibleState, isEligible: false })).toBe(true);
  });

  it("hides before the marker is passed", () => {
    expect(shouldHideStickyBar({ ...visibleState, pastMarker: false })).toBe(true);
  });

  it("hides when a form field is focused", () => {
    expect(shouldHideStickyBar({ ...visibleState, formFocused: true })).toBe(true);
  });

  it("hides when the form is visible in the viewport", () => {
    expect(shouldHideStickyBar({ ...visibleState, formInView: true })).toBe(true);
  });
});

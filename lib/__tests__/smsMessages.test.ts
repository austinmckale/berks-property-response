import { describe, expect, it } from "vitest";
import { getStickySmsMessage } from "@/lib/smsMessages";

describe("getStickySmsMessage", () => {
  it("uses the homepage/default message on /", () => {
    expect(getStickySmsMessage("/")).toBe(
      "Hi, I'm contacting Berks Property Response from the website. I need help with a property issue in Berks County. Here's what's happening: "
    );
  });

  it("uses drain and sewer copy on hub and service pages", () => {
    expect(getStickySmsMessage("/drains")).toContain("drain or sewer problem");
    expect(getStickySmsMessage("/drain-cleaning-berks-county-pa")).toContain(
      "drain or sewer problem"
    );
    expect(getStickySmsMessage("/hydro-jetting-berks-county-pa")).toContain(
      "drain or sewer problem"
    );
  });

  it("uses plumbing copy on plumbing hub and service pages", () => {
    expect(getStickySmsMessage("/plumbing-and-leaks")).toContain(
      "plumbing leak or fixture problem"
    );
    expect(getStickySmsMessage("/leak-repair-berks-county-pa")).toContain(
      "plumbing leak or fixture problem"
    );
  });

  it("uses after-leak and repair copy on repair pages", () => {
    expect(getStickySmsMessage("/after-leak")).toContain(
      "leak or backup is stopped"
    );
    expect(getStickySmsMessage("/property-repairs-berks-county-pa")).toContain(
      "leak or backup is stopped"
    );
    expect(getStickySmsMessage("/water-damage-repair-after-leak-berks-county-pa")).toContain(
      "leak or backup is stopped"
    );
  });

  it("uses emergency copy on emergency pages", () => {
    expect(getStickySmsMessage("/emergency")).toContain("active water or sewage");
    expect(getStickySmsMessage("/emergency-sewer-backup-berks-county-pa")).toContain(
      "active water or sewage"
    );
  });

  it("includes city name from city data on service area pages", () => {
    expect(getStickySmsMessage("/service-areas/west-reading-pa")).toBe(
      "Hi, I need help with a property issue in West Reading, PA. Here's what's happening: "
    );
  });

  it("falls back to default when city slug is unknown", () => {
    expect(getStickySmsMessage("/service-areas/unknown-pa")).toContain(
      "contacting Berks Property Response from the website"
    );
  });

  it("ends with a trailing space after the colon", () => {
    expect(getStickySmsMessage("/")).toMatch(/: $/);
    expect(getStickySmsMessage("/service-areas/reading-pa")).toMatch(/: $/);
  });
});

export const SITE_NAME = "Berks Property Response";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://berkspropertyresponse.com";

/**
 * Call tracking number shown site-wide (Call Now, footer, emergency banners).
 *
 * Before launch: set NEXT_PUBLIC_PHONE in .env.local to your final CallRail,
 * WhatConverts, or Google Voice tracking number. The fallback below is a
 * PLACEHOLDER — not a verified production tracking line.
 */
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE ?? "(484) 525-0459"; // PLACEHOLDER

/**
 * SMS / "Text photos" number. Defaults to PHONE_NUMBER so call and text use
 * the same tracking line unless you set NEXT_PUBLIC_TEXT_NUMBER separately.
 */
export const TEXT_NUMBER =
  process.env.NEXT_PUBLIC_TEXT_NUMBER ?? PHONE_NUMBER;
export const TAGLINE =
  "Local help for plumbing, drains, water damage, and property repairs in Berks County.";
export const SITE_SUBTITLE =
  "Plumbing, drains, and repair help in Berks County";

/** Primary nav — short labels, human-first */
export const NAV_LINKS = [
  { href: "/emergency", label: "Emergency Help" },
  { href: "/drains", label: "Drains & jetting" },
  { href: "/plumbing-and-leaks", label: "Plumbing & leaks" },
  { href: "/after-leak", label: "After a leak" },
  { href: "/service-areas", label: "Areas" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { href: "/emergency-sewer-backup-berks-county-pa", label: "Sewer backup help" },
  { href: "/hydro-jetting-berks-county-pa", label: "Hydro jetting" },
  { href: "/drain-cleaning-berks-county-pa", label: "Drain cleaning" },
  {
    href: "/water-damage-repair-after-leak-berks-county-pa",
    label: "Repair after a leak",
  },
  {
    href: "/property-repairs-berks-county-pa",
    label: "Property repairs",
  },
  { href: "/request-help", label: "Request help" },
] as const;

export const FOOTER_ABOUT_LINKS = [
  { href: "/how-it-works", label: "How this site works" },
  { href: "/local-partners", label: "Local partners" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const HOME_STEPS = [
  {
    title: "Tell us what happened",
    body: "Call, text a photo, or submit a short description of the problem.",
  },
  {
    title: "We connect you with local help",
    body: "Based on your issue, we point you to an independent local specialist in Berks County who handles that type of work.",
  },
  {
    title: "The provider takes it from there",
    body: "The local company contacts you and performs the work. Berks Property Response does not do the repair itself.",
  },
] as const;

export const SERVICE_AREA_PREVIEW = [
  "Reading",
  "Wyomissing",
  "Birdsboro",
  "Exeter",
  "Sinking Spring",
  "Douglassville",
] as const;

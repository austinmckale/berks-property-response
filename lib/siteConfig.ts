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
  "Local intake and matching for drain backups, plumbing leaks, water damage, repair work, and urgent property issues across Berks County.";

export const SITE_SUBTITLE =
  "Local intake and routing for Berks County homeowners — drains, plumbing, water damage, and property repair help.";

/** Primary header nav */
export const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/emergency", label: "Emergency Help" },
  { href: "/drains", label: "Drain & Sewer" },
  { href: "/plumbing-and-leaks", label: "Plumbing & Leaks" },
  { href: "/after-leak", label: "Water Damage & Repairs" },
] as const;

/** Secondary links — hamburger menu */
export const MORE_NAV_LINKS = [
  { href: "/storm-fire-mold-help", label: "Storm / Fire / Mold" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/how-it-works", label: "How It Works" },
] as const;

export const REQUEST_HELP_LINK = { href: "/request-help", label: "Request Help" } as const;

/** @deprecated Use HEADER_NAV_LINKS + MORE_NAV_LINKS */
export const NAV_LINKS = [...HEADER_NAV_LINKS, ...MORE_NAV_LINKS] as const;

export const FOOTER_SERVICE_LINKS = [
  { href: "/emergency-sewer-backup-berks-county-pa", label: "Sewer backup help" },
  { href: "/hydro-jetting-berks-county-pa", label: "Hydro jetting" },
  { href: "/drain-cleaning-berks-county-pa", label: "Drain cleaning" },
  { href: "/leak-repair-berks-county-pa", label: "Leak repair" },
  { href: "/toilet-repair-berks-county-pa", label: "Toilet repair" },
  {
    href: "/water-damage-repair-after-leak-berks-county-pa",
    label: "Water damage repair",
  },
  { href: "/storm-fire-mold-help", label: "Storm / fire / mold help" },
  { href: "/request-help", label: "Start a request" },
] as const;

export const FOOTER_ABOUT_LINKS = [
  { href: "/request-help", label: "Request Help" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/local-partners", label: "Local Provider Network" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

export const HOME_STEPS = [
  {
    title: "Tell us what's going on",
    body: "Call, text a photo, or send a short request — drain backup, leak, water damage, or another property issue in Berks County.",
  },
  {
    title: "We review your request",
    body: "Berks Property Response reviews the details and connects you with local help suited to that type of job.",
  },
  {
    title: "Someone local reaches out",
    body: "A local company contacts you about availability and next steps. They perform the work and handle pricing, scheduling, and warranties. Berks Property Response does not perform the work directly.",
  },
] as const;

export const SERVICE_CLUSTERS = [
  {
    title: "Drain & Sewer Response",
    href: "/drains",
    description: "Sewer backups, floor drain overflow, main line clogs, hydro jetting, and urgent drain issues.",
  },
  {
    title: "Plumbing Leak Help",
    href: "/plumbing-and-leaks",
    description: "Fixture leaks, running toilets, faucets, supply lines, and smaller non-main-line plumbing calls.",
  },
  {
    title: "Water Damage & Build-Back",
    href: "/after-leak",
    description: "Drywall, flooring, ceilings, paint, and repair after a leak or backup once the source is stopped.",
  },
  {
    title: "Storm / Fire / Mold / Major Issues",
    href: "/storm-fire-mold-help",
    description: "Major property issues — we review whether a suitable local provider connection exists.",
  },
] as const;

export const SERVICE_AREA_PREVIEW = [
  "Reading",
  "Wyomissing",
  "West Reading",
  "Birdsboro",
  "Exeter",
  "Sinking Spring",
  "Douglassville",
  "Kutztown",
  "Shillington",
  "Fleetwood",
] as const;

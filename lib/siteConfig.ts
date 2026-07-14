import { DEFAULT_DEV_PHONE } from "./env";

export const SITE_NAME = "Berks Property Response";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://berkspropertyresponse.com";

/**
 * Call number shown site-wide.
 * Defaults to the confirmed BPR Google Voice number.
 * Optional NEXT_PUBLIC_PHONE override for future tracking numbers.
 */
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE?.trim() || DEFAULT_DEV_PHONE;

/**
 * SMS / "Text photos" number.
 * Defaults to PHONE_NUMBER unless NEXT_PUBLIC_TEXT_NUMBER is set.
 */
export const TEXT_NUMBER =
  process.env.NEXT_PUBLIC_TEXT_NUMBER?.trim() || PHONE_NUMBER;

/** Optional public contact email — only show when configured */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

export const TAGLINE =
  "One local contact for drain, plumbing, and water-damage problems across Berks County.";

export const SITE_SUBTITLE =
  "Local property-response coordination for Berks County — drains, plumbing, water damage, and related repairs.";

/** Primary header nav */
export const HEADER_NAV_LINKS = [
  { href: "/emergency", label: "Emergency help" },
  { href: "/drains", label: "Drain & sewer" },
  { href: "/plumbing-and-leaks", label: "Plumbing & leaks" },
  { href: "/after-leak", label: "After a leak" },
] as const;

/** Secondary links — hamburger menu */
export const MORE_NAV_LINKS = [
  { href: "/service-areas", label: "Service areas" },
  { href: "/how-it-works", label: "How it works" },
] as const;

export const REQUEST_HELP_LINK = { href: "/request-help", label: "Start a request" } as const;

/** @deprecated Use HEADER_NAV_LINKS + MORE_NAV_LINKS */
export const NAV_LINKS = [...HEADER_NAV_LINKS, ...MORE_NAV_LINKS] as const;

/** How It Works */
export const HOME_STEPS = [
  {
    title: "Tell us what happened",
    body: "Call, text, email, or send a short request.",
  },
  {
    title: "We identify the right type of local help",
    body: "Austin uses the location, problem type, urgency, and details to identify the next step.",
  },
  {
    title: "The provider follows up about the job",
    body: "The provider may contact you about availability, diagnosis, pricing, scheduling, and the work.",
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
    description: "Storm, fire, smoke, mold, and other major property concerns.",
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

export const SITE_NAME = "Berks Property Response";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://berkspropertyresponse.com";
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE ?? "(484) 525-0459";
export const TEXT_NUMBER =
  process.env.NEXT_PUBLIC_TEXT_NUMBER ?? PHONE_NUMBER;
export const TAGLINE =
  "Local help for plumbing, drains, water damage, and property repairs in Berks County.";

export const NAV_LINKS = [
  { href: "/emergency-sewer-backup-berks-county-pa", label: "Plumbing & Leaks" },
  { href: "/drain-cleaning-berks-county-pa", label: "Drains & Sewer" },
  { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water Damage Repairs" },
  { href: "/property-repairs-berks-county-pa", label: "Property Repairs" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/request-help", label: "Request Help" },
] as const;

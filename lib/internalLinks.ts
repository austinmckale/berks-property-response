/** Shared footer and cross-link groups */

export const footerServiceLinks = [
  { href: "/drains", label: "Drain and sewer" },
  { href: "/plumbing-and-leaks", label: "Plumbing and leaks" },
  { href: "/after-leak", label: "Repair after a leak" },
  { href: "/storm-fire-mold-help", label: "Other serious property issues" },
] as const;

export const footerPopularProblems = [
  {
    href: "/emergency-sewer-backup-berks-county-pa",
    label: "Sewer backup",
  },
  {
    href: "/main-sewer-line-clog-reading-pa",
    label: "Main-line clog",
  },
  {
    href: "/basement-floor-drain-backing-up-berks-county-pa",
    label: "Floor-drain backup",
  },
  { href: "/leak-repair-berks-county-pa", label: "Fixture leak" },
  {
    href: "/ceiling-repair-from-plumbing-leak-berks-county-pa",
    label: "Ceiling or drywall damage",
  },
] as const;

export const footerLocalLinks = [
  { href: "/service-areas", label: "Service areas" },
  { href: "/service-areas/reading-pa", label: "Reading, PA" },
  { href: "/service-areas/wyomissing-pa", label: "Wyomissing, PA" },
  { href: "/service-areas/birdsboro-pa", label: "Birdsboro, PA" },
] as const;

export const footerInfoLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/local-partners", label: "Local partners" },
  { href: "/contact", label: "Contact" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

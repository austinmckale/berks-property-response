import type { ProblemTypeId } from "./problemTypes";

export const triageCards = [
  {
    title: "Drain or sewer problem",
    description: "Backup, slow drains, main line, or sewage at a floor drain.",
    href: "/emergency",
    problem: "drain-emergency" as ProblemTypeId,
    icon: "drain",
    cta: "Start here",
  },
  {
    title: "Plumbing leak or fixture problem",
    description: "Toilet, faucet, supply line, or leak at one fixture.",
    href: "/plumbing-and-leaks",
    problem: "plumbing-leak" as ProblemTypeId,
    icon: "plumbing",
    cta: "Start here",
  },
  {
    title: "Repair after water damage",
    description: "Drywall, flooring, ceiling, or build-back after a leak.",
    href: "/after-leak",
    problem: "water-damage" as ProblemTypeId,
    icon: "water-damage",
    cta: "Start here",
  },
  {
    title: "Storm, fire, mold, or major property issue",
    description: "Tell us what happened — we review whether a connection is available.",
    href: "/storm-fire-mold-help",
    problem: "major-property" as ProblemTypeId,
    icon: "major",
    cta: "Send details",
  },
] as const;

export const symptomCards = [
  {
    id: "sewer-backing-up",
    title: "Sewer backing up",
    description: "Waste or dirty water coming up through drains.",
    href: "/emergency-sewer-backup-berks-county-pa",
  },
  {
    id: "toilet-bubbling",
    title: "Toilet bubbling or overflowing",
    description: "Gurgling toilet or overflow when other fixtures run.",
    href: "/main-sewer-line-clog-reading-pa",
  },
  {
    id: "basement-floor-drain",
    title: "Basement floor drain backing up",
    description: "Water or sewage at a basement floor drain.",
    href: "/basement-floor-drain-backing-up-berks-county-pa",
  },
  {
    id: "slow-drains",
    title: "Slow or clogged drains",
    description: "Single or recurring fixture clogs.",
    href: "/drain-cleaning-berks-county-pa",
  },
  {
    id: "leak-under-sink",
    title: "Leak under sink",
    description: "Active drip or puddle at a single fixture.",
    href: "/leak-repair-berks-county-pa",
  },
  {
    id: "water-damage-visible",
    title: "Water damage to ceiling, wall, or floor",
    description: "Stains, swelling, or saturated materials after a leak.",
    href: "/water-damage-repair-after-leak-berks-county-pa",
  },
  {
    id: "drywall-flooring-repair",
    title: "Drywall or flooring repair after a leak",
    description: "Build-back repair after plumbing or backup event.",
    href: "/drywall-repair-after-plumbing-leak-berks-county-pa",
  },
];

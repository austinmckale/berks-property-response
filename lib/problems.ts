import type { ProblemTypeId } from "./problemTypes";

export const triageCards = [
  {
    title: "Sewage or several drains backing up",
    description: "Dirty water, floor-drain overflow, or toilets and tubs backing up together.",
    href: "/emergency",
    problem: "drain-emergency" as ProblemTypeId,
    icon: "drain",
    cta: "Choose this",
  },
  {
    title: "One slow or clogged drain",
    description: "One sink, tub, shower, or toilet is slow or keeps clogging.",
    href: "/drains",
    problem: "drain-clog" as ProblemTypeId,
    icon: "drain",
    cta: "Choose this",
  },
  {
    title: "Leak at a fixture",
    description: "A pipe, faucet, toilet, supply line, or under-sink leak.",
    href: "/plumbing-and-leaks",
    problem: "plumbing-leak" as ProblemTypeId,
    icon: "plumbing",
    cta: "Choose this",
  },
  {
    title: "Damage after the water stopped",
    description: "Drywall, ceiling, flooring, trim, or paint needs repair.",
    href: "/after-leak",
    problem: "water-damage" as ProblemTypeId,
    icon: "water-damage",
    cta: "Choose this",
  },
  {
    title: "Other serious property damage",
    description: "Storm, fire, suspected mold, roof leak, or something else.",
    href: "/storm-fire-mold-help",
    problem: "major-property" as ProblemTypeId,
    icon: "major",
    cta: "Tell us more",
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

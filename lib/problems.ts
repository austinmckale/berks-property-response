export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  href: string;
}

export const triageCards = [
  {
    title: "Drain or sewer emergency",
    description: "Sewage backup, multiple drains clogged, or basement floor drain overflow.",
    href: "/emergency",
    icon: "drain",
  },
  {
    title: "Small plumbing leak or repair",
    description: "Fixture-level leaks, faucets, or isolated toilet issues.",
    href: "/plumbing-and-leaks",
    icon: "plumbing",
  },
  {
    title: "Water damage after a leak or backup",
    description: "Drywall, flooring, ceiling, or cabinet damage after the source is stopped.",
    href: "/after-leak",
    icon: "water-damage",
  },
  {
    title: "Property repair after damage",
    description: "Contractor-level build-back after plumbing or water events.",
    href: "/property-repairs-berks-county-pa",
    icon: "property-repair",
  },
] as const;

export const symptomCards: ProblemCard[] = [
  {
    id: "sewer-backing-up",
    title: "Sewer backing up",
    description: "Waste or dirty water coming up through drains.",
    href: "/emergency",
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
    href: "/emergency",
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
    href: "/after-leak",
  },
  {
    id: "drywall-flooring-repair",
    title: "Need drywall/flooring repaired after leak",
    description: "Build-back repair after plumbing or backup event.",
    href: "/after-leak",
  },
];

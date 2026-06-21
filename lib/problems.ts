export const triageCards = [
  {
    title: "Emergency drain or sewer backup",
    description: "Sewage, multiple drains clogged, floor drain overflow, or main line symptoms.",
    href: "/emergency",
    icon: "drain",
    cta: "Need drain or sewer help?",
  },
  {
    title: "Small plumbing leak or fixture issue",
    description: "Toilet, faucet, supply line, shutoff valve, or isolated fixture repair.",
    href: "/plumbing-and-leaks",
    icon: "plumbing",
    cta: "Request plumbing leak help",
  },
  {
    title: "Water damage or repair / build-back",
    description: "Drywall, flooring, ceiling, paint, or property repair after the source is stopped.",
    href: "/after-leak",
    icon: "water-damage",
    cta: "Request water damage repair help",
  },
  {
    title: "Storm, fire, mold, or other major issue",
    description: "We review whether a suitable local provider connection exists — not a guaranteed direct service.",
    href: "/storm-fire-mold-help",
    icon: "major",
    cta: "Tell us what's going on",
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

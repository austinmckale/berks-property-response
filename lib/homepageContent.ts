import { symptomCards } from "./problems";
import { providers } from "./providers";
import { getPublishedGuides } from "./guides";

export const serviceLanes = [
  {
    href: "/drains",
    title: "Drain and sewer",
    description:
      "Sewer backups, main-line clogs, slow drains, hydro jetting, and commercial drain work.",
  },
  {
    href: "/plumbing-and-leaks",
    title: "Fixture plumbing",
    description:
      "Leaks, faucets, toilets, shutoff valves, water heaters, and smaller residential repairs.",
  },
  {
    href: "/after-leak",
    title: "Repair after a leak or backup",
    description:
      "Drywall, ceilings, flooring, paint, and build-back after the water source is controlled.",
  },
] as const;

/** Priority problem links for homepage browse section */
export const homepageProblemLinks = [
  symptomCards.find((c) => c.id === "sewer-backing-up")!,
  symptomCards.find((c) => c.id === "toilet-bubbling")!,
  symptomCards.find((c) => c.id === "basement-floor-drain")!,
  symptomCards.find((c) => c.id === "slow-drains")!,
  symptomCards.find((c) => c.id === "leak-under-sink")!,
  {
    id: "water-heater",
    title: "Water-heater problem",
    description: "No hot water, leaks, or concerns at the water heater.",
    href: "/small-plumbing-repairs-berks-county-pa",
  },
  {
    id: "ceiling-damage",
    title: "Ceiling or drywall damage after a leak",
    description: "Stains, soft drywall, or finish damage once the leak is stopped.",
    href: "/ceiling-repair-from-plumbing-leak-berks-county-pa",
  },
  {
    id: "flooring-basement",
    title: "Flooring or basement repair after water damage",
    description: "Buckled floors, wet carpet, or basement finishes after a backup.",
    href: "/flooring-repair-after-water-damage-berks-county-pa",
  },
];

export const homepageProviderLanes = [
  providers.apex,
  providers.evan,
  providers.rhi,
] as const;

export const homepagePriorityCities = [
  { slug: "reading-pa", name: "Reading" },
  { slug: "wyomissing-pa", name: "Wyomissing" },
  { slug: "birdsboro-pa", name: "Birdsboro" },
  { slug: "exeter-pa", name: "Exeter" },
] as const;

export const homepageFaqs = [
  {
    question: "Do I need a plumber or a drain specialist?",
    answer:
      "One slow fixture may be a fixture or single-drain issue. Sewage, floor-drain overflow, or several fixtures backing up together usually point to a drain or main sewer-line problem instead of isolated plumbing.",
  },
  {
    question: "What if water or sewage is active right now?",
    answer:
      "Stop using water if several fixtures are affected or sewage is present. Call for urgent drain or plumbing help, then send photos if you can do so safely.",
  },
  {
    question: "Who repairs the drywall or flooring after the leak is stopped?",
    answer:
      "Build-back repair—drywall, ceilings, flooring, and similar finish work—routes separately after the active leak or backup is controlled.",
  },
] as const;

export { getPublishedGuides };

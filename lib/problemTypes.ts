import type { urgencyLevels } from "./formSchema";

export type ProblemTypeId =
  | "drain-emergency"
  | "drain-clog"
  | "plumbing-leak"
  | "water-damage"
  | "major-property";

export interface ProblemTypeOption {
  id: ProblemTypeId;
  title: string;
  description: string;
  urgency: (typeof urgencyLevels)[number];
  serviceCategory: string;
  defaultService: string;
  defaultRoute: string;
}

export const problemTypeOptions: ProblemTypeOption[] = [
  {
    id: "drain-emergency",
    title: "Backup or sewer emergency",
    description: "Sewage, multiple drains, or floor drain overflow",
    urgency: "emergency",
    serviceCategory: "drain_sewer",
    defaultService: "sewer backup",
    defaultRoute: "apex",
  },
  {
    id: "drain-clog",
    title: "Slow or clogged drain",
    description: "Sink, tub, toilet, or recurring clog",
    urgency: "same-day",
    serviceCategory: "drain_sewer",
    defaultService: "drain cleaning",
    defaultRoute: "apex",
  },
  {
    id: "plumbing-leak",
    title: "Leak or plumbing issue",
    description: "Drip, running toilet, faucet, or fixture",
    urgency: "same-day",
    serviceCategory: "plumbing",
    defaultService: "small plumbing repair",
    defaultRoute: "evan",
  },
  {
    id: "water-damage",
    title: "Damage after leak or backup",
    description: "Drywall, flooring, ceiling, or build-back repair",
    urgency: "this-week",
    serviceCategory: "water_damage",
    defaultService: "water damage repair",
    defaultRoute: "rhi",
  },
  {
    id: "major-property",
    title: "Storm, fire, mold, or major property issue",
    description: "We review for a suitable provider connection",
    urgency: "same-day",
    serviceCategory: "major_property",
    defaultService: "major property issue review",
    defaultRoute: "manual_review",
  },
];

export function getProblemType(id: ProblemTypeId): ProblemTypeOption {
  return problemTypeOptions.find((p) => p.id === id) ?? problemTypeOptions[0];
}

/** Pre-select step 1 when the form is embedded on a service page */
export function inferProblemTypeFromContext(params: {
  serviceCategory?: string;
  defaultRoute?: string;
  slug?: string;
}): ProblemTypeId | undefined {
  if (params.serviceCategory === "major_property") return "major-property";
  if (params.serviceCategory === "water_damage") return "water-damage";
  if (params.defaultRoute === "evan" || params.serviceCategory === "plumbing") {
    return "plumbing-leak";
  }
  const slug = params.slug ?? "";
  if (
    slug.includes("emergency") ||
    slug.includes("sewer-backup") ||
    slug.includes("main-sewer")
  ) {
    return "drain-emergency";
  }
  if (params.serviceCategory === "drain_sewer" || params.defaultRoute === "apex") {
    return "drain-clog";
  }
  return undefined;
}

export type ProviderId = "apex" | "evan" | "rhi" | "manual_review";

export interface VerifiedClaims {
  licensed: boolean;
  insured: boolean;
  emergency24_7: boolean;
  sameDay: boolean;
  freeEstimate: boolean;
  yearsInBusiness: boolean;
  veteranOwned: boolean;
  familyOwned: boolean;
  guaranteed: boolean;
}

export interface Provider {
  id: ProviderId;
  name: string;
  confirmed: boolean | "partial";
  type: string;
  description: string;
  website?: string;
  defaultRoutes: string[];
  verifiedClaims: VerifiedClaims;
  actionItems?: string[];
}

export const providers: Record<Exclude<ProviderId, "manual_review">, Provider> = {
  apex: {
    id: "apex",
    name: "Apex Drain Services",
    confirmed: true,
    type: "drain and sewer provider",
    description:
      "Routes emergency drain service, sewer backups, main line clogs, hydro jetting, sewer camera inspection, and commercial drain cleaning in Berks County.",
    defaultRoutes: [
      "emergency drain service",
      "sewer backup",
      "main line clog",
      "hydro jetting",
      "sewer camera inspection",
      "commercial drain cleaning",
    ],
    verifiedClaims: {
      licensed: false,
      insured: false,
      emergency24_7: false,
      sameDay: false,
      freeEstimate: false,
      yearsInBusiness: false,
      veteranOwned: false,
      familyOwned: false,
      guaranteed: false,
    },
  },
  evan: {
    id: "evan",
    name: "Evan Simons",
    confirmed: true,
    type: "solo plumber",
    description:
      "Routes smaller residential plumbing service calls such as leaks, faucet issues, running toilets, shutoff valves, and fixture-level repairs. Larger drain, sewer, jetting, and multi-fixture backup issues route to Apex. Water-damage build-back routes to RHI Pros.",
    defaultRoutes: [
      "leak repair",
      "faucet repair",
      "toilet repair",
      "running toilet",
      "shutoff valve",
      "small plumbing repair",
      "fixture repair",
    ],
    verifiedClaims: {
      licensed: false,
      insured: false,
      emergency24_7: false,
      sameDay: false,
      freeEstimate: false,
      yearsInBusiness: false,
      veteranOwned: false,
      familyOwned: false,
      guaranteed: false,
    },
  },
  rhi: {
    id: "rhi",
    name: "RHI Pros",
    confirmed: true,
    type: "contractor/restoration/build-back provider",
    description:
      "Routes water damage repair, drywall, flooring, ceiling, trim, and property repairs after plumbing, drain, or water events. Broader remodeling lives at RHIpros.com.",
    website: "https://rhipros.com",
    defaultRoutes: [
      "water damage repair",
      "drywall repair after leak",
      "flooring repair after water damage",
      "property repair after leak",
    ],
    verifiedClaims: {
      licensed: false,
      insured: false,
      emergency24_7: false,
      sameDay: false,
      freeEstimate: false,
      yearsInBusiness: false,
      veteranOwned: false,
      familyOwned: false,
      guaranteed: false,
    },
  },
};

export function getProvider(id: ProviderId): Provider | null {
  if (id === "manual_review") return null;
  return providers[id];
}

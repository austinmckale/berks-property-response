export type ProviderId = "apex" | "evan" | "rhi" | "manual_review";

/** Owner-verified only — never treat unverified as a public denial. */
export type VerificationStatus = "verified" | "unverified" | "not_applicable";

export interface VerifiedClaims {
  licensed: VerificationStatus;
  insured: VerificationStatus;
  emergency24_7: VerificationStatus;
  sameDay: VerificationStatus;
  freeEstimate: VerificationStatus;
  yearsInBusiness: VerificationStatus;
  veteranOwned: VerificationStatus;
  familyOwned: VerificationStatus;
  guaranteed: VerificationStatus;
}

const DEFAULT_UNVERIFIED_CLAIMS: VerifiedClaims = {
  licensed: "unverified",
  insured: "unverified",
  emergency24_7: "unverified",
  sameDay: "unverified",
  freeEstimate: "unverified",
  yearsInBusiness: "unverified",
  veteranOwned: "not_applicable",
  familyOwned: "not_applicable",
  guaranteed: "unverified",
};

export function isClaimVerified(
  provider: Provider,
  claim: keyof VerifiedClaims
): boolean {
  return provider.verifiedClaims[claim] === "verified";
}

/** True only when both license and insurance are owner-verified. */
export function showsLicensedInsuredBadge(provider: Provider): boolean {
  return (
    isClaimVerified(provider, "licensed") && isClaimVerified(provider, "insured")
  );
}

export interface Provider {
  id: ProviderId;
  contactPerson?: string;
  businessName?: string;
  publicDisplayName: string;
  confirmed: boolean | "partial";
  type: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  serviceArea?: string;
  logoImage?: string;
  cardImage?: string;
  serviceCategories: string[];
  doesNotHandle: string;
  serviceLinks: { href: string; label: string }[];
  defaultRoutes: string[];
  verifiedClaims: VerifiedClaims;
  actionItems?: string[];
}

export const providers: Record<Exclude<ProviderId, "manual_review">, Provider> = {
  apex: {
    id: "apex",
    businessName: "Apex Drain Services",
    publicDisplayName: "Apex Drain Services",
    confirmed: true,
    type: "drain and sewer provider",
    description:
      "Handles drain cleaning, sewer backups, main-line clogs, hydro jetting, sewer-camera inspections, and commercial drain work.",
    serviceArea: "Berks County, PA",
    serviceCategories: [
      "Drain cleaning",
      "Sewer backups and main-line clogs",
      "Hydro jetting and sewer-camera inspections",
      "Commercial drain work",
    ],
    doesNotHandle:
      "Fixture plumbing repairs or drywall, flooring, and other build-back work.",
    serviceLinks: [
      { href: "/drains", label: "Drain and sewer help" },
      {
        href: "/emergency-sewer-backup-berks-county-pa",
        label: "Emergency sewer backup",
      },
      {
        href: "/commercial-drain-cleaning-berks-county-pa",
        label: "Commercial drain cleaning",
      },
    ],
    defaultRoutes: [
      "emergency drain service",
      "sewer backup",
      "main line clog",
      "hydro jetting",
      "sewer camera inspection",
      "commercial drain cleaning",
    ],
    verifiedClaims: { ...DEFAULT_UNVERIFIED_CLAIMS },
  },
  evan: {
    id: "evan",
    contactPerson: "Evan",
    // TODO(owner): Confirm the final legal/public company name before replacing this fallback.
    // Repository references conflict between Ridge Line and Ridge View, so neither is public.
    publicDisplayName: "Local Plumbing Provider",
    confirmed: "partial",
    type: "residential plumbing provider",
    description:
      "Handles smaller residential plumbing calls such as fixture leaks, faucets, toilets, shutoff valves, water heaters, and other fixture-level repairs.",
    serviceArea: "Fleetwood, PA and Berks County",
    phone: "610-858-5878",
    email: "ridgeviewplumbing@gmail.com",
    serviceCategories: [
      "Fixture leaks",
      "Faucets and toilets",
      "Shutoff valves",
      "Water heaters and smaller residential plumbing repairs",
    ],
    doesNotHandle:
      "Main sewer-line clogs, multi-fixture backups, drain emergencies, or post-leak build-back.",
    serviceLinks: [
      { href: "/plumbing-and-leaks", label: "Plumbing and leak help" },
      { href: "/leak-repair-berks-county-pa", label: "Fixture leak repair" },
      {
        href: "/small-plumbing-repairs-berks-county-pa",
        label: "Small plumbing repairs",
      },
    ],
    defaultRoutes: [
      "leak repair",
      "faucet repair",
      "toilet repair",
      "running toilet",
      "shutoff valve",
      "water heater",
      "small plumbing repair",
      "fixture repair",
    ],
    verifiedClaims: { ...DEFAULT_UNVERIFIED_CLAIMS },
  },
  rhi: {
    id: "rhi",
    businessName: "RHI Pros",
    publicDisplayName: "RHI Pros",
    confirmed: true,
    type: "contractor/restoration/build-back provider",
    description:
      "Handles drywall, ceiling, flooring, painting, demolition, and build-back after plumbing, drain, or water events.",
    website:
      "https://www.rhipros.com/?utm_source=berkspropertyresponse&utm_medium=referral&utm_campaign=local_partners",
    phone: "(484) 706-9229",
    email: "quotes@rhipros.com",
    logoImage: "/images/rhi-pros-logo.png",
    serviceCategories: [
      "Drywall and ceiling repair",
      "Flooring and painting",
      "Demolition",
      "Build-back after plumbing or water events",
    ],
    doesNotHandle:
      "Active plumbing leaks, drain clearing, or sewer-line service before the source is controlled.",
    serviceLinks: [
      { href: "/after-leak", label: "Repair after a leak or backup" },
      {
        href: "/drywall-repair-after-plumbing-leak-berks-county-pa",
        label: "Drywall repair after a leak",
      },
      {
        href: "/flooring-repair-after-water-damage-berks-county-pa",
        label: "Flooring repair after water damage",
      },
    ],
    defaultRoutes: [
      "water damage repair",
      "drywall repair after leak",
      "flooring repair after water damage",
      "property repair after leak",
    ],
    verifiedClaims: { ...DEFAULT_UNVERIFIED_CLAIMS },
  },
};

export function getProvider(id: ProviderId): Provider | null {
  if (id === "manual_review") return null;
  return providers[id];
}

export function getPublicProviderName(id: ProviderId): string {
  return getProvider(id)?.publicDisplayName ?? "Provider pending review";
}

/** Schema should identify a real organization, not a generic public fallback. */
export function hasVerifiedProviderIdentity(
  provider: Provider
): provider is Provider & { businessName: string } {
  return Boolean(provider.businessName?.trim());
}

import type { ProviderId } from "./providers";
import { evanConfirmedServices } from "./services";
import { isFirstWaveCity } from "./cities";

export interface LeadInput {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  zip?: string;
  streetAddress?: string;
  propertyType?: string;
  serviceRequested?: string;
  urgency?: string;
  fixturesAffected?: string;
  waterOrSewagePresent?: string;
  problemDescription?: string;
  photoUploaded?: boolean;
  landingPage?: string;
  pageType?: string;
  serviceCategory?: string;
  defaultRoute?: string;
}

export interface RouteResult {
  leadId: string;
  primaryRoute: ProviderId;
  secondaryRoute: ProviderId | null;
  leadScore: number;
  qualifiedStatus: "qualified" | "needs_review" | "unqualified";
  suggestedSLA: string;
  serviceCategory: string;
  payoutCategory: string;
  notesInternal: string[];
}

const APEX_KEYWORDS = [
  "drain cleaning",
  "clogged drain",
  "sewer backup",
  "main line clog",
  "hydro jetting",
  "hydro-jetting",
  "sewer camera inspection",
  "drain camera",
  "grease line",
  "grease trap",
  "commercial drain",
  "multi-fixture backup",
  "basement floor drain backup",
  "sewage backup",
  "toilet bubbling with multiple drains affected",
  "toilet backs up into tub or shower",
  "sewer backing up",
  "floor drain",
  "main sewer",
  "hydro jet",
  "grease",
  "commercial",
  "sewer",
  "backup",
  "gurgling",
  "toilet bubbling",
  "tub backing up",
  "multiple drains",
  "multiple fixtures",
  "sewage",
];

const EVAN_KEYWORDS: { keyword: string; serviceKey: string }[] = [
  { keyword: "leak repair", serviceKey: "leak repair" },
  { keyword: "faucet repair", serviceKey: "faucet repair" },
  { keyword: "toilet repair", serviceKey: "toilet repair" },
  { keyword: "toilet repair isolated to one toilet", serviceKey: "toilet repair" },
  { keyword: "running toilet", serviceKey: "running toilet" },
  { keyword: "garbage disposal", serviceKey: "garbage disposal" },
  { keyword: "shutoff valve", serviceKey: "shutoff valve" },
  { keyword: "small plumbing repair", serviceKey: "small plumbing repair" },
  { keyword: "fixture repair", serviceKey: "fixture repair" },
  { keyword: "leak under sink", serviceKey: "leak repair" },
  { keyword: "dripping faucet", serviceKey: "faucet repair" },
  { keyword: "isolated toilet", serviceKey: "toilet repair" },
];

const RHI_KEYWORDS = [
  "water damage repair",
  "drywall repair after leak",
  "flooring repair after water damage",
  "ceiling repair from plumbing leak",
  "trim repair after water damage",
  "cabinet repair after leak",
  "rebuild after sewer backup",
  "basement repair after water backup",
  "property repair after leak",
  "contractor repair after plumbing issue",
  "water damage",
  "drywall repair",
  "flooring repair",
  "ceiling repair",
  "build-back",
  "remodel",
  "bathroom remodel",
  "kitchen remodel",
  "full remodel",
];

const REMODEL_KEYWORDS = [
  "bathroom remodel",
  "kitchen remodel",
  "full remodel",
  "basement finishing",
  "general contractor",
  "roofing",
  "large construction",
];

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function combinedText(input: LeadInput): string {
  return normalize(
    [input.serviceRequested, input.problemDescription, input.fixturesAffected]
      .filter(Boolean)
      .join(" ")
  );
}

function matchesAny(text: string, keywords: string[]): string[] {
  return keywords.filter((k) => text.includes(k));
}

function generateLeadId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `bpr-${ts}-${rand}`;
}

export function scoreLead(input: LeadInput, primaryRoute: ProviderId): number {
  let score = 0;
  const text = combinedText(input);

  if (text.includes("sewer backup") || text.includes("sewage backup")) score += 40;
  if (text.includes("hydro jetting") || text.includes("hydro-jetting")) score += 35;
  if (text.includes("commercial drain") || text.includes("grease line")) score += 35;
  if (
    input.waterOrSewagePresent?.toLowerCase() === "yes" ||
    text.includes("water damage")
  )
    score += 30;
  if (input.urgency === "same-day") score += 20;
  if (input.phone) score += 15;
  if (input.photoUploaded) score += 10;
  if (input.city && isFirstWaveCity(input.city)) score += 10;

  if (
    !input.problemDescription ||
    input.problemDescription.trim().length < 20
  )
    score -= 15;

  const outOfArea =
    input.city &&
    !isFirstWaveCity(input.city) &&
    !input.city.toLowerCase().includes("berks");
  if (outOfArea) score -= 40;

  return Math.max(0, Math.min(100, score));
}

function getPayoutCategory(
  primaryRoute: ProviderId,
  text: string
): string {
  if (primaryRoute === "manual_review") return "Manual review";
  if (primaryRoute === "apex") {
    if (text.includes("sewer backup") || text.includes("sewage"))
      return "Apex emergency sewer lead";
    if (text.includes("hydro jetting") || text.includes("hydro-jetting"))
      return "Apex hydro jetting lead";
    if (text.includes("commercial") || text.includes("grease"))
      return "Apex commercial drain lead";
    return "Apex standard drain lead";
  }
  if (primaryRoute === "evan") return "Evan small plumbing lead";
  if (primaryRoute === "rhi") {
    if (text.includes("contractor") || text.includes("property repair"))
      return "RHI contractor repair lead";
    return "RHI water damage repair lead";
  }
  return "Manual review";
}

function getSuggestedSLA(urgency?: string, score?: number): string {
  if (urgency === "emergency" || (score ?? 0) >= 70) return "Immediate callback";
  if (urgency === "same-day") return "Same business day";
  if (urgency === "this-week") return "Within 3 business days";
  return "Estimate queue";
}

function getQualifiedStatus(
  score: number,
  primaryRoute: ProviderId
): RouteResult["qualifiedStatus"] {
  if (primaryRoute === "manual_review") return "needs_review";
  if (score >= 50) return "qualified";
  if (score >= 25) return "needs_review";
  return "unqualified";
}

export function routeLead(input: LeadInput): RouteResult {
  const text = combinedText(input);
  const notesInternal: string[] = [];
  let primaryRoute: ProviderId = "manual_review";
  let secondaryRoute: ProviderId | null = null;
  let serviceCategory = input.serviceCategory ?? "general";

  const apexMatches = matchesAny(text, APEX_KEYWORDS);
  const rhiMatches = matchesAny(text, RHI_KEYWORDS);
  const remodelMatches = matchesAny(text, REMODEL_KEYWORDS);

  const evanMatches = EVAN_KEYWORDS.filter((e) => text.includes(e.keyword));

  const activeEmergencyPhrases = [
    "actively backing up",
    "sewage backing up",
    "sewage is present",
    "stop using water",
  ];
  const isRepairFollowUp =
    rhiMatches.length > 0 &&
    (text.includes("drywall") ||
      text.includes("flooring") ||
      text.includes("repair after") ||
      text.includes("need drywall") ||
      text.includes("need flooring") ||
      text.includes("build-back") ||
      text.includes("build back"));

  if (remodelMatches.length > 0 && !text.includes("after leak") && !text.includes("after backup")) {
    notesInternal.push("Broad remodeling intent detected—route to manual review or RHIpros.com handoff");
    primaryRoute = "manual_review";
    serviceCategory = "remodel_handoff";
  } else if (
    isRepairFollowUp &&
    !activeEmergencyPhrases.some((p) => text.includes(p)) &&
    input.urgency !== "emergency"
  ) {
    primaryRoute = "rhi";
    serviceCategory = "water_damage";
    if (apexMatches.length > 0) secondaryRoute = "apex";
  } else if (apexMatches.length > 0) {
    primaryRoute = "apex";
    serviceCategory = "drain_sewer";
    if (rhiMatches.length > 0) secondaryRoute = "rhi";
  } else if (rhiMatches.length > 0) {
    primaryRoute = "rhi";
    serviceCategory = "water_damage";
  } else if (evanMatches.length > 0) {
    const allConfirmed = evanMatches.every(
      (m) => evanConfirmedServices[m.serviceKey] === true
    );
    if (allConfirmed) {
      primaryRoute = "evan";
      serviceCategory = "plumbing";
    } else {
      primaryRoute = "manual_review";
      notesInternal.push("CONFIRMATION REQUIRED: Evan service scope not fully confirmed");
      serviceCategory = "plumbing";
    }
  } else if (input.defaultRoute) {
    const route = input.defaultRoute as ProviderId;
    if (route === "evan" && apexMatches.length === 0) {
      primaryRoute = "evan";
      serviceCategory = "plumbing";
    } else if (route === "evan" && apexMatches.length > 0) {
      primaryRoute = "apex";
      serviceCategory = "drain_sewer";
      notesInternal.push("Apex override: drain/sewer symptoms detected on Evan service page");
    } else {
      primaryRoute = route;
    }
  } else {
    notesInternal.push("Service unclear—manual review required");
    primaryRoute = "manual_review";
  }

  if (
    text.includes("plumbing issue") &&
    apexMatches.length === 0 &&
    rhiMatches.length === 0 &&
    evanMatches.length === 0
  ) {
    primaryRoute = "manual_review";
    notesInternal.push("Vague plumbing issue—needs triage");
  }

  const leadScore = scoreLead(input, primaryRoute);
  const payoutCategory = getPayoutCategory(primaryRoute, text);

  return {
    leadId: generateLeadId(),
    primaryRoute,
    secondaryRoute,
    leadScore,
    qualifiedStatus: getQualifiedStatus(leadScore, primaryRoute),
    suggestedSLA: getSuggestedSLA(input.urgency, leadScore),
    serviceCategory,
    payoutCategory,
    notesInternal,
  };
}

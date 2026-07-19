export type StickyCtaVariant = "emergency" | "standard" | "city" | "guide" | "hub";

export interface StickyCtaConfig {
  variant: StickyCtaVariant;
  primaryLabel: string;
  secondaryLabel: string;
  primaryAction: "call" | "request" | "sms";
  secondaryAction: "call" | "sms" | "request";
}

const TEXT_US_CALL_CONFIG = {
  primaryLabel: "Text us",
  secondaryLabel: "Call",
  primaryAction: "sms" as const,
  secondaryAction: "call" as const,
};

const EMERGENCY_PATH_PATTERN =
  /\/emergency(?:\/|$)|emergency-sewer|sewer-backup|floor-drain-backing|main-sewer-line-clog/;

const STICKY_ELIGIBLE_EXACT = new Set([
  "/",
  "/emergency",
  "/drains",
  "/plumbing-and-leaks",
  "/after-leak",
  "/storm-fire-mold-help",
  "/property-repairs-berks-county-pa",
]);

const STANDARD_SERVICE_PATH_PATTERN = /-berks-county-pa$|-reading-pa$/;

export function isStickyCtaEligible(pathname: string): boolean {
  if (pathname === "/request-help") return false;
  return (
    STICKY_ELIGIBLE_EXACT.has(pathname) ||
    pathname.startsWith("/service-areas/") ||
    pathname.startsWith("/guides/") ||
    STANDARD_SERVICE_PATH_PATTERN.test(pathname)
  );
}

/** Whether the sticky bar should render given current page and interaction state. */
export function shouldHideStickyBar(state: {
  menuOpen: boolean;
  isEligible: boolean;
  pastMarker: boolean;
  formFocused: boolean;
  formInView: boolean;
}): boolean {
  return (
    state.menuOpen ||
    !state.isEligible ||
    !state.pastMarker ||
    state.formFocused ||
    state.formInView
  );
}

export function getStickyCtaConfig(pathname: string): StickyCtaConfig {
  if (pathname.startsWith("/guides/")) {
    return {
      variant: "guide",
      primaryLabel: "Get local help",
      secondaryLabel: "Call",
      primaryAction: "request",
      secondaryAction: "call",
    };
  }

  if (EMERGENCY_PATH_PATTERN.test(pathname)) {
    return {
      variant: "emergency",
      primaryLabel: "Call now",
      secondaryLabel: "Text photos",
      primaryAction: "call",
      secondaryAction: "sms",
    };
  }

  if (pathname.startsWith("/service-areas/")) {
    return {
      variant: "city",
      ...TEXT_US_CALL_CONFIG,
    };
  }

  if (
    pathname.endsWith("-berks-county-pa") ||
    pathname.endsWith("-reading-pa") ||
    pathname === "/drains" ||
    pathname === "/plumbing-and-leaks" ||
    pathname === "/after-leak" ||
    pathname === "/property-repairs-berks-county-pa"
  ) {
    return {
      variant: "standard",
      ...TEXT_US_CALL_CONFIG,
    };
  }

  return {
    variant: "hub",
    ...TEXT_US_CALL_CONFIG,
  };
}

export type StickyCtaVariant = "emergency" | "standard" | "city" | "guide" | "hub";

export interface StickyCtaConfig {
  variant: StickyCtaVariant;
  primaryLabel: string;
  secondaryLabel: string;
  /** Primary action: call, request anchor, or SMS */
  primaryAction: "call" | "request" | "sms";
  secondaryAction: "call" | "sms" | "request";
}

const EMERGENCY_PATH_PATTERN =
  /\/emergency(?:\/|$)|emergency-sewer|sewer-backup|floor-drain-backing|main-sewer-line-clog/;

export function getStickyCtaConfig(pathname: string): StickyCtaConfig {
  if (pathname === "/request-help") {
    return {
      variant: "hub",
      primaryLabel: "Call",
      secondaryLabel: "Text photos",
      primaryAction: "call",
      secondaryAction: "sms",
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

  if (pathname.startsWith("/guides/")) {
    return {
      variant: "guide",
      primaryLabel: "Get local help",
      secondaryLabel: "Call",
      primaryAction: "request",
      secondaryAction: "call",
    };
  }

  if (pathname.startsWith("/service-areas/")) {
    return {
      variant: "city",
      primaryLabel: "Describe problem",
      secondaryLabel: "Call",
      primaryAction: "request",
      secondaryAction: "call",
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
      primaryLabel: "Start request",
      secondaryLabel: "Call",
      primaryAction: "request",
      secondaryAction: "call",
    };
  }

  return {
    variant: "hub",
    primaryLabel: "Start request",
    secondaryLabel: "Call",
    primaryAction: "request",
    secondaryAction: "call",
  };
}

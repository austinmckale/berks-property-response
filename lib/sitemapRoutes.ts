/** Static routes included in sitemap.xml (excluding dynamic service and city pages). */
export const STATIC_SITEMAP_PATHS = [
  "",
  "/how-it-works",
  "/local-partners",
  "/request-help",
  "/contact",
  "/disclosure",
  "/privacy-policy",
  "/terms",
  "/service-areas",
  "/drains",
  "/emergency",
  "/after-leak",
  "/plumbing-and-leaks",
  "/storm-fire-mold-help",
  "/property-repairs-berks-county-pa",
] as const;

/** Fallback last-modified when content has no explicit updatedAt. */
export const SITEMAP_FALLBACK_DATE = new Date("2025-06-01");

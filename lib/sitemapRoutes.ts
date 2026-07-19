/** Static routes included in sitemap.xml (excluding dynamic service and city pages). */
export const STATIC_SITEMAP_PATHS = [
  "",
  "/how-it-works",
  "/local-partners",
  "/contact",
  "/disclosure",
  "/privacy-policy",
  "/terms",
  "/service-areas",
  "/drains",
  "/emergency",
  "/after-leak",
  "/plumbing-and-leaks",
  "/property-repairs-berks-county-pa",
] as const;

/** Utility or thin pages kept out of the sitemap (noindex, follow). */
export const NOINDEX_STATIC_PATHS = ["/request-help", "/storm-fire-mold-help"] as const;

/** Fallback last-modified when content has no explicit updatedAt. */
export const SITEMAP_FALLBACK_DATE = new Date("2025-06-01");

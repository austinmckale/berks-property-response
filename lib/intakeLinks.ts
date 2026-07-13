import type { ProblemTypeId } from "./problemTypes";

/** Pages with an inline LeadForm anchored at #get-help */
export const INLINE_FORM_PATHS = new Set([
  "/",
  "/emergency",
  "/drains",
  "/plumbing-and-leaks",
  "/after-leak",
  "/storm-fire-mold-help",
  "/property-repairs-berks-county-pa",
]);

export function hasInlineForm(pathname: string): boolean {
  if (INLINE_FORM_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/service-areas/")) return true;
  // SEO service landing pages use ServicePageTemplate with #get-help
  if (
    pathname.endsWith("-berks-county-pa") ||
    pathname.endsWith("-reading-pa")
  ) {
    return true;
  }
  return false;
}

export function getHelpHref(pathname: string, problem?: ProblemTypeId): string {
  const problemQuery = problem ? `?problem=${problem}` : "";
  if (hasInlineForm(pathname)) {
    return `${problemQuery}#get-help`;
  }
  return `/request-help${problemQuery}`;
}

export function isProblemTypeId(value: string): value is ProblemTypeId {
  return [
    "drain-emergency",
    "drain-clog",
    "plumbing-leak",
    "water-damage",
    "major-property",
  ].includes(value);
}

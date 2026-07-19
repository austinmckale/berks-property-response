/**
 * Validates SEO metadata presence and quality across pages.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { cities } from "../lib/cities";
import { getPublishedGuides } from "../lib/guides";
import {
  footerInfoLinks,
  footerLocalLinks,
  footerPopularProblems,
  footerServiceLinks,
} from "../lib/internalLinks";
import { providers } from "../lib/providers";
import { services } from "../lib/services";
import { SITE_NAME } from "../lib/siteConfig";
import {
  NOINDEX_STATIC_PATHS,
  STATIC_SITEMAP_PATHS,
} from "../lib/sitemapRoutes";

const DUPLICATE_TITLE_SUFFIX = `| ${SITE_NAME} | ${SITE_NAME}`;
const MIN_DESCRIPTION_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 170;
const CONFLICTING_PLUMBING_NAMES = [
  "Ridge Line Plumbing",
  "Ridge View Plumbing",
  "Ridge View",
];

function walkPages(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkPages(full, files);
    } else if (entry === "page.tsx") {
      files.push(full);
    }
  }
  return files;
}

function walkSource(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory() && entry !== "node_modules" && entry !== "__tests__") {
      walkSource(full, files);
    } else if (/\.(tsx?|mdx?)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function extractBuildMetadataTitles(content: string): string[] {
  const titles: string[] = [];
  const titleRegex = /title:\s*["'`]([^"'`]+)["'`]/g;
  let match: RegExpExecArray | null;
  while ((match = titleRegex.exec(content)) !== null) {
    titles.push(match[1]);
  }
  return titles;
}

function extractBuildMetadataDescriptions(content: string): string[] {
  const descriptions: string[] = [];
  const blocks = content.match(/buildMetadata\(\{[\s\S]*?\}\)/g) ?? [];
  for (const block of blocks) {
    const match = block.match(/description:\s*(?:\n\s*)?["'`]([^"'`]+)["'`]/);
    if (match) descriptions.push(match[1]);
  }
  return descriptions;
}

function extractNoindexFlags(content: string): boolean {
  return /noindex:\s*true/.test(content);
}

function expectedSitemapUrlCount(): number {
  const indexableServices = services.filter((s) => !s.noindex).length;
  const guideCount = getPublishedGuides().filter((g) => g.index).length;
  const guidesIndex = guideCount > 0 ? 1 : 0;
  return STATIC_SITEMAP_PATHS.length + indexableServices + cities.length + guideCount + guidesIndex;
}

function collectInternalLinkHrefs(): string[] {
  const hrefs: string[] = [];
  for (const group of [
    footerServiceLinks,
    footerPopularProblems,
    footerLocalLinks,
    footerInfoLinks,
  ]) {
    for (const link of group) hrefs.push(link.href);
  }
  for (const provider of Object.values(providers)) {
    for (const link of provider.serviceLinks) hrefs.push(link.href);
  }
  return hrefs;
}

function routeExists(href: string): boolean {
  if (href.startsWith("http")) return true;
  const path = href.split("#")[0];
  if (path === "/") return true;
  if (STATIC_SITEMAP_PATHS.includes(path as (typeof STATIC_SITEMAP_PATHS)[number])) {
    return true;
  }
  if (NOINDEX_STATIC_PATHS.includes(path as (typeof NOINDEX_STATIC_PATHS)[number])) {
    return true;
  }
  if (path.startsWith("/service-areas/")) {
    const slug = path.replace("/service-areas/", "");
    return cities.some((c) => c.slug === slug);
  }
  if (path.startsWith("/guides/")) {
    const slug = path.replace("/guides/", "");
    return getPublishedGuides().some((g) => g.slug === slug);
  }
  if (path === "/guides") {
    return getPublishedGuides().length > 0;
  }
  const slug = path.replace(/^\//, "");
  return services.some((s) => s.slug === slug);
}

function main() {
  const pages = walkPages(join(process.cwd(), "app"));
  const errors: string[] = [];
  const canonicalPaths = new Map<string, string>();

  for (const page of pages) {
    const content = readFileSync(page, "utf-8");
    const hasMetadata =
      content.includes("export const metadata") ||
      content.includes("generateMetadata") ||
      content.includes("generateServiceMetadata") ||
      content.includes("generateCityMetadata");

    if (!hasMetadata && !page.includes("api") && !page.includes("og-home")) {
      errors.push(`${page}: missing metadata export`);
    }

    for (const title of extractBuildMetadataTitles(content)) {
      if (title.includes(DUPLICATE_TITLE_SUFFIX)) {
        errors.push(`${page}: duplicated site name in title "${title}"`);
      }
      if (title.endsWith(`| ${SITE_NAME}`)) {
        errors.push(
          `${page}: title "${title}" includes manual site suffix — layout template adds it automatically`
        );
      }
    }

    for (const description of extractBuildMetadataDescriptions(content)) {
      if (
        description.length < MIN_DESCRIPTION_LENGTH ||
        description.length > MAX_DESCRIPTION_LENGTH
      ) {
        errors.push(
          `${page}: meta description length ${description.length} (target ${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH})`
        );
      }
    }

    const pathMatch = content.match(/path:\s*["'`]([^"'`]+)["'`]/);
    if (pathMatch) {
      const path = pathMatch[1];
      const existing = canonicalPaths.get(path);
      if (existing && existing !== page) {
        errors.push(`Duplicate canonical path "${path}" in ${existing} and ${page}`);
      } else {
        canonicalPaths.set(path, page);
      }
    }
  }

  for (const noindexPath of NOINDEX_STATIC_PATHS) {
    const pageFile = join(process.cwd(), "app", noindexPath.slice(1), "page.tsx");
    try {
      const content = readFileSync(pageFile, "utf-8");
      if (!extractNoindexFlags(content)) {
        errors.push(`${noindexPath}: expected noindex: true in buildMetadata`);
      }
      if (STATIC_SITEMAP_PATHS.includes(noindexPath as (typeof STATIC_SITEMAP_PATHS)[number])) {
        errors.push(`${noindexPath}: noindexed page must not be in STATIC_SITEMAP_PATHS`);
      }
    } catch {
      errors.push(`${noindexPath}: missing page.tsx`);
    }
  }

  for (const service of services.filter((s) => !s.noindex)) {
    if (
      service.metaDescription.length < MIN_DESCRIPTION_LENGTH ||
      service.metaDescription.length > MAX_DESCRIPTION_LENGTH
    ) {
      errors.push(
        `service ${service.slug}: meta description length ${service.metaDescription.length}`
      );
    }
    if (!service.title.trim()) {
      errors.push(`service ${service.slug}: missing title`);
    }
    const provider = providers[service.provider as keyof typeof providers];
    if (!provider && service.provider !== "manual_review") {
      errors.push(`service ${service.slug}: unknown provider id ${service.provider}`);
    }
    if (service.slug === "commercial-drain-cleaning-berks-county-pa") {
      if (service.defaultPropertyType !== "commercial") {
        errors.push("commercial drain page must default property type to commercial");
      }
    }
  }

  for (const city of cities) {
    if (city.intro.length < MIN_DESCRIPTION_LENGTH) {
      errors.push(`city ${city.slug}: intro too short for meta description (${city.intro.length})`);
    }
  }

  const schemaPath = join(process.cwd(), "lib/schema.ts");
  const schemaContent = readFileSync(schemaPath, "utf-8");
  if (!schemaContent.includes('broker: { "@id": ORGANIZATION_ID }')) {
    errors.push("lib/schema.ts: Service schema should use broker for BPR coordination");
  }
  if (schemaContent.includes('"@type": "LocalBusiness"')) {
    errors.push("lib/schema.ts: do not use LocalBusiness for BPR-as-performer");
  }

  const serviceTemplate = readFileSync(
    join(process.cwd(), "components/ServicePageTemplate.tsx"),
    "utf-8"
  );
  if (!serviceTemplate.includes("hasVerifiedProviderIdentity")) {
    errors.push("ServicePageTemplate must gate Service schema on verified provider identity");
  }
  if (serviceTemplate.includes(`name: ${SITE_NAME}`)) {
    errors.push("ServicePageTemplate must not set BPR as performing provider in Service schema");
  }

  const publicScanDirs = ["app", "components"];
  for (const dir of publicScanDirs) {
    for (const file of walkSource(join(process.cwd(), dir))) {
      if (file.includes("providers.ts")) continue;
      const content = readFileSync(file, "utf-8");
      for (const name of CONFLICTING_PLUMBING_NAMES) {
        if (content.includes(name)) {
          errors.push(`${file}: conflicting public plumbing name "${name}"`);
        }
      }
    }
  }

  if (providers.evan.publicDisplayName !== "Local Plumbing Provider") {
    errors.push("providers.evan.publicDisplayName must remain the safe fallback until owner confirms");
  }

  for (const href of collectInternalLinkHrefs()) {
    if (!routeExists(href)) {
      errors.push(`Internal link points to missing route: ${href}`);
    }
  }

  const analyticsFiles = walkSource(join(process.cwd(), "components")).filter((f) =>
    f.includes("Header") || f.includes("Footer") || f.includes("Sticky") || f.includes("LeadForm")
  );
  for (const file of analyticsFiles) {
    const content = readFileSync(file, "utf-8");
    if (content.includes("phone_click") && !content.includes('data-analytics-event="phone_click"')) {
      errors.push(`${file}: phone links should include data-analytics-event`);
    }
  }

  const sitemapExists = statSync(join(process.cwd(), "app/sitemap.ts")).isFile();
  const robotsExists = statSync(join(process.cwd(), "app/robots.ts")).isFile();
  const openGraphImageExists =
    statSync(join(process.cwd(), "app/opengraph-image.tsx")).isFile() ||
    statSync(join(process.cwd(), "public/og-default.png")).isFile();
  const iconExists =
    statSync(join(process.cwd(), "app/icon.tsx")).isFile() ||
    statSync(join(process.cwd(), "app/icon.png")).isFile();

  if (!sitemapExists) errors.push("Missing app/sitemap.ts");
  if (!robotsExists) errors.push("Missing app/robots.ts");
  if (!openGraphImageExists) {
    errors.push("Missing default OG image (app/opengraph-image.tsx or public/og-default.png)");
  }
  if (!iconExists) errors.push("Missing favicon (app/icon.tsx or app/icon.png)");

  const layoutPath = join(process.cwd(), "app/layout.tsx");
  const layoutContent = readFileSync(layoutPath, "utf-8");
  if (!layoutContent.includes("metadataBase")) {
    errors.push("app/layout.tsx: missing metadataBase export");
  }

  const seoPath = join(process.cwd(), "lib/seo.ts");
  const seoContent = readFileSync(seoPath, "utf-8");
  if (!seoContent.includes("twitter:")) {
    errors.push("lib/seo.ts: missing Twitter card metadata");
  }
  if (!seoContent.includes("Berks County")) {
    errors.push("lib/seo.ts: homepage metadata should mention Berks County");
  }

  const sitemapContent = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf-8");
  if (!sitemapContent.includes("STATIC_SITEMAP_PATHS")) {
    errors.push("app/sitemap.ts: should use STATIC_SITEMAP_PATHS from lib/sitemapRoutes.ts");
  }
  for (const noindexPath of NOINDEX_STATIC_PATHS) {
    if (sitemapContent.includes(`"${noindexPath}"`)) {
      errors.push(`app/sitemap.ts: noindexed path ${noindexPath} must not appear literally`);
    }
  }

  const expectedUrls = expectedSitemapUrlCount();
  const serviceEntriesInSitemap = (sitemapContent.match(/!s\.noindex/g) ?? []).length;
  if (serviceEntriesInSitemap !== 1) {
    errors.push("app/sitemap.ts: expected services.filter((s) => !s.noindex) pattern");
  }

  const homePage = readFileSync(join(process.cwd(), "app/page.tsx"), "utf-8");
  if (!homePage.includes("HomepageSections")) {
    errors.push("app/page.tsx: homepage should include crawlable SEO sections");
  }

  if (errors.length > 0) {
    console.error("SEO check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✓ SEO checks passed for ${pages.length} pages (${expectedUrls} sitemap URLs expected)`);
}

main();

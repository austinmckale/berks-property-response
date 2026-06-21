/**
 * Validates SEO metadata presence and quality across pages.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { cities } from "../lib/cities";
import { services } from "../lib/services";
import { SITE_NAME } from "../lib/siteConfig";
import { STATIC_SITEMAP_PATHS } from "../lib/sitemapRoutes";

const DUPLICATE_TITLE_SUFFIX = `| ${SITE_NAME} | ${SITE_NAME}`;
const MIN_DESCRIPTION_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 170;

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

function expectedSitemapUrlCount(): number {
  const indexableServices = services.filter((s) => !s.noindex).length;
  return STATIC_SITEMAP_PATHS.length + indexableServices + cities.length;
}

function main() {
  const pages = walkPages(join(process.cwd(), "app"));
  const errors: string[] = [];

  for (const page of pages) {
    const content = readFileSync(page, "utf-8");
    const hasMetadata =
      content.includes("export const metadata") ||
      content.includes("generateMetadata") ||
      content.includes("generateServiceMetadata") ||
      content.includes("generateCityMetadata");

    if (!hasMetadata && !page.includes("api")) {
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
  }

  for (const city of cities) {
    if (city.intro.length < MIN_DESCRIPTION_LENGTH) {
      errors.push(`city ${city.slug}: intro too short for meta description (${city.intro.length})`);
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
  if (!openGraphImageExists) errors.push("Missing default OG image (app/opengraph-image.tsx or public/og-default.png)");
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

  const sitemapContent = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf-8");
  if (!sitemapContent.includes("STATIC_SITEMAP_PATHS")) {
    errors.push("app/sitemap.ts: should use STATIC_SITEMAP_PATHS from lib/sitemapRoutes.ts");
  }

  const expectedUrls = expectedSitemapUrlCount();
  const serviceEntriesInSitemap = (sitemapContent.match(/!s\.noindex/g) ?? []).length;
  if (serviceEntriesInSitemap !== 1) {
    errors.push("app/sitemap.ts: expected services.filter((s) => !s.noindex) pattern");
  }

  if (errors.length > 0) {
    console.error("SEO check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✓ SEO checks passed for ${pages.length} pages (${expectedUrls} sitemap URLs expected)`);
}

main();

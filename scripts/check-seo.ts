/**
 * Validates SEO metadata presence on page files.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

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
  }

  const sitemapExists = statSync(join(process.cwd(), "app/sitemap.ts")).isFile();
  const robotsExists = statSync(join(process.cwd(), "app/robots.ts")).isFile();

  if (!sitemapExists) errors.push("Missing app/sitemap.ts");
  if (!robotsExists) errors.push("Missing app/robots.ts");

  if (errors.length > 0) {
    console.error("SEO check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✓ SEO checks passed for ${pages.length} pages`);
}

main();

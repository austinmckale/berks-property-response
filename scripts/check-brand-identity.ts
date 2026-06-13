/**
 * Validates Berks Property Response brand identity — not RHI Pros as primary site.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { services } from "../lib/services";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";

const SCAN_DIRS = ["app", "components", "lib"];
const SKIP_FILES = [
  "check-brand-identity.ts",
  "providers.ts",
  "routing.ts",
  "disclosures.ts",
  "services.ts",
  "cities.ts",
];

const TESTIMONIAL_PATTERNS = [
  /\btestimonial/i,
  /\bcase study/i,
  /★/,
  /\b5-star\b/i,
  /\bbefore and after gallery/i,
];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory() && entry !== "node_modules" && entry !== "__tests__") {
      walk(full, files);
    } else if (/\.(tsx?|mdx?)$/.test(entry) && !SKIP_FILES.includes(entry)) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const errors: string[] = [];

  const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8"));
  if (String(pkg.name).toLowerCase().includes("rhipros")) {
    errors.push(`package.json name "${pkg.name}" must not contain rhipros`);
  }

  if (SITE_NAME !== "Berks Property Response") {
    errors.push(`SITE_NAME must be "Berks Property Response", got "${SITE_NAME}"`);
  }

  if (!SITE_URL.includes("berkspropertyresponse.com")) {
    errors.push(`SITE_URL must use berkspropertyresponse.com, got "${SITE_URL}"`);
  }

  const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf-8");
  if (!layout.includes("metadataBase")) {
    errors.push("app/layout.tsx missing metadataBase");
  }

  for (const dir of SCAN_DIRS) {
    const dirPath = join(process.cwd(), dir);
    if (!statSync(dirPath).isDirectory()) continue;
    for (const file of walk(dirPath)) {
      const content = readFileSync(file, "utf-8");
      if (content.includes("LocalBusiness")) {
        errors.push(`${file}: LocalBusiness schema found — use Organization instead`);
      }
      for (const pattern of TESTIMONIAL_PATTERNS) {
        if (pattern.test(content)) {
          errors.push(`${file}: fake social proof pattern "${pattern.source}"`);
        }
      }
    }
  }

  const homePage = readFileSync(join(process.cwd(), "app/page.tsx"), "utf-8");
  if (/title:\s*["']RHI Pros/i.test(homePage)) {
    errors.push("Homepage metadata must not use RHI Pros as title");
  }

  const evanService = services.find((s) => s.slug === "small-plumbing-repairs-berks-county-pa");
  if (evanService && (evanService.noindex || evanService.draftStatus !== "published")) {
    errors.push("Evan small-plumbing page must be published and indexed now that scope is confirmed");
  }

  const draftRhiSlugs = [
    "drywall-repair-after-plumbing-leak-berks-county-pa",
    "flooring-repair-after-water-damage-berks-county-pa",
    "ceiling-repair-from-plumbing-leak-berks-county-pa",
    "basement-repair-after-water-backup-berks-county-pa",
  ];
  for (const slug of draftRhiSlugs) {
    const page = services.find((s) => s.slug === slug);
    if (!page) {
      errors.push(`Missing RHI draft service page definition: ${slug}`);
    } else if (!page.noindex || page.draftStatus !== "draft") {
      errors.push(`${slug} must remain draft/noindex until ready to publish`);
    }
  }

  if (errors.length > 0) {
    console.error("Brand identity check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ Brand identity checks passed");
}

main();

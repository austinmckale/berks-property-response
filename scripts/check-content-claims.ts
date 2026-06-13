/**
 * Flags unsupported marketing claims unless verified in provider data.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { providers } from "../lib/providers";

const CLAIM_PATTERNS: { pattern: RegExp; claim: keyof typeof providers.apex.verifiedClaims | "marketing" }[] = [
  { pattern: /\blicensed\b/i, claim: "licensed" },
  { pattern: /\binsured\b/i, claim: "insured" },
  { pattern: /\b24\s*\/\s*7\b/i, claim: "emergency24_7" },
  { pattern: /\b24-hour\b/i, claim: "emergency24_7" },
  { pattern: /\bsame-day\b/i, claim: "sameDay" },
  { pattern: /\bbest\b/i, claim: "marketing" },
  { pattern: /\btop-rated\b/i, claim: "marketing" },
  { pattern: /\bcheapest\b/i, claim: "marketing" },
  { pattern: /\bfree estimate\b/i, claim: "freeEstimate" },
  { pattern: /\byears in business\b/i, claim: "yearsInBusiness" },
  { pattern: /\bveteran owned\b/i, claim: "veteranOwned" },
  { pattern: /\bfamily owned\b/i, claim: "familyOwned" },
  { pattern: /\bguaranteed\b/i, claim: "guaranteed" },
];

const SCAN_DIRS = ["app", "components", "lib"];
const SKIP_FILES = [
  "check-content-claims.ts",
  "providers.ts",
  "formSchema.ts",
  "routing.ts",
  "problems.ts",
  "LeadForm.tsx",
];

function getAllVerifiedClaims(): Record<string, boolean> {
  const merged: Record<string, boolean> = {};
  for (const p of Object.values(providers)) {
    for (const [key, val] of Object.entries(p.verifiedClaims)) {
      merged[key] = merged[key] || val;
    }
  }
  return merged;
}

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
  const verified = getAllVerifiedClaims();
  const errors: string[] = [];

  for (const dir of SCAN_DIRS) {
    const files = walk(join(process.cwd(), dir));
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      for (const { pattern, claim } of CLAIM_PATTERNS) {
        if (!pattern.test(content)) continue;
        if (claim === "marketing") {
          errors.push(`${file}: unsupported marketing claim "${pattern.source}"`);
          continue;
        }
        if (!verified[claim]) {
          errors.push(
            `${file}: claim "${claim}" found but not verified in providers.ts`
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error("Content claims check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ No unverified content claims detected");
}

main();

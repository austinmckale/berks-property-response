/**
 * Finds unresolved ACTION ITEM tags in content before publish.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { services } from "../lib/services";
import { providers } from "../lib/providers";

const ACTION_ITEM = /ACTION ITEM/i;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory() && !entry.startsWith(".") && entry !== "node_modules") {
      walk(full, files);
    } else if (/\.(tsx?|mdx?)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const errors: string[] = [];

  for (const service of services) {
    if (service.draftStatus === "published" && !service.noindex) {
      const text = JSON.stringify(service);
      if (ACTION_ITEM.test(text)) {
        errors.push(`Published service ${service.slug} contains ACTION ITEM`);
      }
      if (service.needsConfirmation) {
        errors.push(`Published service ${service.slug} still needsConfirmation`);
      }
    }
  }

  for (const p of Object.values(providers)) {
    if (p.actionItems?.length && p.confirmed === true) {
      errors.push(`Provider ${p.name} is confirmed but has action items`);
    }
  }

  const libFiles = walk(join(process.cwd(), "lib"));
  for (const file of libFiles) {
    if (file.includes("__tests__")) continue;
    const content = readFileSync(file, "utf-8");
    if (ACTION_ITEM.test(content)) {
      // Evan provider action items are expected in providers.ts
      if (!file.endsWith("providers.ts") && !file.endsWith("services.ts")) {
        errors.push(`${file}: contains ACTION ITEM reference`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Unresolved action items check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ No blocking unresolved action items for published content");
}

main();

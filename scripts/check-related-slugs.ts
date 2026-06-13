/**
 * Ensures relatedSlugs on every service resolve to a defined service entry.
 */
import { getServiceBySlug, services } from "../lib/services";

function main() {
  const errors: string[] = [];

  for (const service of services) {
    for (const slug of service.relatedSlugs) {
      if (!getServiceBySlug(slug)) {
        errors.push(`${service.slug}: related slug "${slug}" does not exist`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Related slug check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ All related service slugs resolve");
}

main();

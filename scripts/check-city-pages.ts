/**
 * Checks city pages for duplicate content, minimum word count, and unresolved ACTION ITEM tags.
 */
import { cities } from "../lib/cities";

const MIN_WORD_COUNT = 80;
const ACTION_ITEM_PATTERN = /ACTION ITEM/i;

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function checkDuplicateIntros(): string[] {
  const errors: string[] = [];
  const intros = cities.map((c) => c.intro);
  const seen = new Map<string, string>();

  for (const city of cities) {
    if (seen.has(city.intro)) {
      errors.push(
        `Duplicate intro between ${seen.get(city.intro)} and ${city.slug}`
      );
    } else {
      seen.set(city.intro, city.slug);
    }
  }

  const headlines = cities.map((c) => c.headline);
  if (new Set(headlines).size !== headlines.length) {
    errors.push("Duplicate hero headlines detected across city pages");
  }

  return errors;
}

function checkCityPage(city: (typeof cities)[0]): string[] {
  const errors: string[] = [];
  const bodyText = [city.intro, city.localContext, ...city.faqs.map((f) => f.answer)].join(" ");

  if (wordCount(bodyText) < MIN_WORD_COUNT) {
    errors.push(`${city.slug}: below minimum word count (${MIN_WORD_COUNT})`);
  }

  if (ACTION_ITEM_PATTERN.test(bodyText)) {
    errors.push(`${city.slug}: unresolved ACTION ITEM before publish`);
  }

  const faqQuestions = city.faqs.map((f) => f.question);
  if (new Set(faqQuestions).size !== faqQuestions.length) {
    errors.push(`${city.slug}: duplicate FAQ questions`);
  }

  if (city.serviceLinks.length < 2) {
    errors.push(`${city.slug}: needs at least 2 unique internal service links`);
  }

  return errors;
}

function main() {
  const errors = [...checkDuplicateIntros()];
  for (const city of cities) {
    errors.push(...checkCityPage(city));
  }

  if (errors.length > 0) {
    console.error("City page check failed:\n");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✓ All ${cities.length} city pages passed QA checks`);
}

main();

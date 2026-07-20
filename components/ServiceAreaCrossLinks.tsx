import Link from "next/link";
import { cities } from "@/lib/cities";

const FEATURED_CITY_SLUGS = [
  "reading-pa",
  "wyomissing-pa",
  "kutztown-pa",
  "fleetwood-pa",
  "birdsboro-pa",
  "shillington-pa",
] as const;

export function ServiceAreaCrossLinks() {
  const featured = FEATURED_CITY_SLUGS.map((slug) => cities.find((c) => c.slug === slug)).filter(
    (city): city is (typeof cities)[number] => city !== undefined
  );

  return (
    <section className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
        Berks County service areas
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Local help is available across Berks County, including:
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {featured.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/service-areas/${city.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-800 hover:border-stone-400"
            >
              {city.name}, PA
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/service-areas"
            className="inline-flex min-h-11 items-center rounded-full border border-stone-900 bg-stone-900 px-3 py-1 text-sm text-white hover:bg-stone-800"
          >
            All areas
          </Link>
        </li>
      </ul>
    </section>
  );
}

import Link from "next/link";
import { cities } from "@/lib/cities";

export function ServiceAreaLinks() {
  return (
    <section className="section-pad-sm border-t border-stone-200 bg-stone-50 px-4">
      <div className="page-container-wide md:max-w-6xl">
        <p className="eyebrow">Coverage</p>
        <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
          Service areas
        </h2>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="btn-touch card-touch w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 active:bg-stone-50 sm:w-auto"
            >
              {city.name}, PA
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="btn-touch card-touch w-full rounded-full border border-brand bg-brand px-4 py-2.5 text-sm font-semibold text-white active:bg-brand-hover sm:w-auto"
          >
            All areas
          </Link>
        </div>
      </div>
    </section>
  );
}

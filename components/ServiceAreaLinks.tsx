import Link from "next/link";
import { cities } from "@/lib/cities";

export function ServiceAreaLinks() {
  return (
    <section className="border-t border-stone-200 bg-stone-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-lg md:max-w-6xl">
        <h2 className="text-xl font-semibold text-stone-900 md:text-3xl">
          Service areas
        </h2>
        <p className="mt-1.5 text-sm text-stone-600 md:mt-2 md:text-base">
          Berks County cities we help.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3 md:mt-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="btn-touch card-touch w-full rounded-xl border border-stone-300 bg-white px-4 text-sm font-medium text-stone-800 active:bg-stone-50 sm:w-auto sm:rounded-full sm:py-2"
            >
              {city.name}, PA
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="btn-touch card-touch w-full rounded-xl border border-stone-900 bg-stone-900 px-4 text-sm font-medium text-white active:bg-stone-800 sm:w-auto sm:rounded-full sm:py-2"
          >
            All areas
          </Link>
        </div>
      </div>
    </section>
  );
}

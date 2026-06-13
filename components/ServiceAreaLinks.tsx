import Link from "next/link";
import { cities } from "@/lib/cities";

export function ServiceAreaLinks() {
  return (
    <section className="bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900">Service areas in Berks County</h2>
        <p className="mt-2 text-slate-600">
          First-wave city pages with local routing language. More areas may be added over time.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700"
            >
              {city.name}, PA
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="rounded-full border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            All service areas →
          </Link>
        </div>
      </div>
    </section>
  );
}

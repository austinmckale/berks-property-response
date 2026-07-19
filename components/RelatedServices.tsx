import Link from "next/link";
import type { ServicePage } from "@/lib/services";

export function RelatedServices({
  services,
  title = "Related problems",
}: {
  services: ServicePage[];
  title?: string;
}) {
  if (services.length === 0) return null;

  return (
    <section className="border-t border-stone-200 bg-stone-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-xl font-semibold text-stone-900">
          {title}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="flex min-h-14 items-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-400"
              >
                {service.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

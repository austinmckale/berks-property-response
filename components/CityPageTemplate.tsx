import Link from "next/link";
import { Suspense } from "react";
import type { CityPage } from "@/lib/cities";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  faqSchema,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { DirectContactActions } from "./DirectContactActions";
import { FAQ } from "./FAQ";
import { SchemaScript } from "./SchemaScript";
import { CityIntakeSection } from "./CityIntakeSection";
import { getStickySmsMessage } from "@/lib/smsMessages";

export function generateCityMetadata(city: CityPage) {
  return buildMetadata({
    title: city.headline,
    description: city.intro,
    path: `/service-areas/${city.slug}`,
  });
}

export function CityPageTemplate({ city }: { city: CityPage }) {
  const crumbs = breadcrumbItems([
    { name: "Areas", path: "/service-areas" },
    { name: `${city.name}, PA`, path: `/service-areas/${city.slug}` },
  ]);

  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: city.headline,
      description: city.intro,
      path: `/service-areas/${city.slug}`,
    }),
    breadcrumbSchema(crumbs),
    faqSchema(city.faqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />

      <section className="px-4 py-6 md:py-10">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{city.headline}</h1>
          <p className="mt-2 text-stone-600">{city.intro}</p>
          <div id="sticky-cta-marker" className="h-px" aria-hidden />

          <DirectContactActions
            smsBody={getStickySmsMessage(`/service-areas/${city.slug}`)}
            analyticsSource="city_top"
            className="mt-5"
          />

          <Suspense fallback={<div className="mt-8 h-56 animate-pulse rounded-2xl bg-stone-100" />}>
            <CityIntakeSection city={city} />
          </Suspense>

          <details className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium text-stone-800">
              Local context and useful links
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">{city.localContext}</p>
            <h3 className="mt-4 text-sm font-semibold text-stone-900">Common requests</h3>
            <ul className="mt-2 space-y-1.5">
              {city.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-stone-800 underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <FAQ items={city.faqs} title={`${city.name} questions`} />
    </>
  );
}

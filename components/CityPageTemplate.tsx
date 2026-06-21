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
import { CityRoutingSection } from "./CityRoutingSection";
import { CTASection } from "./CTASection";
import { FAQ } from "./FAQ";
import { LeadForm } from "./LeadForm";
import { SchemaScript } from "./SchemaScript";

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

      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">{city.headline}</h1>
          <p className="mt-4 text-lg text-stone-600">{city.intro}</p>
          <p className="mt-4 leading-relaxed text-stone-700">{city.localContext}</p>

          {city.neighborhoods && (
            <p className="mt-4 text-sm text-stone-500">
              Areas referenced: {city.neighborhoods.join(", ")}
            </p>
          )}

          <CityRoutingSection cityName={city.name} />

          <h2 className="mt-8 text-lg font-semibold text-stone-900">
            Related help in {city.name}
          </h2>
          <ul className="mt-4 space-y-2">
            {city.serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-stone-800 underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-stone-200 pt-10">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-100" />}>
              <LeadForm
                pageType="city"
                serviceCategory="general"
                defaultService={`Help in ${city.name}, PA`}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <FAQ items={city.faqs} title={`${city.name} questions`} />
      <CTASection title={`Need help in ${city.name}?`} />
    </>
  );
}

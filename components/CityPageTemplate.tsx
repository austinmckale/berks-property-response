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
import { CTASection } from "./CTASection";
import { DisclosureBlock } from "./DisclosureBlock";
import { FAQ } from "./FAQ";
import { LeadForm } from "./LeadForm";
import { SchemaScript } from "./SchemaScript";

export function generateCityMetadata(city: CityPage) {
  return buildMetadata({
    title: `${city.headline} | Berks Property Response`,
    description: city.intro,
    path: `/service-areas/${city.slug}`,
  });
}

export function CityPageTemplate({ city }: { city: CityPage }) {
  const crumbs = breadcrumbItems([
    { name: "Service Areas", path: "/service-areas" },
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-slate-900">{city.headline}</h1>
            <p className="mt-4 text-lg text-slate-600">{city.intro}</p>
            <p className="mt-4 text-slate-700">{city.localContext}</p>

            {city.neighborhoods && (
              <p className="mt-4 text-sm text-slate-500">
                Areas referenced: {city.neighborhoods.join(", ")}
              </p>
            )}

            <h2 className="mt-8 text-xl font-bold text-slate-900">
              Common services in {city.name}
            </h2>
            <ul className="mt-4 space-y-2">
              {city.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-700 hover:underline">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <DisclosureBlock />
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
              <LeadForm
                pageType="city"
                serviceCategory="general"
                defaultService={`Help in ${city.name}, PA`}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <FAQ items={city.faqs} title={`${city.name} FAQs`} />
      <CTASection title={`Get help in ${city.name}, Berks County`} />
    </>
  );
}

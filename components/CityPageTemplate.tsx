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
import { EmergencyCallBanner, PageIntakeCue } from "./ConversionHub";
import { FormSymptomPicker } from "./FormSymptomPicker";
import { FAQ } from "./FAQ";
import { LeadForm } from "./LeadForm";
import { RoutingInfoCards } from "@/components/RoutingStepsSection";
import { SchemaScript } from "./SchemaScript";

export function generateCityMetadata(city: CityPage) {
  return buildMetadata({
    title: city.headline,
    description: city.intro,
    path: `/service-areas/${city.slug}`,
  });
}

const citySymptoms = [
  { label: "Sewer or drain backup", problem: "drain-emergency" as const },
  { label: "Leak or plumbing issue", problem: "plumbing-leak" as const },
  { label: "Damage after a leak", problem: "water-damage" as const },
];

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
          <p className="mt-3 text-sm text-stone-700">
            Start here for drain, plumbing, or water-damage help in {city.name}. Tell us what is
            happening and we will review the request and coordinate the appropriate local handoff.
          </p>

          <div className="mt-5 space-y-3">
            <p className="text-sm font-medium text-stone-800">
              Active backup or uncontrolled water? Call for urgent help.
            </p>
            <EmergencyCallBanner headline="Active backup or leak in your home?" />
            <PageIntakeCue label="Start a request" />
          </div>
          <div id="sticky-cta-marker" className="h-px" aria-hidden />

          <div className="mt-8">
            <FormSymptomPicker title="What's going on?" options={citySymptoms} />
          </div>

          <div className="mt-6">
            <RoutingInfoCards />
          </div>

          <div id="get-help" className="mt-10 scroll-mt-6 border-t border-stone-200 pt-8">
            <h2 className="text-lg font-semibold text-stone-900">Send a request</h2>
            <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-stone-100" />}>
              <LeadForm
                pageType="city"
                serviceCategory="general"
                defaultService={`Help in ${city.name}, PA`}
                defaultCity={city.name}
              />
            </Suspense>
          </div>

          {city.neighborhoods && (
            <p className="mt-8 text-sm text-stone-500">
              Areas referenced: {city.neighborhoods.join(", ")}
            </p>
          )}

          <details className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-stone-800">
              More about help in {city.name}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">{city.localContext}</p>
            <h3 className="mt-4 text-sm font-semibold text-stone-900">Common requests</h3>
            <ul className="mt-2 space-y-1.5">
              {city.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-800 underline-offset-2 hover:underline"
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

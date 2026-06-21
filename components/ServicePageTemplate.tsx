import Link from "next/link";
import { Suspense } from "react";
import { getRelatedServices, type ServicePage } from "@/lib/services";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  faqSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { EmergencyCallBanner, HubDisclosureLine, HubQuickActions } from "./ConversionHub";
import { FAQ } from "./FAQ";
import { inferProblemTypeFromContext } from "@/lib/problemTypes";
import { LeadForm } from "./LeadForm";
import { PlumbingTriageNotice } from "./PlumbingTriageNotice";
import { SchemaScript } from "./SchemaScript";
import { ServiceAreaCrossLinks } from "./ServiceAreaCrossLinks";

interface ServicePageTemplateProps {
  service: ServicePage;
}

export function generateServiceMetadata(service: ServicePage) {
  const ogImage =
    service.heroImage.endsWith(".png") || service.heroImage.endsWith(".jpg")
      ? service.heroImage
      : undefined;
  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/${service.slug}`,
    noindex: service.noindex,
    ogImage,
  });
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const crumbs = breadcrumbItems([{ name: service.headline, path: `/${service.slug}` }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: service.title,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
    breadcrumbSchema(crumbs),
    serviceSchema({
      name: service.headline,
      description: service.intro,
      path: `/${service.slug}`,
    }),
    faqSchema(service.faqs)
  );

  const isEmergency =
    service.slug.includes("emergency") ||
    service.slug.includes("sewer-backup") ||
    service.slug.includes("main-sewer") ||
    service.slug.includes("floor-drain");
  const isRidgeLinePlumbing =
    service.provider === "evan" || service.defaultRoute === "evan";
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const initialProblemType = inferProblemTypeFromContext({
    serviceCategory: service.serviceCategory,
    defaultRoute: service.defaultRoute,
    slug: service.slug,
  });

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />

      <article className="px-4 py-6 md:py-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            {service.headline}
          </h1>
          <p className="mt-2 text-stone-600">{service.subheadline}</p>

          {isEmergency ? (
            <div className="mt-5">
              <EmergencyCallBanner />
              <div className="mt-3">
                <HubQuickActions callPrimary />
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <HubQuickActions />
            </div>
          )}

          {isRidgeLinePlumbing && <PlumbingTriageNotice />}

          <div id="get-help" className="mt-8 scroll-mt-6">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEmergency ? "Or send a quick request" : "Send a request"}
            </h2>
            <p className="mt-1 text-sm text-stone-600">Name, phone, city, and what happened.</p>
            <div className="mt-4">
              <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-stone-100" />}>
                <LeadForm
                  pageType="service"
                  serviceCategory={service.serviceCategory}
                  defaultRoute={service.defaultRoute}
                  defaultService={service.headline}
                  initialProblemType={initialProblemType}
                />
              </Suspense>
            </div>
            <div className="mt-4">
              <HubDisclosureLine />
            </div>
          </div>

          <div className="mt-10 border-t border-stone-200 pt-8">
            <p className="leading-relaxed text-stone-700">{service.intro}</p>

            <h2 className="mt-8 text-base font-semibold text-stone-900">Common signs</h2>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-stone-700">
              {service.symptoms.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h2 className="mt-6 text-base font-semibold text-stone-900">What to do now</h2>
            <ol className="mt-2 list-inside list-decimal space-y-1.5 text-sm text-stone-700">
              {service.whatToDo.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <ServiceAreaCrossLinks />

            {service.rhiHandoff && (
              <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                <p className="font-medium text-stone-900">Looking for a full remodel?</p>
                <p className="mt-1">{service.rhiHandoff}</p>
                <a
                  href="https://rhipros.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-medium text-stone-900 underline-offset-2 hover:underline"
                >
                  Visit RHIpros.com
                </a>
              </div>
            )}
          </div>
        </div>
      </article>

      {relatedServices.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 px-4 py-6">
          <div className="mx-auto max-w-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Related
            </h2>
            <ul className="mt-3 space-y-2">
              {relatedServices.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/${related.slug}`}
                    className="text-sm text-stone-800 underline-offset-2 hover:underline"
                  >
                    {related.headline}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ items={service.faqs} />
    </>
  );
}

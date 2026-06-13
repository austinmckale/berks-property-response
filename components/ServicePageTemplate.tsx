import Link from "next/link";
import { Suspense } from "react";
import type { ServicePage } from "@/lib/services";
import { getProvider } from "@/lib/providers";
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
import { CTASection } from "./CTASection";
import { DisclosureBlock } from "./DisclosureBlock";
import { EmergencyNotice } from "./EmergencyNotice";
import { FAQ } from "./FAQ";
import { LeadForm } from "./LeadForm";
import { PhotoUploadPrompt } from "./PhotoUploadPrompt";
import { SchemaScript } from "./SchemaScript";
import { ServiceCard } from "./ServiceCard";

interface ServicePageTemplateProps {
  service: ServicePage;
}

export function generateServiceMetadata(service: ServicePage) {
  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/${service.slug}`,
    noindex: service.noindex,
  });
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const provider = getProvider(service.provider);
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
    service.slug.includes("emergency") || service.slug.includes("sewer-backup");

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />

      <section className="px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {service.needsConfirmation && (
              <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
                CONFIRMATION REQUIRED: Provider scope for this page is not fully verified.
              </div>
            )}

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {service.headline}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{service.subheadline}</p>

            {isEmergency && (
              <div className="mt-6">
                <EmergencyNotice />
              </div>
            )}

            <p className="mt-6 text-slate-700">{service.intro}</p>

            <h2 className="mt-8 text-xl font-bold text-slate-900">Common symptoms</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              {service.symptoms.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-xl font-bold text-slate-900">What to do now</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-700">
              {service.whatToDo.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <div className="mt-8">
              <PhotoUploadPrompt />
            </div>

            <h2 className="mt-8 text-xl font-bold text-slate-900">How we route this request</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              {service.routingNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            {provider && (
              <p className="mt-4 text-sm text-slate-500">
                Default provider route: <strong>{provider.name}</strong>
              </p>
            )}

            {service.rhiHandoff && (
              <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-semibold text-slate-900">Broader remodeling?</p>
                <p className="mt-1 text-slate-600">{service.rhiHandoff}</p>
                <a
                  href="https://rhipros.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-700 hover:underline"
                >
                  Visit RHIpros.com
                </a>
              </div>
            )}

            <div className="mt-8">
              <DisclosureBlock />
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
              <LeadForm
                pageType="service"
                serviceCategory={service.serviceCategory}
                defaultRoute={service.defaultRoute}
                defaultService={service.headline}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {service.relatedSlugs.length > 0 && (
        <section className="bg-slate-50 px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-bold text-slate-900">Related services</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedSlugs.map((slug) => (
                <ServiceCard
                  key={slug}
                  title={slug.replace(/-/g, " ")}
                  description="Learn more about this service in Berks County."
                  href={`/${slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ items={service.faqs} />
      <CTASection />
    </>
  );
}

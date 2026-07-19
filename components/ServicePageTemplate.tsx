import { Suspense } from "react";
import { getRelatedServices, getServiceFaqsForDisplay, type ServicePage } from "@/lib/services";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import { getProvider, hasVerifiedProviderIdentity } from "@/lib/providers";
import {
  breadcrumbSchema,
  combineSchemas,
  faqSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { EmergencyCallBanner } from "./ConversionHub";
import { FAQ } from "./FAQ";
import { inferProblemTypeFromContext } from "@/lib/problemTypes";
import { LeadForm } from "./LeadForm";
import { PlumbingTriageNotice } from "./PlumbingTriageNotice";
import { ProviderTrustStrip } from "./ProviderTrustStrip";
import { RelatedServices } from "./RelatedServices";
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
  const visibleFaqs = getServiceFaqsForDisplay(service);
  const provider = getProvider(service.provider);
  const providerServiceSchema =
    provider && hasVerifiedProviderIdentity(provider)
      ? serviceSchema({
          serviceName: service.headline,
          serviceDescription: service.intro,
          serviceUrl: `/${service.slug}`,
          areaServed: provider.serviceArea,
          providerName: provider.businessName,
          providerUrl: provider.website
            ? `${new URL(provider.website).origin}${new URL(provider.website).pathname}`
            : undefined,
          providerTelephone: provider.phone,
          coordinatorOrganization: true,
        })
      : null;
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: service.title,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
    breadcrumbSchema(crumbs),
    providerServiceSchema,
    faqSchema(visibleFaqs)
  );

  const isEmergency = service.contentOrder === "emergency";
  const isFixturePlumbing =
    service.provider === "evan" || service.defaultRoute === "evan";
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const initialProblemType = inferProblemTypeFromContext({
    serviceCategory: service.serviceCategory,
    defaultRoute: service.defaultRoute,
    slug: service.slug,
  });
  const form = (
    <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-stone-100" />}>
      <LeadForm
        pageType="service"
        serviceCategory={service.serviceCategory}
        defaultRoute={service.defaultRoute}
        defaultService={service.headline}
        initialProblemType={initialProblemType}
        defaultPropertyType={service.defaultPropertyType ?? "residential"}
      />
    </Suspense>
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />

      <article className="section-pad px-4">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            {service.headline}
          </h1>
          <p className="mt-2 leading-relaxed text-stone-600">{service.subheadline}</p>
          {isEmergency ? (
            <div className="mt-5">
              <EmergencyCallBanner headline="Call for urgent help" />
              <p className="mt-3 text-sm text-stone-600">
                <a href="#get-help" className="font-medium text-stone-900 underline">
                  Send a request
                </a>
              </p>
            </div>
          ) : null}
          <div id="sticky-cta-marker" className="h-px" aria-hidden />

          {isFixturePlumbing && <PlumbingTriageNotice />}

          {isEmergency ? (
            <>
              <section className="mt-7">
                <h2 className="text-lg font-semibold text-stone-900">What to do now</h2>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-stone-700">
                  {service.whatToDo.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="font-semibold text-red-700">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
              <div id="get-help" className="mt-8 scroll-mt-24 border-t border-stone-200 pt-8">
                <h2 className="text-lg font-semibold text-stone-900">Or send a request</h2>
                <div className="mt-4">{form}</div>
              </div>
            </>
          ) : (
            <>
              <section className="mt-7">
                <p className="leading-relaxed text-stone-700">{service.intro}</p>
                <h2 className="mt-7 text-lg font-semibold text-stone-900">
                  Common signs and decision points
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.symptoms.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <div className="mt-6">
                <ProviderTrustStrip providerId={service.provider} />
              </div>
              <div id="get-help" className="mt-8 scroll-mt-24 border-t border-stone-200 pt-8">
                <h2 className="text-lg font-semibold text-stone-900">Send a request</h2>
                <p className="mt-1 text-sm text-stone-600">
                  Describe the symptoms and the provider can confirm whether this is the right service.
                </p>
                <div className="mt-4">{form}</div>
              </div>
            </>
          )}

          <section className="mt-10 border-t border-stone-200 pt-8">
            {isEmergency && (
              <>
                <p className="leading-relaxed text-stone-700">{service.intro}</p>
                <h2 className="mt-7 text-lg font-semibold text-stone-900">Common signs</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.symptoms.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ProviderTrustStrip providerId={service.provider} />
                </div>
              </>
            )}

            {!isEmergency && (
              <>
                <h2 className="text-lg font-semibold text-stone-900">
                  Information to gather
                </h2>
                <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-stone-700">
                  {service.whatToDo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </>
            )}

            <ServiceAreaCrossLinks />

            {service.rhiHandoff && provider?.website && (
              <p className="mt-6 text-sm leading-relaxed text-stone-700">
                {service.rhiHandoff}{" "}
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="partner_click"
                  data-analytics-provider="rhi"
                  data-analytics-partner-name="RHI Pros"
                  data-analytics-source="service_page"
                  className="inline-flex min-h-11 items-center font-medium text-stone-900 underline-offset-2 hover:underline"
                >
                  Visit RHIpros.com
                </a>
              </p>
            )}
          </section>
        </div>
      </article>

      <RelatedServices services={relatedServices} />

      <FAQ items={visibleFaqs} />
    </>
  );
}

import { Suspense } from "react";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaLinks } from "@/components/ServiceAreaLinks";
import { TriageCards } from "@/components/TriageCards";
import { HubDisclosureLine } from "@/components/ConversionHub";
import { homeFaqs } from "@/lib/homeFaqs";
import { homeMetadata } from "@/lib/seo";
import {
  combineSchemas,
  faqSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata = homeMetadata();

export default function HomePage() {
  const schemas = combineSchemas(
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      title: "Berks Property Response",
      description:
        "Drain backup, plumbing leak, or water damage in Berks County? Call now or send a quick request.",
      path: "/",
    }),
    faqSchema(homeFaqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        headline="Drain backup, leak, or water damage in Berks County?"
        subheadline="Call now or pick what happened below."
        showEmergency
        showTrustLine
      />
      <TriageCards />
      <section id="get-help" className="border-t border-stone-200 bg-stone-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-lg">
          <h2 className="text-center text-xl font-semibold text-stone-900">
            Send a quick request
          </h2>
          <p className="mt-1 text-center text-sm text-stone-600">
            Pick a category above first, then add your details.
          </p>
          <div className="mt-5">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}>
              <LeadForm pageType="home" externalProblemSelection />
            </Suspense>
          </div>
          <div className="mt-4 text-center">
            <HubDisclosureLine />
          </div>
        </div>
      </section>
      <ServiceAreaLinks />
      <FAQ items={homeFaqs.slice(0, 4)} title="Quick answers" />
    </>
  );
}

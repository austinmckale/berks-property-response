import { Suspense } from "react";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HubDisclosureLine } from "@/components/ConversionHub";
import { LeadForm } from "@/components/LeadForm";
import { LocalTrustSection } from "@/components/LocalTrustSection";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaLinks } from "@/components/ServiceAreaLinks";
import { TriageCards } from "@/components/TriageCards";
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
        "Not sure who to call for a leak, drain backup, or water damage in Berks County? Get routed to a local independent provider.",
      path: "/",
    }),
    faqSchema(homeFaqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        variant="home"
        headline="Not sure who to call for a leak, drain backup, or water damage?"
        subheadline="Berks Property Response helps homeowners across Berks County get routed to the right local independent provider."
        showTrustLine
      />
      <TriageCards />
      <section
        id="get-help"
        className="section-pad scroll-mt-6 border-y border-stone-200 bg-brand-subtle px-4"
      >
        <div className="page-container">
          <p className="eyebrow text-center">Request help</p>
          <h2 className="font-display mt-2 text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
            Tell us what&apos;s going on
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-stone-600">
            Name, phone, city, and a short description. Pick a category above first if you can.
          </p>
          <div className="mt-6">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}>
              <LeadForm pageType="home" externalProblemSelection />
            </Suspense>
          </div>
          <div className="mt-4 text-center">
            <HubDisclosureLine />
          </div>
        </div>
      </section>
      <LocalTrustSection />
      <ServiceAreaLinks />
      <FAQ items={homeFaqs.slice(0, 4)} title="Quick answers" />
    </>
  );
}

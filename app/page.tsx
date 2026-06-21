import { Suspense } from "react";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HomeSteps } from "@/components/HomeSteps";
import { LeadForm } from "@/components/LeadForm";
import { ProviderRouting } from "@/components/ProviderRouting";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaLinks } from "@/components/ServiceAreaLinks";
import { SymptomCards, TriageCards } from "@/components/TriageCards";
import { TrustSection } from "@/components/TrustSection";
import { homeFaqs } from "@/lib/homeFaqs";
import { homeMetadata } from "@/lib/seo";
import {
  combineSchemas,
  faqSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import { TAGLINE } from "@/lib/siteConfig";

export const metadata = homeMetadata();

export default function HomePage() {
  const schemas = combineSchemas(
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      title: "Berks Property Response",
      description: TAGLINE,
      path: "/",
    }),
    faqSchema(homeFaqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        headline="Not sure who to call for a leak, drain backup, water damage, or property repair issue?"
        subheadline="Berks Property Response helps route Berks County homeowners to the right local provider. One request — we review it and connect you with independent local help."
        showEmergency
        showTrustLine
      />
      <TriageCards />
      <SymptomCards />
      <HomeSteps />
      <TrustSection />
      <ProviderRouting />
      <section className="border-t border-stone-200 bg-white px-4 py-10 md:py-12">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-xl font-semibold text-stone-900 md:text-2xl">
            Start a property response request
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Tell us what&apos;s going on. No obligation to hire.
          </p>
          <div className="mt-6">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-100" />}>
              <LeadForm pageType="home" />
            </Suspense>
          </div>
        </div>
      </section>
      <ServiceAreaLinks />
      <FAQ items={homeFaqs} title="Common questions" />
      <section className="px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <DisclosureBlock />
        </div>
      </section>
      <CTASection
        title="Get routed to the right local provider"
        subtitle="Call, send details, or start a request — Berks County provider network."
      />
    </>
  );
}

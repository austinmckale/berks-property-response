import { Suspense } from "react";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HomeIntakeSection } from "@/components/HomeIntakeSection";
import { LocalTrustSection } from "@/components/LocalTrustSection";
import { WhyBprSection } from "@/components/WhyBprSection";
import { CoordinatorSection } from "@/components/CoordinatorSection";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaLinks } from "@/components/ServiceAreaLinks";
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
        "One local contact for drain backups, plumbing leaks, and water-damage repairs in Berks County.",
      path: "/",
    }),
    faqSchema(homeFaqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        variant="home"
        eyebrow="Local property response coordination"
        headline="One local contact for drain, plumbing, and water-damage problems."
        subheadline="Tell us what happened. A local Berks Property Response coordinator will personally review the request and coordinate the appropriate provider handoff."
        showTrustLine
      />
      <Suspense fallback={<div className="section-pad h-96 animate-pulse bg-brand-subtle" />}>
        <HomeIntakeSection />
      </Suspense>
      <WhyBprSection />
      <CoordinatorSection />
      <LocalTrustSection />
      <ServiceAreaLinks />
      <FAQ items={homeFaqs.slice(0, 5)} title="Quick answers" />
    </>
  );
}

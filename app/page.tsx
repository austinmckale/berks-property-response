import { Suspense } from "react";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HomeIntakeSection } from "@/components/HomeIntakeSection";
import { SchemaScript } from "@/components/SchemaScript";
import { homePageFaqs } from "@/lib/homeFaqs";
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
    faqSchema(homePageFaqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        variant="home"
        eyebrow="Local help in Berks County"
        headline="Drain, plumbing, or water damage?"
        subheadline="Tell us what happened. We’ll help connect you with the right local provider."
        showTrustLine
      />
      <Suspense fallback={<div className="section-pad h-96 animate-pulse bg-brand-subtle" />}>
        <HomeIntakeSection />
      </Suspense>
      <FAQ items={homePageFaqs} title="Quick answers" compact />
    </>
  );
}

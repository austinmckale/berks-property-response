import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeIntakeSection } from "@/components/HomeIntakeSection";
import { HomepageSections } from "@/components/HomepageSections";
import { SchemaScript } from "@/components/SchemaScript";
import { homeMetadata } from "@/lib/seo";
import {
  combineSchemas,
  faqSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import { homepageFaqs } from "@/lib/homepageContent";

export const metadata = homeMetadata();

export default function HomePage() {
  const schemas = combineSchemas(
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      title: "Drain, Plumbing & Water Damage Help in Berks County, PA",
      description:
        "Local help routing drain backups, fixture leaks, and water-damage repair across Berks County.",
      path: "/",
    }),
    faqSchema([...homepageFaqs])
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        variant="home"
        eyebrow="Local help in Berks County"
        headline="Drain, plumbing, or water damage?"
        subheadline="Choose the closest problem, then send the details."
      />
      <Suspense fallback={<div className="section-pad h-96 animate-pulse bg-brand-subtle" />}>
        <HomeIntakeSection />
      </Suspense>
      <HomepageSections />
    </>
  );
}

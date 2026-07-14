import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeIntakeSection } from "@/components/HomeIntakeSection";
import { SchemaScript } from "@/components/SchemaScript";
import { homeMetadata } from "@/lib/seo";
import {
  combineSchemas,
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
      title: "Drain, Plumbing & Water Damage Help",
      description:
        "Get local help for drain backups, plumbing leaks, and water damage across Berks County.",
      path: "/",
    })
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
    </>
  );
}

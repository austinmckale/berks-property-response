import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { Hero } from "@/components/Hero";
import { HomeSteps } from "@/components/HomeSteps";
import { ProviderRouting } from "@/components/ProviderRouting";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaLinks } from "@/components/ServiceAreaLinks";
import { SymptomCards, TriageCards } from "@/components/TriageCards";
import { homeMetadata } from "@/lib/seo";
import {
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { TAGLINE } from "@/lib/siteConfig";

export const metadata = homeMetadata();

export default function HomePage() {
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Berks Property Response",
      description: TAGLINE,
      path: "/",
    })
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Hero
        headline="Need plumbing, drain, water damage, or repair help in Berks County?"
        subheadline="Call, text a photo, or request help—we connect you with local specialists."
        showEmergency
      />
      <TriageCards />
      <SymptomCards />
      <HomeSteps />
      <ProviderRouting />
      <ServiceAreaLinks />
      <section className="hidden px-4 py-10 md:block">
        <div className="mx-auto max-w-3xl">
          <DisclosureBlock />
        </div>
      </section>
      <CTASection />
    </>
  );
}

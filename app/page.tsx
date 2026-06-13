import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
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

const whyUseItems = [
  {
    title: "One intake point",
    description: "Call, text photos, or submit a form—one place to start for property problems in Berks County.",
  },
  {
    title: "Photo & video friendly",
    description: "Send pictures of drains, leaks, or damage so providers can triage faster.",
  },
  {
    title: "Local Berks County routing",
    description: "Requests are routed to approved local providers based on the type of issue.",
  },
  {
    title: "Urgency-based routing",
    description: "Sewer backups and emergencies are prioritized differently than estimate-only repair requests.",
  },
  {
    title: "Transparent referral disclosure",
    description: "We disclose that we may receive compensation when service is booked through a partner.",
  },
];

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
        subheadline="Tell us what happened and we'll route your request to the right local provider for drain service, small plumbing repairs, water damage repair, or contractor-level property repairs."
        showEmergency
      />
      <TriageCards />
      <SymptomCards />
      <ProviderRouting />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why use Berks Property Response?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUseItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Berks Property Response is not the company performing the work. Actual service is provided by independent local partners.
          </p>
        </div>
      </section>

      <ServiceAreaLinks />
      <CTASection />

      <section className="px-4 pb-12 text-center">
        <Link href="/how-it-works" className="text-sm font-medium text-blue-700 hover:underline">
          Learn how routing works →
        </Link>
      </section>
    </>
  );
}

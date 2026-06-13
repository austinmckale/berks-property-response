import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { LeadForm } from "@/components/LeadForm";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "How It Works | Berks Property Response",
  description:
    "Learn how Berks Property Response routes plumbing, drain, water damage, and repair requests to local providers in Berks County.",
  path: "/how-it-works",
});

const steps = [
  {
    step: "1",
    title: "Tell us what happened",
    body: "Call, text photos, or submit the request form. Describe symptoms, urgency, and property type.",
  },
  {
    step: "2",
    title: "We triage your request",
    body: "Based on your description, we identify whether the issue is drain/sewer, small plumbing, water damage repair, or needs manual review.",
  },
  {
    step: "3",
    title: "Route to a local provider",
    body: "Drain and sewer issues route to Apex Drain Services. Build-back repair routes to RHI Pros. Small plumbing may route to Evan Simons once scope is confirmed.",
  },
  {
    step: "4",
    title: "Provider handles the work",
    body: "The selected provider contacts you directly. Berks Property Response does not perform the service work.",
  },
];

export default function HowItWorksPage() {
  const crumbs = breadcrumbItems([{ name: "How It Works", path: "/how-it-works" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "How It Works",
      description: "How Berks Property Response routes property service requests.",
      path: "/how-it-works",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">How it works</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Berks Property Response is a transparent intake and referral site. We help you figure out what type of service you need and connect you with an independent local provider.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((s) => (
              <div key={s.step} className="rounded-xl border border-slate-200 bg-white p-6">
                <span className="text-2xl font-bold text-blue-700">{s.step}</span>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{s.title}</h2>
                <p className="mt-2 text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <DisclosureBlock />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-200" />}>
            <LeadForm pageType="how-it-works" />
          </Suspense>
        </div>
      </section>

      <CTASection />
    </>
  );
}

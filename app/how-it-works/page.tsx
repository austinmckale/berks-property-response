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
import { HOME_STEPS } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "How Berks Property Response helps Berks County homeowners describe property issues and get routed to the right independent local provider. No obligation to hire.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const crumbs = breadcrumbItems([
    { name: "How it works", path: "/how-it-works" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "How It Works",
      description: "How Berks Property Response routes property requests in Berks County.",
      path: "/how-it-works",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">How Berks Property Response works</h1>
          <p className="mt-4 text-lg text-stone-600">
            Berks Property Response is a local intake and matching service for drain backups,
            plumbing leaks, water damage, repair work, and other urgent property issues across
            Berks County. We help you describe the problem — we do not perform the work directly.
          </p>
          <ol className="mt-10 space-y-8">
            {HOME_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-semibold text-stone-900">{step.title}</h2>
                  <p className="mt-2 text-stone-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 space-y-4 text-stone-700">
            <h2 className="text-lg font-semibold text-stone-900">Good to know</h2>
            <ul className="list-inside list-disc space-y-2 text-sm md:text-base">
              <li>Submitting a request does not create an obligation to hire.</li>
              <li>Berks Property Response does not charge homeowners a fee to submit a request.</li>
              <li>Independent providers handle pricing, scheduling, estimates, workmanship, and warranties.</li>
              <li>Confirm licensing and insurance directly with the provider before work begins.</li>
            </ul>
          </div>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <section className="border-t border-stone-200 bg-stone-50 px-4 py-10">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-center text-lg font-semibold text-stone-900">
            Start a property response request
          </h2>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-200" />}>
            <LeadForm pageType="how-it-works" />
          </Suspense>
        </div>
      </section>
      <CTASection
        title="Get routed to the right local provider"
        subtitle="Tell us what's going on in Berks County."
      />
    </>
  );
}

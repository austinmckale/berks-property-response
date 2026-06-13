import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
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
  title: "How This Site Works | Berks Property Response",
  description:
    "How Berks Property Response connects homeowners in Berks County with local drain, plumbing, and repair specialists.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "You tell us what's wrong",
    body: "Call, text a photo, or fill out a short form. Include your city and a plain description of the problem.",
  },
  {
    title: "We connect you with the right local help",
    body: "Drain and sewer issues, small plumbing repairs, and repair-after-leak work go to different local specialists based on what you describe.",
  },
  {
    title: "The local company handles the job",
    body: "They contact you directly and perform the work. Berks Property Response helps you get started—we are not the contractor on site.",
  },
];

export default function HowItWorksPage() {
  const crumbs = breadcrumbItems([
    { name: "How this site works", path: "/how-it-works" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "How This Site Works",
      description: "How Berks Property Response connects you with local help.",
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
          <h1 className="text-3xl font-semibold text-stone-900">How this site works</h1>
          <p className="mt-4 text-lg text-stone-600">
            Berks Property Response is a local help line for drain, plumbing, and post-leak repair questions in Berks County. We connect you with independent local specialists—we don&apos;t perform the work ourselves.
          </p>
          <ol className="mt-10 space-y-8">
            {steps.map((step, index) => (
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
        </div>
      </section>
      <section className="border-t border-stone-200 bg-stone-50 px-4 py-10">
        <div className="mx-auto max-w-xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-200" />}>
            <LeadForm pageType="how-it-works" />
          </Suspense>
        </div>
      </section>
      <CTASection />
    </>
  );
}

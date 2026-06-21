import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HubActionButtons } from "@/components/HubActionButtons";
import { LeadForm } from "@/components/LeadForm";
import { SchemaScript } from "@/components/SchemaScript";
import { FUTURE_SERVICE_DISCLAIMER } from "@/lib/disclosures";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Storm, Fire & Mold Help | Berks County Property Issues",
  description:
    "Storm, fire, smoke, mold, hail, or roof leak concerns in Berks County? We review your request and route it when a suitable local provider connection exists.",
  path: "/storm-fire-mold-help",
});

const reviewCategories = [
  "Storm or wind damage to the home",
  "Fire or smoke damage",
  "Mold or moisture concerns after a water event",
  "Hail damage",
  "Roof leak-related interior damage",
  "Basement flooding (non-drain causes)",
  "Emergency board-up or major structural concerns",
];

export default function StormFireMoldHelpPage() {
  const crumbs = breadcrumbItems([
    { name: "Storm / Fire / Mold Help", path: "/storm-fire-mold-help" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Storm, Fire & Mold Help",
      description: FUTURE_SERVICE_DISCLAIMER,
      path: "/storm-fire-mold-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">
            Storm, fire, mold, and major property issues
          </h1>
          <p className="mt-4 text-lg text-stone-600">{FUTURE_SERVICE_DISCLAIMER}</p>
          <p className="mt-4 leading-relaxed text-stone-700">
            Berks Property Response is a local intake and matching service — not a restoration
            company, roofer, or mold remediation contractor. For active drain backups, fixture
            leaks, or water damage build-back with confirmed provider lanes, use our{" "}
            <Link href="/emergency" className="font-medium text-stone-900 underline">
              emergency
            </Link>
            ,{" "}
            <Link href="/plumbing-and-leaks" className="font-medium text-stone-900 underline">
              plumbing
            </Link>
            , or{" "}
            <Link href="/after-leak" className="font-medium text-stone-900 underline">
              water damage
            </Link>{" "}
            paths when those fit your situation.
          </p>

          <div className="mt-6">
            <HubActionButtons />
          </div>

          <h2 className="mt-10 text-lg font-semibold text-stone-900">
            Issues we may review for provider connections
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-stone-700">
            {reviewCategories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            Availability varies. We do not promise immediate response for every category.
            Submitting a request does not create an obligation to hire.
          </p>

          <div className="mt-8">
            <DisclosureBlock />
          </div>

          <div className="mt-10 border-t border-stone-200 pt-10">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-100" />}>
              <LeadForm
                pageType="major-property"
                serviceCategory="major_property"
                defaultRoute="manual_review"
                defaultService="Major property issue review"
                initialProblemType="major-property"
              />
            </Suspense>
          </div>
        </div>
      </section>
      <CTASection
        title="Send details about the problem"
        subtitle="We review major property requests and route them when a suitable connection exists."
      />
    </>
  );
}

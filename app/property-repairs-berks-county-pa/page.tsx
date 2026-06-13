import Link from "next/link";
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
  title: "Property Repairs After Plumbing Events | Berks County, PA",
  description:
    "Build-back repairs after plumbing, drain, or water damage events in Berks County. Drywall, flooring, ceiling, and trim repair after the source is stopped.",
  path: "/property-repairs-berks-county-pa",
});

export default function PropertyRepairsPage() {
  const crumbs = breadcrumbItems([
    { name: "Property Repairs", path: "/property-repairs-berks-county-pa" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Property Repairs After Plumbing Events",
      description: "Build-back and contractor repairs after plumbing or water events.",
      path: "/property-repairs-berks-county-pa",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold text-stone-900">
            Property repairs after plumbing or water events
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            After a leak, backup, or drain emergency is resolved, you may need drywall, flooring, ceiling, trim, or cabinet repair. Tell us what was damaged and we will connect you with local build-back help.
          </p>
          <p className="mt-4 text-stone-700">
            Berks Property Response focuses on plumbing-related problems and repairs after leaks—not general remodeling. For full remodels, basement finishing, roofing, or large construction projects, visit{" "}
            <a
              href="https://rhipros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-900 underline hover:text-stone-600"
            >
              RHIpros.com
            </a>
            .
          </p>
          <ul className="mt-6 space-y-2 text-stone-700">
            <li>
              <Link
                href="/drywall-repair-after-plumbing-leak-berks-county-pa"
                className="font-medium text-stone-900 underline hover:text-stone-600"
              >
                Drywall repair after a plumbing leak →
              </Link>
            </li>
            <li>
              <Link
                href="/flooring-repair-after-water-damage-berks-county-pa"
                className="font-medium text-stone-900 underline hover:text-stone-600"
              >
                Flooring repair after water damage →
              </Link>
            </li>
            <li>
              <Link
                href="/ceiling-repair-from-plumbing-leak-berks-county-pa"
                className="font-medium text-stone-900 underline hover:text-stone-600"
              >
                Ceiling repair from a plumbing leak →
              </Link>
            </li>
            <li>
              <Link
                href="/basement-repair-after-water-backup-berks-county-pa"
                className="font-medium text-stone-900 underline hover:text-stone-600"
              >
                Basement repair after a floor drain or sewer backup →
              </Link>
            </li>
            <li>
              <Link
                href="/water-damage-repair-after-leak-berks-county-pa"
                className="font-medium text-stone-900 underline hover:text-stone-600"
              >
                Water damage repair after a leak →
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <section className="border-t border-stone-200 bg-stone-50 px-4 py-10">
        <div className="mx-auto max-w-xl">
          <h2 className="text-xl font-semibold text-stone-900">Request repair help</h2>
          <p className="mt-2 text-sm text-stone-600">
            Describe the damage after the plumbing or water event is under control.
          </p>
          <div className="mt-6">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-stone-100" />}>
              <LeadForm
                pageType="property-repairs"
                initialProblemType="water-damage"
              />
            </Suspense>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

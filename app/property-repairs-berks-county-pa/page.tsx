import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
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
    "Contractor-level property repairs after plumbing, drain, or water damage events in Berks County. Routed to RHI Pros. Broader remodeling at RHIpros.com.",
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
          <h1 className="text-3xl font-bold text-slate-900">
            Property repairs after plumbing or water events
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            After a leak, backup, or drain emergency is resolved, you may need drywall, flooring, ceiling, trim, or cabinet repair. We route that build-back work to RHI Pros.
          </p>
          <p className="mt-4 text-slate-700">
            Berks Property Response does not overbuild general remodeling here. For full remodels, basement finishing, roofing, or large construction projects, visit{" "}
            <a href="https://rhipros.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              RHIpros.com
            </a>.
          </p>
          <ul className="mt-6 space-y-2">
            <li>
              <Link href="/water-damage-repair-after-leak-berks-county-pa" className="text-blue-700 hover:underline">
                Water damage repair after a leak →
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

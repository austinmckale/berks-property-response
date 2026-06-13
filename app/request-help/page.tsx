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
  title: "Request Help | Berks Property Response",
  description:
    "Submit a property service request in Berks County. Plumbing, drains, water damage, and repair routing to local providers.",
  path: "/request-help",
});

export default function RequestHelpPage() {
  const crumbs = breadcrumbItems([{ name: "Request Help", path: "/request-help" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Request Help",
      description: "Submit a service request in Berks County.",
      path: "/request-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">Request help</h1>
          <p className="mt-4 text-slate-600">
            Describe your issue and we&apos;ll route your request to the right-fit local provider. Photos help providers respond faster.
          </p>
          <div className="mt-6">
            <DisclosureBlock />
          </div>
          <div className="mt-8">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
              <LeadForm pageType="request-help" />
            </Suspense>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

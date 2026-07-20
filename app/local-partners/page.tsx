import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProviderCard } from "@/components/ProviderCard";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import { providers } from "@/lib/providers";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Local Partners",
  description:
    "Independent local providers for drain, plumbing, and property-repair requests coordinated through Berks Property Response in Berks County, PA.",
  path: "/local-partners",
});

export default function LocalPartnersPage() {
  const crumbs = breadcrumbItems([{ name: "Local partners", path: "/local-partners" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Partners",
      description:
        "Independent local providers coordinated through Berks Property Response in Berks County.",
      path: "/local-partners",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="section-pad px-4">
        <div className="page-container-wide md:max-w-4xl">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            Local provider network
          </h1>
          <p className="mt-3 leading-relaxed text-stone-600">
            Choose the provider lane that matches the problem. The provider confirms availability,
            scope, and pricing.
          </p>
          <Link
            href="/request-help"
            data-analytics-event="click_request_help"
            data-analytics-source="local_partners_top"
            className="btn-primary mt-5 w-full sm:w-auto"
          >
            Start a request
          </Link>

          <div className="mt-8 space-y-6">
            <ProviderCard
              provider={providers.apex}
              showServiceLinks
              intakeOnly
            />
            <ProviderCard
              provider={providers.evan}
              showServiceLinks
              intakeOnly
            />
            <ProviderCard provider={providers.rhi} showServiceLinks intakeOnly />
          </div>

          <p className="mt-8 text-sm leading-relaxed text-stone-500">
            Provider availability and service scope may vary.
            <Link
              href="/disclosure"
              className="ml-1 inline-flex min-h-11 items-center underline underline-offset-2 hover:text-stone-700"
            >
              How coordination works
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

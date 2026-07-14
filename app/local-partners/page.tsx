import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProviderCard } from "@/components/ProviderCard";
import { SchemaScript } from "@/components/SchemaScript";
import { PROVIDER_AVAILABILITY_NOTE } from "@/lib/disclosures";
import { providers } from "@/lib/providers";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Local Partners",
  description:
    "Local companies for drain, plumbing, and property-repair needs in Berks County.",
  path: "/local-partners",
});

const providerNotes: Record<string, string> = {
  apex: "Drain cleaning, sewer backups, main lines, hydro jetting, sewer cameras, and commercial drain work.",
  evan: "Fixture leaks, toilets, faucets, shutoff valves, water heaters, and smaller residential plumbing repairs.",
  rhi: "Drywall, flooring, ceilings, painting, demolition, and repair after plumbing or water events.",
};

export default function LocalPartnersPage() {
  const crumbs = breadcrumbItems([{ name: "Local partners", path: "/local-partners" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Partners",
      description: "Drain, plumbing, and property-repair companies in Berks County.",
      path: "/local-partners",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="section-pad px-4">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            Local partners
          </h1>

          <Link
            href="/request-help"
            data-analytics-event="click_request_help"
            data-analytics-source="local_partners"
            className="btn-primary mt-5 w-full"
          >
            Send a request
          </Link>

          <div className="mt-8 space-y-4">
            <ProviderCard provider={providers.apex} note={providerNotes.apex} intakeOnly />
            <ProviderCard provider={providers.evan} note={providerNotes.evan} intakeOnly />
            <ProviderCard provider={providers.rhi} note={providerNotes.rhi} intakeOnly />
          </div>

          <p className="mt-6 text-sm text-stone-600">{PROVIDER_AVAILABILITY_NOTE}</p>
        </div>
      </section>
    </>
  );
}

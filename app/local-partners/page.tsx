import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubDisclosureLine, HubQuickActions } from "@/components/ConversionHub";
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
  title: "Local Provider Network",
  description:
    "Independent local providers Berks Property Response may connect you with in Berks County.",
  path: "/local-partners",
});

const providerNotes: Record<string, string> = {
  apex: "Drain cleaning, sewer backups, main line clogs, hydro jetting, and urgent drain issues.",
  evan: "Smaller plumbing and fixture-level repairs — toilets, faucets, supply lines, and basic leaks.",
  rhi: "Water damage repair, drywall, paint, flooring, ceilings, and build-back after leaks.",
};

export default function LocalPartnersPage() {
  const crumbs = breadcrumbItems([{ name: "Local provider network", path: "/local-partners" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Provider Network",
      description: "Independent local providers in Berks County.",
      path: "/local-partners",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-6 md:py-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            Local provider network
          </h1>
          <p className="mt-2 text-stone-600">
            Berks Property Response connects you with independent local specialists based on your
            request. We do not perform the work directly.
          </p>

          <div className="mt-5">
            <HubQuickActions />
          </div>

          <div className="mt-8 space-y-4">
            <ProviderCard provider={providers.apex} note={providerNotes.apex} intakeOnly />
            <ProviderCard provider={providers.evan} note={providerNotes.evan} intakeOnly />
            <ProviderCard provider={providers.rhi} note={providerNotes.rhi} intakeOnly />
          </div>

          <p className="mt-6 text-sm text-stone-600">{PROVIDER_AVAILABILITY_NOTE}</p>

          <Link
            href="/request-help"
            className="btn-touch-lg mt-6 block rounded-xl bg-stone-900 py-4 text-center font-semibold text-white active:bg-stone-800"
          >
            Send a request
          </Link>

          <div className="mt-4">
            <HubDisclosureLine />
          </div>
        </div>
      </section>
    </>
  );
}

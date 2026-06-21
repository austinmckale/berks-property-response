import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclosureBlock } from "@/components/DisclosureBlock";
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
    "Independent local providers in the Berks Property Response network — Apex Drain Services, Ridge Line Plumbing, and RHI Pros.",
  path: "/local-partners",
});

const providerNotes: Record<string, string> = {
  apex: "Drain cleaning, sewer backups, main line clogs, hydro jetting, and urgent drain or sewer issues.",
  evan: "Smaller plumbing and fixture-level repairs — toilets, faucets, supply lines, shutoff valves, and basic leaks.",
  rhi: "Water damage repair, drywall, paint, flooring, ceilings, demo, and build-back after leaks or property damage.",
};

export default function LocalPartnersPage() {
  const crumbs = breadcrumbItems([{ name: "Local provider network", path: "/local-partners" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Provider Network",
      description: "Independent local providers Berks Property Response may connect you with in Berks County.",
      path: "/local-partners",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold text-stone-900">Local Provider Network</h1>
          <p className="mt-4 max-w-3xl text-stone-600">
            Berks Property Response routes requests to independent local providers based on what
            you describe. We do not perform the work directly. {/* PLACEHOLDER: Add provider bios/photos when available. */}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ProviderCard provider={providers.apex} note={providerNotes.apex} />
            <ProviderCard provider={providers.evan} note={providerNotes.evan} />
            <ProviderCard provider={providers.rhi} note={providerNotes.rhi} />
          </div>
          <p className="mt-6 text-sm text-stone-600">{PROVIDER_AVAILABILITY_NOTE}</p>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
    </>
  );
}

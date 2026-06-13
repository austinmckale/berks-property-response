import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { ProviderCard } from "@/components/ProviderCard";
import { SchemaScript } from "@/components/SchemaScript";
import { providers } from "@/lib/providers";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Local Partners | Berks Property Response",
  description:
    "Independent local providers that Berks Property Response may route requests to in Berks County.",
  path: "/local-partners",
});

export default function LocalPartnersPage() {
  const crumbs = breadcrumbItems([{ name: "Local Partners", path: "/local-partners" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Partners",
      description: "Local provider partners for Berks Property Response routing.",
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
          <h1 className="text-3xl font-bold text-slate-900">Local partners</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Berks Property Response routes requests to independent local providers. We do not perform the service work directly.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ProviderCard provider={providers.apex} />
            <ProviderCard
              provider={providers.evan}
              note="CONFIRMATION REQUIRED — scope partially verified"
            />
            <ProviderCard provider={providers.rhi} />
          </div>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
    </>
  );
}

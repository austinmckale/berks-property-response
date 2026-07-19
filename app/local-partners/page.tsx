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
            Berks Property Response coordinates requests across specialized local providers in
            Berks County. Each provider handles a defined type of work, confirms availability and
            scope, and performs the job independently.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Use the service pages below to learn which lane fits your problem, or{" "}
            <Link
              href="/request-help"
              className="font-semibold text-stone-900 underline underline-offset-2"
            >
              send a request
            </Link>{" "}
            with photos and location details.
          </p>

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
            Provider availability and service scope may vary. See{" "}
            <Link href="/disclosure" className="underline underline-offset-2 hover:text-stone-700">
              disclosure
            </Link>{" "}
            for how coordination works.
          </p>
        </div>
      </section>
    </>
  );
}

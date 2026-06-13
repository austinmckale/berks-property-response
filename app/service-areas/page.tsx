import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { SchemaScript } from "@/components/SchemaScript";
import { cities } from "@/lib/cities";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Service Areas | Berks Property Response",
  description:
    "Berks County service areas for plumbing, drain, water damage, and property repair intake and routing.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const crumbs = breadcrumbItems([{ name: "Service Areas", path: "/service-areas" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Service Areas",
      description: "Berks County service areas.",
      path: "/service-areas",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">Service areas</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Berks Property Response routes property service requests across Berks County, PA. Each city page includes local context—not mass-generated doorway content.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300"
              >
                <h2 className="font-bold text-slate-900">{city.name}, PA</h2>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{city.intro}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

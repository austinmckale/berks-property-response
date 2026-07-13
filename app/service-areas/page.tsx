import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { HubLandingPage } from "@/components/HubLandingPage";
import { cities } from "@/lib/cities";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Service Areas",
  description:
    "Berks County service areas for plumbing, drain, water damage, and property repair help.",
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
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Service areas"
        subtitle="Pick your city — call or send a request for local help."
        middle={
          <div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/service-areas/${city.slug}`}
                  className="btn-touch rounded-xl border-2 border-stone-200 bg-white px-3 py-4 text-center text-sm font-semibold text-stone-900 active:bg-stone-50 hover:border-stone-400"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <Link
              href="/request-help"
              data-analytics-event="click_request_help"
              data-analytics-source="service_areas"
              className="btn-primary mt-6 w-full md:hidden"
            >
              Request local help
            </Link>
          </div>
        }
        showForm={false}
      />
    </>
  );
}

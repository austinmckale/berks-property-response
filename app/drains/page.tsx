import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Drains & Jetting | Berks Property Response",
  description:
    "Clogged drains, recurring blockages, and hydro jetting help in Berks County. Call or describe the problem.",
  path: "/drains",
});

const drainServices = [
  {
    href: "/drain-cleaning-berks-county-pa",
    title: "Drain cleaning",
    description: "Slow sinks, tubs, floor drains, and recurring clogs.",
  },
  {
    href: "/hydro-jetting-berks-county-pa",
    title: "Hydro jetting",
    description: "Grease, roots, or clogs that keep coming back.",
  },
  {
    href: "/sewer-camera-inspection-berks-county-pa",
    title: "Sewer camera inspection",
    description: "Find the cause before clearing or repairing the line.",
  },
  {
    href: "/main-sewer-line-clog-reading-pa",
    title: "Main sewer line clog",
    description: "Multiple fixtures backing up at once.",
  },
  {
    href: "/commercial-drain-cleaning-berks-county-pa",
    title: "Commercial drain cleaning",
    description: "Restaurants, grease lines, and business floor drains.",
  },
];

export default function DrainsHubPage() {
  const crumbs = breadcrumbItems([{ name: "Drains & jetting", path: "/drains" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Drains & Jetting",
      description: "Drain and jetting help in Berks County.",
      path: "/drains",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">Drains &amp; jetting</h1>
          <p className="mt-4 text-lg text-stone-600">
            Clogged or slow drains in Berks County? Pick the situation closest to yours, or call if water is backing up now.
          </p>
          <ul className="mt-8 space-y-3">
            {drainServices.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-stone-400"
                >
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  <span className="mt-1 block text-sm text-stone-600">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaScript";
import { getPublishedGuides } from "@/lib/guides";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export function generateMetadata() {
  const guides = getPublishedGuides();
  if (guides.length === 0) {
    return buildMetadata({
      title: "Guides",
      description:
        "Local property help guides for drain, plumbing, and water-damage decisions in Berks County, PA.",
      path: "/guides",
      noindex: true,
    });
  }
  return buildMetadata({
    title: "Local Property Help Guides",
    description:
      "Practical guides for drain, plumbing, and water-damage decisions in Berks County, PA.",
    path: "/guides",
  });
}

export default function GuidesIndexPage() {
  const guides = getPublishedGuides();
  if (guides.length === 0) notFound();

  const crumbs = breadcrumbItems([{ name: "Guides", path: "/guides" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Local Property Help Guides",
      description: "Guides for Berks County property problems.",
      path: "/guides",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="section-pad px-4">
        <div className="page-container-wide md:max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Local property help guides
          </h1>
          <p className="mt-3 text-stone-600">
            Practical articles for common Berks County drain, plumbing, and water-damage decisions.
          </p>
          <ul className="mt-8 space-y-4">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="block rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400"
                >
                  <h2 className="font-semibold text-stone-900">{guide.title}</h2>
                  <p className="mt-2 text-sm text-stone-600">{guide.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

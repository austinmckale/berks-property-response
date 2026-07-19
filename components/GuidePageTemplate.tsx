import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceAreaCrossLinks } from "@/components/ServiceAreaCrossLinks";
import type { GuideMetadata } from "@/lib/guides";
import { getRelatedServices } from "@/lib/services";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export function GuidePageTemplate({ guide }: { guide: GuideMetadata }) {
  const path = `/guides/${guide.slug}`;
  const crumbs = breadcrumbItems([
    { name: "Guides", path: "/guides" },
    { name: guide.title, path },
  ]);
  const relatedServices = getRelatedServices(guide.relatedServices);

  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: guide.title,
      description: guide.metaDescription,
      path,
    }),
    breadcrumbSchema(crumbs),
    articleSchema({
      headline: guide.title,
      description: guide.metaDescription,
      path,
      author: guide.author,
      reviewer: guide.reviewer,
      publishedDate: guide.publishedDate,
      updatedDate: guide.updatedDate,
      heroImage: guide.heroImage,
    })
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <article className="section-pad px-4">
        <div className="page-container-wide md:max-w-3xl">
          <p className="eyebrow">{guide.category.replace(/-/g, " ")}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-stone-900">
            {guide.title}
          </h1>
          <p className="mt-3 leading-relaxed text-stone-600">{guide.summary}</p>
          <p className="mt-2 text-sm text-stone-500">
            Updated {guide.updatedDate}
            {guide.reviewer ? ` · Reviewed by ${guide.reviewer}` : ""}
          </p>
          <div id="sticky-cta-marker" className="h-px" aria-hidden />

          {guide.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="font-display text-xl font-semibold text-stone-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-stone-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-3 list-inside list-disc space-y-1 text-stone-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {relatedServices.length > 0 && (
            <div className="mt-10 border-t border-stone-200 pt-8">
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Related services
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${service.slug}`}
                      className="flex min-h-12 items-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 hover:border-stone-400"
                    >
                      {service.headline}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ServiceAreaCrossLinks />

          <div className="mt-8 rounded-xl border border-stone-200 bg-brand-subtle p-5">
            <p className="font-semibold text-stone-900">Need local help now?</p>
            <p className="mt-1 text-sm text-stone-600">
              Choose the closest problem and send details for Berks County coordination.
            </p>
            <Link href="/request-help" className="btn-primary mt-4 inline-flex">
              Start a request
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export function generateGuideMetadata(guide: GuideMetadata) {
  return buildMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    noindex: !guide.index,
    ogImage: guide.heroImage,
  });
}

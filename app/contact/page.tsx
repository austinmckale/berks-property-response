import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Berks Property Response for plumbing, drain, sewer, water damage, and repair help in Berks County. Call, text, or use the request form.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = breadcrumbItems([{ name: "Contact", path: "/contact" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Contact",
      description: "Contact Berks Property Response.",
      path: "/contact",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">Contact</h1>
          <p className="mt-4 text-stone-600">
            Need help with a plumbing, drain, or repair issue in Berks County? Call, text photos, or use the request form.
          </p>
          <div className="mt-8 space-y-4 text-stone-700">
            <p>
              <strong>Phone:</strong>{" "}
              <a href={phoneHref(PHONE_NUMBER)} className="font-medium text-stone-900 underline hover:text-stone-600">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              <Link href="/request-help" className="font-medium text-stone-900 underline hover:text-stone-600">
                Submit a request form →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

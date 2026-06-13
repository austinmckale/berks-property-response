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
  title: "Contact | Berks Property Response",
  description: `Contact ${SITE_NAME} for plumbing, drain, and property repair intake in Berks County.`,
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
          <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
          <p className="mt-4 text-slate-600">
            For property service intake in Berks County, call, text photos, or use the request form.
          </p>
          <div className="mt-8 space-y-4">
            <p>
              <strong>Phone:</strong>{" "}
              <a href={phoneHref(PHONE_NUMBER)} className="text-blue-700 hover:underline">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              <Link href="/request-help" className="text-blue-700 hover:underline">
                Submit a request form →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

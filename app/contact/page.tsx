import { Suspense } from "react";
import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DirectContactActions } from "@/components/DirectContactActions";
import { LeadForm } from "@/components/LeadForm";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import { getStickySmsMessage } from "@/lib/smsMessages";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, text, or email Berks Property Response for drain, plumbing, and water-damage coordination across Berks County, PA.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = breadcrumbItems([{ name: "Contact", path: "/contact" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Contact Berks Property Response",
      description:
        "Contact Berks Property Response for local property-problem coordination in Berks County.",
      path: "/contact",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-6 md:py-10">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
            Call, text, or send a request
          </h1>
          <p className="mt-2 text-stone-600">
            Tell us what is happening and where the property is located.
          </p>

          <DirectContactActions
            smsBody={getStickySmsMessage("/contact")}
            analyticsSource="contact_page_top"
            className="mt-5"
          />

          <section className="mt-6 border-t border-stone-200 pt-6">
            <h2 className="text-lg font-semibold text-stone-900">What we help with</h2>
            <ul className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
              <li>Drain and sewer backups</li>
              <li>Fixture leaks and small plumbing repairs</li>
              <li>Repair after a leak or backup</li>
              <li>Other serious property damage</li>
            </ul>
            <Link
              href="/local-partners"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-stone-900 underline underline-offset-2"
            >
              Provider details
            </Link>
          </section>

          <div id="get-help" className="mt-6 scroll-mt-24 border-t border-stone-200 pt-6">
            <h2 className="text-lg font-semibold text-stone-900">Send a request</h2>
            <div className="mt-4">
              <Suspense
                fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}
              >
                <LeadForm pageType="contact" showPropertyType />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

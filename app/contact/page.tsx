import { Suspense } from "react";
import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompactUrgentCallStrip } from "@/components/ConversionHub";
import { LeadForm } from "@/components/LeadForm";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import { PHONE_NUMBER, REQUEST_HELP_LINK, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";
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
            Contact Berks Property Response
          </h1>
          <p className="mt-2 leading-relaxed text-stone-600">
            Berks Property Response is a local coordination hub for drain, plumbing, and
            water-damage problems in Berks County. Use the options below for active problems,
            general questions, or follow-up on a request.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                Call or text
              </h2>
              <a
                href={phoneHref(PHONE_NUMBER)}
                data-analytics-event="phone_click"
                data-analytics-source="contact_page"
                className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-stone-900 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                {PHONE_NUMBER}
              </a>
              <p className="mt-2 text-sm text-stone-600">
                Preferred for active water, sewage, or urgent property problems.
              </p>
              <a
                href={smsHref(TEXT_NUMBER, "Hi Berks Property Response — I have a question about a property issue.")}
                data-analytics-event="text_click"
                data-analytics-source="contact_page"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-stone-800 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                Text photos or a short description
              </a>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                What we help with
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-stone-700">
                <li>· Drain and sewer backups</li>
                <li>· Fixture leaks and small plumbing repairs</li>
                <li>· Repair after a leak or backup</li>
                <li>· Routing unclear or serious property damage</li>
              </ul>
              <Link
                href="/local-partners"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-stone-900 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                View local partners
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <CompactUrgentCallStrip message="Active water or sewage right now? Calling is fastest." />
          </div>

          <p className="mt-6 text-sm text-stone-600">
            Prefer the full intake flow?{" "}
            <Link
              href={REQUEST_HELP_LINK.href}
              className="font-semibold text-stone-900 underline underline-offset-2"
            >
              {REQUEST_HELP_LINK.label}
            </Link>
            .
          </p>

          <div id="get-help" className="mt-8 scroll-mt-24 border-t border-stone-200 pt-8">
            <h2 className="text-lg font-semibold text-stone-900">Send a general message</h2>
            <p className="mt-1 text-sm text-stone-600">
              Use this compact form for questions or follow-up. Include the property city and a
              short description of what is happening.
            </p>
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

import Link from "next/link";
import { Suspense } from "react";
import { SchemaScript } from "@/components/SchemaScript";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmergencyCallBanner } from "@/components/ConversionHub";
import { LeadForm } from "@/components/LeadForm";
import { SERVICE_AREA_NATURAL_COPY } from "@/lib/brand";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { CONTACT_EMAIL, PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, text, or send a request to Berks Property Response. Tell us what is happening and where the property is located.",
  path: "/contact",
});

const routingHelps = [
  "What is happening.",
  "Whether water or sewage is active now.",
  "Which fixture, room, or drain is affected.",
  "City or ZIP.",
  "Photos when available.",
] as const;

export default function ContactPage() {
  const crumbs = breadcrumbItems([{ name: "Contact", path: "/contact" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Tell us what is happening",
      description: "Contact Berks Property Response.",
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
            Tell us what is happening
          </h1>
          <p className="mt-2 text-stone-600">
            Call, text, or send the details and the property location. A local coordinator will
            review the request and coordinate the appropriate next step.
          </p>

          <div className="mt-5">
            <EmergencyCallBanner headline="Need help right now?" />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="contact"
              className="btn-touch-lg inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-3.5 text-center text-base font-semibold text-white active:bg-red-700"
            >
              Call BPR now
            </a>
            <a
              href={smsHref(TEXT_NUMBER)}
              data-analytics-event="text_click"
              data-analytics-source="contact"
              className="btn-touch-lg inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-3.5 text-center text-base font-semibold text-white active:bg-stone-800"
            >
              Text photos
            </a>
          </div>

          {CONTACT_EMAIL ? (
            <p className="mt-4 text-sm text-stone-600">
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-analytics-event="click_email"
                data-analytics-source="contact"
                className="font-medium underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}

          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {SERVICE_AREA_NATURAL_COPY}
          </p>
          <p className="mt-3 text-sm text-stone-600">
            After you contact us, a local coordinator reviews the details and coordinates a warm
            handoff to an appropriate provider. The provider then discusses availability, pricing,
            and next steps with you. You do not need to know which provider to ask for.{" "}
            <Link href="/how-it-works" className="font-medium underline">
              How it works
            </Link>
          </p>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
            <h2 className="text-base font-semibold text-stone-900">
              What helps us route the request
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-600">
              {routingHelps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div id="get-help" className="mt-8 scroll-mt-6 border-t border-stone-200 pt-8">
            <h2 className="text-lg font-semibold text-stone-900">Send a request</h2>
            <p className="mt-1 text-sm text-stone-600">
              Two quick steps. No fee to request help. No obligation to hire.
            </p>
            <div className="mt-4">
              <Suspense
                fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}
              >
                <LeadForm pageType="contact" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

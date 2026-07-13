import { Suspense } from "react";
import { SchemaScript } from "@/components/SchemaScript";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmergencyCallBanner } from "@/components/ConversionHub";
import { LeadForm } from "@/components/LeadForm";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, text, or send a request to Berks Property Response. Tell us what is happening and where the property is located.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = breadcrumbItems([{ name: "Contact", path: "/contact" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Contact Berks Property Response",
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
            Contact Berks Property Response
          </h1>
          <p className="mt-2 text-stone-600">
            Call for urgent help or send a short request and we&apos;ll review the next step.
          </p>

          <div className="mt-5">
            <EmergencyCallBanner headline="Need help right now?" />
          </div>

          <div id="get-help" className="mt-6 scroll-mt-6">
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

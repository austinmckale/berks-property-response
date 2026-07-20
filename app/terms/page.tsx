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
import { SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}, a Berks County property-response coordination website.`,
  path: "/terms",
});

export default function TermsPage() {
  const crumbs = breadcrumbItems([{ name: "Terms", path: "/terms" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Terms of Use",
      description: "Terms of use for Berks Property Response.",
      path: "/terms",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-stone-700">
          <h1 className="text-3xl font-semibold text-stone-900">Terms of Use</h1>
          <p className="text-sm text-stone-500">Last updated: July 13, 2026</p>
          <p>
            By using {SITE_NAME}, you agree to these terms. {SITE_NAME} provides intake,
            coordination, and provider introductions for property problems in Berks County,
            Pennsylvania. Submitting a request does not require you to hire any provider.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">No guarantee of service</h2>
          <p>
            Submitting a request does not guarantee that a provider will accept your job, arrive
            within a specific timeframe, diagnose a particular cause, complete work at a particular
            price, or achieve a particular result.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Provider relationship</h2>
          <p>
            Providers are separate businesses. Any contract for work is between you and the
            provider you choose. The provider is responsible for estimates, pricing, scheduling,
            permits, licensing, insurance, warranties, workmanship, and payment terms. See our{" "}
            <Link
              href="/disclosure"
              className="inline-flex min-h-11 items-center font-medium underline"
            >
              disclosure
            </Link>{" "}
            for how coordination and provider relationships work.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Compensation</h2>
          <p>
            {SITE_NAME} may receive marketing, intake, administrative, or referral compensation from
            participating providers.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Acceptable use</h2>
          <p>
            Do not submit false information or use this site for unlawful purposes. We may refuse or
            redirect requests outside our scope.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Emergency situations</h2>
          <p>
            For immediate danger involving fire, gas, electrical hazards, structural collapse, or
            medical emergencies, contact 911 or the appropriate emergency service. {SITE_NAME} is
            not an emergency-response agency.
          </p>
        </div>
      </section>
    </>
  );
}

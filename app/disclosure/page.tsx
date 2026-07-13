import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaScript";
import { REFERRAL_DISCLOSURE_FULL } from "@/lib/disclosures";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "How Berks Property Response Works",
  description:
    "How Berks Property Response reviews requests and coordinates introductions to independent local providers in Berks County.",
  path: "/disclosure",
});

const providerLanes = [
  {
    name: "Apex Drain Services",
    scope:
      "Drain cleaning, sewer backups, main lines, hydro jetting, sewer cameras, and commercial drain work.",
  },
  {
    name: "Ridge Line Plumbing",
    scope:
      "Fixture leaks, toilets, faucets, shutoff valves, water heaters, and smaller residential plumbing repairs.",
  },
  {
    name: "RHI Pros",
    scope:
      "Drywall, flooring, ceilings, painting, demolition, and repair after plumbing or water events.",
  },
];

export default function DisclosurePage() {
  const crumbs = breadcrumbItems([{ name: "Disclosure", path: "/disclosure" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "How Berks Property Response Works",
      description: REFERRAL_DISCLOSURE_FULL,
      path: "/disclosure",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-stone-700">
          <h1 className="text-3xl font-semibold text-stone-900">
            How Berks Property Response Works
          </h1>
          <p className="text-sm text-stone-500">Last updated: July 13, 2026</p>
          <p className="text-lg leading-relaxed text-stone-600">{REFERRAL_DISCLOSURE_FULL}</p>
          <p>
            When you call {PHONE_NUMBER}, text photos, or submit a request, a local coordinator
            reviews the details and coordinates an introduction to a participating provider when
            appropriate. You choose whether to move forward. The provider handles scheduling,
            pricing, permits, licensing, insurance, warranties, and the work itself.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">How we route requests</h2>
          <p>
            Based on your issue, we may introduce you to one of these independent local providers:
          </p>
          <ul className="list-inside list-disc space-y-3">
            {providerLanes.map((lane) => (
              <li key={lane.name}>
                <span className="font-medium text-stone-900">{lane.name}</span> — {lane.scope}
              </li>
            ))}
          </ul>
          <p>
            Other approved local providers may be used when a listed company is not the right fit.
            Provider availability and service scope may vary. {SITE_NAME} does not guarantee
            acceptance, timing, diagnosis, price, or outcome.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">Compensation</h2>
          <p>
            {SITE_NAME} may receive a marketing, intake, administrative, or referral fee from
            participating providers. There is no fee to homeowners for calling, texting, or
            submitting a request, and there is no obligation to hire.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">Questions</h2>
          <p>
            Call {PHONE_NUMBER} or use the{" "}
            <a href="/contact" className="font-medium underline">
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

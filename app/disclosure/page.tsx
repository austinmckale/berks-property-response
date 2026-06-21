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
    "How Berks Property Response helps you describe plumbing, drain, and repair issues in Berks County and connect with independent local providers.",
  path: "/disclosure",
});

const providerLanes = [
  {
    name: "Apex Drain Services",
    scope:
      "Drains, sewer backups, hydro jetting, camera inspections, and commercial drain issues.",
  },
  {
    name: "Ridge Line Plumbing",
    scope: "Smaller residential plumbing and fixture-level repairs.",
  },
  {
    name: "RHI Pros",
    scope: "Repair and build-back after leaks, backups, and water damage.",
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
          <p className="text-lg leading-relaxed text-stone-600">
            {SITE_NAME} helps you describe what happened—plumbing leaks, drain backups, water
            damage, or property repair needs—and connects you with an independent local provider
            suited to the request. We are not the company that performs the work.
          </p>
          <p>
            When you call {PHONE_NUMBER}, text photos, or submit a request, we review the details
            and route your information to a participating provider when appropriate. You choose
            whether to move forward. The provider handles scheduling, pricing, and the job itself.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">How we route requests</h2>
          <p>
            Based on your issue, we may connect you with one of these independent local providers:
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
            Routing depends on the problem you describe, urgency, and availability.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">What to expect</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Providers perform the work and set their own pricing.</li>
            <li>
              Providers are responsible for scheduling, licensing, insurance, workmanship, and
              service outcomes.
            </li>
            <li>
              {SITE_NAME} does not guarantee response times, pricing, or job results. Confirm
              licensing and insurance directly with your provider before work begins.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-stone-900">Our role</h2>
          <p>{REFERRAL_DISCLOSURE_FULL}</p>
        </div>
      </section>
    </>
  );
}

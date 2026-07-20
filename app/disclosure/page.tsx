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
import { providers } from "@/lib/providers";
import { PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "How Berks Property Response Works",
  description: "Independent-provider and compensation disclosure for Berks Property Response.",
  path: "/disclosure",
});

function providerLaneLabel(provider: (typeof providers)[keyof typeof providers]): string {
  if (provider.contactPerson) {
    return `${provider.publicDisplayName} (contact: ${provider.contactPerson})`;
  }
  return provider.publicDisplayName;
}

const providerLanes = [
  {
    name: providerLaneLabel(providers.apex),
    scope: providers.apex.serviceCategories.join("; "),
  },
  {
    name: providerLaneLabel(providers.evan),
    scope: providers.evan.serviceCategories.join("; "),
  },
  {
    name: providerLaneLabel(providers.rhi),
    scope: providers.rhi.serviceCategories.join("; "),
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
            Some participating providers may pay {SITE_NAME} for intake, marketing, or
            administrative services.
          </p>

          <h2 className="text-xl font-semibold text-stone-900">Questions</h2>
          <p>
            Call {PHONE_NUMBER} or use the{" "}
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center font-medium underline"
            >
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

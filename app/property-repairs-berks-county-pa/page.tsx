import { SchemaScript } from "@/components/SchemaScript";
import { HubAlert, HubFooterLink, HubLandingPage } from "@/components/HubLandingPage";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Property Repairs After Plumbing Events | Berks County, PA",
  description:
    "Build-back repairs after plumbing, drain, or water damage in Berks County.",
  path: "/property-repairs-berks-county-pa",
});

export default function PropertyRepairsPage() {
  const crumbs = breadcrumbItems([
    { name: "Property Repairs", path: "/property-repairs-berks-county-pa" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Property Repairs After Plumbing Events",
      description: "Build-back repairs after plumbing or water events.",
      path: "/property-repairs-berks-county-pa",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Repair after a plumbing or water event"
        subtitle="Once the leak or backup is stopped, tell us what was damaged."
        alert={
          <HubAlert>
            Still backing up?{" "}
            <HubFooterLink href="/emergency">Emergency drain help</HubFooterLink> comes first.
          </HubAlert>
        }
        form={{
          pageType: "property-repairs",
          initialProblemType: "water-damage",
          serviceCategory: "water_damage",
          defaultRoute: "rhi",
        }}
        footer={
          <details className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-stone-800">
              Common repair types
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <HubFooterLink href="/drywall-repair-after-plumbing-leak-berks-county-pa">
                  Drywall repair
                </HubFooterLink>
              </li>
              <li>
                <HubFooterLink href="/flooring-repair-after-water-damage-berks-county-pa">
                  Flooring repair
                </HubFooterLink>
              </li>
              <li>
                <HubFooterLink href="/ceiling-repair-from-plumbing-leak-berks-county-pa">
                  Ceiling repair
                </HubFooterLink>
              </li>
              <li>
                <HubFooterLink href="/basement-repair-after-water-backup-berks-county-pa">
                  Basement repair after backup
                </HubFooterLink>
              </li>
            </ul>
            <a
              href="https://www.rhipros.com/?utm_source=berkspropertyresponse&utm_medium=referral&utm_campaign=property_repairs"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="partner_click"
              data-analytics-provider="rhi"
              data-analytics-partner-name="RHI Pros"
              data-analytics-source="property_repairs"
              className="mt-4 inline-block text-sm font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              Visit RHI Pros →
            </a>
          </details>
        }
      />
    </>
  );
}

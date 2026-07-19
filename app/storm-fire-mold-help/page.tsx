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
  title: "Other Serious Property Damage",
  description:
    "Report storm, fire, smoke, mold, or other serious property damage in Berks County. Requests are reviewed to determine whether a suitable local provider is available.",
  path: "/storm-fire-mold-help",
  noindex: true,
});

export default function OtherSeriousPropertyDamagePage() {
  const crumbs = breadcrumbItems([
    { name: "Other serious property damage", path: "/storm-fire-mold-help" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Other Serious Property Damage",
      description:
        "Serious property damage requests reviewed for suitable local provider availability in Berks County.",
      path: "/storm-fire-mold-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Other serious property damage"
        subtitle="Tell us what happened and include photos if you can. This request is reviewed to determine whether a suitable local provider is available."
        alert={
          <HubAlert>
            If there is active fire, gas odor, electrical danger, collapse risk, or a medical
            emergency, leave the unsafe area and call 911 or the applicable utility. For an active
            drain backup or fixture leak, use{" "}
            <HubFooterLink href="/emergency">emergency drain help</HubFooterLink>,{" "}
            <HubFooterLink href="/plumbing-and-leaks">plumbing help</HubFooterLink>, or{" "}
            <HubFooterLink href="/after-leak">repair after a leak</HubFooterLink> first.
          </HubAlert>
        }
        form={{
          pageType: "major-property",
          serviceCategory: "major_property",
          defaultRoute: "manual_review",
          defaultService: "Major property issue review",
          initialProblemType: "major-property",
          showPropertyType: true,
        }}
        footer={
          <details className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-stone-800">
              Issue types that may be reviewed
            </summary>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-stone-700">
              <li>Storm or wind damage</li>
              <li>Fire or smoke damage</li>
              <li>Mold or moisture concerns</li>
              <li>Hail or roof leak damage</li>
              <li>Basement flooding unrelated to a drain backup</li>
            </ul>
            <p className="mt-3 text-sm text-stone-600">
              Berks Property Response does not perform specialized restoration, remediation, or
              roofing work directly. Availability depends on whether a qualified local provider can
              be identified for the situation.
            </p>
          </details>
        }
      />
    </>
  );
}

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
  title: "Storm, Fire & Mold Help",
  description: "Storm, fire, smoke, mold, and serious property-damage help in Berks County.",
  path: "/storm-fire-mold-help",
});

export default function StormFireMoldHelpPage() {
  const crumbs = breadcrumbItems([
    { name: "Storm / Fire / Mold Help", path: "/storm-fire-mold-help" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Storm, Fire & Mold Help",
      description: "Storm, fire, smoke, mold, and serious property damage in Berks County.",
      path: "/storm-fire-mold-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Storm, fire, mold, or serious damage"
        subtitle="Tell us what happened and include photos if you can."
        alert={
          <HubAlert>
            If there is active fire, gas odor, electrical danger, collapse risk, or a medical
            emergency, leave the unsafe area and call 911 or the applicable utility. For an active
            drain backup or fixture leak, use{" "}
            <HubFooterLink href="/emergency">emergency</HubFooterLink>,{" "}
            <HubFooterLink href="/plumbing-and-leaks">plumbing</HubFooterLink>, or{" "}
            <HubFooterLink href="/after-leak">water damage</HubFooterLink> help first.
          </HubAlert>
        }
        form={{
          pageType: "major-property",
          serviceCategory: "major_property",
          defaultRoute: "manual_review",
          defaultService: "Major property issue review",
          initialProblemType: "major-property",
        }}
        footer={
          <details className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-stone-800">Issue types</summary>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-stone-700">
              <li>Storm or wind damage</li>
              <li>Fire or smoke damage</li>
              <li>Mold or moisture concerns</li>
              <li>Hail or roof leak damage</li>
              <li>Basement flooding (non-drain)</li>
            </ul>
          </details>
        }
      />
    </>
  );
}

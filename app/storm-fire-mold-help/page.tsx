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
  description:
    "Storm, fire, smoke, mold, or major property issues in Berks County? Tell us what happened.",
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
      description: "Major property issue help in Berks County.",
      path: "/storm-fire-mold-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Storm, fire, mold, or major issues"
        subtitle="Tell us what happened. We review whether we can connect you with local help."
        alert={
          <HubAlert>
            Active drain backup or fixture leak? Try{" "}
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
            <summary className="cursor-pointer text-sm font-medium text-stone-800">
              Issues we may review
            </summary>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-stone-700">
              <li>Storm or wind damage</li>
              <li>Fire or smoke damage</li>
              <li>Mold or moisture concerns</li>
              <li>Hail or roof leak damage</li>
              <li>Basement flooding (non-drain)</li>
            </ul>
            <p className="mt-3 text-xs text-stone-500">
              Availability varies. No obligation to hire.
            </p>
          </details>
        }
      />
    </>
  );
}

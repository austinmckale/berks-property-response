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
  title: "After a Leak",
  description:
    "Repair help after a leak, backup, or water damage in Berks County. Call or send a request for local build-back help.",
  path: "/after-leak",
});

export default function AfterLeakHubPage() {
  const crumbs = breadcrumbItems([{ name: "After a leak", path: "/after-leak" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "After a Leak",
      description: "Repair help after a leak, backup, or water damage in Berks County.",
      path: "/after-leak",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Repair after a leak or backup"
        subtitle="Tell us what was damaged — we'll connect you with local repair help."
        alert={
          <HubAlert>
            Still backing up or leaking?{" "}
            <HubFooterLink href="/emergency">Get emergency help first</HubFooterLink>
            , then return here for repair.
          </HubAlert>
        }
        form={{
          pageType: "after-leak",
          serviceCategory: "water_damage",
          defaultRoute: "rhi",
          initialProblemType: "water-damage",
        }}
        footer={
          <section className="border-t border-stone-200 pt-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Already know you need repairs after a leak?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              If the leak or backup source has been addressed and you need drywall, flooring,
              ceiling, paint, or other build-back repairs, you can also visit RHI Pros directly.
            </p>
            <a
              href="https://www.rhipros.com/?utm_source=berkspropertyresponse&utm_medium=referral&utm_campaign=after_leak"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="partner_click"
              data-analytics-provider="rhi"
              data-analytics-partner-name="RHI Pros"
              data-analytics-source="after_leak"
              className="mt-3 inline-block text-sm font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              Visit RHI Pros →
            </a>
          </section>
        }
      />
    </>
  );
}

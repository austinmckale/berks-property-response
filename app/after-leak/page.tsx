import { SchemaScript } from "@/components/SchemaScript";
import { HubAlert, HubFooterLink, HubLandingPage } from "@/components/HubLandingPage";
import {
  HubCategoryOverview,
  HubSupportingContent,
} from "@/components/ServiceHubSections";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  faqSchema,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "After a Leak",
  description:
    "Repair help after a leak, backup, or water damage in Berks County. Call or send a request for local build-back help.",
  path: "/after-leak",
});

const faqs = [
  {
    question: "Should repair begin before the leak or backup is stopped?",
    answer:
      "No. Control the active plumbing or drain source first. Build-back decisions are more useful after the source is addressed and the affected materials can be evaluated.",
  },
  {
    question: "Which damaged materials should I mention?",
    answer:
      "List the rooms and visible materials involved, such as drywall, ceiling, flooring, trim, paint, or cabinets. Photos showing the wider area and close details help define the repair request.",
  },
];

export default function AfterLeakHubPage() {
  const crumbs = breadcrumbItems([{ name: "After a leak", path: "/after-leak" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "After a Leak",
      description: "Repair help after a leak, backup, or water damage in Berks County.",
      path: "/after-leak",
    }),
    breadcrumbSchema(crumbs),
    faqSchema(faqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Repair after a leak or backup"
        subtitle="Build-back help for drywall, ceilings, flooring, paint, demolition, and other property repair after the water source is controlled."
        quickActionsPath="/after-leak"
        alert={
          <HubAlert>
            Still backing up or leaking?{" "}
            <HubFooterLink href="/emergency">Get emergency help first</HubFooterLink>
            , then return here for repair.
          </HubAlert>
        }
        middle={
          <HubCategoryOverview
            explanation="Stopping the leak or clearing the backup is the first job. This lane covers the separate repair work that may remain afterward: opening or replacing damaged drywall, repairing ceilings and floors, painting, demolition, and restoring affected finishes."
            belongs="Drywall, ceiling, flooring, trim, paint, cabinet, basement, and other build-back needs after a plumbing or water event."
            notFor="An active fixture leak needs plumbing first. Sewage or a floor drain backing up needs drain and sewer help before finish repair begins."
            problemLinks={[
              {
                href: "/drywall-repair-after-plumbing-leak-berks-county-pa",
                label: "Drywall damaged after a leak",
                description: "Stains, soft areas, or sections opened for plumbing access.",
              },
              {
                href: "/ceiling-repair-from-plumbing-leak-berks-county-pa",
                label: "Ceiling damage below a leak",
                description: "Staining, sagging, or finish damage after the source is stopped.",
              },
              {
                href: "/flooring-repair-after-water-damage-berks-county-pa",
                label: "Flooring damaged by water",
                description: "Buckled, swollen, or saturated flooring and carpet.",
              },
              {
                href: "/basement-repair-after-water-backup-berks-county-pa",
                label: "Basement repair after a backup",
                description: "Finished materials affected after the drain problem is cleared.",
              },
            ]}
            providerId="rhi"
          />
        }
        form={{
          pageType: "after-leak",
          serviceCategory: "water_damage",
          defaultRoute: "rhi",
          initialProblemType: "water-damage",
          showPropertyType: true,
        }}
        footer={
          <>
            <HubSupportingContent
              urgency="Call the appropriate drain or plumbing lane while water or sewage is active. Once the source is controlled and the area is stable, use this repair request to describe the affected rooms and materials."
              relatedLinks={[
                {
                  href: "/water-damage-repair-after-leak-berks-county-pa",
                  label: "Water-damage repair overview",
                },
                { href: "/plumbing-and-leaks", label: "Stop a fixture leak first" },
                { href: "/emergency", label: "Active sewer or drain backup" },
                {
                  href: "/property-repairs-berks-county-pa",
                  label: "Property repair after plumbing events",
                },
              ]}
              faqs={faqs}
            />
            <p className="mt-6 border-t border-stone-200 pt-6 text-sm text-stone-600">
              For RHI Pros&apos; broader remodeling information,{" "}
              <a
                href="https://www.rhipros.com/?utm_source=berkspropertyresponse&utm_medium=referral&utm_campaign=after_leak"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="partner_click"
                data-analytics-provider="rhi"
                data-analytics-partner-name="RHI Pros"
                data-analytics-source="after_leak"
                className="inline-flex min-h-11 items-center font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-600"
              >
                visit RHI Pros
              </a>
              .
            </p>
          </>
        }
      />
    </>
  );
}

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
      />
    </>
  );
}

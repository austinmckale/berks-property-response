import { SchemaScript } from "@/components/SchemaScript";
import { HubFooterLink, HubLandingPage } from "@/components/HubLandingPage";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency Help",
  description:
    "Sewer backup or drain emergency in Berks County? Call now or tell us what's happening.",
  path: "/emergency",
});

export default function EmergencyHubPage() {
  const crumbs = breadcrumbItems([{ name: "Emergency Help", path: "/emergency" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Emergency Help",
      description: "Emergency drain and sewer help in Berks County.",
      path: "/emergency",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Emergency drain or sewer help"
        subtitle="Berks County — call if it's active now, or send a request below."
        variant="emergency"
        formTitle="Send a quick request"
        form={{
          pageType: "emergency",
          serviceCategory: "drain_sewer",
          defaultRoute: "apex",
          initialProblemType: "drain-emergency",
        }}
        footer={
          <p className="text-center text-sm text-stone-500">
            Leak at one fixture only?{" "}
            <HubFooterLink href="/plumbing-and-leaks">Plumbing help</HubFooterLink>
          </p>
        }
      />
    </>
  );
}

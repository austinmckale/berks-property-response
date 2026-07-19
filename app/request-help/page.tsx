import { SchemaScript } from "@/components/SchemaScript";
import { HubLandingPage } from "@/components/HubLandingPage";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Request Help",
  description:
    "Send a property help request for drain, plumbing, or water-damage issues in Berks County.",
  path: "/request-help",
  noindex: true,
});

export default function RequestHelpPage() {
  const crumbs = breadcrumbItems([{ name: "Request Help", path: "/request-help" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Request Help",
      description: "Send a property help request in Berks County.",
      path: "/request-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Send a request"
        subtitle="Choose the closest problem, then send the details."
        variant="standard"
        showCompactUrgentCall
        emergencyHeadline="Active water or sewage right now? Calling is fastest."
        formTitle="Your request"
        formSubtitle=""
        form={{ pageType: "request-help", showPropertyType: true }}
      />
    </>
  );
}

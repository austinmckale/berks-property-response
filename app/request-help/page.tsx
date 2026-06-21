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
    "Get local help in Berks County for plumbing, drains, water damage, and repairs.",
  path: "/request-help",
});

export default function RequestHelpPage() {
  const crumbs = breadcrumbItems([{ name: "Request Help", path: "/request-help" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Request Help",
      description: "Get local help in Berks County.",
      path: "/request-help",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Get local help"
        subtitle="Pick what happened, then add your name and phone."
        variant="emergency"
        emergencyHeadline="Active backup or leak right now?"
        formTitle="Your request"
        formSubtitle="Two quick steps. No obligation."
        form={{ pageType: "request-help" }}
      />
    </>
  );
}

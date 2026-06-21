import { SchemaScript } from "@/components/SchemaScript";
import { HubLandingPage } from "@/components/HubLandingPage";
import { PlumbingTriageNotice } from "@/components/PlumbingTriageNotice";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Plumbing & Leaks",
  description:
    "Fixture leaks, running toilets, and small plumbing repairs in Berks County.",
  path: "/plumbing-and-leaks",
});

export default function PlumbingAndLeaksPage() {
  const crumbs = breadcrumbItems([
    { name: "Plumbing & leaks", path: "/plumbing-and-leaks" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Plumbing & Leaks",
      description: "Small plumbing and leak help in Berks County.",
      path: "/plumbing-and-leaks",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Plumbing & leaks"
        subtitle="One fixture leaking — not sewer backups or main line clogs."
        alert={<PlumbingTriageNotice />}
        form={{
          pageType: "plumbing",
          serviceCategory: "plumbing",
          defaultRoute: "evan",
          initialProblemType: "plumbing-leak",
        }}
      />
    </>
  );
}

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
  title: "Drains & Jetting",
  description:
    "Clogged drains, recurring blockages, and hydro jetting help in Berks County.",
  path: "/drains",
});

const symptoms = [
  { label: "Active backup or sewer emergency", problem: "drain-emergency" as const },
  { label: "Slow or clogged drain", problem: "drain-clog" as const },
];

export default function DrainsHubPage() {
  const crumbs = breadcrumbItems([{ name: "Drains & jetting", path: "/drains" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Drains & Jetting",
      description: "Drain and jetting help in Berks County.",
      path: "/drains",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Drains & jetting"
        subtitle="Clogged or slow drains — call if water is backing up now."
        symptoms={symptoms}
        form={{
          pageType: "drains",
          serviceCategory: "drain_sewer",
          defaultRoute: "apex",
          initialProblemType: "drain-clog",
        }}
        footer={
          <p className="text-center text-sm text-stone-500">
            Active sewer backup?{" "}
            <HubFooterLink href="/emergency">Emergency help</HubFooterLink>
          </p>
        }
      />
    </>
  );
}

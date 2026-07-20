import { SchemaScript } from "@/components/SchemaScript";
import { HubLandingPage } from "@/components/HubLandingPage";
import { PlumbingTriageNotice } from "@/components/PlumbingTriageNotice";
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
  title: "Plumbing & Leaks",
  description:
    "Fixture leaks, running toilets, and small plumbing repairs in Berks County.",
  path: "/plumbing-and-leaks",
});

const faqs = [
  {
    question: "Does a bubbling toilet belong in fixture plumbing?",
    answer:
      "A toilet that runs or leaks by itself can be a fixture repair. A toilet that bubbles when a shower or sink runs may indicate a main-line drain problem and should go to the drain and sewer lane.",
  },
  {
    question: "What should I do before requesting help for a leak?",
    answer:
      "If you can safely reach the fixture shutoff, turn it off to limit damage. Note where the water appears and whether any other fixtures are affected, then include photos when possible.",
  },
];

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
    breadcrumbSchema(crumbs),
    faqSchema(faqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Plumbing & leaks"
        subtitle="Help for isolated fixture leaks, faucets, toilets, shutoff valves, water heaters, and smaller residential plumbing repairs."
        quickActionsPath="/plumbing-and-leaks"
        alert={<PlumbingTriageNotice />}
        middle={
          <HubCategoryOverview
            explanation="This lane is for smaller residential plumbing repairs at a fixture or supply connection. The most useful distinction is whether one fixture is affected or several drains are interacting. An isolated drip under a sink is different from wastewater rising through a floor drain."
            belongs="Leaks under sinks, dripping faucets, running toilets, fixture shutoff valves, water-heater concerns, and similar residential repairs."
            notFor="Sewer backups, main-line clogs, hydro jetting, or several drains backing up together belong in the drain and sewer lane."
            problemLinks={[
              {
                href: "/leak-repair-berks-county-pa",
                label: "Leak under a sink or fixture",
                description: "A drip, puddle, or supply-line leak at one location.",
              },
              {
                href: "/faucet-repair-berks-county-pa",
                label: "Dripping or leaking faucet",
                description: "A problem isolated to one faucet.",
              },
              {
                href: "/toilet-repair-berks-county-pa",
                label: "Running or leaking toilet",
                description: "One toilet with no other drains backing up.",
              },
              {
                href: "/small-plumbing-repairs-berks-county-pa",
                label: "Water heater or smaller plumbing repair",
                description: "A residential plumbing issue that is not a sewer-line clog.",
              },
            ]}
            providerId="evan"
          />
        }
        form={{
          pageType: "plumbing",
          serviceCategory: "plumbing",
          defaultRoute: "evan",
          initialProblemType: "plumbing-leak",
          defaultPropertyType: "residential",
        }}
        footer={
          <HubSupportingContent
            urgency="Call when water is spraying, spreading, or cannot be controlled safely. If the leak is contained or the fixture is simply running or dripping, an online request can include the fixture location, symptoms, and photos."
            relatedLinks={[
              {
                href: "/shutoff-valve-repair-berks-county-pa",
                label: "Shutoff-valve repair",
              },
              { href: "/drains", label: "Drain and sewer problems" },
              { href: "/after-leak", label: "Repair after a leak" },
              {
                href: "/water-damage-repair-after-leak-berks-county-pa",
                label: "Water-damage build-back",
              },
            ]}
            faqs={faqs}
          />
        }
      />
    </>
  );
}

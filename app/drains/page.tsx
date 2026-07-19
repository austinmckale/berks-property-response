import { SchemaScript } from "@/components/SchemaScript";
import { HubFooterLink, HubLandingPage } from "@/components/HubLandingPage";
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
  title: "Drains & Jetting",
  description:
    "Clogged drains, recurring blockages, and hydro jetting help in Berks County.",
  path: "/drains",
});

const problemLinks = [
  {
    href: "/emergency-sewer-backup-berks-county-pa",
    label: "Sewage or an active sewer backup",
    description: "Waste or dirty water rising through a drain.",
  },
  {
    href: "/main-sewer-line-clog-reading-pa",
    label: "Several fixtures backing up",
    description: "Toilets, tubs, or floor drains interacting.",
  },
  {
    href: "/drain-cleaning-berks-county-pa",
    label: "One slow or clogged drain",
    description: "A sink, tub, shower, or floor drain that is slow.",
  },
  {
    href: "/hydro-jetting-berks-county-pa",
    label: "A recurring clog or buildup",
    description: "A line that keeps clogging after earlier clearing.",
  },
];

const faqs = [
  {
    question: "Is one slow sink a sewer-line problem?",
    answer:
      "Usually not by itself. A main-line problem is more likely when several fixtures are affected, a toilet gurgles when another drain runs, or a basement floor drain backs up.",
  },
  {
    question: "When might a camera inspection or hydro jetting be considered?",
    answer:
      "Recurring clogs, suspected roots, grease, or an unknown obstruction may call for a camera inspection or jetting. Apex determines the suitable method after reviewing the line and symptoms.",
  },
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
    breadcrumbSchema(crumbs),
    faqSchema(faqs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Drains & jetting"
        subtitle="Help for slow drains, recurring clogs, sewer-line symptoms, and commercial drain problems across Berks County."
        middle={
          <HubCategoryOverview
            explanation="Drain and sewer work focuses on how water and waste leave the property. One slow fixture may need routine drain cleaning; several fixtures backing up together can indicate a main sewer-line problem. Camera inspection and hydro jetting may help with recurring or hard-to-locate blockages."
            belongs="Slow sinks and tubs, floor-drain problems, sewer backups, recurring main-line clogs, grease lines, and commercial drains."
            notFor="A dripping supply line, faucet, water heater, or isolated fixture leak belongs in plumbing. Drywall or flooring repair comes after the source is controlled."
            problemLinks={problemLinks}
            providerId="apex"
          />
        }
        form={{
          pageType: "drains",
          serviceCategory: "drain_sewer",
          defaultRoute: "apex",
          initialProblemType: "drain-clog",
          showPropertyType: true,
        }}
        footer={
          <>
            <HubSupportingContent
              urgency="Call instead of waiting for an online response when sewage or dirty water is actively entering the property, several fixtures are backing up together, or a floor drain is overflowing. For a stable slow drain, an online request can include the affected fixtures and how often the problem returns."
              relatedLinks={[
                {
                  href: "/basement-floor-drain-backing-up-berks-county-pa",
                  label: "Basement floor-drain backup",
                },
                {
                  href: "/sewer-camera-inspection-berks-county-pa",
                  label: "Sewer-camera inspection",
                },
                {
                  href: "/commercial-drain-cleaning-berks-county-pa",
                  label: "Commercial drain cleaning",
                },
                { href: "/plumbing-and-leaks", label: "Fixture plumbing and leaks" },
              ]}
              faqs={faqs}
            />
            <p className="mt-6 text-center text-sm text-stone-500">
              Active sewer backup?{" "}
              <HubFooterLink href="/emergency">Emergency help</HubFooterLink>
            </p>
          </>
        }
      />
    </>
  );
}

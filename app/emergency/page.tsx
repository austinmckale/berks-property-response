import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HubActionButtons } from "@/components/HubActionButtons";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency Help | Berks Property Response",
  description:
    "Emergency drain, sewer, leak, or water backup in Berks County? Call now or describe what happened for urgent local help.",
  path: "/emergency",
});

const routingNotes = [
  {
    situation: "Sewage, multiple drains backing up, or basement floor drain overflow",
    provider: "Apex Drain Services",
    note: "Drain and sewer emergencies",
  },
  {
    situation: "Isolated leak at one fixture (sink, toilet, faucet, valve)",
    provider: "Evan Simons",
    note: "Smaller residential plumbing service calls",
  },
  {
    situation: "Drywall, flooring, or ceiling damage after the source is stopped",
    provider: "RHI Pros",
    note: "Build-back after the plumbing or backup event",
  },
];

const emergencyLinks = [
  {
    href: "/emergency-sewer-backup-berks-county-pa",
    title: "Sewer backup",
    description: "Sewage or waste coming up through drains.",
  },
  {
    href: "/main-sewer-line-clog-reading-pa",
    title: "Main sewer line clog",
    description: "Multiple fixtures backing up at once.",
  },
  {
    href: "/basement-floor-drain-backing-up-berks-county-pa",
    title: "Basement floor drain backing up",
    description: "Water or sewage at a basement floor drain.",
  },
  {
    href: "/leak-repair-berks-county-pa",
    title: "Leak under a sink or fixture",
    description: "Isolated drip or puddle at one fixture.",
  },
  {
    href: "/water-damage-repair-after-leak-berks-county-pa",
    title: "Water damage after a leak or backup",
    description: "Repair help after the source is under control.",
  },
];

export default function EmergencyHubPage() {
  const crumbs = breadcrumbItems([{ name: "Emergency Help", path: "/emergency" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Emergency Help",
      description: "Emergency drain, sewer, leak, and backup help in Berks County.",
      path: "/emergency",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">
            Emergency drain, sewer, leak, or water backup?
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            If water or sewage is active now, call first. Then pick the situation closest to yours
            or request help with a short description and photos.
          </p>

          <div className="mt-6">
            <HubActionButtons />
          </div>

          <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-800">
            <p className="font-semibold text-stone-900">How we route urgent requests</p>
            <ul className="mt-3 space-y-3">
              {routingNotes.map((item) => (
                <li key={item.situation}>
                  <span className="font-medium text-stone-900">{item.situation}</span>
                  <span className="block text-stone-600">
                    → {item.provider} — {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-8 space-y-3">
            {emergencyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-stone-400"
                >
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  <span className="mt-1 block text-sm text-stone-600">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

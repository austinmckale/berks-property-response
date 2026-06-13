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
  title: "After a Leak | Berks Property Response",
  description:
    "Repair help after a leak, backup, or water damage in Berks County. Stop the source first, then connect with local build-back help.",
  path: "/after-leak",
});

const routingNotes = [
  {
    step: "Stop the active plumbing or drain issue first",
    detail: "Sewer backups and main line clogs route to Apex Drain Services before finish repair.",
  },
  {
    step: "Drywall, flooring, ceiling, and build-back repair",
    detail: "Routes to RHI Pros after the source is under control.",
  },
  {
    step: "Active sewer or drain emergency",
    detail: "Still backing up? Use emergency drain help — routes to Apex, not finish repair.",
  },
  {
    step: "Isolated small leak at one fixture",
    detail: "May route to Evan Simons for smaller residential plumbing service calls.",
  },
];

const afterLeakLinks = [
  {
    href: "/water-damage-repair-after-leak-berks-county-pa",
    title: "Water damage after a leak or backup",
    description: "Overview of build-back help after the source is stopped.",
  },
  {
    href: "/drywall-repair-after-plumbing-leak-berks-county-pa",
    title: "Drywall repair after a plumbing leak",
    description: "Patch or replace drywall after leak access or saturation.",
  },
  {
    href: "/flooring-repair-after-water-damage-berks-county-pa",
    title: "Flooring repair after water damage",
    description: "Hardwood, laminate, carpet, or tile after a water event.",
  },
  {
    href: "/ceiling-repair-from-plumbing-leak-berks-county-pa",
    title: "Ceiling repair from a plumbing leak",
    description: "Stains, sag, or damage from an upstairs leak.",
  },
  {
    href: "/basement-repair-after-water-backup-berks-county-pa",
    title: "Basement repair after a floor drain or sewer backup",
    description: "Finished basement materials after a backup event.",
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
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">
            Repair help after a leak, backup, or water damage
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Stop active leaking or backup first. Once the source is under control, tell us what
            materials were damaged and we will connect you with local build-back help in Berks
            County.
          </p>

          <div className="mt-6">
            <HubActionButtons />
          </div>

          <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-800">
            <p className="font-semibold text-stone-900">What to expect</p>
            <ol className="mt-3 list-inside list-decimal space-y-3 text-stone-700">
              {routingNotes.map((item) => (
                <li key={item.step}>
                  <span className="font-medium text-stone-900">{item.step}.</span>{" "}
                  {item.detail}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-stone-700">
              Active emergency?{" "}
              <Link href="/emergency" className="font-medium text-stone-900 underline">
                Emergency help
              </Link>{" "}
              routes to Apex Drain Services.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {afterLeakLinks.map((item) => (
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

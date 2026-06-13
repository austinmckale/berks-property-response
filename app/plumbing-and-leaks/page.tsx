import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { PlumbingTriageNotice } from "@/components/PlumbingTriageNotice";
import { SchemaScript } from "@/components/SchemaScript";
import { providers } from "@/lib/providers";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Plumbing & Leaks | Berks Property Response",
  description:
    "Fixture leaks, running toilets, and small plumbing repairs in Berks County. We connect you with Evan Simons for smaller residential service calls.",
  path: "/plumbing-and-leaks",
});

const plumbingTopics = [
  {
    title: "Leak under a sink",
    description: "Active drip or puddle at a single fixture.",
    href: "/leak-repair-berks-county-pa",
  },
  {
    title: "Dripping faucet",
    description: "One faucet dripping or leaking at the fixture.",
    href: "/faucet-repair-berks-county-pa",
  },
  {
    title: "Running or leaking toilet",
    description: "One toilet only, with no other drains backing up.",
    href: "/toilet-repair-berks-county-pa",
  },
  {
    title: "Shutoff valve leak or stuck valve",
    description: "Fixture-level valve at a sink, toilet, or supply line.",
    href: "/shutoff-valve-repair-berks-county-pa",
  },
  {
    title: "Not sure if it is a drain or plumbing issue?",
    description: "Multiple drains affected or sewage smell usually means a drain/sewer route instead.",
    href: "/drains",
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
    breadcrumbSchema(crumbs)
  );
  const evan = providers.evan;

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-stone-900">Plumbing &amp; leaks</h1>
          <p className="mt-4 text-lg text-stone-600">
            For fixture-level leaks and smaller residential plumbing repairs in Berks County — not
            sewer backups or main line clogs. {evan.name} handles repair-level jobs at isolated
            fixtures.
          </p>

          <PlumbingTriageNotice />

          <ul className="mt-8 space-y-3">
            {plumbingTopics.map((item) => (
              <li key={item.title}>
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-help"
              className="btn-touch inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-3 text-center font-medium text-white hover:bg-stone-800"
            >
              Request help
            </Link>
            <Link
              href="/small-plumbing-repairs-berks-county-pa"
              className="btn-touch inline-flex items-center justify-center rounded-lg border border-stone-300 px-5 py-3 text-center font-medium text-stone-900 hover:bg-stone-50"
            >
              All small plumbing repairs
            </Link>
          </div>

          <div className="mt-8">
            <DisclosureBlock />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

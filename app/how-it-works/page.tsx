import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { HubLandingPage } from "@/components/HubLandingPage";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { HOME_STEPS } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "How It Works",
  description: "How Berks Property Response handles drain, plumbing, and after-leak requests.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const crumbs = breadcrumbItems([
    { name: "How it works", path: "/how-it-works" },
  ]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "How It Works",
      description: "How Berks Property Response handles drain, plumbing, and after-leak requests.",
      path: "/how-it-works",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="How it works"
        subtitle="Call, text, or send a request with the property details."
        middle={
          <div className="space-y-5">
            <ol className="space-y-5">
              {HOME_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-stone-900">{step.title}</h2>
                    <p className="mt-1 text-sm text-stone-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-stone-600">
              <Link href="/disclosure" className="font-medium underline">
                Full disclosure
              </Link>
            </p>
            <Link
              href="/request-help"
              data-analytics-event="click_request_help"
              data-analytics-source="how_it_works"
              className="btn-primary mt-2 w-full"
            >
              Request local help
            </Link>
          </div>
        }
        showForm={false}
        showPrimaryCue={false}
      />
    </>
  );
}

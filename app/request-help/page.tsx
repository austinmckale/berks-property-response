import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { PHONE_NUMBER } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export const metadata = buildMetadata({
  title: "Request Help | Berks Property Response",
  description:
    "Get local help in Berks County for plumbing, drains, water damage, and repairs. Two quick steps on your phone.",
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
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-5 md:py-10">
        <div className="mx-auto max-w-lg md:max-w-5xl">
          {/* Mobile: emergency + form first */}
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="btn-touch-lg mb-5 flex w-full flex-col rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left active:bg-red-100 md:hidden"
          >
            <span className="font-semibold text-red-900">Active backup or leak?</span>
            <span className="text-sm text-red-800">Tap to call {PHONE_NUMBER}</span>
          </a>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-10">
            <div className="hidden lg:block lg:pt-2">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
                Get local help
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">
                Two quick steps. Tell us what happened and how to reach you—we&apos;ll connect
                you with the right local specialist in Berks County.
              </p>
              <ul className="mt-8 space-y-4 text-stone-700">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                    1
                  </span>
                  <span>
                    <strong className="font-semibold text-stone-900">Pick your problem</strong>
                    <span className="block text-sm text-stone-600">
                      Drain emergency, clog, leak, or repair after damage.
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                    2
                  </span>
                  <span>
                    <strong className="font-semibold text-stone-900">Share contact info</strong>
                    <span className="block text-sm text-stone-600">
                      Name, phone, city, and a short description.
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-900">Sewage or water backing up now?</p>
                <p className="mt-1 text-sm text-red-800">Call now so we can help faster.</p>
                <a
                  href={phoneHref(PHONE_NUMBER)}
                  className="mt-3 inline-block font-semibold text-red-900 underline"
                >
                  Call {PHONE_NUMBER}
                </a>
              </div>
            </div>

            <div>
              <h1 className="mb-4 text-2xl font-semibold text-stone-900 lg:hidden">
                Get local help
              </h1>
              <Suspense
                fallback={
                  <div className="h-[420px] animate-pulse rounded-2xl bg-stone-100" />
                }
              >
                <LeadForm pageType="request-help" />
              </Suspense>
              <p className="mt-4 text-center text-sm text-stone-500 lg:hidden">
                Pick your problem, then add name and phone. Takes about a minute.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

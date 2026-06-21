import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaScript";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}. Rules for using this Berks County referral and intake website.`,
  path: "/terms",
});

export default function TermsPage() {
  const crumbs = breadcrumbItems([{ name: "Terms", path: "/terms" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Terms of Use",
      description: "Terms of use for Berks Property Response.",
      path: "/terms",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
          <p>Last updated: June 2025</p>
          <p>
            By using {SITE_NAME}, you agree to these terms. This site provides intake and matching
            services only — we are not the direct service provider. Submitting a request does not
            require you to hire any provider.
          </p>
          <h2 className="text-xl font-bold text-slate-900">No guarantee of service</h2>
          <p>
            Submitting a request does not guarantee that a provider will accept your job, arrive within a specific timeframe, or complete work at a particular price.
          </p>
          <h2 className="text-xl font-bold text-slate-900">Provider relationship</h2>
          <p>
            Any contract for work is between you and the service provider you choose. See our{" "}
            <Link href="/disclosure" className="text-blue-700 hover:underline">
              disclosure
            </Link>{" "}
            for how matching and provider relationships work.
          </p>
          <h2 className="text-xl font-bold text-slate-900">Acceptable use</h2>
          <p>
            Do not submit false information or use this site for unlawful purposes. We may refuse or redirect requests outside our scope.
          </p>
        </div>
      </section>
    </>
  );
}

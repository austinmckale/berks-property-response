import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { SchemaScript } from "@/components/SchemaScript";
import { REFERRAL_DISCLOSURE_FULL } from "@/lib/disclosures";
import { breadcrumbItems, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  combineSchemas,
  organizationSchema,
  webPageSchema,
} from "@/lib/schema";
import { PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Referral Disclosure | Berks Property Response",
  description: REFERRAL_DISCLOSURE_FULL,
  path: "/disclosure",
});

export default function DisclosurePage() {
  const crumbs = breadcrumbItems([{ name: "Disclosure", path: "/disclosure" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Referral Disclosure",
      description: REFERRAL_DISCLOSURE_FULL,
      path: "/disclosure",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl prose prose-slate">
          <h1 className="text-3xl font-bold text-slate-900">How this site works</h1>
          <DisclosureBlock variant="full" className="mt-6" />
          <div className="mt-8 space-y-4 text-slate-700">
            <p>
              {SITE_NAME} helps people in Berks County describe plumbing, drain, and property repair problems and connects them with independent local providers.
            </p>
            <p>
              When you call {PHONE_NUMBER}, text photos, or submit a request, we may share your contact information and job details with Apex Drain Services, Evan Simons, RHI Pros, or another approved provider suited to your issue.
            </p>
            <p>
              The provider you choose performs the work. We do not guarantee response times, pricing, or outcomes. Confirm licensing and insurance directly with your provider.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

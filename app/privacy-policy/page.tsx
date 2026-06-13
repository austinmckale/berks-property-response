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
import { PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Privacy Policy | Berks Property Response",
  description: `Privacy policy for ${SITE_NAME}.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const crumbs = breadcrumbItems([{ name: "Privacy Policy", path: "/privacy-policy" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Privacy Policy",
      description: "Privacy policy for Berks Property Response.",
      path: "/privacy-policy",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <Breadcrumbs items={crumbs} />
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p>Last updated: June 2025</p>
          <p>
            {SITE_NAME} (&quot;we,&quot; &quot;us&quot;) operates an intake and referral website for property service requests in Berks County, Pennsylvania.
          </p>
          <h2 className="text-xl font-bold text-slate-900">Information we collect</h2>
          <p>
            When you submit a form, call, or text, we may collect your name, phone number, email, address, property details, problem description, photos, and marketing attribution data (such as UTM parameters).
          </p>
          <h2 className="text-xl font-bold text-slate-900">How we use information</h2>
          <p>
            We use your information to route your request to appropriate local service providers, improve our intake process, and comply with legal obligations. With your consent, we may share details with partner providers.
          </p>
          <h2 className="text-xl font-bold text-slate-900">SMS and calls</h2>
          <p>
            If you opt in, we or our partners may contact you by phone or text about your request. Consent is not a condition of purchase. Message and data rates may apply.
          </p>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p>
            Questions about this policy: <Link href="/contact" className="text-blue-700 hover:underline">contact us</Link> or call {PHONE_NUMBER}.
          </p>
        </div>
      </section>
    </>
  );
}

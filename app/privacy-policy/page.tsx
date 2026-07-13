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
import { CONTACT_EMAIL, PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. How we collect, use, and share information when you request help in Berks County.`,
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
        <div className="mx-auto max-w-3xl space-y-6 text-stone-700">
          <h1 className="text-3xl font-semibold text-stone-900">Privacy Policy</h1>
          <p className="text-sm text-stone-500">Last updated: July 13, 2026</p>
          <p>
            {SITE_NAME} operates a property-response coordination website for Berks County,
            Pennsylvania. When you contact us, we review your request and may share information with
            an appropriate local provider so they can respond about availability and an estimate.
            Submitting a request does not create an obligation to hire.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Information we collect</h2>
          <p>
            When you submit a form, call, or text, we may collect your name, phone number, email,
            city, ZIP, problem description, urgency, landing page, and marketing attribution data
            such as UTM parameters, gclid, and referrer. We do not require a street address on the
            public form.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">How we use information</h2>
          <p>
            We use your information to review the request, coordinate a provider introduction,
            follow up when needed, improve our intake process, and comply with legal obligations. We
            do not sell customer data broadly. Information may be shared with a suitable local
            provider for the purpose of responding to the submitted request.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Systems we use</h2>
          <p>
            Depending on configuration, request details may be stored or transmitted through Google
            Sheets (lead ledger), Discord (operations alerts), email (admin and optional customer
            confirmation via Resend), website analytics (Google Analytics 4 when configured), and
            our web host. Analytics events are configured to avoid sending names, phone numbers,
            emails, addresses, or free-text problem descriptions.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Calls and texts</h2>
          <p>
            By submitting a request, you authorize {SITE_NAME} to call or text you about that
            request and to share the information with a suitable local provider who may contact you
            about availability and an estimate. Message and data rates may apply. This is not
            consent to unrelated marketing.
          </p>
          <h2 className="text-xl font-semibold text-stone-900">Contact</h2>
          <p>
            Privacy questions:{" "}
            <Link href="/contact" className="font-medium underline">
              contact us
            </Link>
            {CONTACT_EMAIL ? (
              <>
                , email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
                  {CONTACT_EMAIL}
                </a>
              </>
            ) : null}
            , or call {PHONE_NUMBER}.
          </p>
        </div>
      </section>
    </>
  );
}

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
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Berks Property Response for plumbing, drain, and repair help in Berks County.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = breadcrumbItems([{ name: "Contact", path: "/contact" }]);
  const schemas = combineSchemas(
    organizationSchema(),
    webPageSchema({
      title: "Contact",
      description: "Contact Berks Property Response.",
      path: "/contact",
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SchemaScript schemas={schemas} />
      <HubLandingPage
        breadcrumbs={crumbs}
        title="Contact"
        subtitle="Call or text for the fastest response."
        variant="emergency"
        emergencyHeadline="Need help right now?"
        showForm={false}
        middle={
          <div className="space-y-2 text-sm text-stone-700">
            <p>
              <strong>Phone:</strong>{" "}
              <a href={phoneHref(PHONE_NUMBER)} className="font-medium underline">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              <strong>Text:</strong>{" "}
              <a href={smsHref(TEXT_NUMBER)} className="font-medium underline">
                {TEXT_NUMBER}
              </a>
            </p>
          </div>
        }
        footer={
          <Link
            href="/request-help"
            className="btn-touch-lg block rounded-xl bg-stone-900 py-4 text-center text-base font-semibold text-white active:bg-stone-800"
          >
            Send a request online
          </Link>
        }
      />
    </>
  );
}

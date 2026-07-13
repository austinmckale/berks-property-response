import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  /** When false, only show call + text (for pages that already have a form) */
  showFormLink?: boolean;
}

export function CTASection({
  title = "Need help now?",
  subtitle = "Call or text — especially for active backups.",
  showFormLink = true,
}: CTASectionProps) {
  return (
    <section className="border-t border-stone-200 bg-stone-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-lg text-center md:max-w-2xl">
        <h2 className="text-xl font-semibold text-stone-900 md:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-stone-600 md:text-base">{subtitle}</p>
        <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-center">
          <a
            href={phoneHref(PHONE_NUMBER)}
            data-analytics-event="phone_click"
            data-analytics-source="cta_section"
            className="btn-touch-lg w-full rounded-xl bg-red-600 text-base font-semibold text-white active:bg-red-700 md:w-auto md:rounded-lg md:px-8"
          >
            Call {PHONE_NUMBER}
          </a>
          <a
            href={smsHref(TEXT_NUMBER)}
            data-analytics-event="text_click"
            data-analytics-source="cta_section"
            className="btn-touch-lg w-full rounded-xl bg-stone-900 text-base font-semibold text-white active:bg-stone-800 md:w-auto md:rounded-lg md:px-6"
          >
            Text a photo
          </a>
          {showFormLink && (
            <Link
              href="/request-help"
              data-analytics-event="click_request_help"
              data-analytics-source="cta_section"
              className="btn-touch-lg w-full rounded-xl border-2 border-stone-300 bg-white text-base font-semibold text-stone-900 active:bg-stone-100 md:w-auto md:rounded-lg md:px-6"
            >
              Send a request
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

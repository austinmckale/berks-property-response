import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { TRUST_LINE } from "@/lib/disclosures";
import { phoneHref, smsHref } from "@/lib/tracking";

interface HeroProps {
  headline: string;
  subheadline: string;
  showEmergency?: boolean;
  showTrustLine?: boolean;
  compact?: boolean;
}

export function Hero({
  headline,
  subheadline,
  showEmergency = false,
  showTrustLine = false,
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`border-b border-stone-200 bg-stone-900 px-4 text-white ${compact ? "py-8 md:py-12" : "py-8 md:py-14"}`}
    >
      <div className="mx-auto max-w-lg text-center md:max-w-2xl">
        {showTrustLine && (
          <p className="mb-4 text-sm leading-snug text-stone-400">{TRUST_LINE}</p>
        )}
        <h1 className="text-balance text-[1.625rem] font-semibold leading-snug tracking-tight sm:text-3xl md:text-4xl">
          {headline}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
          {subheadline}
        </p>

        {showEmergency ? (
          <div className="mt-6">
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="click_call"
              data-analytics-source="hero_emergency"
              className="block rounded-2xl bg-red-600 px-5 py-5 active:bg-red-700"
            >
              <span className="text-sm font-semibold text-red-100">Active backup or sewage?</span>
              <span className="mt-1 block text-3xl font-bold tracking-tight md:text-4xl">
                {PHONE_NUMBER}
              </span>
              <span className="mt-1 block text-sm text-red-100">Tap to call</span>
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={smsHref(TEXT_NUMBER)}
                data-analytics-event="click_text"
                data-analytics-source="hero"
                className="btn-touch-lg rounded-xl bg-stone-800 text-sm font-semibold text-white active:bg-stone-700"
              >
                Text a photo
              </a>
              <Link
                href="#get-help"
                data-analytics-event="click_request_help"
                data-analytics-source="hero"
                className="btn-touch-lg rounded-xl border-2 border-stone-600 text-sm font-semibold text-white active:bg-stone-800"
              >
                Describe it
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="click_call"
              data-analytics-source="hero"
              className="btn-touch-lg rounded-xl bg-red-600 font-semibold text-white active:bg-red-700"
            >
              Call {PHONE_NUMBER}
            </a>
            <Link
              href="#get-help"
              data-analytics-event="click_request_help"
              data-analytics-source="hero"
              className="btn-touch-lg rounded-xl bg-white font-semibold text-stone-900 active:bg-stone-100"
            >
              Tell us what happened
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

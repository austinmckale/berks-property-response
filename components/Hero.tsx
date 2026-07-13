import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { TRUST_LINE } from "@/lib/disclosures";
import { phoneHref, smsHref } from "@/lib/tracking";

interface HeroProps {
  headline: string;
  subheadline: string;
  variant?: "home" | "emergency" | "standard";
  showTrustLine?: boolean;
  compact?: boolean;
  eyebrow?: string;
}

export function Hero({
  headline,
  subheadline,
  variant = "standard",
  showTrustLine = false,
  compact = false,
  eyebrow,
}: HeroProps) {
  const isHome = variant === "home";
  const isEmergency = variant === "emergency";

  return (
    <section
      className={`hero-pattern relative overflow-hidden border-b border-stone-800 px-4 text-white ${
        compact ? "py-10 md:py-12" : "py-12 md:py-16"
      }`}
    >
      <div className="relative mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className="eyebrow-light mb-4">{eyebrow}</p>
        ) : showTrustLine && !isHome ? (
          <p className="eyebrow-light mb-4">{TRUST_LINE}</p>
        ) : null}
        <h1 className="font-display text-balance text-[1.875rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {headline}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone-300 md:text-lg">
          {subheadline}
        </p>

        {isHome ? (
          <div className="mt-9">
            <div className="flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md">
              <a
                href={phoneHref(PHONE_NUMBER)}
                data-analytics-event="phone_click"
                data-analytics-source="hero"
                className="btn-touch-lg inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm active:bg-red-700"
              >
                Call BPR now
              </a>
              <Link
                href="#get-help"
                data-analytics-event="click_request_help"
                data-analytics-source="hero"
                className="btn-primary w-full"
              >
                Send a quick request
              </Link>
            </div>
            <p className="mt-4 text-sm text-stone-400">
              <a
                href={smsHref(TEXT_NUMBER)}
                data-analytics-event="text_click"
                data-analytics-source="hero"
                className="font-medium text-stone-200 underline underline-offset-2 hover:text-white"
              >
                Text photos
              </a>
              <span className="mx-2 text-stone-600">·</span>
              <Link
                href="/how-it-works"
                className="underline underline-offset-2 hover:text-stone-200"
              >
                How it works
              </Link>
            </p>
            {showTrustLine && (
              <p className="mt-6 text-sm leading-relaxed text-amber-100/90">
                {TRUST_LINE}
              </p>
            )}
          </div>
        ) : isEmergency ? (
          <div className="mt-8">
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="hero_emergency"
              className="block rounded-2xl bg-red-600 px-5 py-5 shadow-lg shadow-red-950/30 active:bg-red-700"
            >
              <span className="text-sm font-semibold text-red-100">
                Call for urgent help
              </span>
              <span className="font-display mt-1 block text-3xl font-semibold tracking-tight md:text-4xl">
                {PHONE_NUMBER}
              </span>
            </a>
            <p className="mt-4 text-sm text-stone-400">
              Not able to call?{" "}
              <Link href="#get-help" className="text-white underline underline-offset-2">
                Send a request
              </Link>
            </p>
          </div>
        ) : (
          <div className="mt-9">
            <Link
              href="#get-help"
              data-analytics-event="click_request_help"
              data-analytics-source="hero"
              className="btn-primary w-full sm:mx-auto sm:min-w-[14rem]"
            >
              Send a request
            </Link>
            <p className="mt-4 hidden text-sm text-stone-400 md:block">
              Or call{" "}
              <a
                href={phoneHref(PHONE_NUMBER)}
                data-analytics-event="phone_click"
                data-analytics-source="hero"
                className="text-white underline underline-offset-2"
              >
                {PHONE_NUMBER}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { PHONE_NUMBER } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

interface HeroProps {
  headline: string;
  subheadline: string;
  variant?: "home" | "emergency" | "standard";
  compact?: boolean;
  eyebrow?: string;
}

export function Hero({
  headline,
  subheadline,
  variant = "standard",
  compact = false,
  eyebrow,
}: HeroProps) {
  const isHome = variant === "home";
  const isEmergency = variant === "emergency";

  return (
    <section
      id={isHome ? "sticky-cta-marker" : undefined}
      className={`hero-pattern relative overflow-hidden border-b border-stone-800 px-4 text-white ${
        isHome ? "py-8 md:py-16" : compact ? "py-10 md:py-12" : "py-12 md:py-16"
      }`}
    >
      <div className="relative mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className={`eyebrow-light ${isHome ? "mb-3" : "mb-4"}`}>{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-balance text-[1.875rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {headline}
        </h1>
        <p className={`text-base leading-relaxed text-stone-300 md:text-lg ${isHome ? "mt-3" : "mt-5"}`}>
          {subheadline}
        </p>

        {isHome ? (
          <div className="mt-6">
            <div className="sm:mx-auto sm:max-w-md">
              <Link
                href="#get-help"
                data-analytics-event="click_request_help"
                data-analytics-source="hero"
                className="btn-primary w-full"
              >
                Start a request
              </Link>
            </div>
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="hero"
              className="mx-auto mt-2.5 inline-flex min-h-11 items-center justify-center px-3 text-sm font-medium text-red-200 underline underline-offset-2 hover:text-red-100"
            >
              Water or sewage active right now? Call {PHONE_NUMBER}
            </a>
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

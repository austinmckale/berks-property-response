import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface HeroProps {
  headline: string;
  subheadline: string;
  showEmergency?: boolean;
  compact?: boolean;
}

export function Hero({
  headline,
  subheadline,
  showEmergency = false,
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`border-b border-stone-200 bg-stone-900 px-4 text-white ${compact ? "py-8 md:py-12" : "py-8 md:py-16"}`}
    >
      <div className="mx-auto max-w-lg text-center md:max-w-3xl">
        {showEmergency && (
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="btn-touch-lg mb-5 rounded-xl bg-red-600 text-sm font-semibold text-white active:bg-red-700 sm:text-base md:mb-4 md:inline-flex md:rounded-md"
          >
            <span className="md:hidden">Sewage backup? Tap to call</span>
            <span className="hidden md:inline">Sewage backing up? Tap to call now</span>
          </a>
        )}
        <h1 className="text-balance text-[1.625rem] font-semibold leading-snug tracking-tight sm:text-3xl md:text-4xl md:leading-tight">
          {headline}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-300 md:mt-4 md:text-lg">
          {subheadline}
        </p>
        {/* Mobile-first: Call is first and full-width */}
        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center md:justify-center">
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="btn-touch-lg w-full rounded-xl bg-red-600 text-base text-white active:bg-red-700 md:w-auto md:rounded-lg md:px-6"
          >
            Call Now
          </a>
          <Link
            href="/request-help"
            className="btn-touch-lg w-full rounded-xl bg-white text-base text-stone-900 active:bg-stone-100 md:w-auto md:rounded-lg md:px-6"
          >
            Request Help
          </Link>
          <a
            href={smsHref(TEXT_NUMBER)}
            className="btn-touch-lg w-full rounded-xl border-2 border-stone-500 text-base text-white active:border-stone-300 md:w-auto md:rounded-lg md:border md:px-6"
          >
            Send Photos
          </a>
        </div>
      </div>
    </section>
  );
}

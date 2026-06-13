import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface HeroProps {
  headline: string;
  subheadline: string;
  showEmergency?: boolean;
}

export function Hero({ headline, subheadline, showEmergency = false }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        {showEmergency && (
          <p className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-800">
            If sewage or water is actively backing up, call now
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 text-lg text-slate-600 md:text-xl">{subheadline}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="w-full rounded-lg bg-red-600 px-6 py-3 text-center font-semibold text-white hover:bg-red-700 sm:w-auto"
          >
            Call Now
          </a>
          <a
            href={smsHref(TEXT_NUMBER)}
            className="w-full rounded-lg bg-blue-700 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800 sm:w-auto"
          >
            Text Photos
          </a>
          <Link
            href="/request-help"
            className="w-full rounded-lg border-2 border-blue-700 px-6 py-3 text-center font-semibold text-blue-700 hover:bg-blue-50 sm:w-auto"
          >
            Request Help
          </Link>
        </div>
      </div>
    </section>
  );
}

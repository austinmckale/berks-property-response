import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to get help?",
  subtitle = "Call, request help, or send photos from your phone.",
}: CTASectionProps) {
  return (
    <section className="border-t border-stone-200 bg-stone-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-lg text-center md:max-w-2xl">
        <h2 className="text-xl font-semibold text-stone-900 md:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-stone-600 md:text-base">{subtitle}</p>
        <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-center">
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="btn-touch-lg w-full rounded-xl bg-red-600 text-base text-white active:bg-red-700 md:w-auto md:rounded-lg md:px-6"
          >
            Call Now
          </a>
          <Link
            href="/request-help"
            className="btn-touch-lg w-full rounded-xl bg-stone-900 text-base text-white active:bg-stone-800 md:w-auto md:rounded-lg md:px-6"
          >
            Request Help
          </Link>
          <a
            href={smsHref(TEXT_NUMBER)}
            className="btn-touch-lg w-full rounded-xl border-2 border-stone-300 bg-white text-base text-stone-900 active:bg-stone-100 md:w-auto md:rounded-lg md:px-6"
          >
            Send Photos
          </a>
        </div>
      </div>
    </section>
  );
}

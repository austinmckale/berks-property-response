import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

/** Call / text / request CTAs for hub pages (light background) */
export function HubActionButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={phoneHref(PHONE_NUMBER)}
        className="btn-touch-lg rounded-xl bg-red-600 text-base text-white active:bg-red-700 sm:flex-1"
      >
        Call Now
      </a>
      <a
        href={smsHref(TEXT_NUMBER)}
        className="btn-touch-lg rounded-xl bg-stone-900 text-base text-white active:bg-stone-800 sm:flex-1"
      >
        Text Photos
      </a>
      <Link
        href="/request-help"
        className="btn-touch-lg rounded-xl border-2 border-stone-300 bg-white text-base text-stone-900 active:bg-stone-50 sm:flex-1"
      >
        Request Help
      </Link>
    </div>
  );
}

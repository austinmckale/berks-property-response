"use client";

import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-2 shadow-lg md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={phoneHref(PHONE_NUMBER)}
          className="rounded-lg bg-red-600 px-2 py-3 text-center text-xs font-bold text-white"
        >
          Call Now
        </a>
        <a
          href={smsHref(TEXT_NUMBER)}
          className="rounded-lg bg-blue-700 px-2 py-3 text-center text-xs font-bold text-white"
        >
          Text Photos
        </a>
        <Link
          href="/request-help"
          className="rounded-lg border border-blue-700 px-2 py-3 text-center text-xs font-bold text-blue-700"
        >
          Request Help
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

/** Fixed thumb-zone actions — hidden on form page and desktop */
export function StickyMobileCTA() {
  const pathname = usePathname();

  if (pathname === "/request-help") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden safe-bottom">
      <div className="grid grid-cols-3 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={phoneHref(PHONE_NUMBER)}
          className="btn-touch-lg rounded-xl bg-red-600 text-sm font-bold text-white active:bg-red-700"
        >
          Call
        </a>
        <a
          href={smsHref(TEXT_NUMBER)}
          className="btn-touch-lg rounded-xl bg-stone-900 text-sm font-bold text-white active:bg-stone-800"
        >
          Text photo
        </a>
        <Link
          href="/request-help"
          className="btn-touch-lg rounded-xl border-2 border-stone-300 bg-white text-sm font-bold text-stone-900 active:bg-stone-50"
        >
          Get help
        </Link>
      </div>
    </div>
  );
}

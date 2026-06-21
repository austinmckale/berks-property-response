"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileNav } from "@/components/MobileNavContext";
import { getHelpHref } from "@/lib/intakeLinks";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

/** Fixed thumb-zone actions — hidden on form page, desktop, and when mobile nav is open */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const { menuOpen } = useMobileNav();

  if (pathname === "/request-help" || menuOpen) {
    return null;
  }

  const helpHref = getHelpHref(pathname);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden safe-bottom"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 gap-1.5 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="click_call"
          data-analytics-source="sticky_mobile"
          className="btn-touch-fill rounded-xl bg-red-600 text-white active:bg-red-700"
        >
          Call
        </a>
        <a
          href={smsHref(TEXT_NUMBER)}
          data-analytics-event="click_text"
          data-analytics-source="sticky_mobile"
          className="btn-touch-fill rounded-xl bg-stone-900 text-white active:bg-stone-800"
          aria-label="Text a photo"
        >
          Text
        </a>
        <Link
          href={helpHref}
          data-analytics-event="click_request_help"
          data-analytics-source="sticky_mobile"
          className="btn-touch-fill rounded-xl bg-brand text-white active:bg-brand-hover"
        >
          Request
        </Link>
      </div>
    </div>
  );
}

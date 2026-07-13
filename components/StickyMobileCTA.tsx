"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileNav } from "@/components/MobileNavContext";
import { getHelpHref } from "@/lib/intakeLinks";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

/**
 * Fixed thumb-zone actions — Call (urgent), Request (primary), Text (supporting).
 * Hidden when mobile nav is open. Visible on /request-help so Call stays available mid-form.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const { menuOpen } = useMobileNav();

  if (menuOpen) {
    return null;
  }

  const helpHref = pathname === "/request-help" ? "#get-help" : getHelpHref(pathname);
  const onRequestHelp = pathname === "/request-help";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden safe-bottom"
      aria-label="Quick actions"
    >
      <div
        className={`grid gap-1.5 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] ${
          onRequestHelp ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="phone_click"
          data-analytics-source="sticky_mobile"
          className="btn-touch-fill rounded-xl bg-red-600 text-white active:bg-red-700"
        >
          Call now
        </a>
        {onRequestHelp ? (
          <a
            href="#get-help"
            data-analytics-event="click_request_help"
            data-analytics-source="sticky_mobile"
            className="btn-touch-fill rounded-xl bg-brand text-white active:bg-brand-hover"
          >
            Continue request
          </a>
        ) : (
          <Link
            href={helpHref}
            data-analytics-event="click_request_help"
            data-analytics-source="sticky_mobile"
            className="btn-touch-fill rounded-xl bg-brand text-white active:bg-brand-hover"
          >
            Request
          </Link>
        )}
        {!onRequestHelp && (
          <a
            href={smsHref(TEXT_NUMBER)}
            data-analytics-event="text_click"
            data-analytics-source="sticky_mobile"
            className="btn-touch-fill rounded-xl border border-stone-300 bg-white text-stone-800 active:bg-stone-50"
            aria-label="Text photos"
          >
            Text photos
          </a>
        )}
      </div>
    </div>
  );
}

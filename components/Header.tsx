"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMobileNav } from "@/components/MobileNavContext";
import { NAV_LINKS, PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export function Header() {
  const { menuOpen, setMenuOpen } = useMobileNav();
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="min-w-0 max-w-[52%] truncate text-[0.875rem] font-semibold leading-tight text-stone-900 sm:max-w-none sm:text-lg"
        >
          {SITE_NAME}
        </Link>

        <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={phoneHref(PHONE_NUMBER)}
            data-analytics-event="click_call"
            data-analytics-source="header"
            className="btn-touch shrink-0 rounded-lg bg-red-600 px-3 text-sm text-white hover:bg-red-700 sm:px-4"
          >
            Call
          </a>

          <button
            type="button"
            className="btn-touch-icon rounded-lg border border-stone-200 bg-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-stone-900/30 md:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="relative z-50 max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-stone-200 bg-white px-4 py-3 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-[3rem] items-center rounded-lg px-3 text-base font-medium ${
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-800"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/request-help"
                data-analytics-event="click_request_help"
                data-analytics-source="header_mobile"
                className="btn-touch-lg mt-1 rounded-lg bg-stone-900 text-base font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Request help
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

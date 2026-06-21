"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMobileNav } from "@/components/MobileNavContext";
import {
  HEADER_NAV_LINKS,
  MORE_NAV_LINKS,
  PHONE_NUMBER,
  SITE_NAME,
} from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

/** All nav destinations — primary first, then secondary */
const MENU_LINKS = [...HEADER_NAV_LINKS, ...MORE_NAV_LINKS];

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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="min-w-0 truncate text-sm font-semibold text-stone-900 sm:text-base"
        >
          {SITE_NAME}
        </Link>

        <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/emergency"
            className="btn-touch hidden rounded-lg px-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 sm:inline-flex"
          >
            Emergency
          </Link>
          <Link
            href="/request-help"
            className="btn-touch hidden rounded-lg px-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 sm:inline-flex"
          >
            Get Help
          </Link>

          <a
            href={phoneHref(PHONE_NUMBER)}
            data-analytics-event="click_call"
            data-analytics-source="header"
            className="btn-touch shrink-0 rounded-lg bg-red-600 px-3 text-sm font-semibold text-white hover:bg-red-700 sm:px-4"
          >
            Call
          </a>

          <button
            type="button"
            className="btn-touch-icon rounded-lg border border-stone-200 bg-white"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
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
            className="fixed inset-0 z-40 bg-stone-900/30"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="site-nav"
            className="relative z-50 max-h-[min(75vh,calc(100dvh-4rem))] overflow-y-auto border-t border-stone-200 bg-white px-4 py-3 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-[3rem] items-center rounded-lg px-3 text-base font-medium ${
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "bg-stone-100 text-stone-900"
                      : link.href === "/emergency"
                        ? "text-red-700"
                        : "text-stone-800"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-stone-100" />
              <Link
                href="/disclosure"
                className="flex min-h-[2.5rem] items-center rounded-lg px-3 text-sm text-stone-500"
                onClick={() => setMenuOpen(false)}
              >
                Disclosure
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

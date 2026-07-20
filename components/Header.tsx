"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useMobileNav } from "@/components/MobileNavContext";
import {
  HEADER_NAV_LINKS,
  MORE_NAV_LINKS,
  PHONE_NUMBER,
  REQUEST_HELP_LINK,
} from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

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

  const desktopLinks = HEADER_NAV_LINKS.filter((l) => l.href !== "/emergency");

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-1.5 px-2 py-2 sm:min-h-16 sm:gap-2 sm:px-4 sm:py-3">
        <BrandLogo variant="header" className="min-w-0 max-w-[9.5rem] sm:max-w-[14rem]" />

        <nav className="hidden items-center gap-0.5 2xl:flex" aria-label="Main">
          <Link
            href="/emergency"
            className="btn-touch inline-flex items-center justify-center rounded-lg px-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Emergency
          </Link>
          {desktopLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn-touch inline-flex items-center justify-center rounded-lg px-2 text-sm font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${
                pathname === link.href ? "text-stone-900" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href={REQUEST_HELP_LINK.href}
            className="btn-touch hidden rounded-lg bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand 2xl:inline-flex"
          >
            {REQUEST_HELP_LINK.label}
          </Link>

          <a
            href={phoneHref(PHONE_NUMBER)}
            data-analytics-event="phone_click"
            data-analytics-source="header"
            aria-label={`Call ${PHONE_NUMBER}`}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg bg-red-600 p-0 text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 2xl:min-h-12 2xl:min-w-0 2xl:px-4 2xl:text-sm 2xl:font-semibold"
          >
            <Phone className="h-5 w-5 shrink-0 2xl:hidden" aria-hidden />
            <span className="hidden 2xl:inline">Call</span>
          </a>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 2xl:hidden"
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
            className="relative z-50 max-h-[min(80vh,calc(100dvh-4rem))] overflow-y-auto border-t border-stone-200 bg-white px-4 py-3 shadow-lg"
          >
            <div className="mb-3 border-b border-stone-100 pb-3">
              <BrandLogo variant="header" linked={false} />
            </div>
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="mobile_menu"
              className="btn-touch mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {PHONE_NUMBER}
            </a>
            <Link
              href={REQUEST_HELP_LINK.href}
              className="btn-primary mb-3 w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              onClick={() => setMenuOpen(false)}
            >
              {REQUEST_HELP_LINK.label}
            </Link>
            <div className="flex flex-col gap-0.5">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-[3rem] items-center rounded-lg px-3 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${
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
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

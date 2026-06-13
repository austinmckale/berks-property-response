"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, PHONE_NUMBER, SITE_NAME } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold text-slate-900">{SITE_NAME}</span>
          <span className="hidden text-xs text-slate-500 sm:block">
            Berks County intake &amp; routing
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Call Now
          </a>
          <Link
            href="/request-help"
            className="rounded-lg border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Request Help
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={phoneHref(PHONE_NUMBER)}
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Call Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import { REFERRAL_DISCLOSURE_FULL } from "@/lib/disclosures";
import {
  FOOTER_ABOUT_LINKS,
  FOOTER_SERVICE_LINKS,
  PHONE_NUMBER,
  SITE_NAME,
  SITE_SUBTITLE,
} from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-lg space-y-8 px-4 py-8 md:max-w-5xl md:grid md:grid-cols-3 md:gap-8 md:py-10">
        <div>
          <p className="font-semibold text-white">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-stone-400">{SITE_SUBTITLE}</p>
          <a
            href={phoneHref(PHONE_NUMBER)}
            data-analytics-event="click_call"
            data-analytics-source="footer"
            className="mt-3 inline-block text-base font-semibold text-white underline-offset-2 hover:underline"
          >
            {PHONE_NUMBER}
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Services</p>
          <ul className="mt-2 space-y-1">
            {FOOTER_SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm text-stone-400 active:text-white md:py-1.5 md:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">About</p>
          <ul className="mt-2 space-y-1">
            {FOOTER_ABOUT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm text-stone-400 active:text-white md:py-1.5 md:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 px-4 py-6">
        <p className="mx-auto max-w-lg text-xs leading-relaxed text-stone-500 md:max-w-5xl">
          {REFERRAL_DISCLOSURE_FULL}
        </p>
        <p className="mx-auto mt-4 max-w-lg text-xs text-stone-600 md:max-w-5xl">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}

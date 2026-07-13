import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FOOTER_DISCLOSURE } from "@/lib/disclosures";
import {
  FOOTER_ABOUT_LINKS,
  FOOTER_SERVICE_LINKS,
  PHONE_NUMBER,
  REQUEST_HELP_LINK,
  SITE_SUBTITLE,
} from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-3 text-sm leading-relaxed text-stone-400">{SITE_SUBTITLE}</p>
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="click_call"
              data-analytics-source="footer"
              className="mt-4 inline-block text-base font-semibold text-white underline-offset-2 hover:underline"
            >
              {PHONE_NUMBER}
            </a>
            <Link
              href={REQUEST_HELP_LINK.href}
              className="mt-3 block text-sm font-semibold text-stone-200 underline-offset-2 hover:underline"
            >
              Send a request →
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Common issues</p>
            <ul className="mt-3 space-y-1">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-stone-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">About</p>
            <ul className="mt-3 space-y-1">
              {FOOTER_ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-stone-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 px-4 py-6">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-stone-500">
          {FOOTER_DISCLOSURE}{" "}
          <Link href="/disclosure" className="underline hover:text-stone-400">
            Full disclosure
          </Link>
          .
        </p>
        <p className="mx-auto mt-4 max-w-6xl text-xs text-stone-600">
          © {new Date().getFullYear()} Berks Property Response
        </p>
      </div>
    </footer>
  );
}

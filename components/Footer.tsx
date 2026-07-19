import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  footerInfoLinks,
  footerLocalLinks,
  footerPopularProblems,
  footerServiceLinks,
} from "@/lib/internalLinks";
import { PHONE_NUMBER, REQUEST_HELP_LINK, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="footer" />
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="footer"
              className="mt-3 inline-flex min-h-11 items-center text-base font-semibold text-white underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Call {PHONE_NUMBER}
            </a>
            <a
              href={smsHref(TEXT_NUMBER, "Hi Berks Property Response — I need help with a property issue.")}
              data-analytics-event="text_click"
              data-analytics-source="footer"
              className="mt-2 block text-sm text-stone-300 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Text {TEXT_NUMBER}
            </a>
            <Link
              href={REQUEST_HELP_LINK.href}
              data-analytics-event="click_request_help"
              data-analytics-source="footer"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-stone-200 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a request
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-3 space-y-1">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center py-1 text-sm text-stone-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Popular problems</p>
            <ul className="mt-3 space-y-1">
              {footerPopularProblems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center py-1 text-sm text-stone-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Local</p>
            <ul className="mt-3 space-y-1">
              {footerLocalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center py-1 text-sm text-stone-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Information</p>
            <ul className="mt-3 space-y-1">
              {footerInfoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center py-1 text-sm text-stone-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          Berks Property Response coordinates requests with independent local providers. Providers
          set pricing and perform the work.{" "}
          <Link
            href="/disclosure"
            className="underline hover:text-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Disclosure
          </Link>
          <span aria-hidden="true"> · </span>
          <Link
            href="/privacy-policy"
            className="underline hover:text-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Privacy
          </Link>
          <span aria-hidden="true"> · </span>
          <Link
            href="/terms"
            className="underline hover:text-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Terms
          </Link>
        </p>
        <p className="mx-auto mt-4 max-w-6xl text-xs text-stone-600">
          © {new Date().getFullYear()} Berks Property Response
        </p>
      </div>
    </footer>
  );
}

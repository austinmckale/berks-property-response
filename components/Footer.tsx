import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PHONE_NUMBER, REQUEST_HELP_LINK } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

const serviceLinks = [
  { href: "/drains", label: "Drain & sewer" },
  { href: "/plumbing-and-leaks", label: "Plumbing & leaks" },
  { href: "/after-leak", label: "After a leak" },
  { href: "/service-areas", label: "Service areas" },
] as const;

const aboutLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/local-partners", label: "Local partners" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <BrandLogo variant="footer" />
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="footer"
              className="mt-3 inline-block text-base font-semibold text-white underline-offset-2 hover:underline"
            >
              Call {PHONE_NUMBER}
            </a>
            <Link
              href={REQUEST_HELP_LINK.href}
              className="mt-3 block text-sm font-semibold text-stone-200 underline-offset-2 hover:underline"
            >
              Start a request
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-3 space-y-1">
              {serviceLinks.map((link) => (
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
            <p className="text-sm font-semibold text-white">Information</p>
            <ul className="mt-3 space-y-1">
              {aboutLinks.map((link) => (
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
          Berks Property Response coordinates requests with independent local providers. Providers
          set pricing and perform the work.{" "}
          <Link href="/disclosure" className="underline hover:text-stone-400">
            Disclosure
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/privacy-policy" className="underline hover:text-stone-400">
            Privacy
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/terms" className="underline hover:text-stone-400">
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

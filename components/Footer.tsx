import Link from "next/link";
import { REFERRAL_DISCLOSURE_FULL } from "@/lib/disclosures";
import { NAV_LINKS, SITE_NAME } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{SITE_NAME}</p>
          <p className="mt-2 text-sm">
            Local intake and referral for plumbing, drains, water damage, and property repairs in Berks County, PA.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/disclosure" className="hover:text-white">
                Referral Disclosure
              </Link>
            </li>
            <li>
              <Link href="/local-partners" className="hover:text-white">
                Local Partners
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 px-4 py-6">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-slate-400">
          {REFERRAL_DISCLOSURE_FULL}
        </p>
        <p className="mx-auto mt-4 max-w-6xl text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

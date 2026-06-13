import Link from "next/link";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Get local help in Berks County",
  subtitle = "Tell us what happened. We'll route your request to the right-fit local provider.",
}: CTASectionProps) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-blue-700 px-6 py-10 text-center text-white">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="mt-3 text-blue-100">{subtitle}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={phoneHref(PHONE_NUMBER)}
            className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50 sm:w-auto"
          >
            Call Now
          </a>
          <a
            href={smsHref(TEXT_NUMBER)}
            className="w-full rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-blue-600 sm:w-auto"
          >
            Text Photos
          </a>
          <Link
            href="/request-help"
            className="w-full rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-blue-600 sm:w-auto"
          >
            Request Help
          </Link>
        </div>
      </div>
    </section>
  );
}

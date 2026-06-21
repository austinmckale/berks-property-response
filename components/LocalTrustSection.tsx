import Link from "next/link";
import { ClipboardList, MapPin, PhoneCall } from "lucide-react";
import { SERVICE_AREA_NATURAL_COPY } from "@/lib/brand";
import { INTAKE_DISCLOSURE_SHORT } from "@/lib/disclosures";
import { HOME_STEPS } from "@/lib/siteConfig";

const stepIcons = [ClipboardList, MapPin, PhoneCall] as const;

/** Merged “Serving Berks” + “How routing works” — one trust block, not two. */
export function LocalTrustSection() {
  return (
    <section className="section-pad-sm border-b border-stone-200 bg-white px-4">
      <div className="page-container-wide md:max-w-4xl">
        <p className="eyebrow text-center md:text-left">Berks County, PA</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-left md:text-3xl">
          Local intake when you&apos;re not sure who to call
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-stone-600 md:mx-0 md:text-left md:text-base">
          {SERVICE_AREA_NATURAL_COPY}
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {HOME_STEPS.map((step, i) => {
            const Icon = stepIcons[i] ?? ClipboardList;
            return (
              <li key={step.title} className="card-elevated p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-center text-sm leading-relaxed text-stone-600 md:text-left">
          <span className="font-medium text-stone-900">BPR is not the contractor.</span>{" "}
          We route your request to an independent local provider. No obligation to hire.
        </p>
        <p className="mt-3 text-center text-xs leading-relaxed text-stone-500 md:text-left">
          {INTAKE_DISCLOSURE_SHORT}
        </p>
        <p className="mt-4 text-center text-sm md:text-left">
          <Link href="/how-it-works" className="font-semibold text-brand hover:underline">
            How it works
          </Link>
          <span className="text-stone-300"> · </span>
          <Link href="/disclosure" className="font-semibold text-stone-700 hover:underline">
            Disclosure
          </Link>
        </p>
      </div>
    </section>
  );
}

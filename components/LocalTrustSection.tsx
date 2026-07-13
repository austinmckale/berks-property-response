import Link from "next/link";
import { ClipboardList, MapPin, PhoneCall, Handshake } from "lucide-react";
import { SERVICE_AREA_NATURAL_COPY } from "@/lib/brand";
import { HOME_STEPS } from "@/lib/siteConfig";

const stepIcons = [ClipboardList, MapPin, Handshake, PhoneCall] as const;

/** Serving Berks + how coordination works — no defensive disclaimer block. */
export function LocalTrustSection() {
  return (
    <section className="section-pad-sm border-b border-stone-200 bg-white px-4">
      <div className="page-container-wide md:max-w-4xl">
        <p className="eyebrow text-center md:text-left">Berks County, PA</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-left md:text-3xl">
          One local place to start
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-stone-600 md:mx-0 md:text-left md:text-base">
          {SERVICE_AREA_NATURAL_COPY}
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STEPS.map((step, i) => {
            const Icon = stepIcons[i] ?? ClipboardList;
            return (
              <li key={step.title} className="card-elevated p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-center text-sm md:text-left">
          <Link href="/how-it-works" className="font-semibold text-brand hover:underline">
            How it works
          </Link>
          <span className="text-stone-300"> · </span>
          <Link href="/local-partners" className="font-semibold text-stone-700 hover:underline">
            Local provider network
          </Link>
        </p>
      </div>
    </section>
  );
}

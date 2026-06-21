import Link from "next/link";
import { ClipboardList, MapPin, PhoneCall } from "lucide-react";
import { HOME_STEPS } from "@/lib/siteConfig";

const stepIcons = [ClipboardList, MapPin, PhoneCall] as const;

/** Used on /how-it-works and similar — homepage uses LocalTrustSection instead. */
export function RoutingStepsSection() {
  return (
    <section className="section-pad border-b border-stone-200 bg-stone-50 px-4">
      <div className="page-container md:max-w-3xl">
        <p className="eyebrow text-center md:text-left">How it works</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-left md:text-3xl">
          Simple local routing when you&apos;re not sure who to call
        </h2>

        <ol className="mt-8 space-y-4">
          {HOME_STEPS.map((step, i) => {
            const Icon = stepIcons[i] ?? ClipboardList;
            return (
              <li key={step.title} className="card-elevated flex gap-4 p-4 md:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
          <p className="font-medium text-stone-900">Is Berks Property Response the contractor?</p>
          <p className="mt-1.5 leading-relaxed">
            No. BPR is a local intake hub. An independent provider may call or text you about
            availability and next steps. There is no obligation to hire.
          </p>
        </div>

        <p className="mt-6 text-center text-sm md:text-left">
          <Link href="/disclosure" className="font-semibold text-brand hover:underline">
            Full disclosure
          </Link>
        </p>
      </div>
    </section>
  );
}

export function RoutingInfoCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="card-elevated p-4">
        <h2 className="eyebrow">When to request help</h2>
        <ul className="mt-3 space-y-2 text-sm text-stone-700">
          <li>• Active backup, leak, or visible damage</li>
          <li>• You&apos;re not sure which type of pro to call</li>
          <li>• You want a local provider to reach out about next steps</li>
        </ul>
      </div>
      <div className="card-elevated p-4">
        <h2 className="eyebrow">How this gets routed</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          We review your request and route it to a suitable local provider lane — drain/sewer,
          plumbing, water damage repair, or manual review for major property issues.
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { ProviderId } from "@/lib/providers";
import { ProviderTrustStrip } from "./ProviderTrustStrip";
import { ServiceAreaCrossLinks } from "./ServiceAreaCrossLinks";

export interface HubLink {
  href: string;
  label: string;
  description?: string;
}

export interface HubFaq {
  question: string;
  answer: string;
}

export function HubCategoryOverview({
  explanation,
  belongs,
  notFor,
  problemLinks,
  providerId,
}: {
  explanation: string;
  belongs: string;
  notFor: string;
  problemLinks: HubLink[];
  providerId: ProviderId;
}) {
  return (
    <div>
      <section>
        <h2 className="font-display text-xl font-semibold text-stone-900">
          What belongs in this service lane
        </h2>
        <p className="mt-3 leading-relaxed text-stone-700">{explanation}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <dt className="text-sm font-semibold text-stone-900">A good fit</dt>
            <dd className="mt-1 text-sm leading-relaxed text-stone-600">{belongs}</dd>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <dt className="text-sm font-semibold text-stone-900">Usually another lane</dt>
            <dd className="mt-1 text-sm leading-relaxed text-stone-600">{notFor}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Common symptoms
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {problemLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block min-h-full rounded-xl border border-stone-200 bg-white p-4 transition hover:border-stone-400"
              >
                <span className="font-semibold text-stone-900">{link.label}</span>
                {link.description && (
                  <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                    {link.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6">
        <ProviderTrustStrip providerId={providerId} />
      </div>
    </div>
  );
}

export function HubSupportingContent({
  urgency,
  relatedLinks,
  faqs,
}: {
  urgency: string;
  relatedLinks: HubLink[];
  faqs: HubFaq[];
}) {
  return (
    <div className="space-y-8 border-t border-stone-200 pt-8">
      <section>
        <h2 className="font-display text-xl font-semibold text-stone-900">
          When to call
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">{urgency}</p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Related problems
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-12 items-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 hover:border-stone-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ServiceAreaCrossLinks />

      <section>
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Service questions
        </h2>
        <div className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="py-3">
              <summary className="cursor-pointer py-1 pr-8 text-sm font-semibold text-stone-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { symptomCards, triageCards } from "@/lib/problems";

const accentMap: Record<string, string> = {
  drain: "border-l-red-600",
  plumbing: "border-l-stone-600",
  "water-damage": "border-l-cyan-800",
  major: "border-l-amber-700",
};

export function TriageCards() {
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-lg md:max-w-6xl">
        <h2 className="text-xl font-semibold text-stone-900 md:text-3xl">
          Tell us what&apos;s going on
        </h2>
        <p className="mt-1.5 text-sm text-stone-600 md:mt-2 md:text-base">
          Choose the closest match — we route one request to the right local provider.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {triageCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`card-touch block rounded-xl border border-stone-200 border-l-4 bg-white p-4 active:bg-stone-50 md:p-5 ${accentMap[card.icon] ?? "border-l-stone-800"}`}
            >
              <h3 className="font-semibold text-stone-900">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-stone-600">{card.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-stone-800 underline-offset-2">
                {card.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Secondary symptom picker — desktop only to keep mobile homepage short */
export function SymptomCards() {
  return (
    <section className="hidden border-y border-stone-200 bg-stone-50 px-4 py-12 md:block">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-stone-900 md:text-3xl">
          Common situations
        </h2>
        <p className="mt-2 text-stone-600">
          Request help with a specific issue in Berks County.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {symptomCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="card-touch rounded-lg border border-stone-200 bg-white p-4 active:bg-stone-50"
            >
              <h3 className="font-semibold text-stone-900">{card.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

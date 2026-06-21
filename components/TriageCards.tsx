import Link from "next/link";
import { triageCards } from "@/lib/problems";

const accentMap: Record<string, string> = {
  drain: "border-l-red-600",
  plumbing: "border-l-stone-600",
  "water-damage": "border-l-cyan-800",
  major: "border-l-amber-700",
};

export function TriageCards() {
  return (
    <section className="px-4 py-8 md:py-10">
      <div className="mx-auto max-w-lg md:max-w-6xl">
        <h2 className="text-xl font-semibold text-stone-900 md:text-2xl">
          What happened?
        </h2>
        <p className="mt-1.5 text-sm text-stone-600">
          Tap one — opens the request form below.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {triageCards.map((card) => (
            <Link
              key={card.title}
              href={`/?problem=${card.problem}#get-help`}
              className={`card-touch block rounded-xl border border-stone-200 border-l-4 bg-white p-4 active:bg-stone-50 md:p-5 ${accentMap[card.icon] ?? "border-l-stone-800"}`}
            >
              <h3 className="font-semibold text-stone-900">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-stone-600">{card.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-stone-800">
                {card.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { symptomCards, triageCards } from "@/lib/problems";

const accentMap: Record<string, string> = {
  drain: "border-l-red-600",
  plumbing: "border-l-slate-600",
  "water-damage": "border-l-cyan-700",
  "property-repair": "border-l-amber-700",
};

export function TriageCards() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          What type of help do you need?
        </h2>
        <p className="mt-2 text-slate-600">
          Choose the category closest to your situation. We&apos;ll route your request to the right local provider.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {triageCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group rounded-xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md ${accentMap[card.icon] ?? "border-l-blue-700"}`}
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SymptomCards() {
  return (
    <section className="bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          What happened?
        </h2>
        <p className="mt-2 text-slate-600">
          Select the symptom that most closely matches your situation.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {symptomCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300"
            >
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

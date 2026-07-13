import { forConsumerDisplay } from "@/lib/consumerCopy";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  compact?: boolean;
}

export function FAQ({ items, title = "Questions", compact = false }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-stone-200 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-lg font-semibold text-stone-900 md:text-xl">{title}</h2>
        {compact ? (
          <div className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
            {items.map((item) => (
              <details key={item.question} className="group py-3">
                <summary className="cursor-pointer pr-8 text-sm font-medium text-stone-900 marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {forConsumerDisplay(item.answer)}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <dl className="mt-6 space-y-6">
            {items.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-stone-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                  {forConsumerDisplay(item.answer)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

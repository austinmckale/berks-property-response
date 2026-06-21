import { forConsumerDisplay } from "@/lib/consumerCopy";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Questions" }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-stone-200 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-lg font-semibold text-stone-900 md:text-xl">{title}</h2>
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
      </div>
    </section>
  );
}

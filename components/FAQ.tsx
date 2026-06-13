interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently asked questions" }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <dl className="mt-6 space-y-6">
          {items.map((item) => (
            <div key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
              <dt className="font-semibold text-slate-900">{item.question}</dt>
              <dd className="mt-2 text-sm text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

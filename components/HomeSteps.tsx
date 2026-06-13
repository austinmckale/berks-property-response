import { HOME_STEPS } from "@/lib/siteConfig";

export function HomeSteps() {
  return (
    <section className="border-y border-stone-200 bg-white px-4 py-8 md:py-12">
      <div className="mx-auto max-w-lg md:max-w-2xl">
        <h2 className="text-lg font-semibold text-stone-900 md:text-2xl">
          How it works
        </h2>
        <ol className="mt-6 space-y-5 md:mt-8 md:space-y-6">
          {HOME_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3 md:gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

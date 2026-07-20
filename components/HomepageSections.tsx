import Link from "next/link";
import {
  getPublishedGuides,
  homepageFaqs,
  homepagePriorityCities,
  homepageProblemLinks,
  homepageProviderLanes,
  serviceLanes,
} from "@/lib/homepageContent";

export function HomepageSections() {
  const publishedGuides = getPublishedGuides();

  return (
    <div className="border-t border-stone-200 bg-white">
      <section className="px-4 py-8 md:py-10" aria-labelledby="home-lanes-heading">
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-lanes-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Get the right kind of help
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Describe the problem once and we&apos;ll connect it with the appropriate local provider.
          </p>
          <ul className="mt-5 grid gap-2 md:grid-cols-3">
            {serviceLanes.map((lane) => (
              <li key={lane.href}>
                <Link
                  href={lane.href}
                  className="flex min-h-12 flex-col justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 transition hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  <span className="font-semibold text-stone-900">{lane.title}</span>
                  <span className="mt-1 hidden text-sm leading-relaxed text-stone-600 sm:block">
                    {lane.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-t border-stone-200 bg-brand-subtle px-4 py-8 md:py-10"
        aria-labelledby="home-problems-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-problems-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Browse by problem
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {homepageProblemLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex min-h-12 flex-col items-start justify-center rounded-xl border border-stone-200 bg-white px-3 py-2 transition hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  <span className="mt-1 hidden text-sm leading-relaxed text-stone-600 sm:block">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-8 md:py-10" aria-labelledby="home-providers-heading">
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-providers-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Who handles the work?
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            The provider confirms availability, the work needed, and pricing.
          </p>
          <ul className="mt-5 grid gap-2 md:grid-cols-3">
            {homepageProviderLanes.map((provider) => (
              <li
                key={provider.id}
                className="rounded-xl border border-stone-200 bg-white px-4 py-3"
              >
                <h3 className="font-semibold text-stone-900">{provider.publicDisplayName}</h3>
                {provider.contactPerson && (
                  <p className="mt-0.5 text-sm text-stone-500">
                    Contact: {provider.contactPerson}
                  </p>
                )}
                <p className="mt-2 text-sm text-stone-600">{provider.type}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/local-partners"
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-stone-900 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
          >
            View the local provider network
          </Link>
        </div>
      </section>

      <section
        className="border-t border-stone-200 bg-stone-50 px-4 py-8 md:py-10"
        aria-labelledby="home-areas-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-areas-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Areas served
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {homepagePriorityCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/service-areas/${city.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-stone-300 bg-white px-4 text-sm font-medium text-stone-800 hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  {city.name}, PA
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/service-areas"
                className="inline-flex min-h-11 items-center rounded-full border border-stone-900 bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                All service areas
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {publishedGuides.length > 0 && (
        <section className="section-pad px-4" aria-labelledby="home-guides-heading">
          <div className="page-container-wide md:max-w-6xl">
            <h2
              id="home-guides-heading"
              className="font-display text-2xl font-semibold tracking-tight text-stone-900"
            >
              Helpful local guides
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {publishedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="block rounded-xl border border-stone-200 bg-white p-4 hover:border-stone-400"
                  >
                    <span className="font-semibold text-stone-900">{guide.title}</span>
                    <span className="mt-1 block text-sm text-stone-600">{guide.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/guides" className="mt-4 inline-block text-sm font-semibold underline">
              All guides
            </Link>
          </div>
        </section>
      )}

      <section
        className="border-t border-stone-200 px-4 py-8 md:py-10"
        aria-labelledby="home-faq-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-faq-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Common questions
          </h2>
          <div className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
            {homepageFaqs.map((faq) => (
              <details key={faq.question} className="py-3">
                <summary className="flex min-h-11 cursor-pointer items-center pr-8 font-semibold text-stone-900">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

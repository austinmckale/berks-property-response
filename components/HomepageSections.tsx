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
      <section className="section-pad px-4" aria-labelledby="home-lanes-heading">
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-lanes-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            How local help is organized
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">
            Different symptoms need different local providers. Berks Property Response helps you
            choose the closest service lane, collect useful details, and coordinate the request
            with the appropriate independent provider in Berks County.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {serviceLanes.map((lane) => (
              <li key={lane.href}>
                <Link
                  href={lane.href}
                  className="flex min-h-full flex-col rounded-xl border border-stone-200 bg-stone-50 p-5 transition hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  <span className="font-semibold text-stone-900">{lane.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-stone-600">
                    {lane.description}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-brand">Browse this lane →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-pad border-t border-stone-200 bg-brand-subtle px-4"
        aria-labelledby="home-problems-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-problems-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Browse by problem
          </h2>
          <p className="mt-2 text-stone-600">
            Common Berks County property problems with dedicated help pages.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homepageProblemLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block min-h-full rounded-xl border border-stone-200 bg-white p-4 transition hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad px-4" aria-labelledby="home-providers-heading">
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-providers-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Local provider network
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">
            Requests are coordinated with specialized local providers. Each provider confirms
            availability, scope, and pricing for the work.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {homepageProviderLanes.map((provider) => (
              <li
                key={provider.id}
                className="rounded-xl border border-stone-200 bg-white p-5"
              >
                <h3 className="font-semibold text-stone-900">{provider.publicDisplayName}</h3>
                {provider.contactPerson && (
                  <p className="mt-0.5 text-sm text-stone-500">
                    Contact: {provider.contactPerson}
                  </p>
                )}
                <p className="mt-2 text-sm text-stone-600">{provider.type}</p>
                <ul className="mt-3 space-y-1 text-sm text-stone-700">
                  {provider.serviceCategories.slice(0, 3).map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
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
        className="section-pad border-t border-stone-200 bg-stone-50 px-4"
        aria-labelledby="home-areas-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-areas-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Areas served
          </h2>
          <p className="mt-2 text-stone-600">
            Help is organized across Berks County, Pennsylvania.
          </p>
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
        className="section-pad border-t border-stone-200 px-4"
        aria-labelledby="home-faq-heading"
      >
        <div className="page-container-wide md:max-w-6xl">
          <h2
            id="home-faq-heading"
            className="font-display text-2xl font-semibold tracking-tight text-stone-900"
          >
            Common questions
          </h2>
          <dl className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
            {homepageFaqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <dt className="font-semibold text-stone-900">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

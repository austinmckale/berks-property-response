import { providers } from "@/lib/providers";

export function ProviderRouting() {
  const cards = [
    {
      provider: providers.apex,
      routes: [
        "Emergency drain & sewer backup",
        "Hydro jetting & camera inspection",
        "Commercial & grease line drains",
      ],
    },
    {
      provider: providers.evan,
      routes: [
        "Leaks, faucets & running toilets",
        "Shutoff valves & fixture repairs",
        "Isolated residential service calls",
      ],
    },
    {
      provider: providers.rhi,
      routes: [
        "Water damage repair after leak",
        "Drywall, flooring & ceiling repair",
        "Build-back after backup events",
      ],
      link: "https://rhipros.com",
    },
  ];

  return (
    <section className="hidden px-4 py-8 md:block md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-stone-900 md:text-3xl">
          Local providers we connect you with
        </h2>
        <p className="mt-2 max-w-3xl text-stone-600">
          Tell us what happened and we will connect you with an independent local specialist in
          Berks County.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map(({ provider, routes, link }) => (
            <div
              key={provider.id}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-stone-900">{provider.name}</h3>
              <p className="text-sm text-stone-500">{provider.type}</p>
              {provider.confirmed === "partial" && (
                <p className="mt-2 text-xs text-stone-500">
                  Service scope confirmation pending
                </p>
              )}
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-stone-700">
                {routes.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-stone-800 underline hover:text-stone-600"
                >
                  Broader remodeling at RHIpros.com
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

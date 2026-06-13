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
        "Small plumbing repairs (confirmation pending)",
        "Fixture-level leaks & valves",
        "Isolated toilet or faucet issues",
      ],
      note: "CONFIRMATION REQUIRED",
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
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          How routing works
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Berks Property Response is one intake point. Based on your description, we route your request to an independent local provider—not as the company performing the work.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map(({ provider, routes, note, link }) => (
            <div
              key={provider.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900">{provider.name}</h3>
              <p className="text-sm text-slate-500">{provider.type}</p>
              {note && (
                <p className="mt-2 rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                  {note}
                </p>
              )}
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-700">
                {routes.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline"
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

import { PROVIDER_AVAILABILITY_NOTE } from "@/lib/disclosures";

const lanes = [
  {
    name: "Apex Drain Services",
    scope:
      "Drain cleaning, sewer backups, main lines, hydro jetting, sewer cameras, and commercial drain work.",
    accent: "border-l-red-600 bg-red-50/40",
    badge: "Drain & sewer",
  },
  {
    name: "Ridge Line Plumbing",
    scope:
      "Fixture leaks, toilets, faucets, shutoff valves, water heaters, and smaller residential plumbing repairs.",
    accent: "border-l-stone-700 bg-stone-50",
    badge: "Plumbing & fixtures",
  },
  {
    name: "RHI Pros",
    scope:
      "Drywall, flooring, ceilings, painting, demolition, and repair after plumbing or water events.",
    accent: "border-l-cyan-800 bg-cyan-50/30",
    badge: "Water damage & build-back",
  },
] as const;

export function ProviderNetworkSection() {
  return (
    <section className="section-pad border-y border-stone-200 bg-white px-4">
      <div className="page-container-wide md:max-w-6xl">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <h2 className="font-display text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
            Local provider network
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 md:text-base">
            Berks Property Response coordinates requests with local companies that serve different
            types of property problems. The provider selected depends on the service needed,
            location, scope, and current availability.
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 md:mt-8 md:grid-cols-3">
          {lanes.map((lane) => (
            <div key={lane.name} className={`card-elevated border-l-4 p-5 ${lane.accent}`}>
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {lane.badge}
              </span>
              <h3 className="mt-2 font-semibold text-stone-900">{lane.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{lane.scope}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-stone-600 md:text-left">
          {PROVIDER_AVAILABILITY_NOTE}
        </p>
      </div>
    </section>
  );
}

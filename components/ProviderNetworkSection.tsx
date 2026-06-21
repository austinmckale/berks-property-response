import { INTAKE_DISCLOSURE_SHORT, PROVIDER_AVAILABILITY_NOTE } from "@/lib/disclosures";

const lanes = [
  {
    name: "Apex Drain Services",
    scope: "Drain cleaning, sewer backups, main line clogs, floor drain backups, hydro jetting, and urgent drain/sewer issues.",
    accent: "border-l-red-600 bg-red-50/40",
    badge: "Drain & sewer",
  },
  {
    name: "Ridge Line Plumbing",
    scope: "Smaller plumbing and fixture-level issues — toilets, faucets, shutoff valves, supply lines, and basic leaks.",
    accent: "border-l-stone-700 bg-stone-50",
    badge: "Plumbing & fixtures",
  },
  {
    name: "RHI Pros",
    scope: "Water damage repair, drywall, paint, flooring, ceilings, demo, and build-back after leaks or property damage.",
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
            Berks Property Response is not a contractor. We route requests to independent
            specialists based on what you describe — you work directly with the provider on
            pricing and scheduling.
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 md:mt-8 md:grid-cols-3">
          {lanes.map((lane) => (
            <div
              key={lane.name}
              className={`card-elevated border-l-4 p-5 ${lane.accent}`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {lane.badge}
              </span>
              <h3 className="mt-2 font-semibold text-stone-900">{lane.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{lane.scope}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-stone-600 md:text-left">
          {INTAKE_DISCLOSURE_SHORT}
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-stone-500 md:text-left">
          {PROVIDER_AVAILABILITY_NOTE}
        </p>
      </div>
    </section>
  );
}

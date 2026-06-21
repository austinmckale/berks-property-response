import Link from "next/link";
import { FUTURE_SERVICE_DISCLAIMER } from "@/lib/disclosures";

const routingPaths = [
  {
    title: "Drain & sewer help",
    href: "/emergency",
    description: "Sewer backups, floor drain overflow, main line clogs, and urgent drain issues.",
  },
  {
    title: "Plumbing & fixture help",
    href: "/plumbing-and-leaks",
    description: "Toilets, faucets, supply lines, and smaller fixture-level leaks.",
  },
  {
    title: "Water damage & build-back",
    href: "/after-leak",
    description: "Drywall, flooring, ceilings, and repair after a leak or backup.",
  },
];

interface CityRoutingSectionProps {
  cityName: string;
}

export function CityRoutingSection({ cityName }: CityRoutingSectionProps) {
  return (
    <>
      <h2 className="mt-8 text-lg font-semibold text-stone-900">
        How we route requests in {cityName}
      </h2>
      <ul className="mt-4 space-y-4">
        {routingPaths.map((path) => (
          <li key={path.href} className="rounded-lg border border-stone-200 bg-white p-4">
            <Link href={path.href} className="font-semibold text-stone-900 underline-offset-2 hover:underline">
              {path.title}
            </Link>
            <p className="mt-1.5 text-sm text-stone-600">{path.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4">
        <h3 className="font-semibold text-stone-900">Other property issues</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{FUTURE_SERVICE_DISCLAIMER}</p>
        <Link
          href="/storm-fire-mold-help"
          className="mt-3 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
        >
          Storm / fire / mold help →
        </Link>
      </div>
    </>
  );
}

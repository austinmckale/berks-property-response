import Link from "next/link";
import Image from "next/image";
import { PROVIDER_AVAILABILITY_NOTE } from "@/lib/disclosures";
import { providers } from "@/lib/providers";

export function ProviderRouting() {
  const cards = [
    {
      provider: providers.apex,
      routes: [
        "Sewer and sewage backups",
        "Floor drain and basement drain backups",
        "Multiple clogged drains and main line clogs",
        "Hydro jetting and camera inspections",
        "Urgent commercial and grease line drains",
      ],
    },
    {
      provider: providers.evan,
      routes: [
        "Leaking or running toilets",
        "Faucet and supply line leaks",
        "Shutoff valve issues",
        "Fixture swaps and basic fixture plumbing",
        "Smaller non-main-line residential calls",
      ],
    },
    {
      provider: providers.rhi,
      routes: [
        "Drywall, ceiling, and flooring damage",
        "Paint repair and water-stained walls",
        "Demo and build-back after leaks or backups",
        "General property repair after water events",
      ],
      link: "https://rhipros.com",
    },
  ];

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-stone-900 md:text-3xl">
          Local Provider Network
        </h2>
        <p className="mt-2 max-w-3xl text-stone-600">
          Berks Property Response routes your request to independent local specialists based on
          what you describe. {/* PLACEHOLDER: Add real provider photos/bios when available. */}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map(({ provider, routes, link }) => (
            <div
              key={provider.id}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              {provider.logoImage ? (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={provider.logoImage}
                    alt={`${provider.name} logo`}
                    width={96}
                    height={96}
                    className="h-20 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-20 items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 text-xs text-stone-500">
                  {/* PLACEHOLDER: {provider.name} logo */}
                  Logo pending
                </div>
              )}
              <h3 className="text-lg font-semibold text-stone-900">{provider.name}</h3>
              <p className="text-sm text-stone-500">{provider.type}</p>
              {provider.serviceArea && (
                <p className="mt-1 text-xs text-stone-500">{provider.serviceArea}</p>
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
        <p className="mt-6 text-sm text-stone-600">{PROVIDER_AVAILABILITY_NOTE}</p>
        <p className="mt-4">
          <Link
            href="/local-partners"
            className="text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
          >
            View local provider network →
          </Link>
        </p>
      </div>
    </section>
  );
}

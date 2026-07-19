import Link from "next/link";
import { getProvider, type ProviderId } from "@/lib/providers";

export function ProviderTrustStrip({ providerId }: { providerId: ProviderId }) {
  const provider = getProvider(providerId);
  if (!provider) return null;

  return (
    <aside className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        Provider lane
      </p>
      <p className="mt-1 font-semibold text-stone-900">
        Normally handled by {provider.publicDisplayName}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-stone-600">
        {provider.type}. The provider confirms final availability, scope, and pricing.
      </p>
      <Link
        href="/local-partners"
        className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-stone-800 underline underline-offset-2"
      >
        View the local provider network
      </Link>
    </aside>
  );
}

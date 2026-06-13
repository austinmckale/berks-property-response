import type { Provider } from "@/lib/providers";

interface ProviderCardProps {
  provider: Provider;
  note?: string;
}

export function ProviderCard({ provider, note }: ProviderCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="font-semibold text-stone-900">{provider.name}</h3>
      <p className="text-sm text-stone-500">{provider.type}</p>
      {note && (
        <p className="mt-2 text-xs text-stone-500">{note}</p>
      )}
      <p className="mt-3 text-sm text-stone-600">{provider.description}</p>
      {provider.website && (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-stone-800 underline hover:text-stone-600"
        >
          Visit website →
        </a>
      )}
    </div>
  );
}

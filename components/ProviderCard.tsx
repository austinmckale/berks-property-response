import type { Provider } from "@/lib/providers";

interface ProviderCardProps {
  provider: Provider;
  note?: string;
}

export function ProviderCard({ provider, note }: ProviderCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">{provider.name}</h3>
      <p className="text-sm text-slate-500">{provider.type}</p>
      {note && (
        <p className="mt-2 rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
          {note}
        </p>
      )}
      <p className="mt-3 text-sm text-slate-600">{provider.description}</p>
      {provider.website && (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-blue-700 hover:underline"
        >
          Visit website →
        </a>
      )}
    </div>
  );
}

import Image from "next/image";
import type { Provider } from "@/lib/providers";

interface ProviderCardProps {
  provider: Provider;
  note?: string;
}

export function ProviderCard({ provider, note }: ProviderCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      {provider.logoImage && (
        <div className="mb-4 flex justify-center">
          <Image
            src={provider.logoImage}
            alt={`${provider.name} logo`}
            width={120}
            height={120}
            className="h-24 w-auto object-contain"
          />
        </div>
      )}
      <h3 className="font-semibold text-stone-900">{provider.name}</h3>
      <p className="text-sm text-stone-500">{provider.type}</p>
      {provider.serviceArea && (
        <p className="mt-1 text-sm text-stone-600">{provider.serviceArea}</p>
      )}
      {note && <p className="mt-2 text-xs text-stone-500">{note}</p>}
      <p className="mt-3 text-sm text-stone-600">{provider.description}</p>
      {provider.phone && (
        <p className="mt-3 text-sm text-stone-700">
          <span className="font-medium text-stone-900">Phone:</span>{" "}
          <a href={`tel:${provider.phone.replace(/\D/g, "")}`} className="underline-offset-2 hover:underline">
            {provider.phone}
          </a>
        </p>
      )}
      {provider.email && (
        <p className="mt-1 text-sm text-stone-700">
          <span className="font-medium text-stone-900">Email:</span>{" "}
          <a href={`mailto:${provider.email}`} className="underline-offset-2 hover:underline">
            {provider.email}
          </a>
        </p>
      )}
      {provider.verifiedClaims.licensed && provider.verifiedClaims.insured && (
        <p className="mt-2 text-xs text-stone-500">Licensed and insured (per provider)</p>
      )}
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

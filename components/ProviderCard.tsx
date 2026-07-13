import Image from "next/image";
import Link from "next/link";
import type { Provider } from "@/lib/providers";

interface ProviderCardProps {
  provider: Provider;
  note?: string;
  /** Hide direct phone/email — route through intake */
  intakeOnly?: boolean;
}

export function ProviderCard({ provider, note, intakeOnly = false }: ProviderCardProps) {
  return (
    <div className="card-elevated p-5 md:p-6">
      {provider.logoImage && (
        <div className="mb-4 flex justify-center rounded-lg bg-stone-50 p-3">
          <Image
            src={provider.logoImage}
            alt={`${provider.name} logo`}
            width={120}
            height={120}
            className="h-16 w-auto object-contain"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-stone-900">{provider.name}</h3>
      <p className="text-sm font-medium text-stone-500">{provider.type}</p>
      {provider.serviceArea && (
        <p className="mt-1 text-sm text-stone-600">{provider.serviceArea}</p>
      )}
      {note && (
        <p className="mt-3 text-sm leading-relaxed text-stone-700">{note}</p>
      )}
      {intakeOnly ? (
        <p className="mt-4 rounded-lg bg-stone-50 px-3 py-2.5 text-sm text-stone-600">
          Requests for this type of work are routed through{" "}
          <Link href="/request-help" className="font-semibold text-stone-900 underline">
            Berks Property Response
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-stone-600">{provider.description}</p>
          {provider.phone && (
            <p className="mt-3 text-sm text-stone-700">
              <span className="font-medium text-stone-900">Phone:</span>{" "}
              <a
                href={`tel:${provider.phone.replace(/\D/g, "")}`}
                className="underline-offset-2 hover:underline"
              >
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
        </>
      )}
      {provider.verifiedClaims.licensed && provider.verifiedClaims.insured && (
        <p className="mt-3 text-xs text-stone-500">Licensed and insured (per provider)</p>
      )}
      {provider.website && (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="click_provider_website"
          data-analytics-provider={provider.id}
          className="mt-4 inline-block text-sm font-medium text-stone-800 underline hover:text-stone-600"
        >
          Visit website →
        </a>
      )}
    </div>
  );
}

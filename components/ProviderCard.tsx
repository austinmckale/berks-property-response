import Image from "next/image";
import Link from "next/link";
import type { Provider } from "@/lib/providers";

interface ProviderCardProps {
  provider: Provider;
  note?: string;
  /** Hide direct phone/email — route through intake */
  intakeOnly?: boolean;
  /** Show crawlable service links from provider data */
  showServiceLinks?: boolean;
}

export function ProviderCard({
  provider,
  note,
  intakeOnly = false,
  showServiceLinks = false,
}: ProviderCardProps) {
  const displayName = provider.publicDisplayName;

  return (
    <article className="card-elevated p-5 md:p-6">
      {provider.logoImage && (
        <div className="mb-4 flex justify-center rounded-lg bg-stone-50 p-3">
          <Image
            src={provider.logoImage}
            alt={`${displayName} logo`}
            width={120}
            height={120}
            className="h-16 w-auto object-contain"
          />
        </div>
      )}
      {provider.cardImage && !provider.logoImage && (
        <div className="mb-4 flex justify-center rounded-lg bg-stone-50 p-3">
          <Image
            src={provider.cardImage}
            alt=""
            width={200}
            height={80}
            className="h-16 w-auto object-contain"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-stone-900">{displayName}</h3>
      {provider.contactPerson && (
        <p className="mt-0.5 text-sm text-stone-500">Contact: {provider.contactPerson}</p>
      )}
      <p className="text-sm font-medium text-stone-500">{provider.type}</p>
      {provider.serviceArea && (
        <p className="mt-1 text-sm text-stone-600">Service area: {provider.serviceArea}</p>
      )}
      {note && (
        <p className="mt-3 text-sm leading-relaxed text-stone-700">{note}</p>
      )}
      {intakeOnly ? (
        <details className="mt-4 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
          <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-stone-900">
            Services and limits
          </summary>
          <ul className="mt-2 space-y-1 text-sm text-stone-700">
            {provider.serviceCategories.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-stone-600">
            <span className="font-medium text-stone-800">Does not handle:</span>{" "}
            {provider.doesNotHandle}
          </p>
          {showServiceLinks && provider.serviceLinks.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-stone-200 pt-2">
              {provider.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-stone-900 underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </details>
      ) : (
        <>
          <ul className="mt-3 space-y-1 text-sm text-stone-700">
            {provider.serviceCategories.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-stone-600">
            <span className="font-medium text-stone-800">Does not handle:</span>{" "}
            {provider.doesNotHandle}
          </p>
          {showServiceLinks && provider.serviceLinks.length > 0 && (
            <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
              {provider.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-stone-900 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {provider.id === "rhi" && provider.website && (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="partner_click"
          data-analytics-provider="rhi"
          data-analytics-partner-name="RHI Pros"
          data-analytics-source="local_partners"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-stone-800 underline underline-offset-2 hover:text-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          Visit RHI Pros →
        </a>
      )}
      {intakeOnly ? (
        <Link
          href="/request-help"
          data-analytics-event="click_request_help"
          data-analytics-source={`provider_${provider.id}`}
          className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          Request this type of help
        </Link>
      ) : (
        <>
          <p className="mt-3 text-sm text-stone-600">{provider.description}</p>
          {provider.phone && (
            <p className="mt-3 text-sm text-stone-700">
              <span className="font-medium text-stone-900">Phone:</span>{" "}
              <a
                href={`tel:${provider.phone.replace(/\D/g, "")}`}
                className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                {provider.phone}
              </a>
            </p>
          )}
          {provider.email && (
            <p className="mt-1 text-sm text-stone-700">
              <span className="font-medium text-stone-900">Email:</span>{" "}
              <a
                href={`mailto:${provider.email}`}
                className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                {provider.email}
              </a>
            </p>
          )}
        </>
      )}
    </article>
  );
}

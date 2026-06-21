import Link from "next/link";
import { REFERRAL_DISCLOSURE_INLINE } from "@/lib/disclosures";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface EmergencyCallBannerProps {
  headline?: string;
}

/** Panic UX: one tap to call. No routing jargon. */
export function EmergencyCallBanner({
  headline = "Sewage or water backing up right now?",
}: EmergencyCallBannerProps) {
  return (
    <div className="rounded-2xl bg-red-600 px-5 py-6 text-center text-white shadow-sm">
      <p className="text-base font-semibold md:text-lg">{headline}</p>
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="click_call"
        data-analytics-source="emergency_banner"
        className="mt-4 block text-3xl font-bold tracking-tight underline-offset-4 hover:underline md:text-4xl"
      >
        {PHONE_NUMBER}
      </a>
      <p className="mt-2 text-sm text-red-100">Tap to call — fastest way to get help</p>
    </div>
  );
}

interface HubQuickActionsProps {
  /** Show call as secondary row item instead of giant banner */
  callPrimary?: boolean;
}

export function HubQuickActions({ callPrimary = false }: HubQuickActionsProps) {
  if (callPrimary) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <a
          href={smsHref(TEXT_NUMBER)}
          data-analytics-event="click_text"
          data-analytics-source="hub"
          className="btn-touch-lg rounded-xl bg-stone-900 text-center text-sm font-semibold text-white active:bg-stone-800"
        >
          Text a photo
        </a>
        <Link
          href="#get-help"
          data-analytics-event="click_request_help"
          data-analytics-source="hub"
          className="btn-touch-lg rounded-xl border-2 border-stone-300 bg-white text-center text-sm font-semibold text-stone-900 active:bg-stone-50"
        >
          Describe the problem
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="click_call"
        data-analytics-source="hub"
        className="btn-touch-lg flex-1 rounded-xl bg-red-600 text-center font-semibold text-white active:bg-red-700"
      >
        Call {PHONE_NUMBER}
      </a>
      <a
        href={smsHref(TEXT_NUMBER)}
        data-analytics-event="click_text"
        data-analytics-source="hub"
        className="btn-touch-lg flex-1 rounded-xl bg-stone-900 text-center font-semibold text-white active:bg-stone-800"
      >
        Text a photo
      </a>
    </div>
  );
}

export interface SymptomOption {
  label: string;
  href: string;
}

interface SymptomPickerProps {
  title?: string;
  options: SymptomOption[];
}

/** Big tap targets — max 3–4, no paragraphs. */
export function SymptomPicker({
  title = "What's going on?",
  options,
}: SymptomPickerProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {options.map((option) => (
          <li key={option.href}>
            <Link
              href={option.href}
              className="btn-touch block rounded-xl border-2 border-stone-900 bg-white px-4 py-4 text-center text-base font-semibold text-stone-900 active:bg-stone-50"
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HubDisclosureLine() {
  return (
    <p className="text-xs leading-relaxed text-stone-500">{REFERRAL_DISCLOSURE_INLINE}</p>
  );
}

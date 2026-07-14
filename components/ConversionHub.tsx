import Link from "next/link";
import { REFERRAL_DISCLOSURE_INLINE } from "@/lib/disclosures";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface EmergencyCallBannerProps {
  headline?: string;
}

/** One tap to call — no extra buttons (mobile uses sticky bar for other actions). */
export function EmergencyCallBanner({
  headline = "Sewage or water backing up right now?",
}: EmergencyCallBannerProps) {
  return (
    <div className="rounded-2xl bg-red-600 px-5 py-5 text-center text-white shadow-sm">
      <p className="text-base font-semibold md:text-lg">{headline}</p>
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="phone_click"
        data-analytics-source="emergency_banner"
        className="mt-3 block text-3xl font-bold tracking-tight underline-offset-4 hover:underline md:text-4xl"
      >
        {PHONE_NUMBER}
      </a>
      <p className="mt-2 text-sm text-red-100">Tap to call</p>
    </div>
  );
}

interface PageIntakeCueProps {
  href?: string;
  label?: string;
}

/**
 * Single in-page CTA for desktop. On mobile, Call / Text / Request live in the sticky bar only.
 */
export function PageIntakeCue({
  href = "#get-help",
  label = "Start a request",
}: PageIntakeCueProps) {
  return (
    <div className="mt-5 hidden md:block">
      <Link
        href={href}
        data-analytics-event="click_request_help"
        data-analytics-source="page_intake_cue"
        className="btn-primary"
      >
        {label}
      </Link>
      <p className="mt-2 text-sm text-stone-500">
        Urgent?{" "}
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="phone_click"
          data-analytics-source="page_intake_cue"
          className="font-medium text-stone-800 underline"
        >
          Call now
        </a>
        <span className="mx-1.5 text-stone-300">·</span>
        <a
          href={smsHref(TEXT_NUMBER)}
          data-analytics-event="text_click"
          data-analytics-source="page_intake_cue"
          className="font-medium text-stone-600 underline"
        >
          Text photos
        </a>
      </p>
    </div>
  );
}

/** @deprecated Use PageIntakeCue — kept so old imports fail visibly at compile time */
export function HubQuickActions() {
  return <PageIntakeCue />;
}

export interface SymptomOption {
  label: string;
  href: string;
}

interface SymptomPickerProps {
  title?: string;
  options: SymptomOption[];
}

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
              className="btn-touch block rounded-xl border border-stone-300 bg-white px-4 py-4 text-center text-base font-semibold text-stone-900 active:bg-stone-50"
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Compact urgent-call strip — above forms without a giant competing banner. */
export function CompactUrgentCallStrip({
  message = "Active water or sewage right now? Calling is fastest.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-red-950">{message}</p>
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="phone_click"
        data-analytics-source="compact_urgent_call"
        className="btn-touch inline-flex shrink-0 items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white active:bg-red-700"
      >
        Call now
      </a>
    </div>
  );
}

export function HubDisclosureLine() {
  return (
    <p className="text-xs leading-relaxed text-stone-500">{REFERRAL_DISCLOSURE_INLINE}</p>
  );
}

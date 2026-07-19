import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  CompactUrgentCallStrip,
  EmergencyCallBanner,
  PageIntakeCue,
} from "@/components/ConversionHub";
import {
  FormSymptomPicker,
  type FormSymptomOption,
} from "@/components/FormSymptomPicker";
import { LeadForm } from "@/components/LeadForm";
import type { PropertyType } from "@/lib/formSchema";
import type { ProblemTypeId } from "@/lib/problemTypes";

export interface HubFormConfig {
  pageType: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  initialProblemType?: ProblemTypeId;
  defaultCity?: string;
  defaultPropertyType?: PropertyType;
  showPropertyType?: boolean;
}

interface HubLandingPageProps {
  breadcrumbs: { name: string; path: string }[];
  title: string;
  subtitle: string;
  /** emergency = giant call banner; standard = request-first with optional compact call */
  variant?: "emergency" | "standard";
  emergencyHeadline?: string;
  /** Compact call strip above the form (request-help) */
  showCompactUrgentCall?: boolean;
  alert?: ReactNode;
  middle?: ReactNode;
  symptoms?: FormSymptomOption[];
  symptomTitle?: string;
  form?: HubFormConfig;
  formTitle?: string;
  formSubtitle?: string;
  showForm?: boolean;
  /** Show an informational-page request cue when there is no embedded form. */
  showPrimaryCue?: boolean;
  /** Form before large call CTA */
  intakeFirst?: boolean;
  footer?: ReactNode;
}

/** Shared layout for hub landing pages */
export function HubLandingPage({
  breadcrumbs,
  title,
  subtitle,
  variant = "standard",
  emergencyHeadline,
  showCompactUrgentCall = false,
  alert,
  middle,
  symptoms,
  symptomTitle,
  formTitle = "Send a request",
  formSubtitle,
  form,
  showForm = true,
  showPrimaryCue = !showForm,
  intakeFirst = false,
  footer,
}: HubLandingPageProps) {
  const formBlock =
    showForm && form ? (
      <div
        id="get-help"
        className={
          intakeFirst || showCompactUrgentCall
            ? "mt-6 scroll-mt-6"
            : "mt-8 scroll-mt-6 border-t border-stone-200 pt-8"
        }
      >
        <h2 className="text-lg font-semibold text-stone-900">{formTitle}</h2>
        {formSubtitle && (
          <p className="mt-1 text-sm text-stone-600">{formSubtitle}</p>
        )}
        <div className="mt-4">
          <Suspense
            fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}
          >
            <LeadForm
              pageType={form.pageType}
              serviceCategory={form.serviceCategory}
              defaultRoute={form.defaultRoute}
              defaultService={form.defaultService}
              initialProblemType={form.initialProblemType}
              defaultCity={form.defaultCity}
              defaultPropertyType={form.defaultPropertyType}
              showPropertyType={form.showPropertyType}
            />
          </Suspense>
        </div>
      </div>
    ) : null;

  const compactCall =
    showCompactUrgentCall ? (
      <div className="mt-5">
        <CompactUrgentCallStrip
          message={
            emergencyHeadline ??
            "Active water or sewage right now? Calling is fastest."
          }
        />
      </div>
    ) : null;

  const callBlock =
    variant === "emergency" && !showCompactUrgentCall ? (
      <div className={intakeFirst ? "mt-8 border-t border-stone-200 pt-8" : "mt-5"}>
        <EmergencyCallBanner headline={emergencyHeadline} />
        {!intakeFirst && (
          <p className="mt-3 text-sm text-stone-600">
            Prefer not to call?{" "}
            <a href="#get-help" className="font-medium text-stone-900 underline">
              Send a request below
            </a>
          </p>
        )}
      </div>
    ) : variant === "standard" && !showCompactUrgentCall && !showForm && showPrimaryCue ? (
      <div className="mt-5">
        <PageIntakeCue
          href="/request-help"
          label="Request local help"
        />
      </div>
    ) : null;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="px-4 py-6 md:py-10">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{title}</h1>
          <p className="mt-2 text-stone-600">{subtitle}</p>
          <div id="sticky-cta-marker" className="h-px" aria-hidden />

          {alert && <div className="mt-5">{alert}</div>}

          {middle && <div className="mt-6">{middle}</div>}

          {symptoms && symptoms.length > 0 && (
            <div className="mt-8">
              <FormSymptomPicker title={symptomTitle} options={symptoms} />
            </div>
          )}

          {showCompactUrgentCall && compactCall}

          {intakeFirst || showCompactUrgentCall ? (
            <>
              {formBlock}
              {callBlock}
            </>
          ) : (
            <>
              {callBlock}
              {formBlock}
            </>
          )}

          {footer && <div className="mt-8">{footer}</div>}
        </div>
      </section>
    </>
  );
}

/** Compact alert for cross-links between hubs */
export function HubAlert({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
      {children}
    </div>
  );
}

export function HubFooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="font-semibold text-stone-900 underline">
      {children}
    </Link>
  );
}

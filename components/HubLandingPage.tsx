import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  EmergencyCallBanner,
  HubDisclosureLine,
  PageIntakeCue,
} from "@/components/ConversionHub";
import {
  FormSymptomPicker,
  type FormSymptomOption,
} from "@/components/FormSymptomPicker";
import { LeadForm } from "@/components/LeadForm";
import type { ProblemTypeId } from "@/lib/problemTypes";

export interface HubFormConfig {
  pageType: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  initialProblemType?: ProblemTypeId;
  defaultCity?: string;
}

interface HubLandingPageProps {
  breadcrumbs: { name: string; path: string }[];
  title: string;
  subtitle: string;
  /** emergency = giant call banner; standard = call + text row */
  variant?: "emergency" | "standard";
  emergencyHeadline?: string;
  alert?: ReactNode;
  middle?: ReactNode;
  symptoms?: FormSymptomOption[];
  symptomTitle?: string;
  form?: HubFormConfig;
  formTitle?: string;
  formSubtitle?: string;
  showForm?: boolean;
  /** Form before call CTA — use on /request-help where visitors expect the intake form */
  intakeFirst?: boolean;
  footer?: ReactNode;
}

/** Shared layout for hub landing pages — call-first by default; form-first when intakeFirst */
export function HubLandingPage({
  breadcrumbs,
  title,
  subtitle,
  variant = "standard",
  emergencyHeadline,
  alert,
  middle,
  symptoms,
  symptomTitle,
  formTitle = "Request local help",
  formSubtitle = "Name, phone, city, and a short description of what's happening.",
  form,
  showForm = true,
  intakeFirst = false,
  footer,
}: HubLandingPageProps) {
  const formBlock =
    showForm && form ? (
      <div
        id="get-help"
        className={
          intakeFirst
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
            />
          </Suspense>
        </div>
        <div className="mt-4">
          <HubDisclosureLine />
        </div>
      </div>
    ) : null;

  const callBlock =
    variant === "emergency" ? (
      <div className={intakeFirst ? "mt-8 border-t border-stone-200 pt-8" : "mt-5"}>
        {intakeFirst && (
          <p className="mb-3 text-sm font-medium text-stone-700">
            Active emergency? Call is fastest.
          </p>
        )}
        <EmergencyCallBanner headline={emergencyHeadline} />
        {!intakeFirst && (
          <p className="mt-3 text-sm text-stone-600">
            Prefer not to call?{" "}
            <a href="#get-help" className="font-medium text-stone-900 underline">
              Send a request below
            </a>
            <span className="md:hidden"> or use the bottom bar</span>.
          </p>
        )}
      </div>
    ) : (
      <div className="mt-5">
        <PageIntakeCue />
      </div>
    );

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="px-4 py-6 md:py-10">
        <div className="page-container">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{title}</h1>
          <p className="mt-2 text-stone-600">{subtitle}</p>

          {alert && <div className="mt-5">{alert}</div>}

          {middle && <div className="mt-6">{middle}</div>}

          {symptoms && symptoms.length > 0 && (
            <div className="mt-8">
              <FormSymptomPicker title={symptomTitle} options={symptoms} />
            </div>
          )}

          {intakeFirst ? (
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

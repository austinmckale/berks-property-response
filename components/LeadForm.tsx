"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { Camera } from "lucide-react";
import {
  leadFormSchema,
  type LeadFormData,
} from "@/lib/formSchema";
import { FORM_SUBMIT_FINE_PRINT } from "@/lib/disclosures";
import { trackEvent } from "@/lib/analytics";
import {
  getProblemType,
  problemTypeOptions,
  type ProblemTypeId,
} from "@/lib/problemTypes";
import { isProblemTypeId } from "@/lib/intakeLinks";
import { getCustomerReference } from "@/lib/leadId";
import { getFormPhotoMessage } from "@/lib/photoMessages";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";
import {
  isActiveProblem,
  resolveUrgency,
  type WaterSewageAnswer,
} from "@/lib/urgency";

interface LeadFormProps {
  pageType?: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  initialProblemType?: ProblemTypeId;
  defaultCity?: string;
  showCategoryChange?: boolean;
  onChangeCategory?: () => void;
}

const WATER_OPTIONS: {
  value: WaterSewageAnswer;
  label: string;
}[] = [
  { value: "yes", label: "Yes — active right now" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Not sure" },
];

export function LeadForm({
  pageType = "general",
  serviceCategory = "general",
  defaultRoute = "",
  defaultService = "",
  initialProblemType,
  defaultCity = "",
  showCategoryChange = false,
  onChangeCategory,
}: LeadFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(initialProblemType ? 2 : 1);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const [formStartedTracked, setFormStartedTracked] = useState(false);
  const [routeResult, setRouteResult] = useState<{
    leadId?: string;
    waterOrSewagePresent?: string;
    urgency?: string;
  } | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const waterGroupRef = useRef<HTMLFieldSetElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      problemType: initialProblemType,
      urgency: initialProblemType
        ? getProblemType(initialProblemType).urgency
        : undefined,
      city: defaultCity || undefined,
      smsOptIn: false,
    },
  });

  const selectedProblem = watch("problemType");
  const waterAnswer = watch("waterOrSewagePresent");
  const waterField = register("waterOrSewagePresent");
  const showFormStep = Boolean(selectedProblem) && (step === 2 || Boolean(initialProblemType));

  useEffect(() => {
    setValue("formStartedAt", formStartedAt);
  }, [formStartedAt, setValue]);

  useEffect(() => {
    setValue("landingPage", pathname);
    setValue("pageType", pageType);
    setValue("serviceCategory", serviceCategory);
    setValue("defaultRoute", defaultRoute);
    setValue("utmSource", searchParams.get("utm_source") ?? "");
    setValue("utmMedium", searchParams.get("utm_medium") ?? "");
    setValue("utmCampaign", searchParams.get("utm_campaign") ?? "");
    setValue("utmTerm", searchParams.get("utm_term") ?? "");
    setValue("gclid", searchParams.get("gclid") ?? "");
    if (typeof document !== "undefined") {
      setValue("referrer", document.referrer);
    }
  }, [pathname, pageType, serviceCategory, defaultRoute, searchParams, setValue]);

  useEffect(() => {
    if (defaultCity) setValue("city", defaultCity);
  }, [defaultCity, setValue]);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) setValue("city", cityParam);
  }, [searchParams, setValue]);

  useEffect(() => {
    const problemParam = searchParams.get("problem");
    if (!initialProblemType && problemParam && isProblemTypeId(problemParam)) {
      applyProblem(problemParam, { track: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- URL preselect for embedded forms
  }, [searchParams, initialProblemType]);

  function applyProblem(id: ProblemTypeId, opts: { track: boolean }) {
    const option = getProblemType(id);
    setValue("problemType", id, { shouldValidate: true });
    const water = (getValues("waterOrSewagePresent") ?? undefined) as
      | WaterSewageAnswer
      | undefined;
    setValue(
      "urgency",
      resolveUrgency({
        categoryDefault: option.urgency,
        waterOrSewagePresent: water,
      })
    );
    setValue("serviceCategory", option.serviceCategory);
    setValue("defaultRoute", option.defaultRoute);
    setStep(2);
    if (opts.track) {
      trackEvent("select_problem_category", {
        problem_type: id,
        page_type: pageType,
      });
    }
  }

  function selectProblem(id: ProblemTypeId) {
    applyProblem(id, { track: true });
  }

  function setWaterAnswer(value: WaterSewageAnswer) {
    setValue("waterOrSewagePresent", value, { shouldValidate: true });
    const problemId = getValues("problemType");
    if (!problemId) return;
    const categoryDefault = getProblemType(problemId).urgency;
    setValue(
      "urgency",
      resolveUrgency({ categoryDefault, waterOrSewagePresent: value })
    );
    if (value === "unknown") {
      setValue("activeConditions", "water-sewage-uncertain");
    } else if (value === "yes") {
      setValue("activeConditions", "active-water");
    } else {
      setValue("activeConditions", "");
    }
  }

  function markFormStarted() {
    if (formStartedTracked) return;
    setFormStartedTracked(true);
    trackEvent("form_started", { page_type: pageType });
  }

  async function onSubmit(data: LeadFormData) {
    setFormError(null);
    setSubmitStatus("loading");
    trackEvent("form_submitted", { page_type: pageType });
    const problem = getProblemType(data.problemType);
    const urgencyResolved = resolveUrgency({
      categoryDefault: data.urgency ?? problem.urgency,
      waterOrSewagePresent: data.waterOrSewagePresent,
    });
    const payload: LeadFormData = {
      ...data,
      urgency: urgencyResolved,
      propertyType: "residential",
      serviceRequested: defaultService || problem.defaultService,
      serviceCategory: problem.serviceCategory,
      defaultRoute: defaultRoute || problem.defaultRoute,
      submittedAt: new Date().toISOString(),
      smsOptIn: Boolean(data.smsOptIn),
      formStartedAt,
      bprHpField: data.bprHpField ?? "",
      waterOrSewagePresent: data.waterOrSewagePresent,
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Submission failed");
      }
      setRouteResult({
        leadId: json.leadId,
        waterOrSewagePresent: payload.waterOrSewagePresent,
        urgency: urgencyResolved,
      });
      setSubmitStatus("success");
      trackEvent("generate_lead", {
        page_type: pageType,
        problem_type: data.problemType,
        service_category: problem.serviceCategory,
        urgency: urgencyResolved,
        city: data.city,
      });
    } catch {
      setSubmitStatus("error");
      trackEvent("form_error", { page_type: pageType });
    }
  }

  function onInvalid(fieldErrors: typeof errors) {
    setFormError("Please check the required fields and try again.");
    const order: (keyof LeadFormData)[] = [
      "problemType",
      "waterOrSewagePresent",
      "name",
      "phone",
      "city",
      "problemDescription",
    ];
    const first = order.find((key) => fieldErrors[key]);
    if (first) {
      if (first === "waterOrSewagePresent") {
        waterGroupRef.current
          ?.querySelector<HTMLInputElement>('input[type="radio"]')
          ?.focus();
        return;
      }
      try {
        setFocus(first);
      } catch {
        formTopRef.current?.scrollIntoView({ block: "start" });
      }
    }
  }

  if (submitStatus === "success") {
    const leadId = routeResult?.leadId;
    const customerReference = leadId ? getCustomerReference(leadId) : undefined;
    const showUrgent = isActiveProblem({
      waterOrSewagePresent: routeResult?.waterOrSewagePresent,
      urgency: routeResult?.urgency,
    });
    return (
      <div className="card-elevated border-green-200 bg-green-50 p-6 md:p-8" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
            ✓
          </span>
          <div>
            <h3 className="mt-1 text-xl font-semibold text-green-950 md:text-2xl">
              Request sent.
            </h3>
          </div>
        </div>
        {leadId && (
          <p className="mt-4 rounded-lg border border-green-200 bg-white px-4 py-3 text-sm text-green-900">
            <span className="font-medium text-green-800">Your reference code</span>
            <span className="mt-1 block font-mono text-base font-semibold tracking-tight">
              {customerReference}
            </span>
          </p>
        )}
        <p className="mt-4 leading-relaxed text-green-900">
          A provider may call or text you about availability, pricing, and next steps.
        </p>
        <p className="mt-3 text-sm text-green-800">
          Have photos?{" "}
          <a
            href={smsHref(
              TEXT_NUMBER,
              customerReference
                ? `Reference ${customerReference} — photos`
                : "Photos for my request"
            )}
            data-analytics-event="text_click"
            data-analytics-source="form_success"
            className="font-semibold underline"
          >
            Text them to {TEXT_NUMBER}
          </a>{" "}
          and include your reference code.
        </p>
        {showUrgent && (
          <div className="mt-6 rounded-xl bg-red-600 p-4 text-center">
            <p className="text-sm font-medium text-white">
              Active water or sewage problem? Call now rather than waiting for an online
              response.
            </p>
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="phone_click"
              data-analytics-source="form_success_emergency"
              className="mt-2 inline-block text-lg font-semibold text-white underline"
            >
              Call {PHONE_NUMBER}
            </a>
          </div>
        )}
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-base text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-200";
  const labelClass = "block text-sm font-semibold text-stone-800";
  const errorClass = "mt-1.5 text-sm text-red-600";

  return (
    <div ref={formTopRef} className="card-elevated relative overflow-hidden md:mx-0">
      {!initialProblemType && step === 1 && (
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-stone-900 md:text-xl">
            Tell us what&apos;s going on
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Choose a problem.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {problemTypeOptions.map((option) => {
              const selected = selectedProblem === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectProblem(option.id)}
                  className={`card-touch min-h-[4.5rem] rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-stone-900 bg-stone-900 text-white shadow-sm"
                      : "border-stone-200 bg-stone-50 active:bg-white"
                  }`}
                >
                  <span className="block font-semibold">{option.title}</span>
                  <span
                    className={`mt-1 block text-sm ${selected ? "text-stone-300" : "text-stone-600"}`}
                  >
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.problemType && (
            <p className={`${errorClass} mt-3`}>{errors.problemType.message}</p>
          )}
        </div>
      )}

      {showFormStep && selectedProblem && (
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          onFocus={markFormStarted}
          className="p-4 md:p-6"
          noValidate
        >
          {(showCategoryChange || !initialProblemType) && (
            <button
              type="button"
              onClick={() => {
                if (onChangeCategory) {
                  onChangeCategory();
                } else {
                  setStep(1);
                }
              }}
              className="btn-touch inline-flex items-center justify-center min-h-[2.75rem] text-sm font-medium text-stone-600 active:text-stone-900"
            >
              ← Change category
            </button>
          )}

          <h3
            className={`text-lg font-semibold text-stone-900 md:text-xl ${
              showCategoryChange || !initialProblemType ? "mt-3" : ""
            }`}
          >
            Quick request
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {getProblemType(selectedProblem).title}
          </p>
          <fieldset ref={waterGroupRef} className="mt-5">
            <legend className={labelClass}>
              Is water or sewage actively leaking, backing up, or spreading right now?
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {WATER_OPTIONS.map((option) => {
                const selected = waterAnswer === option.value;
                return (
                  <label
                    key={option.value}
                    className={`relative flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 py-3.5 text-center text-sm font-semibold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-stone-900 ${
                      selected
                        ? option.value === "yes"
                          ? "border-red-700 bg-red-600 text-white"
                          : "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 bg-white text-stone-800 active:bg-stone-50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="sr-only"
                      required={option.value === "yes"}
                      {...waterField}
                      onChange={(event) => {
                        waterField.onChange(event);
                        setWaterAnswer(option.value);
                      }}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            {errors.waterOrSewagePresent && (
              <p className={errorClass} role="alert">
                {errors.waterOrSewagePresent.message}
              </p>
            )}
          </fieldset>

          {waterAnswer === "yes" && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-950">
                Calling is fastest for an active water or sewage problem. You can still send this
                request if you cannot call right now.
              </p>
              <a
                href={phoneHref(PHONE_NUMBER)}
                data-analytics-event="phone_click"
                data-analytics-source="form_active_water"
                className="btn-touch mt-3 inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white active:bg-red-700 sm:w-auto"
              >
                Call now — {PHONE_NUMBER}
              </a>
            </div>
          )}

          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className={inputClass}
                  {...register("name")}
                />
                {errors.name && (
                  <p className={errorClass} role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(484) 555-0100"
                  className={inputClass}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className={errorClass} role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="city">
                City
              </label>
              <input
                id="city"
                autoComplete="address-level2"
                placeholder="Reading"
                className={inputClass}
                {...register("city")}
              />
              {errors.city && (
                <p className={errorClass} role="alert">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="problemDescription">
                What&apos;s happening?
              </label>
              <textarea
                id="problemDescription"
                rows={3}
                placeholder="A sentence or two is enough—which room, drain, or fixture if you can."
                className={inputClass}
                {...register("problemDescription")}
              />
              {errors.problemDescription && (
                <p className={errorClass} role="alert">
                  {errors.problemDescription.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-stone-600">Prefer to show us? Text photos of the issue.</p>
              <a
                href={smsHref(TEXT_NUMBER, getFormPhotoMessage(selectedProblem))}
                data-analytics-event="text_click"
                data-analytics-source="lead_form_alternative"
                className="btn-touch mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 active:bg-stone-50"
              >
                <Camera className="h-4 w-4" aria-hidden />
                Text photos
              </a>
            </div>
          </div>

          <input type="hidden" {...register("problemType")} />
          <input type="hidden" {...register("urgency")} />
          <input type="hidden" {...register("landingPage")} />
          <input type="hidden" {...register("pageType")} />
          <input type="hidden" {...register("serviceCategory")} />
          <input type="hidden" {...register("defaultRoute")} />
          <input type="hidden" {...register("utmSource")} />
          <input type="hidden" {...register("utmMedium")} />
          <input type="hidden" {...register("utmCampaign")} />
          <input type="hidden" {...register("utmTerm")} />
          <input type="hidden" {...register("gclid")} />
          <input type="hidden" {...register("referrer")} />
          <input type="hidden" {...register("activeConditions")} />
          <input type="hidden" {...register("submittedAt")} />
          <input type="hidden" {...register("formStartedAt")} />
          <div className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor="bprHpField">Leave blank</label>
            <input
              id="bprHpField"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              data-form-type="other"
              {...register("bprHpField")}
            />
          </div>

          {(formError || submitStatus === "error") && (
            <div
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {formError ?? (
                <>
                  We couldn&apos;t save your request. Please{" "}
                  <a href={phoneHref(PHONE_NUMBER)} className="font-semibold underline">
                    call {PHONE_NUMBER}
                  </a>{" "}
                  or try again in a moment.
                </>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="btn-touch-lg mt-6 w-full rounded-xl bg-brand text-base font-semibold text-white shadow-sm active:bg-brand-hover disabled:opacity-50"
          >
            {submitStatus === "loading" ? "Sending..." : "Send my request"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">{FORM_SUBMIT_FINE_PRINT}</p>
          <p className="mt-2 text-xs text-stone-500">
            <Link href="/disclosure" className="underline hover:text-stone-700">
              Disclosure
            </Link>
            <span className="mx-1.5 text-stone-300">·</span>
            <Link href="/privacy-policy" className="underline hover:text-stone-700">
              Privacy Policy
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

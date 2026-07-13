"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
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
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface LeadFormProps {
  pageType?: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  initialProblemType?: ProblemTypeId;
  defaultCity?: string;
  /** When true, step 1 lives outside the form (e.g. homepage triage cards) */
  externalProblemSelection?: boolean;
}

export function LeadForm({
  pageType = "general",
  serviceCategory = "general",
  defaultRoute = "",
  defaultService = "",
  initialProblemType,
  defaultCity = "",
  externalProblemSelection = false,
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
  const [routeResult, setRouteResult] = useState<Record<string, unknown> | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const [activeConditions, setActiveConditions] = useState<string[]>([]);

  const toggleCondition = (value: string) => {
    setActiveConditions((prev) => {
      const next = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      setValue("activeConditions", next.join(", "));
      return next;
    });
  };

  const conditionOptions = [
    { value: "active-water", label: "Active water / leaking now" },
    { value: "sewage", label: "Sewage or backup present" },
    { value: "mold", label: "Visible mold or moisture concern" },
    { value: "fire-smoke", label: "Fire or smoke damage" },
    { value: "storm-hail", label: "Storm or hail damage" },
    { value: "structural", label: "Structural concern (sag, crack, etc.)" },
  ];

  const selectedProblem = watch("problemType");
  const isEmergency = watch("urgency") === "emergency";
  const skipStep1 = Boolean(initialProblemType) || externalProblemSelection;
  /** Problem type implies urgency — skip redundant urgency/condition fields */
  const showCompactStep2 = Boolean(selectedProblem);
  const showFormStep =
    step === 2 && (!externalProblemSelection || Boolean(selectedProblem));

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
    if (defaultCity) {
      setValue("city", defaultCity);
    }
  }, [defaultCity, setValue]);

  useEffect(() => {
    const problemParam = searchParams.get("problem");
    if (problemParam && isProblemTypeId(problemParam)) {
      const option = getProblemType(problemParam);
      setValue("problemType", problemParam, { shouldValidate: true });
      setValue("urgency", option.urgency);
      setValue("serviceCategory", option.serviceCategory);
      setValue("defaultRoute", option.defaultRoute);
      setStep(2);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) {
      setValue("city", cityParam);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (activeConditions.includes("sewage")) {
      setValue("waterOrSewagePresent", "yes");
    }
  }, [activeConditions, setValue]);

  function selectProblem(id: ProblemTypeId) {
    const option = getProblemType(id);
    setValue("problemType", id, { shouldValidate: true });
    setValue("urgency", option.urgency);
    setValue("serviceCategory", option.serviceCategory);
    setValue("defaultRoute", option.defaultRoute);
    setStep(2);
    trackEvent("select_problem_category", {
      problem_type: id,
      page_type: pageType,
    });
    if (typeof window !== "undefined") {
      const anchor = document.getElementById("get-help");
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    const payload: LeadFormData = {
      ...data,
      urgency: data.urgency ?? problem.urgency,
      propertyType: "residential",
      serviceRequested: defaultService || problem.defaultService,
      serviceCategory: problem.serviceCategory,
      defaultRoute: defaultRoute || problem.defaultRoute,
      submittedAt: new Date().toISOString(),
      activeConditions: activeConditions.join(", ") || data.activeConditions,
      smsOptIn: Boolean(data.smsOptIn),
      formStartedAt,
      companyWebsite: data.companyWebsite ?? "",
      waterOrSewagePresent:
        data.waterOrSewagePresent === "" || data.waterOrSewagePresent == null
          ? undefined
          : data.waterOrSewagePresent,
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
      setRouteResult(json.routing ?? { leadId: json.leadId });
      setSubmitStatus("success");
      trackEvent("form_success", {
        page_type: pageType,
        service_category: problem.serviceCategory,
      });
      trackEvent("generate_lead", {
        page_type: pageType,
        service_category: problem.serviceCategory,
      });
    } catch {
      setSubmitStatus("error");
      trackEvent("form_error", { page_type: pageType });
    }
  }

  function onInvalid() {
    setFormError("Please check the required fields and try again.");
  }

  if (submitStatus === "success") {
    const leadId = (routeResult as { leadId?: string })?.leadId;
    return (
      <div className="card-elevated border-green-200 bg-green-50 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
            ✓
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-800">
              Request received
            </p>
            <h3 className="mt-1 text-xl font-semibold text-green-950 md:text-2xl">
              We&apos;re reviewing the details.
            </h3>
          </div>
        </div>
        {leadId && (
          <p className="mt-4 rounded-lg border border-green-200 bg-white px-4 py-3 text-sm text-green-900">
            <span className="font-medium text-green-800">Your reference ID</span>
            <span className="mt-1 block font-mono text-base font-semibold tracking-tight">
              {leadId}
            </span>
          </p>
        )}
        <p className="mt-4 leading-relaxed text-green-900">
          A Berks Property Response coordinator will review your request and arrange the
          appropriate local handoff. A provider may then call or text you about availability,
          pricing, and next steps.
        </p>
        <p className="mt-3 text-sm text-green-800">
          Have photos?{" "}
          <a
            href={smsHref(TEXT_NUMBER)}
            data-analytics-event="click_text"
            data-analytics-source="form_success"
            className="font-semibold underline"
          >
            Text them to {TEXT_NUMBER}
          </a>{" "}
          and include your reference ID.
        </p>
        {isEmergency && (
          <div className="mt-6 rounded-xl bg-red-600 p-4 text-center">
            <p className="text-sm font-medium text-white">
              Active water or sewage problem? Call now rather than waiting for an online
              response.
            </p>
            <a
              href={phoneHref(PHONE_NUMBER)}
              data-analytics-event="click_call"
              data-analytics-source="form_success_emergency"
              className="mt-2 inline-block text-lg font-semibold text-white underline"
            >
              {PHONE_NUMBER}
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
    <div className="card-elevated relative overflow-hidden md:mx-0">
      {!skipStep1 && (
        <div className="border-b border-stone-100 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-3">
            <StepDot active={step >= 1} done={step > 1} label="1" />
            <div className="h-px flex-1 bg-stone-200" />
            <StepDot active={step >= 2} done={false} label="2" />
          </div>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-stone-500">
            Step {step} of 2
          </p>
        </div>
      )}

      {step === 1 && !externalProblemSelection && (
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-stone-900 md:text-xl">
            Tell us what&apos;s going on
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Tap the closest match — no obligation to hire.
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

      {externalProblemSelection && !selectedProblem && (
        <div className="p-6 text-center">
          <p className="text-sm text-stone-600">
            Tap a category above to continue with your request.
          </p>
        </div>
      )}

      {showFormStep && (
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          onFocus={markFormStarted}
          className="p-4 md:p-6"
        >
          {!skipStep1 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-touch min-h-[2.75rem] text-sm font-medium text-stone-600 active:text-stone-900"
            >
              ← Change problem type
            </button>
          )}
          <h3 className={`text-lg font-semibold text-stone-900 md:text-xl ${skipStep1 ? "" : "mt-3 md:mt-4"}`}>
            {showCompactStep2 ? "Quick request" : "How can we reach you?"}
          </h3>
          {selectedProblem && (
            <p className="mt-1 text-sm text-stone-600">
              {getProblemType(selectedProblem).title}
            </p>
          )}

          <div className="mt-5 space-y-4 md:mt-6">
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
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
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
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                {errors.city && <p className={errorClass}>{errors.city.message}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="zip">
                  ZIP <span className="font-normal text-stone-500">(optional)</span>
                </label>
                <input
                  id="zip"
                  autoComplete="postal-code"
                  placeholder="19601"
                  className={inputClass}
                  {...register("zip")}
                />
                {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="problemDescription">
                What&apos;s happening?
              </label>
              <textarea
                id="problemDescription"
                rows={3}
                placeholder="A sentence or two is enough—include which room, drain, or fixture if you can."
                className={inputClass}
                {...register("problemDescription")}
              />
              {errors.problemDescription && (
                <p className={errorClass}>{errors.problemDescription.message}</p>
              )}
            </div>

            {!showCompactStep2 && (
            <fieldset>
              <legend className={labelClass}>What&apos;s present right now? (optional)</legend>
              <div className="mt-2 space-y-2">
                {conditionOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5"
                  >
                    <input
                      type="checkbox"
                      checked={activeConditions.includes(option.value)}
                      onChange={() => toggleCondition(option.value)}
                      className="mt-0.5 h-4 w-4 rounded border-stone-300"
                    />
                    <span className="text-sm text-stone-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            )}

            {!showCompactStep2 && (
            <div>
              <label className={labelClass} htmlFor="urgency">
                How urgent is this?
              </label>
              <select id="urgency" className={inputClass} {...register("urgency")}>
                <option value="emergency">Emergency — active backup, leak, or damage now</option>
                <option value="same-day">Same day or as soon as possible</option>
                <option value="this-week">This week</option>
                <option value="estimate-only">Just researching / not urgent</option>
              </select>
            </div>
            )}

            {!showCompactStep2 && (
            <p className="text-sm text-stone-600">
              Photos help — text them after you submit using the link below.
            </p>
            )}

            <details className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <summary className="cursor-pointer py-1 text-sm font-medium text-stone-700">
                Add email (optional)
              </summary>
              <div className="mt-4">
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  {...register("email")}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </details>

            {showCompactStep2 && (
              <p className="text-sm text-stone-600">
                Have photos?{" "}
                <a href={smsHref(TEXT_NUMBER)} className="font-medium text-stone-900 underline">
                  Text them to {TEXT_NUMBER}
                </a>{" "}
                after submitting.
              </p>
            )}
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
          <input type="hidden" {...register("waterOrSewagePresent")} />
          <input type="hidden" {...register("formStartedAt")} />
          {/* Honeypot — leave empty; hidden from assistive tech via CSS + tabindex */}
          <div className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor="companyWebsite">Company website</label>
            <input
              id="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("companyWebsite")}
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
            {submitStatus === "loading" ? "Sending..." : "Request local help"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            {FORM_SUBMIT_FINE_PRINT}
          </p>
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

function StepDot({
  active,
  done,
  label,
}: {
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
        done
          ? "bg-green-600 text-white"
          : active
            ? "bg-stone-900 text-white"
            : "bg-stone-200 text-stone-500"
      }`}
      aria-hidden
    >
      {done ? "OK" : label}
    </span>
  );
}

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
import {
  getProblemType,
  problemTypeOptions,
  type ProblemTypeId,
} from "@/lib/problemTypes";
import { PHONE_NUMBER } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

interface LeadFormProps {
  pageType?: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  initialProblemType?: ProblemTypeId;
}

export function LeadForm({
  pageType = "general",
  serviceCategory = "general",
  defaultRoute = "",
  defaultService = "",
  initialProblemType,
}: LeadFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(initialProblemType ? 2 : 1);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [routeResult, setRouteResult] = useState<Record<string, unknown> | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      problemType: initialProblemType,
      urgency: initialProblemType
        ? getProblemType(initialProblemType).urgency
        : undefined,
    },
  });

  const selectedProblem = watch("problemType");
  const isEmergency = watch("urgency") === "emergency";

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

  function selectProblem(id: ProblemTypeId) {
    const option = getProblemType(id);
    setValue("problemType", id, { shouldValidate: true });
    setValue("urgency", option.urgency);
    setValue("serviceCategory", option.serviceCategory);
    setValue("defaultRoute", option.defaultRoute);
  }

  async function goToStep2() {
    const valid = await trigger("problemType");
    if (valid) {
      setStep(2);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  async function onSubmit(data: LeadFormData) {
    setSubmitStatus("loading");
    const problem = getProblemType(data.problemType);
    const payload: LeadFormData = {
      ...data,
      urgency: data.urgency ?? problem.urgency,
      propertyType: "residential",
      serviceRequested: defaultService || problem.defaultService,
      serviceCategory: problem.serviceCategory,
      defaultRoute: defaultRoute || problem.defaultRoute,
      smsOptIn: true,
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setRouteResult(json.routing ?? null);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-green-800">
          Request received
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-green-950">
          We&apos;re on it.
        </h3>
        <p className="mt-3 text-green-900 leading-relaxed">
          Thanks for reaching out. We&apos;ll connect you with local help in Berks County and
          someone should contact you soon.
        </p>
        {isEmergency && (
          <div className="mt-6 rounded-lg bg-red-600 p-4 text-center">
            <p className="text-sm font-medium text-white">
              Active backup or leak? Don&apos;t wait—call now.
            </p>
            <a
              href={phoneHref(PHONE_NUMBER)}
              className="mt-2 inline-block text-lg font-semibold text-white underline"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        )}
        {routeResult && (
          <p className="mt-4 text-xs text-green-700">
            Reference: {(routeResult as { leadId?: string }).leadId}
          </p>
        )}
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-base text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200";
  const labelClass = "block text-sm font-medium text-stone-800";
  const errorClass = "mt-1.5 text-sm text-red-600";

  return (
    <div className="-mx-0 rounded-2xl border border-stone-200 bg-white shadow-sm md:mx-0">
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

      {step === 1 && (
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-stone-900 md:text-xl">
            What do you need help with?
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Tap the closest match.
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
          <button
            type="button"
            onClick={goToStep2}
            className="btn-touch-lg mt-5 w-full rounded-xl bg-stone-900 text-base font-semibold text-white active:bg-stone-800"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn-touch min-h-[2.75rem] text-sm font-medium text-stone-600 active:text-stone-900"
          >
            ← Change problem type
          </button>
          <h3 className="mt-3 text-lg font-semibold text-stone-900 md:mt-4 md:text-xl">
            How can we reach you?
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
                  ZIP
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
                placeholder="A sentence or two is enough—include which room or drain if you can."
                className={inputClass}
                {...register("problemDescription")}
              />
              {errors.problemDescription && (
                <p className={errorClass}>{errors.problemDescription.message}</p>
              )}
            </div>

            <details className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <summary className="cursor-pointer py-1 text-sm font-medium text-stone-700">
                Add email or photo (optional)
              </summary>
              <div className="mt-4 space-y-4">
                <div>
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
                <div>
                  <label className={labelClass} htmlFor="photoUpload">
                    Photo
                  </label>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    className="mt-1.5 text-sm text-stone-600"
                    {...register("photoUpload")}
                  />
                </div>
              </div>
            </details>
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

          {submitStatus === "error" && (
            <p className="mt-4 text-sm text-red-600">
              Something went wrong. Please{" "}
              <a href={phoneHref(PHONE_NUMBER)} className="font-medium underline">
                call {PHONE_NUMBER}
              </a>{" "}
              or try again.
            </p>
          )}

          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="btn-touch-lg mt-6 w-full rounded-xl bg-stone-900 text-base font-semibold text-white active:bg-stone-800 disabled:opacity-50"
          >
            {submitStatus === "loading" ? "Sending..." : "Get local help"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            {FORM_SUBMIT_FINE_PRINT}{" "}
            <Link href="/disclosure" className="underline hover:text-stone-700">
              Disclosure
            </Link>
            .
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

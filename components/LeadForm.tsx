"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import {
  leadFormSchema,
  type LeadFormData,
  propertyTypes,
  urgencyLevels,
} from "@/lib/formSchema";
import {
  FORM_DISCLOSURE_ACK,
  PARTNER_SHARE_CONSENT_COPY,
  SMS_CONSENT_COPY,
} from "@/lib/disclosures";

interface LeadFormProps {
  pageType?: string;
  serviceCategory?: string;
  defaultRoute?: string;
  defaultService?: string;
  compact?: boolean;
}

export function LeadForm({
  pageType = "general",
  serviceCategory = "general",
  defaultRoute = "",
  defaultService = "",
  compact = false,
}: LeadFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      propertyType: "residential",
      urgency: "same-day",
      serviceRequested: defaultService,
      smsOptIn: false,
    },
  });

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

  async function onSubmit(data: LeadFormData) {
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="text-lg font-bold text-green-900">Request received</h3>
        <p className="mt-2 text-sm text-green-800">
          Thank you. We&apos;ve received your request and will route it to the appropriate local provider.
        </p>
        {routeResult && (
          <p className="mt-2 text-xs text-green-700">
            Reference: {(routeResult as { leadId?: string }).leadId}
          </p>
        )}
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-slate-700";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${compact ? "" : "max-w-2xl"}`}
    >
      <h3 className="text-xl font-bold text-slate-900">Request Help</h3>
      <p className="mt-1 text-sm text-slate-600">
        Tell us what happened. Photos help providers respond faster.
      </p>

      <div className={`mt-6 grid gap-4 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        <div>
          <label className={labelClass} htmlFor="name">
            Name *
          </label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone *
          </label>
          <input id="phone" type="tel" className={inputClass} {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="city">
            City *
          </label>
          <input id="city" className={inputClass} {...register("city")} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="zip">
            ZIP *
          </label>
          <input id="zip" className={inputClass} {...register("zip")} />
          {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="streetAddress">
            Street address
          </label>
          <input id="streetAddress" className={inputClass} {...register("streetAddress")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="propertyType">
            Property type *
          </label>
          <select id="propertyType" className={inputClass} {...register("propertyType")}>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="urgency">
            Urgency *
          </label>
          <select id="urgency" className={inputClass} {...register("urgency")}>
            {urgencyLevels.map((u) => (
              <option key={u} value={u}>
                {u.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="serviceRequested">
          Service requested *
        </label>
        <input
          id="serviceRequested"
          className={inputClass}
          {...register("serviceRequested")}
        />
        {errors.serviceRequested && (
          <p className={errorClass}>{errors.serviceRequested.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="problemDescription">
          Describe the problem *
        </label>
        <textarea
          id="problemDescription"
          rows={4}
          className={inputClass}
          {...register("problemDescription")}
        />
        {errors.problemDescription && (
          <p className={errorClass}>{errors.problemDescription.message}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fixturesAffected">
            Fixtures affected
          </label>
          <input id="fixturesAffected" className={inputClass} {...register("fixturesAffected")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="waterOrSewagePresent">
            Water or sewage present?
          </label>
          <select id="waterOrSewagePresent" className={inputClass} {...register("waterOrSewagePresent")}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="photoUpload">
          Upload photo (optional)
        </label>
        <input
          id="photoUpload"
          type="file"
          accept="image/*"
          className="mt-1 text-sm"
          {...register("photoUpload")}
        />
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" className="mt-1" {...register("smsOptIn")} />
          <span>{SMS_CONSENT_COPY}</span>
        </label>
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" className="mt-1" {...register("partnerShareConsent")} />
          <span>{PARTNER_SHARE_CONSENT_COPY} *</span>
        </label>
        {errors.partnerShareConsent && (
          <p className={errorClass}>{errors.partnerShareConsent.message}</p>
        )}
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" className="mt-1" {...register("referralDisclosureAck")} />
          <span>
            {FORM_DISCLOSURE_ACK}{" "}
            <a href="/disclosure" className="text-blue-700 hover:underline">
              Read disclosure
            </a>
            . *
          </span>
        </label>
        {errors.referralDisclosureAck && (
          <p className={errorClass}>{errors.referralDisclosureAck.message}</p>
        )}
      </div>

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
          Something went wrong. Please call or try again.
        </p>
      )}

      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="mt-6 w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 sm:w-auto"
      >
        {submitStatus === "loading" ? "Submitting..." : "Get Local Help"}
      </button>
    </form>
  );
}

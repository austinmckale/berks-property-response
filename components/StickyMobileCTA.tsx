"use client";

import { Camera, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMobileNav } from "@/components/MobileNavContext";
import { getStickySmsMessage } from "@/lib/smsMessages";
import {
  getStickyCtaConfig,
  isStickyCtaEligible,
  shouldHideStickyBar,
} from "@/lib/stickyCta";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const { menuOpen } = useMobileNav();
  const [markerState, setMarkerState] = useState({ pathname: "", pastMarker: false });
  const [focusState, setFocusState] = useState({ pathname: "", focused: false });
  const [formState, setFormState] = useState({ pathname: "", inView: false });

  const config = getStickyCtaConfig(pathname);
  const smsMessage = getStickySmsMessage(pathname);
  const isEligible = isStickyCtaEligible(pathname);
  const isEmergency = config.variant === "emergency";

  useEffect(() => {
    if (!isEligible || menuOpen) {
      return;
    }

    const marker = document.getElementById("sticky-cta-marker");
    if (!marker) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setMarkerState({ pathname, pastMarker: !entry.isIntersecting }),
      { rootMargin: "-30% 0px 0px 0px", threshold: 0 }
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, [isEligible, menuOpen, pathname]);

  useEffect(() => {
    if (!isEligible) return;

    const updateForFocus = () => {
      const active = document.activeElement;
      setFocusState({
        pathname,
        focused: active instanceof Element && Boolean(active.closest("#get-help form, #intake-fields form")),
      });
    };
    const handleFocusOut = () => setTimeout(updateForFocus, 0);

    document.addEventListener("focusin", updateForFocus);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", updateForFocus);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isEligible, pathname]);

  useEffect(() => {
    if (!isEligible) {
      return;
    }

    let observedForm: HTMLFormElement | null = null;
    const formObserver = new IntersectionObserver(
      ([entry]) => setFormState({ pathname, inView: entry.isIntersecting }),
      { threshold: 0.1 }
    );
    const observeForm = () => {
      const form =
        document.querySelector<HTMLFormElement>("#get-help form") ??
        document.querySelector<HTMLFormElement>("#intake-fields form");
      if (form && form !== observedForm) {
        observedForm = form;
        formObserver.observe(form);
      }
    };
    const mutationObserver = new MutationObserver(observeForm);
    observeForm();
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      formObserver.disconnect();
    };
  }, [isEligible, pathname]);

  const formInView = formState.pathname === pathname && formState.inView;
  const pastMarker = markerState.pathname === pathname && markerState.pastMarker;
  const formFocused = focusState.pathname === pathname && focusState.focused;

  if (
    shouldHideStickyBar({
      menuOpen,
      isEligible,
      pastMarker,
      formFocused,
      formInView,
    })
  ) {
    return null;
  }

  const primaryClass = isEmergency
    ? "bg-red-600 text-white active:bg-red-700"
    : "bg-brand text-white active:bg-brand-hover";

  const secondaryClass = isEmergency
    ? "border border-brand bg-white text-brand active:bg-amber-50"
    : "border border-red-600 bg-white text-red-700 active:bg-red-50";

  const analyticsAttrs = {
    "data-analytics-cta-variant": config.variant,
  };

  function renderPrimaryAction() {
    if (config.primaryAction === "call") {
      return (
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="phone_click"
          data-analytics-source="sticky_mobile"
          {...analyticsAttrs}
          className={`btn-touch-fill gap-1.5 rounded-xl ${primaryClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {config.primaryLabel}
        </a>
      );
    }
    if (config.primaryAction === "sms") {
      return (
        <a
          href={smsHref(TEXT_NUMBER, smsMessage)}
          data-analytics-event="text_click"
          data-analytics-source="sticky_mobile"
          {...analyticsAttrs}
          className={`btn-touch-fill gap-1.5 rounded-xl ${primaryClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
          {config.primaryLabel}
        </a>
      );
    }
    const href = config.variant === "guide" ? "/request-help" : "#get-help";
    return (
      <Link
        href={href}
        data-analytics-event="click_request_help"
        data-analytics-source="sticky_mobile"
        {...analyticsAttrs}
        className={`btn-touch-fill gap-1.5 rounded-xl ${primaryClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
      >
        {config.primaryLabel}
      </Link>
    );
  }

  function renderSecondaryAction() {
    if (config.secondaryAction === "call") {
      return (
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="phone_click"
          data-analytics-source="sticky_mobile_secondary"
          {...analyticsAttrs}
          className={`btn-touch-fill gap-1.5 rounded-xl ${secondaryClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {config.secondaryLabel}
        </a>
      );
    }
    return (
      <a
        href={smsHref(TEXT_NUMBER, smsMessage)}
        data-analytics-event="text_click"
        data-analytics-source="sticky_mobile_secondary"
        {...analyticsAttrs}
        className={`btn-touch-fill gap-1.5 rounded-xl ${secondaryClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
      >
        <Camera className="h-4 w-4 shrink-0" aria-hidden />
        {config.secondaryLabel}
      </a>
    );
  }

  return (
    <>
      <div
        aria-hidden
        className="h-[calc(var(--mobile-bar-height)+env(safe-area-inset-bottom,0px))] md:hidden"
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden safe-bottom"
        role="navigation"
        aria-label="Quick actions"
      >
        <div className="grid grid-cols-[.58fr_.42fr] gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {renderPrimaryAction()}
          {renderSecondaryAction()}
        </div>
      </div>
    </>
  );
}

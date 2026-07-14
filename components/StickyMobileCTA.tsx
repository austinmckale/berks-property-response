"use client";

import { Camera, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMobileNav } from "@/components/MobileNavContext";
import { STICKY_ACTION_LABELS, STICKY_PHOTO_MESSAGE } from "@/lib/photoMessages";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

const STICKY_ELIGIBLE_PATHS = new Set([
  "/",
  "/emergency",
  "/drains",
  "/plumbing-and-leaks",
  "/after-leak",
  "/storm-fire-mold-help",
  "/property-repairs-berks-county-pa",
]);

function isStickyEligible(pathname: string): boolean {
  return (
    STICKY_ELIGIBLE_PATHS.has(pathname) ||
    pathname.startsWith("/service-areas/") ||
    pathname.endsWith("-berks-county-pa") ||
    pathname.endsWith("-reading-pa")
  );
}

export function StickyMobileCTA() {
  const pathname = usePathname();
  const { menuOpen } = useMobileNav();
  const [markerState, setMarkerState] = useState({ pathname: "", pastMarker: false });
  const [focusState, setFocusState] = useState({ pathname: "", focused: false });
  const [formState, setFormState] = useState({ pathname: "", inView: false });

  const isEligible = isStickyEligible(pathname);
  const isEmergency = pathname === "/emergency" || pathname.includes("emergency-");

  useEffect(() => {
    if (!isEligible || pathname === "/request-help" || menuOpen) {
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
    if (!isEligible || pathname === "/request-help") return;

    const updateForFocus = () => {
      const active = document.activeElement;
      setFocusState({
        pathname,
        focused: active instanceof Element && Boolean(active.closest("#get-help form")),
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
    if (!isEligible || pathname === "/request-help") {
      return;
    }

    let observedForm: HTMLFormElement | null = null;
    const formObserver = new IntersectionObserver(
      ([entry]) => setFormState({ pathname, inView: entry.isIntersecting }),
      { threshold: 0.1 }
    );
    const observeForm = () => {
      const form = document.querySelector<HTMLFormElement>("#get-help form");
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

  if (menuOpen || !pastMarker || formFocused || formInView) return null;

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
      <div
        className={`grid gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] ${
          isEmergency ? "grid-cols-[.58fr_.42fr]" : "grid-cols-[.42fr_.58fr]"
        }`}
      >
        <a
          href={phoneHref(PHONE_NUMBER)}
          data-analytics-event="phone_click"
          data-analytics-source="sticky_mobile"
          className={`btn-touch-fill gap-1.5 rounded-xl ${
            isEmergency
              ? "bg-red-600 text-white active:bg-red-700"
              : "border border-red-600 bg-white text-red-700 active:bg-red-50"
          }`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {STICKY_ACTION_LABELS[0]}
        </a>
        <a
          href={smsHref(TEXT_NUMBER, STICKY_PHOTO_MESSAGE)}
          data-analytics-event="text_click"
          data-analytics-source="sticky_mobile"
          className={`btn-touch-fill gap-1.5 rounded-xl ${
            isEmergency
              ? "border border-brand bg-white text-brand active:bg-amber-50"
              : "bg-brand text-white active:bg-brand-hover"
          }`}
        >
          <Camera className="h-4 w-4 shrink-0" aria-hidden />
          {STICKY_ACTION_LABELS[1]}
        </a>
      </div>
      </div>
    </>
  );
}

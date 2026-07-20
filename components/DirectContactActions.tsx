import { MessageSquare, Phone } from "lucide-react";
import { PHONE_NUMBER, TEXT_NUMBER } from "@/lib/siteConfig";
import { phoneHref, smsHref } from "@/lib/tracking";

interface DirectContactActionsProps {
  smsBody: string;
  analyticsSource: string;
  className?: string;
}

/** Immediate alternatives to the structured request form. */
export function DirectContactActions({
  smsBody,
  analyticsSource,
  className = "",
}: DirectContactActionsProps) {
  return (
    <nav
      aria-label="Contact options"
      className={`grid grid-cols-[1.15fr_.85fr] gap-2 ${className}`}
    >
      <a
        href={smsHref(TEXT_NUMBER, smsBody)}
        data-analytics-event="text_click"
        data-analytics-source={analyticsSource}
        className="btn-touch flex min-w-0 items-center justify-center gap-2 rounded-xl bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
        Text us
      </a>
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="phone_click"
        data-analytics-source={analyticsSource}
        className="btn-touch flex min-w-0 items-center justify-center gap-2 rounded-xl border border-red-600 bg-white px-3 text-sm font-semibold text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        Call
      </a>
    </nav>
  );
}

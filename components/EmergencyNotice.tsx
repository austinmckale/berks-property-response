import { PHONE_NUMBER } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

interface EmergencyNoticeProps {
  title?: string;
  message?: string;
}

export function EmergencyNotice({
  title = "Active backup or sewage?",
  message = "Stop using water. Keep people away from contaminated areas. Call now if waste is visible.",
}: EmergencyNoticeProps) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4" role="alert">
      <h2 className="font-semibold text-red-950">{title}</h2>
      <p className="mt-2 text-sm text-red-900">{message}</p>
      <a
        href={phoneHref(PHONE_NUMBER)}
        data-analytics-event="phone_click"
        data-analytics-source="emergency_notice"
        className="mt-4 inline-block rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Call {PHONE_NUMBER}
      </a>
    </div>
  );
}

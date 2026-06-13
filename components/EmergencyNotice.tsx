import { PHONE_NUMBER } from "@/lib/siteConfig";
import { phoneHref } from "@/lib/tracking";

interface EmergencyNoticeProps {
  title?: string;
  message?: string;
}

export function EmergencyNotice({
  title = "Active backup or sewage present?",
  message = "Stop using water. Keep people away from contaminated areas. Call now if waste or sewage is visible.",
}: EmergencyNoticeProps) {
  return (
    <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5" role="alert">
      <h2 className="text-lg font-bold text-red-900">{title}</h2>
      <p className="mt-2 text-sm text-red-800">{message}</p>
      <a
        href={phoneHref(PHONE_NUMBER)}
        className="mt-4 inline-block rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-700"
      >
        Call Now — {PHONE_NUMBER}
      </a>
    </div>
  );
}

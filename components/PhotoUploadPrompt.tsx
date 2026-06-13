import { TEXT_NUMBER } from "@/lib/siteConfig";
import { smsHref } from "@/lib/tracking";

export function PhotoUploadPrompt() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <h3 className="font-semibold text-blue-900">Send photos of the problem</h3>
      <p className="mt-2 text-sm text-blue-800">
        Photos of drains, leaks, stains, or backup areas help the provider understand urgency and scope before arrival.
      </p>
      <a
        href={smsHref(TEXT_NUMBER, "Hi, I need help with a property issue. I'll send photos.")}
        className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        Text photos to {TEXT_NUMBER}
      </a>
    </div>
  );
}

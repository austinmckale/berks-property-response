import { TEXT_NUMBER } from "@/lib/siteConfig";
import { smsHref } from "@/lib/tracking";

export function PhotoUploadPrompt() {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
      <h3 className="font-medium text-stone-900">Have a photo?</h3>
      <p className="mt-1 text-sm text-stone-600">
        A picture of the drain, leak, or damage helps local help respond faster.
      </p>
      <a
        href={smsHref(TEXT_NUMBER, "Hi, I need help with a property issue. I'll send a photo.")}
        className="mt-3 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
      >
        Text a photo to {TEXT_NUMBER}
      </a>
    </div>
  );
}

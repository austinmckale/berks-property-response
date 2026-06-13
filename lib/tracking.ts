export function extractUtmParams(searchParams: URLSearchParams) {
  return {
    utmSource: searchParams.get("utm_source") ?? "",
    utmMedium: searchParams.get("utm_medium") ?? "",
    utmCampaign: searchParams.get("utm_campaign") ?? "",
    utmTerm: searchParams.get("utm_term") ?? "",
    gclid: searchParams.get("gclid") ?? "",
  };
}

export function getReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer ?? "";
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function smsHref(phone: string, body?: string): string {
  const num = phone.replace(/\D/g, "");
  const text = body
    ? `?body=${encodeURIComponent(body)}`
    : "?body=Hi, I need help with a property issue. I can send photos.";
  return `sms:${num}${text}`;
}

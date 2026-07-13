/** Strip non-digits from a phone string for validation. */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** True when the value has at least 10 digits (US-style). */
export function isValidPhoneDigits(value: string): boolean {
  return phoneDigits(value).length >= 10;
}

/** BPR-YYYYMMDD-HHMMSS-RAND4 (Eastern Time) */
export const LEAD_ID_PATTERN = /^BPR-\d{8}-\d{6}-\d{4}$/;

const EASTERN = "America/New_York";

function easternDateParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  let hour = get("hour");
  if (hour === "24") hour = "00";

  return {
    date: `${get("year")}${get("month")}${get("day")}`,
    time: `${hour.padStart(2, "0")}${get("minute")}${get("second")}`,
  };
}

export function generateLeadId(now = new Date()): string {
  const { date, time } = easternDateParts(now);
  const rand = String(Math.floor(Math.random() * 10_000)).padStart(4, "0");
  return `BPR-${date}-${time}-${rand}`;
}

export function isLeadId(value: string): boolean {
  return LEAD_ID_PATTERN.test(value);
}

/**
 * Short customer-facing reference. The full lead ID remains the canonical
 * identifier for routing, storage, and operations.
 */
export function getCustomerReference(leadId: string): string {
  const match = /^BPR-\d{4}(\d{2})(\d{2})-\d{6}-(\d{4})$/.exec(leadId);
  if (!match) return leadId;

  const [, month, day, suffix] = match;
  return `BPR-${month}${day}-${suffix}`;
}

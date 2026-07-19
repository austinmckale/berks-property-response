import { getCityBySlug } from "@/lib/cities";

const EMERGENCY_PATH_PATTERN =
  /\/emergency(?:\/|$)|emergency-sewer|sewer-backup|floor-drain-backing|main-sewer-line-clog/;

const DRAIN_SEWER_PATH_PATTERN =
  /^\/drains$|drain-cleaning|hydro-jetting|sewer-camera|commercial-drain|main-sewer|floor-drain|sewer-line/;

const PLUMBING_PATH_PATTERN =
  /^\/plumbing-and-leaks$|leak-repair|faucet-repair|toilet-repair|shutoff-valve|small-plumbing/;

const AFTER_LEAK_REPAIR_PATH_PATTERN =
  /^\/after-leak$|^\/property-repairs-berks-county-pa$|water-damage-repair|basement-repair|ceiling-repair|drywall-repair|flooring-repair/;

const DEFAULT_SMS_MESSAGE =
  "Hi, I'm contacting Berks Property Response from the website. I need help with a property issue in Berks County. Here's what's happening: ";

const DRAIN_SEWER_SMS_MESSAGE =
  "Hi, I need help with a drain or sewer problem in Berks County. Here's what's happening: ";

const PLUMBING_SMS_MESSAGE =
  "Hi, I need help with a plumbing leak or fixture problem in Berks County. Here's what's happening: ";

const AFTER_LEAK_REPAIR_SMS_MESSAGE =
  "Hi, the leak or backup is stopped, but I need help repairing the damage. Here's what was affected: ";

const EMERGENCY_SMS_MESSAGE =
  "Hi, I have active water or sewage at a property in Berks County. The property location and what's happening are: ";

/** Contextual SMS body for sticky mobile text actions. Trailing space lets the visitor type immediately. */
export function getStickySmsMessage(pathname: string): string {
  if (pathname.startsWith("/service-areas/")) {
    const slug = pathname.slice("/service-areas/".length).split("/")[0];
    const city = getCityBySlug(slug);
    if (city) {
      return `Hi, I need help with a property issue in ${city.name}, ${city.state}. Here's what's happening: `;
    }
    return DEFAULT_SMS_MESSAGE;
  }

  if (EMERGENCY_PATH_PATTERN.test(pathname)) {
    return EMERGENCY_SMS_MESSAGE;
  }

  if (AFTER_LEAK_REPAIR_PATH_PATTERN.test(pathname)) {
    return AFTER_LEAK_REPAIR_SMS_MESSAGE;
  }

  if (DRAIN_SEWER_PATH_PATTERN.test(pathname)) {
    return DRAIN_SEWER_SMS_MESSAGE;
  }

  if (PLUMBING_PATH_PATTERN.test(pathname)) {
    return PLUMBING_SMS_MESSAGE;
  }

  return DEFAULT_SMS_MESSAGE;
}

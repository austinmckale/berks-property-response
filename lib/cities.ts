export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityPage {
  slug: string;
  name: string;
  state: string;
  zipCodes: string[];
  headline: string;
  intro: string;
  localContext: string;
  neighborhoods?: string[];
  serviceLinks: { href: string; label: string }[];
  faqs: CityFAQ[];
  draftStatus: "published" | "draft";
  needsConfirmation: boolean;
}

export const FIRST_WAVE_CITIES = [
  "reading-pa",
  "birdsboro-pa",
  "wyomissing-pa",
  "exeter-pa",
  "sinking-spring-pa",
  "douglassville-pa",
] as const;

export const cities: CityPage[] = [
  {
    slug: "reading-pa",
    name: "Reading",
    state: "PA",
    zipCodes: ["19601", "19602", "19604", "19605", "19606", "19607", "19608", "19609", "19610", "19611", "19612"],
    headline: "Plumbing, drain, and water damage help in Reading, PA",
    intro:
      "Reading is Berks County's largest city, with a mix of older row homes, multi-unit rentals, and commercial properties. Drain backups, aging sewer connections, and water damage after leaks are common intake requests from Reading neighborhoods.",
    localContext:
      "From Center City to the suburbs near Wyomissing borough, properties range from century-old plumbing to newer commercial kitchens. When multiple drains fail at once in a Reading property, we treat it as a potential main line issue and route to Apex Drain Services.",
    neighborhoods: ["Center City", "Mount Penn area", "Millmont", "Glenside"],
    serviceLinks: [
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Emergency sewer backup" },
      { href: "/main-sewer-line-clog-reading-pa", label: "Main sewer line clog" },
      { href: "/drain-cleaning-berks-county-pa", label: "Drain cleaning" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "Do you serve all of Reading?",
        answer:
          "Berks Property Response routes requests across Reading and Berks County to approved local providers. Actual service availability depends on the provider handling your job.",
      },
      {
        question: "Who performs the work in Reading?",
        answer:
          "We are an intake and referral site. Drain work may route to Apex Drain Services; build-back repair may route to RHI Pros. We disclose referral relationships on every form.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "birdsboro-pa",
    name: "Birdsboro",
    state: "PA",
    zipCodes: ["19508"],
    headline: "Drain, sewer, and property repair help in Birdsboro, PA",
    intro:
      "Birdsboro sits along the Schuylkill River with a mix of residential streets and small commercial properties. Homeowners here often call about basement floor drain backups after heavy rain or recurring kitchen line clogs.",
    localContext:
      "Properties in Birdsboro may have older lateral lines and basement utilities that are sensitive to main line stress. We route active sewer backups to Apex and follow-up water damage repair to RHI Pros when needed.",
    serviceLinks: [
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Sewer backup help" },
      { href: "/hydro-jetting-berks-county-pa", label: "Hydro jetting" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "Can I submit photos from Birdsboro?",
        answer:
          "Yes. Photos of floor drains, backup areas, or leak damage help providers understand urgency before they arrive.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "wyomissing-pa",
    name: "Wyomissing",
    state: "PA",
    zipCodes: ["19610"],
    headline: "Local plumbing and drain intake for Wyomissing, PA",
    intro:
      "Wyomissing includes residential neighborhoods, retail corridors, and office properties near Reading. Requests here range from commercial grease line issues along busy corridors to water damage repair after an upstairs leak.",
    localContext:
      "Commercial tenants and property managers in Wyomissing often need faster triage for recurring floor drains. We route commercial drain issues to Apex and contractor-level repair after water events to RHI Pros. Residential neighborhoods near Penn Avenue and the borough's retail corridors see a mix of aging supply lines and fixture-level issues that may require manual review until Evan Simons' scope is confirmed.",
    serviceLinks: [
      { href: "/commercial-drain-cleaning-berks-county-pa", label: "Commercial drain cleaning" },
      { href: "/drain-cleaning-berks-county-pa", label: "Residential drain cleaning" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "Do you handle Wyomissing commercial properties?",
        answer:
          "Yes, we accept commercial and property manager requests and route drain issues to Apex Drain Services when appropriate.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "exeter-pa",
    name: "Exeter Township",
    state: "PA",
    zipCodes: ["19606"],
    headline: "Exeter Township drain and water damage routing",
    intro:
      "Exeter Township covers suburban neighborhoods and commercial strips east of Reading. Sewer backups affecting multiple fixtures and sump-related basement moisture after plumbing events are common intake themes.",
    localContext:
      "Split-level homes and township commercial pads in Exeter may see main line symptoms when tree roots or aging laterals are involved. Camera inspection and jetting requests from Exeter route to Apex. After a backup is cleared, ceiling or flooring damage in lower levels may be routed to RHI Pros for build-back repair—not handled by Berks Property Response directly.",
    serviceLinks: [
      { href: "/sewer-camera-inspection-berks-county-pa", label: "Sewer camera inspection" },
      { href: "/main-sewer-line-clog-reading-pa", label: "Main line clog symptoms" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Repair after water damage" },
    ],
    faqs: [
      {
        question: "Is Exeter Township in your service area?",
        answer:
          "Exeter is part of our first-wave Berks County coverage. Submit your city and zip on the request form for routing.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "sinking-spring-pa",
    name: "Sinking Spring",
    state: "PA",
    zipCodes: ["19608"],
    headline: "Sinking Spring property problem intake",
    intro:
      "Sinking Spring blends suburban housing with light industrial and retail sites. We see requests for recurring drain clogs, restaurant grease lines near commercial zones, and ceiling repair after upstairs plumbing leaks.",
    localContext:
      "When a Sinking Spring homeowner reports a toilet bubbling while the washing machine drains, we prioritize main line routing to Apex rather than fixture-level plumbing. Light industrial sites along local commercial corridors may submit grease line or floor drain requests through the same intake form used for residential clogs.",
    serviceLinks: [
      { href: "/hydro-jetting-berks-county-pa", label: "Hydro jetting" },
      { href: "/commercial-drain-cleaning-berks-county-pa", label: "Commercial drains" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "What if I need a full remodel in Sinking Spring?",
        answer:
          "Berks Property Response focuses on plumbing-related intake. Broader remodeling is handled through RHIpros.com.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "douglassville-pa",
    name: "Douglassville",
    state: "PA",
    zipCodes: ["19518"],
    headline: "Douglassville drain and repair request routing",
    intro:
      "Douglassville and the Amity area include riverside homes, rural parcels, and small businesses along Route 422. Longer sewer runs and septic-to-municipal transitions can make camera inspection especially useful here.",
    localContext:
      "Requests from Douglassville often mention basement floor drains and seasonal backup patterns. We route emergency sewer symptoms to Apex and document damage repair needs for RHI Pros follow-up. Riverside and Amity Township properties may have longer lateral runs where camera inspection helps before jetting or clearing is scheduled.",
    serviceLinks: [
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Emergency sewer backup" },
      { href: "/sewer-camera-inspection-berks-county-pa", label: "Camera inspection" },
      { href: "/basement-floor-drain-backing-up-berks-county-pa", label: "Basement floor drain backup" },
    ],
    faqs: [
      {
        question: "How far from Reading do you route requests?",
        answer:
          "Douglassville is within our Berks County intake area. Provider availability is confirmed when your request is routed.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
];

export function getCityBySlug(slug: string): CityPage | undefined {
  return cities.find((c) => c.slug === slug);
}

export function isFirstWaveCity(city: string): boolean {
  const normalized = city.toLowerCase().replace(/\s+/g, "-");
  return FIRST_WAVE_CITIES.some(
    (c) => normalized.includes(c.replace("-pa", "")) || c.includes(normalized)
  );
}

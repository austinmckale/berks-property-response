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
  updatedAt?: string;
}

export const FIRST_WAVE_CITIES = [
  "reading-pa",
  "birdsboro-pa",
  "wyomissing-pa",
  "exeter-pa",
  "sinking-spring-pa",
  "douglassville-pa",
  "kutztown-pa",
  "west-reading-pa",
  "shillington-pa",
  "fleetwood-pa",
] as const;

export const cities: CityPage[] = [
  {
    slug: "reading-pa",
    name: "Reading",
    state: "PA",
    zipCodes: ["19601", "19602", "19604", "19605", "19606", "19607", "19608", "19609", "19610", "19611", "19612"],
    headline: "Plumbing, drain, and water damage help in Reading, PA",
    intro:
      "Reading is Berks County's largest city, with a mix of older row homes, multi-unit rentals, and commercial properties. Drain backups, aging sewer connections, and water damage after leaks are common problems we hear about from Reading neighborhoods.",
    localContext:
      "From Center City to the suburbs near Wyomissing borough, properties range from century-old plumbing to newer commercial kitchens. When multiple drains fail at once in a Reading property, we treat it as a potential main line issue and prioritize emergency drain help.",
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
          "Berks Property Response helps people across Reading and Berks County connect with local specialists. Actual service availability depends on the company handling your job.",
      },
      {
        question: "Who performs the work in Reading?",
        answer:
          "We help connect you with independent local specialists in Berks County. Based on your issue, that may be drain work, small plumbing, or build-back repair. We explain how matching works on every form.",
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
      "Properties in Birdsboro may have older lateral lines and basement utilities that are sensitive to main line stress. Active sewer backups get priority for emergency drain help; follow-up damage repair can be handled separately after the line is cleared.",
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
    headline: "Plumbing and drain help in Wyomissing, PA",
    intro:
      "Wyomissing includes residential neighborhoods, retail corridors, and office properties near Reading. Requests here range from commercial grease line issues along busy corridors to water damage repair after an upstairs leak.",
    localContext:
      "Commercial tenants and property managers in Wyomissing often need faster help for recurring floor drains. Commercial drain issues and repair after water events come up often here. Residential neighborhoods near Penn Avenue and the borough's retail corridors see a mix of aging supply lines and fixture-level issues that may need a closer look until small-plumbing scope is confirmed.",
    serviceLinks: [
      { href: "/commercial-drain-cleaning-berks-county-pa", label: "Commercial drain cleaning" },
      { href: "/drain-cleaning-berks-county-pa", label: "Residential drain cleaning" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "Do you handle Wyomissing commercial properties?",
        answer:
          "Yes, we accept commercial and property manager requests and connect you with local drain help when appropriate.",
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
    headline: "Drain and water damage help in Exeter Township",
    intro:
      "Exeter Township covers suburban neighborhoods and commercial strips east of Reading. Sewer backups affecting multiple fixtures and basement moisture after plumbing events are common reasons people reach out.",
    localContext:
      "Split-level homes and township commercial pads in Exeter may see main line symptoms when tree roots or aging laterals are involved. Camera inspection and jetting requests are common from Exeter. After a backup is cleared, ceiling or flooring damage in lower levels may need build-back repair from an independent local provider—not handled by Berks Property Response directly.",
    serviceLinks: [
      { href: "/sewer-camera-inspection-berks-county-pa", label: "Sewer camera inspection" },
      { href: "/main-sewer-line-clog-reading-pa", label: "Main line clog symptoms" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Repair after water damage" },
    ],
    faqs: [
      {
        question: "Is Exeter Township in your service area?",
        answer:
          "Exeter is part of our Berks County coverage. Submit your city and zip on the request form and we will connect you with local help.",
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
    headline: "Property repair help in Sinking Spring",
    intro:
      "Sinking Spring blends suburban housing with light industrial and retail sites. We see requests for recurring drain clogs, restaurant grease lines near commercial zones, and ceiling repair after upstairs plumbing leaks.",
    localContext:
      "When a Sinking Spring homeowner reports a toilet bubbling while the washing machine drains, we treat that as a likely main line issue—not a single-fixture clog. Light industrial sites along local commercial corridors can use the same request form for grease line or floor drain problems.",
    serviceLinks: [
      { href: "/hydro-jetting-berks-county-pa", label: "Hydro jetting" },
      { href: "/commercial-drain-cleaning-berks-county-pa", label: "Commercial drains" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "What if I need a full remodel in Sinking Spring?",
        answer:
          "Berks Property Response focuses on plumbing-related problems and repairs after leaks—not full home remodeling. For broader remodeling, visit RHIpros.com.",
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
    headline: "Drain and repair help in Douglassville",
    intro:
      "Douglassville and the Amity area include riverside homes, rural parcels, and small businesses along Route 422. Longer sewer runs and septic-to-municipal transitions can make camera inspection especially useful here.",
    localContext:
      "Requests from Douglassville often mention basement floor drains and seasonal backup patterns. Emergency sewer symptoms get priority; damage repair needs can be documented for follow-up after the line is cleared. Riverside and Amity Township properties may have longer lateral runs where camera inspection helps before jetting or clearing is scheduled.",
    serviceLinks: [
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Emergency sewer backup" },
      { href: "/sewer-camera-inspection-berks-county-pa", label: "Camera inspection" },
      { href: "/basement-floor-drain-backing-up-berks-county-pa", label: "Basement floor drain backup" },
    ],
    faqs: [
      {
        question: "How far from Reading do you route requests?",
        answer:
          "Douglassville is within our Berks County service area. Provider availability is confirmed when we connect you with local help.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
  },
  {
    slug: "kutztown-pa",
    name: "Kutztown",
    state: "PA",
    zipCodes: ["19530"],
    headline: "Plumbing and drain help in Kutztown, PA",
    intro:
      "Kutztown mixes college housing, older borough homes, and rural properties in the surrounding townships. Slow drains, fixture leaks, and water damage after plumbing events are common intake requests from the Kutztown area.",
    localContext:
      "Student rentals and older borough homes may see fixture-level leaks and clogged drains that differ from main line emergencies. When multiple fixtures fail together or a floor drain backs up, emergency drain routing takes priority.",
    neighborhoods: ["Kutztown borough", "Maxatawny Township area"],
    serviceLinks: [
      { href: "/leak-repair-berks-county-pa", label: "Leak repair" },
      { href: "/drain-cleaning-berks-county-pa", label: "Drain cleaning" },
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Sewer backup help" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Repair after a leak" },
    ],
    faqs: [
      {
        question: "Do you serve Kutztown and nearby townships?",
        answer:
          "Yes. Kutztown is part of our Berks County coverage. Submit your city and zip on the request form and we will connect you with local help.",
      },
      {
        question: "Can landlords submit requests for rental properties?",
        answer:
          "Yes. Include the property address, tenant contact if available, and photos of the issue when you can.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
    updatedAt: "2025-06-17",
  },
  {
    slug: "west-reading-pa",
    name: "West Reading",
    state: "PA",
    zipCodes: ["19611"],
    headline: "Drain and plumbing help in West Reading, PA",
    intro:
      "West Reading sits next to Reading with dense residential blocks, small businesses, and mixed-age housing. We hear about kitchen line clogs, upstairs leaks into lower units, and repair needs after water events.",
    localContext:
      "Row homes and multi-unit properties in West Reading often need fast triage between fixture-level plumbing and main line drain issues. Photos of affected fixtures and drains help route the request correctly.",
    serviceLinks: [
      { href: "/main-sewer-line-clog-reading-pa", label: "Main line clog symptoms" },
      { href: "/toilet-repair-berks-county-pa", label: "Toilet repair" },
      { href: "/water-damage-repair-after-leak-berks-county-pa", label: "Water damage repair" },
    ],
    faqs: [
      {
        question: "Is West Reading different from Reading for routing?",
        answer:
          "No. Both are in Berks County. Tell us your exact address and symptoms and we will connect you with the right local specialist.",
      },
      {
        question: "What if water damaged a ceiling in a lower unit?",
        answer:
          "Stop the active leak first. Once the source is controlled, ceiling and drywall repair may route to build-back help through RHI Pros.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
    updatedAt: "2025-06-17",
  },
  {
    slug: "shillington-pa",
    name: "Shillington",
    state: "PA",
    zipCodes: ["19607"],
    headline: "Plumbing and drain help in Shillington, PA",
    intro:
      "Shillington is a borough south of Reading with mostly residential streets and small commercial pockets. Homeowners here often report running toilets, sink leaks, and occasional main line symptoms when laundry and fixtures run together.",
    localContext:
      "Split-level and ranch homes in Shillington may show main line warning signs when multiple fixtures interact. Isolated fixture issues at one location often route to Ridge Line Plumbing for smaller residential service calls.",
    serviceLinks: [
      { href: "/small-plumbing-repairs-berks-county-pa", label: "Small plumbing repairs" },
      { href: "/emergency-sewer-backup-berks-county-pa", label: "Sewer backup help" },
      { href: "/faucet-repair-berks-county-pa", label: "Faucet repair" },
    ],
    faqs: [
      {
        question: "Do you cover Shillington borough?",
        answer:
          "Yes. Shillington is within our Berks County service area. Provider availability is confirmed when we connect you with local help.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
    updatedAt: "2025-06-17",
  },
  {
    slug: "fleetwood-pa",
    name: "Fleetwood",
    state: "PA",
    zipCodes: ["19522"],
    headline: "Plumbing and leak repair in Fleetwood, PA",
    intro:
      "Fleetwood and the surrounding area include borough homes and township properties north of Kutztown. Fixture leaks, water heaters, and smaller residential plumbing calls are common alongside drain issues after heavy rain.",
    localContext:
      "Ridge Line Plumbing serves the Fleetwood area for smaller residential plumbing service calls. Multi-fixture backups and sewer emergencies still route to Apex Drain Services.",
    serviceLinks: [
      { href: "/small-plumbing-repairs-berks-county-pa", label: "Small plumbing repairs" },
      { href: "/leak-repair-berks-county-pa", label: "Leak repair" },
      { href: "/basement-floor-drain-backing-up-berks-county-pa", label: "Basement floor drain backup" },
    ],
    faqs: [
      {
        question: "Is Fleetwood covered by your local partners?",
        answer:
          "Yes. Smaller residential plumbing in the Fleetwood area may route to Ridge Line Plumbing. Drain and sewer emergencies route to Apex Drain Services.",
      },
      {
        question: "Can I request help for a township address near Fleetwood?",
        answer:
          "Yes. Include your full address and zip on the request form so we can confirm Berks County coverage.",
      },
    ],
    draftStatus: "published",
    needsConfirmation: false,
    updatedAt: "2025-06-17",
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

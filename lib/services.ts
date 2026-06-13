import type { ProviderId } from "./providers";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  title: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  provider: ProviderId;
  serviceCategory: string;
  defaultRoute: ProviderId;
  payoutCategory: string;
  draftStatus: "published" | "draft";
  needsConfirmation: boolean;
  noindex: boolean;
  heroImage: string;
  intro: string;
  symptoms: string[];
  whatToDo: string[];
  routingNotes: string[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  rhiHandoff?: string;
}

export const services: ServicePage[] = [
  {
    slug: "emergency-sewer-backup-berks-county-pa",
    title: "Emergency Sewer Backup Help in Berks County, PA",
    metaDescription:
      "Sewage backing up in Berks County? Tell us what happened. We route sewer backup requests to Apex Drain Services and follow-up repair needs to local providers.",
    headline: "Sewer backup or sewage in your home or business?",
    subheadline:
      "If sewage is backing up through drains, stop using water and call now. We route emergency sewer requests to Apex Drain Services in Berks County.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex emergency sewer lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "A sewer backup is urgent. Multiple drains clogging at once, sewage smell, or waste coming up through a basement floor drain often points to a main line problem—not a single fixture clog.",
    symptoms: [
      "Sewage or dirty water backing up through floor drains",
      "Multiple drains clogged at the same time",
      "Toilet gurgling when you run a sink or shower",
      "Sewage smell in the basement or lower level",
      "Toilet waste backing up into a tub or shower",
    ],
    whatToDo: [
      "Stop using water—avoid flushing toilets, running sinks, or using appliances that drain",
      "Keep people and pets away from contaminated areas",
      "Call now if sewage is actively present",
      "Send photos of affected drains and any visible backup",
    ],
    routingNotes: [
      "Emergency sewer backups route to Apex Drain Services for drain and sewer response.",
      "If drywall, flooring, or ceilings were damaged, we may also route build-back repair to RHI Pros.",
    ],
    faqs: [
      {
        question: "Is Berks Property Response the company that does the drain work?",
        answer:
          "No. Berks Property Response is an intake and referral site. Actual drain and sewer work is performed by the local provider we route your request to, such as Apex Drain Services.",
      },
      {
        question: "Should I keep using water if only one drain is slow?",
        answer:
          "If multiple fixtures are affected or you smell sewage, stop using water and call. A single slow drain may be different from a main line backup.",
      },
    ],
    relatedSlugs: [
      "main-sewer-line-clog-reading-pa",
      "basement-floor-drain-backing-up-berks-county-pa",
      "hydro-jetting-berks-county-pa",
    ],
  },
  {
    slug: "hydro-jetting-berks-county-pa",
    title: "Hydro Jetting in Berks County, PA",
    metaDescription:
      "Recurring clogs, grease, roots, or sludge in Berks County? Hydro jetting may help. We route jetting requests to Apex Drain Services.",
    headline: "Recurring clogs or grease buildup in your lines?",
    subheadline:
      "When snaking is not enough, hydro jetting can clear roots, grease, and sludge from main and commercial lines. We route jetting requests to Apex Drain Services.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex hydro jetting lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "Hydro jetting uses high-pressure water to scour pipe walls. It is often used for recurring clogs, grease lines, root intrusion, and commercial drain maintenance in Berks County.",
    symptoms: [
      "Same drain clogging again after snaking",
      "Grease or sludge buildup in restaurant or commercial lines",
      "Root intrusion suspected in older sewer lines",
      "Slow main line despite repeated clearing attempts",
    ],
    whatToDo: [
      "Note how often the clog returns and which fixtures are affected",
      "Mention if this is a residential or commercial property",
      "Send photos of floor drains or cleanout access if visible",
      "Request help or call to describe the recurring issue",
    ],
    routingNotes: [
      "Hydro jetting requests route to Apex Drain Services.",
      "Sewer camera inspection may be recommended to locate the blockage first.",
    ],
    faqs: [
      {
        question: "Is hydro jetting the same as drain snaking?",
        answer:
          "No. Snaking breaks through a clog; jetting scours the pipe interior and can remove grease, roots, and buildup that snaking may leave behind.",
      },
    ],
    relatedSlugs: [
      "sewer-camera-inspection-berks-county-pa",
      "commercial-drain-cleaning-berks-county-pa",
      "drain-cleaning-berks-county-pa",
    ],
  },
  {
    slug: "drain-cleaning-berks-county-pa",
    title: "Drain Cleaning in Berks County, PA",
    metaDescription:
      "Slow or clogged drains in Berks County? Sinks, tubs, floor drains, and recurring clogs. We route drain cleaning to Apex Drain Services.",
    headline: "Slow or clogged drains in Berks County?",
    subheadline:
      "Tell us which fixtures are affected. We route drain cleaning requests to Apex Drain Services for sinks, tubs, floor drains, and recurring clogs.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex standard drain lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "Clogged sinks, slow tubs, and backed-up floor drains are common in Berks County homes and businesses. If multiple fixtures fail at once, that may signal a main line issue instead of a single clog.",
    symptoms: [
      "Kitchen or bathroom sink draining slowly",
      "Shower or tub holding water",
      "Floor drain not draining in basement or garage",
      "Same drain clogging repeatedly",
    ],
    whatToDo: [
      "Describe which fixtures are affected",
      "Note if the problem is new or recurring",
      "Avoid chemical drain cleaners if you plan to have the line cleared professionally",
      "Send photos if water is standing in a fixture or floor drain",
    ],
    routingNotes: ["Standard drain cleaning routes to Apex Drain Services."],
    faqs: [
      {
        question: "When is a clog a main line problem?",
        answer:
          "If multiple fixtures backup together, toilets gurgle when other drains run, or a basement floor drain overflows, the issue may be beyond a single fixture clog.",
      },
    ],
    relatedSlugs: [
      "main-sewer-line-clog-reading-pa",
      "emergency-sewer-backup-berks-county-pa",
    ],
  },
  {
    slug: "main-sewer-line-clog-reading-pa",
    title: "Main Sewer Line Clog in Reading & Berks County, PA",
    metaDescription:
      "Multiple fixtures backing up in Reading or Berks County? Main sewer line clog symptoms and routing to Apex Drain Services.",
    headline: "Multiple fixtures backing up? Possible main line clog",
    subheadline:
      "Toilet and shower interaction, floor drain backup, and gurgling drains often point to a main sewer line issue. We route these requests to Apex Drain Services.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex emergency sewer lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "A main sewer line clog affects more than one fixture. In Reading and across Berks County, common signs include toilets backing up into tubs, gurgling drains, and basement floor drain overflow.",
    symptoms: [
      "Toilet backs up when shower or tub drains",
      "Multiple toilets or sinks affected at once",
      "Basement floor drain overflowing",
      "Gurgling sounds from drains throughout the house",
    ],
    whatToDo: [
      "Stop using all water if backup is active",
      "Note which fixtures are involved",
      "Call if sewage is present",
      "Request help with photos of affected areas",
    ],
    routingNotes: ["Main line clogs route to Apex Drain Services."],
    faqs: [
      {
        question: "Is this different from a single clogged toilet?",
        answer:
          "Yes. One toilet clog isolated to that fixture may be fixture-level. Multiple fixtures or toilet-to-tub backup suggests a main line problem.",
      },
    ],
    relatedSlugs: [
      "emergency-sewer-backup-berks-county-pa",
      "sewer-camera-inspection-berks-county-pa",
    ],
  },
  {
    slug: "sewer-camera-inspection-berks-county-pa",
    title: "Sewer Camera Inspection in Berks County, PA",
    metaDescription:
      "Need a sewer camera inspection in Berks County? Locate blockages, roots, and line damage. Routed to Apex Drain Services.",
    headline: "Need to see what is inside your sewer line?",
    subheadline:
      "Camera inspection helps locate blockages, roots, bellies, and damage before clearing or repair. We route inspection requests to Apex Drain Services.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex standard drain lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "A sewer camera inspection sends a small camera through the line to show what snaking or jetting alone cannot confirm—roots, breaks, offsets, and recurring clog locations.",
    symptoms: [
      "Recurring clogs in the same line",
      "Unknown cause after repeated drain clearing",
      "Pre-purchase or pre-repair line evaluation",
      "Suspected root intrusion or pipe damage",
    ],
    whatToDo: [
      "Describe prior drain work and how often clogs return",
      "Note property type and approximate line age if known",
      "Request help to schedule inspection routing",
    ],
    routingNotes: ["Sewer camera inspection routes to Apex Drain Services."],
    faqs: [],
    relatedSlugs: ["hydro-jetting-berks-county-pa", "drain-cleaning-berks-county-pa"],
  },
  {
    slug: "commercial-drain-cleaning-berks-county-pa",
    title: "Commercial Drain Cleaning in Berks County, PA",
    metaDescription:
      "Restaurant, retail, or property manager drain issues in Berks County? Grease lines, floor drains, and business downtime. Routed to Apex Drain Services.",
    headline: "Commercial drain or grease line problems?",
    subheadline:
      "Restaurants, property managers, and small businesses in Berks County can request help for recurring floor drain clogs, grease lines, and commercial drain maintenance through Apex Drain Services.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex commercial drain lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "Commercial drain issues create downtime. Grease traps, floor drains, and kitchen lines need different response than a residential sink clog. We route commercial drain requests to Apex Drain Services.",
    symptoms: [
      "Recurring floor drain clogs in a restaurant or retail space",
      "Grease line or grease trap backup symptoms",
      "Multiple drains slow during peak business hours",
      "Property manager handling repeat tenant drain calls",
    ],
    whatToDo: [
      "Describe business type and which drains are affected",
      "Note urgency and any health or code concerns",
      "Send photos of floor drains or backup areas if safe",
    ],
    routingNotes: ["Commercial drain cleaning routes to Apex Drain Services."],
    faqs: [],
    relatedSlugs: [
      "restaurant-grease-line-jetting-berks-county-pa",
      "hydro-jetting-berks-county-pa",
    ],
  },
  {
    slug: "small-plumbing-repairs-berks-county-pa",
    title: "Small Plumbing Repairs in Berks County, PA",
    metaDescription:
      "Small plumbing repairs in Berks County—leaks, faucets, toilets, and fixture issues. Provider scope confirmation required.",
    headline: "Small plumbing leak or fixture repair?",
    subheadline:
      "CONFIRMATION REQUIRED: Exact scope for small plumbing repairs through Evan Simons is still being verified. Submit your request and we will route when confirmed.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "manual_review",
    payoutCategory: "Evan small plumbing lead",
    draftStatus: "draft",
    needsConfirmation: true,
    noindex: true,
    heroImage: "/images/placeholder-plumbing.svg",
    intro:
      "This page covers small plumbing repairs such as leaks under sinks, faucet repair, toilet repair, shutoff valves, and minor fixture issues. Evan Simons may handle these services once scope is confirmed.",
    symptoms: [
      "Leak under kitchen or bathroom sink",
      "Dripping faucet or running toilet (single fixture)",
      "Shutoff valve that will not turn or leaks",
      "Minor fixture-level plumbing issue",
    ],
    whatToDo: [
      "Describe the fixture and symptoms",
      "Note if this affects only one fixture or multiple drains",
      "Send photos of the leak or fixture",
      "Submit a request—routing may go to manual review until Evan's scope is confirmed",
    ],
    routingNotes: [
      "CONFIRMATION REQUIRED: Evan Simons service scope is partially confirmed.",
      "Isolated fixture issues may route to Evan when confirmed.",
      "Multi-fixture or sewer symptoms route to Apex instead.",
    ],
    faqs: [
      {
        question: "Why does this page say confirmation required?",
        answer:
          "We do not publish unverified provider claims. Evan Simons' exact services, hours, and service area are still being confirmed before full routing goes live.",
      },
    ],
    relatedSlugs: ["leak-repair-berks-county-pa", "toilet-repair-berks-county-pa"],
  },
  {
    slug: "water-damage-repair-after-leak-berks-county-pa",
    title: "Water Damage Repair After a Leak in Berks County, PA",
    metaDescription:
      "Water damage after a leak or backup in Berks County? Drywall, flooring, ceiling, and build-back repair routed to RHI Pros.",
    headline: "Water damage after a leak or plumbing backup?",
    subheadline:
      "Once the source is stopped, drywall, flooring, ceiling, trim, and cabinet repair may be needed. We route build-back repair to RHI Pros.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI water damage repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-water-damage.svg",
    intro:
      "After a pipe leak, drain backup, or sewer event, visible damage to walls, floors, ceilings, or cabinets often remains even after the plumbing issue is fixed. That repair work is different from clearing the line.",
    symptoms: [
      "Wet or stained drywall after a pipe leak",
      "Buckled flooring or saturated carpet",
      "Ceiling stain or sag from an upstairs leak",
      "Baseboard, trim, or cabinet damage after water event",
      "Basement damage after a floor drain or sewer backup",
    ],
    whatToDo: [
      "Confirm the water source has been stopped or is being addressed",
      "Document damage with photos",
      "Describe affected rooms and materials",
      "Request help for repair routing after the emergency is handled",
    ],
    routingNotes: [
      "Water damage and build-back repair routes to RHI Pros.",
      "Active sewer or drain emergencies still route to Apex first.",
    ],
    faqs: [
      {
        question: "Should I call for water damage before the leak is fixed?",
        answer:
          "Stop active leaks and backups first. Once the source is controlled, repair of damaged materials can be routed to RHI Pros.",
      },
    ],
    relatedSlugs: [
      "drywall-repair-after-plumbing-leak-berks-county-pa",
      "property-repairs-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
];

export const evanConfirmedServices: Record<string, boolean> = {
  "leak repair": false,
  "faucet repair": false,
  "toilet repair": false,
  "running toilet": false,
  "garbage disposal": false,
  "shutoff valve": false,
  "small plumbing repair": false,
  "fixture repair": false,
};

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getPublishedServices(): ServicePage[] {
  return services.filter((s) => s.draftStatus === "published" && !s.noindex);
}

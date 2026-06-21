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
  updatedAt?: string;
}

export const services: ServicePage[] = [
  {
    slug: "emergency-sewer-backup-berks-county-pa",
    title: "Emergency Sewer Backup Help in Berks County, PA",
    metaDescription:
      "Sewage backing up in Berks County? Tell us what happened. We connect you with local emergency drain and sewer help.",
    headline: "Sewer backup or sewage in your home or business?",
    subheadline:
      "If sewage is backing up through drains, stop using water and call now. Tell us what happened and we will connect you with local emergency sewer help in Berks County.",
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
          "No. Berks Property Response helps you get connected with local specialists. Actual drain and sewer work is performed by the independent local company we connect you with.",
      },
      {
        question: "Should I keep using water if only one drain is slow?",
        answer:
          "If multiple fixtures are affected or you smell sewage, stop using water and call. A single slow drain may be different from a main line backup.",
      },
    ],
    relatedSlugs: [
      "main-sewer-line-clog-reading-pa",
      "hydro-jetting-berks-county-pa",
      "drain-cleaning-berks-county-pa",
    ],
  },
  {
    slug: "hydro-jetting-berks-county-pa",
    title: "Hydro Jetting in Berks County, PA",
    metaDescription:
      "Recurring clogs, grease, roots, or sludge in Berks County? Tell us what happened. We connect you with local hydro jetting help.",
    headline: "Recurring clogs or grease buildup in your lines?",
    subheadline:
      "When snaking is not enough, hydro jetting can clear roots, grease, and sludge from main and commercial lines. Describe your issue and we will connect you with local help.",
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
      {
        question: "Is hydro jetting safe for older pipes?",
        answer:
          "Pressure and nozzle choice depend on pipe material and condition. A camera inspection is often recommended first so the line is assessed before jetting.",
      },
      {
        question: "When should I request hydro jetting instead of drain cleaning?",
        answer:
          "If the same line keeps clogging after snaking, or grease and roots are suspected, jetting may be the next step. Describe how often the clog returns when you request help.",
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
      "Slow or clogged drains in Berks County? Tell us which fixtures are affected and we will connect you with local drain cleaning help.",
    headline: "Slow or clogged drains in Berks County?",
    subheadline:
      "Tell us which fixtures are affected—sinks, tubs, floor drains, or recurring clogs. We will connect you with the right local help.",
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
      {
        question: "Should I use chemical drain cleaner before calling?",
        answer:
          "Avoid harsh chemicals if you plan to have the line cleared professionally. They can damage pipes and make safe clearing harder.",
      },
      {
        question: "Can I submit photos of a slow drain?",
        answer:
          "Yes. Photos of standing water, floor drains, or affected fixtures help us understand urgency before connecting you with local help.",
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
      "Multiple fixtures backing up in Reading or Berks County? Main sewer line clog symptoms—tell us what happened for local help.",
    headline: "Multiple fixtures backing up? Possible main line clog",
    subheadline:
      "Toilet and shower interaction, floor drain backup, and gurgling drains often point to a main sewer line issue. Call or request help to describe what is happening.",
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
      {
        question: "Should I stop using water if multiple fixtures are affected?",
        answer:
          "Yes. If toilets, tubs, or floor drains are backing up together, stop using water and call or request help right away.",
      },
      {
        question: "Does this page cover Reading only?",
        answer:
          "No. Main line clog symptoms are the same across Berks County. This page highlights Reading because it is the county seat, but we route help throughout the area.",
      },
    ],
    relatedSlugs: [
      "emergency-sewer-backup-berks-county-pa",
      "basement-floor-drain-backing-up-berks-county-pa",
      "sewer-camera-inspection-berks-county-pa",
    ],
  },
  {
    slug: "basement-floor-drain-backing-up-berks-county-pa",
    title: "Basement Floor Drain Backup in Berks County, PA",
    metaDescription:
      "Basement floor drain backing up in Berks County? Sewage or dirty water at a floor drain—call or request emergency drain help.",
    headline: "Basement floor drain backing up?",
    subheadline:
      "Water or sewage at a basement floor drain often signals a main line or sewer issue. Stop using water and call if backup is active.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex emergency sewer lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "A basement floor drain backing up with sewage or dirty water is urgent. It often means the main sewer line is blocked—not a simple fixture clog. Stop using water and call if waste is present.",
    symptoms: [
      "Sewage or dirty water rising from a basement floor drain",
      "Floor drain overflow when toilets or tubs run",
      "Sewage smell in the basement",
      "Multiple upper fixtures slow or backing up at the same time",
    ],
    whatToDo: [
      "Stop using water—avoid flushing, running sinks, or laundry",
      "Keep people and pets away from contaminated water",
      "Call now if sewage is actively present",
      "Send photos of the floor drain and any backup",
    ],
    routingNotes: [
      "Basement floor drain backups route to Apex Drain Services.",
      "Finish repair of damaged materials after the event may route to RHI Pros.",
    ],
    faqs: [
      {
        question: "Is this different from a small plumbing leak?",
        answer:
          "Yes. An isolated drip under one sink may route to a plumber for fixture repair. Sewage or backup at a floor drain is a drain or sewer emergency.",
      },
      {
        question: "What if only the floor drain is slow, not backing up?",
        answer:
          "A slow floor drain can still signal a partial main line blockage. Note whether other fixtures are affected and send photos if water is standing.",
      },
      {
        question: "Who handles finish repair after a basement backup?",
        answer:
          "Emergency drain clearing comes first. After the source is controlled, drywall, flooring, or trim repair may route to RHI Pros for build-back work.",
      },
    ],
    relatedSlugs: [
      "emergency-sewer-backup-berks-county-pa",
      "main-sewer-line-clog-reading-pa",
    ],
  },
  {
    slug: "sewer-camera-inspection-berks-county-pa",
    title: "Sewer Camera Inspection in Berks County, PA",
    metaDescription:
      "Need a sewer camera inspection in Berks County? Locate blockages, roots, and line damage. Tell us what happened for local help.",
    headline: "Need to see what is inside your sewer line?",
    subheadline:
      "Camera inspection helps locate blockages, roots, bellies, and damage before clearing or repair. Request help to describe your line issue.",
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
    faqs: [
      {
        question: "Why get a camera inspection before jetting or repair?",
        answer:
          "Camera inspection shows roots, breaks, offsets, and recurring clog locations so clearing or repair targets the actual problem—not just the symptom.",
      },
      {
        question: "Is camera inspection only for emergencies?",
        answer:
          "No. It is also useful for recurring clogs, pre-purchase line checks, and evaluating older Berks County sewer laterals.",
      },
      {
        question: "Who performs the inspection?",
        answer:
          "Berks Property Response connects you with an independent local drain specialist. We do not perform the inspection ourselves.",
      },
    ],
    relatedSlugs: ["hydro-jetting-berks-county-pa", "drain-cleaning-berks-county-pa"],
  },
  {
    slug: "commercial-drain-cleaning-berks-county-pa",
    title: "Commercial Drain Cleaning in Berks County, PA",
    metaDescription:
      "Restaurant, retail, or property manager drain issues in Berks County? Grease lines, floor drains, and business downtime—request local help.",
    headline: "Commercial drain or grease line problems?",
    subheadline:
      "Restaurants, property managers, and small businesses in Berks County can request help for recurring floor drain clogs, grease lines, and commercial drain maintenance.",
    provider: "apex",
    serviceCategory: "drain_sewer",
    defaultRoute: "apex",
    payoutCategory: "Apex commercial drain lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/placeholder-drain.svg",
    intro:
      "Commercial drain issues create downtime. Grease traps, floor drains, and kitchen lines need different response than a residential sink clog. Tell us your business type and which drains are affected.",
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
    faqs: [
      {
        question: "Do you handle restaurant grease lines in Berks County?",
        answer:
          "Yes. Describe your business type and which drains are affected. Grease lines and floor drains often need different response than a residential sink clog.",
      },
      {
        question: "Can property managers submit requests?",
        answer:
          "Yes. Include the property address, tenant contact if available, and which drains are recurring.",
      },
      {
        question: "Is commercial work routed differently from residential drains?",
        answer:
          "Commercial drain and grease line requests route to Apex Drain Services. Isolated fixture leaks at one sink may route to Ridge Line Plumbing instead.",
      },
    ],
    relatedSlugs: [
      "hydro-jetting-berks-county-pa",
      "drain-cleaning-berks-county-pa",
    ],
  },
  {
    slug: "small-plumbing-repairs-berks-county-pa",
    title: "Small Plumbing Repairs in Berks County, PA",
    metaDescription:
      "Small plumbing repairs in Berks County—leaks, faucets, running toilets, and fixture issues. We connect you with Ridge Line Plumbing for smaller residential service calls.",
    headline: "Small plumbing leak or fixture repair?",
    subheadline:
      "For isolated residential leaks, faucets, running toilets, and shutoff valves in Berks County, describe the problem and we will connect you with Ridge Line Plumbing.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "evan",
    payoutCategory: "Ridge Line Plumbing lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/ridge-line-plumbing-logo.png",
    intro:
      "This covers smaller residential plumbing service calls—leaks under sinks, dripping faucets, running toilets, shutoff valves, and other fixture-level repairs. Ridge Line Plumbing works alone and handles repair-level jobs, not main line or sewer work.",
    symptoms: [
      "Leak under kitchen or bathroom sink",
      "Dripping faucet or running toilet (single fixture)",
      "Shutoff valve that will not turn or leaks",
      "Minor fixture-level plumbing issue at one location",
    ],
    whatToDo: [
      "Describe the fixture and symptoms",
      "Confirm whether only one fixture is affected",
      "Send photos of the leak or fixture",
      "Request help or call to describe the issue",
    ],
    routingNotes: [
      "Isolated small plumbing repairs route to Ridge Line Plumbing.",
      "Multi-fixture backups, sewer symptoms, or floor drain overflow route to Apex Drain Services.",
      "Water damage or build-back repair after the leak is stopped routes to RHI Pros.",
    ],
    faqs: [
      {
        question: "Does Ridge Line Plumbing handle drain or sewer backups?",
        answer:
          "No. Main line clogs, sewer backups, hydro jetting, and multi-fixture drain issues route to Apex Drain Services instead.",
      },
      {
        question: "What if drywall or flooring was damaged by the leak?",
        answer:
          "Once the leak is fixed, repair of damaged materials can route to RHI Pros for build-back work.",
      },
    ],
    relatedSlugs: [
      "leak-repair-berks-county-pa",
      "faucet-repair-berks-county-pa",
      "toilet-repair-berks-county-pa",
      "shutoff-valve-repair-berks-county-pa",
    ],
  },
  {
    slug: "leak-repair-berks-county-pa",
    title: "Leak Repair in Berks County, PA",
    metaDescription:
      "Leak under a sink or at a fixture in Berks County? Describe the problem for smaller residential plumbing help through Ridge Line Plumbing.",
    headline: "Leak under a sink or at a fixture?",
    subheadline:
      "For an isolated drip or puddle at a single fixture—not multiple drains backing up—we connect you with Ridge Line Plumbing for smaller residential leak repair.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "evan",
    payoutCategory: "Ridge Line Plumbing lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/ridge-line-plumbing-logo.png",
    intro:
      "A leak under a kitchen or bathroom sink, at a supply line, or around a single fixture is often a repair-level job. Ridge Line Plumbing handles smaller residential plumbing service calls in Berks County when the issue is isolated to one location.",
    symptoms: [
      "Active drip or puddle under a sink",
      "Water collecting at a single fixture connection",
      "Slow drip from a supply line at one sink or toilet",
      "Leak limited to one fixture with no other drains affected",
    ],
    whatToDo: [
      "Turn off the fixture shutoff if you can do so safely",
      "Note whether only one fixture is involved",
      "Send photos of the leak location",
      "Request help describing when the leak started",
    ],
    routingNotes: [
      "Isolated leak repair routes to Ridge Line Plumbing.",
      "Multiple drains backing up or sewage routes to Apex Drain Services.",
      "Drywall or flooring damage after the leak routes to RHI Pros.",
    ],
    faqs: [
      {
        question: "Is this the same as a sewer backup?",
        answer:
          "No. Sewage, floor drain overflow, or multiple fixtures backing up together point to a drain or sewer issue and route to Apex instead.",
      },
      {
        question: "Should I shut off water at the leak?",
        answer:
          "If you can safely reach the fixture shutoff, turn it off to limit damage. Then send photos and describe whether only one fixture is affected.",
      },
      {
        question: "What if drywall or flooring was damaged?",
        answer:
          "Once the leak is stopped, build-back repair of damaged materials can route to RHI Pros separately from the plumbing fix.",
      },
    ],
    relatedSlugs: [
      "faucet-repair-berks-county-pa",
      "shutoff-valve-repair-berks-county-pa",
      "small-plumbing-repairs-berks-county-pa",
    ],
  },
  {
    slug: "faucet-repair-berks-county-pa",
    title: "Faucet Repair in Berks County, PA",
    metaDescription:
      "Dripping or leaking faucet in Berks County? Single-fixture faucet repair help through Ridge Line Plumbing for smaller residential service calls.",
    headline: "Dripping or leaking faucet?",
    subheadline:
      "When one faucet drips or leaks at the fixture—not a whole-house pressure or multi-drain issue—we connect you with Ridge Line Plumbing.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "evan",
    payoutCategory: "Ridge Line Plumbing lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/ridge-line-plumbing-logo.png",
    intro:
      "A dripping kitchen or bathroom faucet, loose handle, or leak at the spout base is typically a fixture-level repair. Ridge Line Plumbing handles smaller residential plumbing service calls in Berks County.",
    symptoms: [
      "Steady drip from faucet spout when turned off",
      "Leak around the faucet base or handles",
      "Hard-to-turn or loose faucet handle",
      "Single faucet affected with no other plumbing symptoms",
    ],
    whatToDo: [
      "Identify which faucet is affected",
      "Note how long the drip has been happening",
      "Send a photo or short video of the drip",
      "Request help with the fixture location",
    ],
    routingNotes: [
      "Single-fixture faucet repair routes to Ridge Line Plumbing.",
      "Low pressure at every fixture or multiple drains affected may need different routing.",
    ],
    faqs: [
      {
        question: "Is a dripping faucet a plumbing emergency?",
        answer:
          "Usually not, unless water is spraying or flooding. A steady drip at one faucet is typically a fixture-level repair routed to Ridge Line Plumbing.",
      },
      {
        question: "What if every faucet in the house has low pressure?",
        answer:
          "Whole-house pressure issues may not be a single-faucet repair. Describe all symptoms when you request help so routing matches the problem.",
      },
      {
        question: "Can I send a video of the drip?",
        answer:
          "Yes. A short video helps confirm whether the leak is at the spout, base, or handle before a provider arrives.",
      },
    ],
    relatedSlugs: [
      "leak-repair-berks-county-pa",
      "shutoff-valve-repair-berks-county-pa",
      "small-plumbing-repairs-berks-county-pa",
    ],
  },
  {
    slug: "toilet-repair-berks-county-pa",
    title: "Toilet Repair in Berks County, PA",
    metaDescription:
      "Running toilet or isolated toilet repair in Berks County. Single-fixture toilet help through Ridge Line Plumbing—not main line or sewer backups.",
    headline: "Running toilet or isolated toilet problem?",
    subheadline:
      "When one toilet runs, leaks, or needs repair and no other drains are backing up, we connect you with Ridge Line Plumbing.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "evan",
    payoutCategory: "Ridge Line Plumbing lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/ridge-line-plumbing-logo.png",
    intro:
      "A running toilet, flapper issue, or leak at a single toilet is often a fixture-level repair. If the toilet bubbles when the shower runs or waste backs up into a tub, that is a main line issue and routes to Apex instead.",
    symptoms: [
      "Toilet runs constantly between flushes",
      "Toilet leak at the base or tank (single toilet only)",
      "Handle or flapper issue at one toilet",
      "One toilet affected with no gurgling in other drains",
    ],
    whatToDo: [
      "Confirm no other fixtures are backing up",
      "Note whether the toilet bubbles when shower or sink runs",
      "Send photos of the toilet and any visible leak",
      "Request help describing the symptoms",
    ],
    routingNotes: [
      "Isolated toilet repair routes to Ridge Line Plumbing.",
      "Toilet bubbling with tub or shower backup routes to Apex Drain Services.",
    ],
    faqs: [
      {
        question: "What if the toilet gurgles when I run the shower?",
        answer:
          "That often signals a main line or sewer issue. Use emergency drain help instead—those routes go to Apex Drain Services.",
      },
      {
        question: "Is a running toilet wasting a lot of water?",
        answer:
          "Yes. A running toilet can waste hundreds of gallons per day. If only one toilet is affected with no other drain symptoms, fixture repair may route to Ridge Line Plumbing.",
      },
      {
        question: "Should I keep flushing to test a running toilet?",
        answer:
          "No need to keep flushing. Note whether the tank refills on its own and send a photo or short video of the tank interior if safe to do so.",
      },
    ],
    relatedSlugs: [
      "leak-repair-berks-county-pa",
      "small-plumbing-repairs-berks-county-pa",
      "main-sewer-line-clog-reading-pa",
    ],
  },
  {
    slug: "shutoff-valve-repair-berks-county-pa",
    title: "Shutoff Valve Repair in Berks County, PA",
    metaDescription:
      "Leaking or stuck shutoff valve in Berks County? Fixture-level valve repair help through Ridge Line Plumbing for smaller residential service calls.",
    headline: "Shutoff valve leaking or stuck?",
    subheadline:
      "For a leaking, corroded, or hard-to-turn shutoff at a single fixture, we connect you with Ridge Line Plumbing.",
    provider: "evan",
    serviceCategory: "plumbing",
    defaultRoute: "evan",
    payoutCategory: "Ridge Line Plumbing lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/ridge-line-plumbing-logo.png",
    intro:
      "Shutoff valves under sinks, behind toilets, or at individual fixtures can leak or seize over time. Ridge Line Plumbing handles smaller residential plumbing service calls when the issue is limited to fixture-level valves.",
    symptoms: [
      "Drip or weep at an angle stop or fixture shutoff",
      "Shutoff will not turn or will not fully stop water",
      "Corrosion visible at one fixture valve",
      "Single valve location with no whole-house symptoms",
    ],
    whatToDo: [
      "Avoid forcing a stuck valve—note what happens when you try",
      "Photograph the valve and any active drip",
      "Identify which fixture the valve serves",
      "Request help with the valve location",
    ],
    routingNotes: [
      "Fixture shutoff valve repair routes to Ridge Line Plumbing.",
      "Whole-house main shutoff or multi-fixture issues may need different routing.",
    ],
    faqs: [
      {
        question: "Should I force a stuck shutoff valve?",
        answer:
          "Avoid forcing it—broken valves can leak worse. Note whether water still passes when the valve is closed and send a photo of the valve.",
      },
      {
        question: "Is a leaking angle stop an emergency?",
        answer:
          "Active spraying or flooding needs immediate attention. A slow weep at one fixture shutoff is usually repair-level work at that location.",
      },
      {
        question: "Does this cover the main house shutoff?",
        answer:
          "This page focuses on fixture shutoffs under sinks or behind toilets. Whole-house main valve issues may need different routing.",
      },
    ],
    relatedSlugs: [
      "leak-repair-berks-county-pa",
      "faucet-repair-berks-county-pa",
      "small-plumbing-repairs-berks-county-pa",
    ],
  },
  {
    slug: "water-damage-repair-after-leak-berks-county-pa",
    title: "Water Damage Repair After a Leak in Berks County, PA",
    metaDescription:
      "Water damage after a leak or backup in Berks County? Drywall, flooring, ceiling, and build-back repair help after the source is stopped.",
    headline: "Water damage after a leak or plumbing backup?",
    subheadline:
      "Once the source is stopped, drywall, flooring, ceiling, trim, and cabinet repair may be needed. Tell us what was damaged and we will connect you with local build-back help.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI water damage repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    heroImage: "/images/rhi-pros-logo.png",
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
          "Stop active leaks and backups first. Once the source is controlled, repair of damaged materials can be handled by an independent local provider we connect you with.",
      },
      {
        question: "What information helps with water damage routing?",
        answer:
          "Room location, materials affected (drywall, carpet, hardwood), photos, and whether sewage was involved help providers estimate next steps.",
      },
      {
        question: "Does Berks Property Response perform the repair work?",
        answer:
          "No. We connect you with independent local build-back help such as RHI Pros. Actual repair work is performed by the provider you choose.",
      },
    ],
    relatedSlugs: [
      "drywall-repair-after-plumbing-leak-berks-county-pa",
      "flooring-repair-after-water-damage-berks-county-pa",
      "ceiling-repair-from-plumbing-leak-berks-county-pa",
      "basement-repair-after-water-backup-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
  {
    slug: "drywall-repair-after-plumbing-leak-berks-county-pa",
    title: "Drywall Repair After Plumbing Leak | Berks County, PA",
    metaDescription:
      "Drywall repair after a plumbing leak in Berks County. Build-back help after the source is stopped — routes to RHI Pros.",
    headline: "Drywall damaged after a plumbing leak?",
    subheadline:
      "Once the leak is fixed, wet or stained drywall may need repair. Tell us what was affected and we will connect you with local build-back help.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI drywall repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    updatedAt: "2025-06-17",
    heroImage: "/images/rhi-pros-logo.png",
    intro:
      "Pipe leaks often leave cut-out drywall, stains, or soft spots after the plumber stops the source. That finish repair is separate from clearing the line.",
    symptoms: [
      "Cut-out or removed drywall after leak access",
      "Stains or bubbling paint on walls or ceilings",
      "Soft drywall near a former leak point",
    ],
    whatToDo: [
      "Confirm the leak source has been addressed",
      "Photograph affected walls and any removed sections",
      "Describe room location and approximate area damaged",
      "Request help for build-back routing",
    ],
    routingNotes: ["Drywall repair after plumbing events routes to RHI Pros."],
    faqs: [
      {
        question: "Should drywall be repaired before the leak is fully fixed?",
        answer:
          "Fix the active leak or backup first. Drywall repair and patching should wait until the source is controlled and affected areas can dry.",
      },
      {
        question: "Do I need to remove wet drywall myself?",
        answer:
          "Do not guess at removal scope. Photograph affected walls and describe how much area was wet or cut out for plumber access.",
      },
      {
        question: "Who performs the drywall repair?",
        answer:
          "Build-back repair routes to RHI Pros through Berks Property Response. We connect you with independent local help—we do not perform the work.",
      },
    ],
    relatedSlugs: [
      "water-damage-repair-after-leak-berks-county-pa",
      "ceiling-repair-from-plumbing-leak-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
  {
    slug: "flooring-repair-after-water-damage-berks-county-pa",
    title: "Flooring Repair After Water Damage | Berks County, PA",
    metaDescription:
      "Flooring repair after water damage in Berks County. Buckled boards, saturated carpet, or tile after a leak — build-back help via RHI Pros.",
    headline: "Flooring damaged after a leak or backup?",
    subheadline:
      "After water is removed and the source is fixed, flooring may need repair or replacement in affected areas.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI flooring repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    updatedAt: "2025-06-17",
    heroImage: "/images/rhi-pros-logo.png",
    intro:
      "Water from pipe leaks, appliance lines, or drain backups can buckle hardwood, swell laminate, or saturate carpet. Repair scope depends on how long materials stayed wet and how far water spread.",
    symptoms: [
      "Cupping or buckling hardwood or laminate",
      "Saturated carpet or pad after a leak",
      "Loose or cracked tile near a wet area",
      "Visible water line on basement or first-floor flooring",
    ],
    whatToDo: [
      "Confirm active leaking or backup has stopped",
      "Note flooring type and rooms affected",
      "Send photos showing damage extent",
      "Request help for repair routing",
    ],
    routingNotes: ["Flooring repair after water events routes to RHI Pros."],
    faqs: [
      {
        question: "Can buckled hardwood be repaired without full replacement?",
        answer:
          "It depends on how long materials stayed wet and how far water spread. Photos and flooring type help providers recommend repair vs replacement in affected areas.",
      },
      {
        question: "Should I pull up wet carpet myself?",
        answer:
          "Focus on stopping the water source first. Document wet areas with photos and note whether pad or subfloor may be affected.",
      },
      {
        question: "Does flooring repair include sewage backup damage?",
        answer:
          "Yes, after the backup is cleared and the line is addressed. Active sewer backups still route to emergency drain help first.",
      },
    ],
    relatedSlugs: [
      "water-damage-repair-after-leak-berks-county-pa",
      "basement-repair-after-water-backup-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
  {
    slug: "ceiling-repair-from-plumbing-leak-berks-county-pa",
    title: "Ceiling Repair From Plumbing Leak | Berks County, PA",
    metaDescription:
      "Ceiling stains, sag, or damage from an upstairs plumbing leak in Berks County. Build-back repair help after the source is stopped.",
    headline: "Ceiling damage from an upstairs plumbing leak?",
    subheadline:
      "Stains, sagging drywall, or paint failure on a ceiling often follow a pipe or fixture leak on the floor above.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI ceiling repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    updatedAt: "2025-06-17",
    heroImage: "/images/rhi-pros-logo.png",
    intro:
      "Ceiling damage from plumbing leaks should be assessed after the leak is fixed. Material may need drying, patching, or replacement depending on saturation and structure.",
    symptoms: [
      "Brown or yellow ceiling stains",
      "Sagging or soft ceiling drywall",
      "Paint bubbling or peeling below a bathroom or kitchen",
      "Water drip marks after an upstairs fixture leak",
    ],
    whatToDo: [
      "Confirm the upstairs leak has been repaired",
      "Avoid punching through a sagging ceiling until assessed",
      "Photograph stains and any active drips",
      "Request help describing which floor and room",
    ],
    routingNotes: ["Ceiling repair after plumbing leaks routes to RHI Pros."],
    faqs: [
      {
        question: "Is a ceiling stain always structural damage?",
        answer:
          "Not always, but sagging or soft drywall should be assessed before patching. Confirm the upstairs leak is fixed before scheduling build-back repair.",
      },
      {
        question: "Should I poke a hole in a sagging ceiling?",
        answer:
          "Avoid punching through until the area is assessed. Photograph stains, sag, and any active drips instead.",
      },
      {
        question: "What if the leak was in a bathroom above?",
        answer:
          "Upstairs bathroom and kitchen leaks are common ceiling damage sources. Describe which room is above the stained ceiling when you request help.",
      },
    ],
    relatedSlugs: [
      "water-damage-repair-after-leak-berks-county-pa",
      "drywall-repair-after-plumbing-leak-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
  {
    slug: "basement-repair-after-water-backup-berks-county-pa",
    title: "Basement Repair After Water Backup | Berks County, PA",
    metaDescription:
      "Basement drywall, flooring, and finish repair after a floor drain or sewer backup in Berks County. Build-back help via RHI Pros.",
    headline: "Basement damage after a floor drain or sewer backup?",
    subheadline:
      "After the backup is cleared and the line is addressed, finished basement materials may need repair.",
    provider: "rhi",
    serviceCategory: "water_damage",
    defaultRoute: "rhi",
    payoutCategory: "RHI basement repair lead",
    draftStatus: "published",
    needsConfirmation: false,
    noindex: false,
    updatedAt: "2025-06-17",
    heroImage: "/images/rhi-pros-logo.png",
    intro:
      "Sewer or floor drain backups can contaminate basement finishes. Emergency drain work comes first; drywall, flooring, and trim repair follow once the source is controlled.",
    symptoms: [
      "Wet carpet or laminate after a floor drain backup",
      "Damaged basement drywall or paneling",
      "Baseboard or trim swelling after water event",
      "Finished basement materials affected after sewer backup",
    ],
    whatToDo: [
      "Address active backup through emergency drain help first",
      "Document finished surfaces that were wet",
      "Note whether sewage was present",
      "Request build-back help after the line issue is handled",
    ],
    routingNotes: [
      "Active backups route to Apex Drain Services first.",
      "Basement finish repair after the event routes to RHI Pros.",
    ],
    faqs: [
      {
        question: "Should I start basement repair before the backup is cleared?",
        answer:
          "No. Active floor drain or sewer backups route to emergency drain help first. Finish repair follows once the source is controlled.",
      },
      {
        question: "Does sewage backup change repair scope?",
        answer:
          "Yes. Note whether sewage was present and which finished surfaces were affected. That helps providers plan remediation and rebuild scope.",
      },
      {
        question: "Who handles finished basement drywall and flooring?",
        answer:
          "Build-back repair after the event routes to RHI Pros. Berks Property Response connects you with independent local help.",
      },
    ],
    relatedSlugs: [
      "emergency-sewer-backup-berks-county-pa",
      "water-damage-repair-after-leak-berks-county-pa",
    ],
    rhiHandoff:
      "For full remodeling or general contractor work beyond plumbing-related repair, visit RHIpros.com.",
  },
];

export const evanConfirmedServices: Record<string, boolean> = {
  "leak repair": true,
  "faucet repair": true,
  "toilet repair": true,
  "running toilet": true,
  "garbage disposal": false,
  "shutoff valve": true,
  "water heater": true,
  "small plumbing repair": true,
  "fixture repair": true,
};

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(relatedSlugs: string[]): ServicePage[] {
  return relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServicePage => s !== undefined && !s.noindex);
}

export function getPublishedServices(): ServicePage[] {
  return services.filter((s) => s.draftStatus === "published" && !s.noindex);
}

export interface HomeFAQItem {
  question: string;
  answer: string;
}

export const homeFaqs: HomeFAQItem[] = [
  {
    question: "What happens after I submit a request?",
    answer:
      "A local coordinator reviews the details, determines the appropriate service category, and coordinates an introduction to a suitable local provider. The provider then discusses availability, pricing, and next steps with you.",
  },
  {
    question: "Is there a fee to request help?",
    answer:
      "No. There is no fee to call, text, or submit a request through Berks Property Response, and there is no obligation to hire a provider.",
  },
  {
    question: "Who performs the work?",
    answer:
      "Berks Property Response handles the initial intake and coordinates the connection. The local provider you choose supplies the estimate, performs the work, and contracts with you directly.",
  },
  {
    question: "Can I send photos?",
    answer:
      "Yes. You can text photos to the number shown on the site after submitting your request. Include your name or reference ID.",
  },
  {
    question: "Do you guarantee availability?",
    answer:
      "No. Availability depends on the location, type of problem, scheduling, and current provider workload. For active water or sewage problems, call instead of relying only on the online form.",
  },
  {
    question: "What should I do if sewage is backing up?",
    answer:
      "Stop using water when safe, keep people away from contaminated areas, and call Berks Property Response right away so we can coordinate drain and sewer help.",
  },
  {
    question: "What if I am not sure what kind of help I need?",
    answer:
      "Describe what you see in plain language and submit one request. We review the details and coordinate the appropriate local handoff — drain and sewer, plumbing, water-damage repair, or further review for major property issues.",
  },
];

export interface HomeFAQItem {
  question: string;
  answer: string;
}

export const homePageFaqs: HomeFAQItem[] = [
  {
    question: "What happens after I submit a request?",
    answer:
      "We review the details and help connect you with an appropriate independent local provider. That provider may contact you about availability, pricing, and next steps.",
  },
  {
    question: "Is there a fee or obligation?",
    answer:
      "No. There is no fee to call, text, or submit a request, and you are never required to hire anyone.",
  },
  {
    question: "Who performs the work?",
    answer:
      "Independent local providers supply estimates, schedule the work, and contract with you directly.",
  },
];

/** @deprecated Use homePageFaqs so visible homepage copy and schema stay aligned. */
export const homeFaqs = homePageFaqs;

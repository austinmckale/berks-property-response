import Link from "next/link";
import { TRUST_LINE } from "@/lib/disclosures";

const trustItems = [
  {
    question: "What happens after I submit the form?",
    answer:
      "Berks Property Response reviews your request and routes it to an independent local provider suited to the issue. That provider may contact you about availability, pricing, and next steps.",
  },
  {
    question: "Is Berks Property Response the contractor?",
    answer:
      "No. Berks Property Response is a local intake and matching service. Independent providers perform the work, set pricing, and handle scheduling, estimates, workmanship, and warranties.",
  },
  {
    question: "Is there any obligation?",
    answer:
      "No. Submitting a request does not require you to hire anyone. You can discuss the job with the provider and decide what makes sense.",
  },
  {
    question: "Does Berks Property Response charge the homeowner?",
    answer:
      "Berks Property Response does not charge homeowners a fee to submit a request. The provider you speak with handles their own pricing and estimates.",
  },
  {
    question: "How are jobs routed?",
    answer:
      "Based on what you describe, requests typically route to Apex Drain Services for drain and sewer issues, Ridge Line Plumbing for smaller fixture-level plumbing, RHI Pros for water damage and build-back repair, or manual review for major property issues where we check provider availability.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-stone-200 bg-stone-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-lg md:max-w-3xl">
        <p className="text-center text-sm font-medium text-stone-700 md:text-base">{TRUST_LINE}</p>
        <h2 className="mt-6 text-xl font-semibold text-stone-900 md:text-2xl">
          What to expect
        </h2>
        <dl className="mt-6 space-y-5">
          {trustItems.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-stone-900">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-stone-600 md:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-sm text-stone-600">
          <Link href="/how-it-works" className="font-medium text-stone-900 underline-offset-2 hover:underline">
            How it works
          </Link>
          {" · "}
          <Link href="/disclosure" className="font-medium text-stone-900 underline-offset-2 hover:underline">
            Full disclosure
          </Link>
        </p>
      </div>
    </section>
  );
}

import { MapPin, UserRoundCheck, Handshake } from "lucide-react";

const benefits = [
  {
    title: "Local knowledge",
    body: "Focused on Reading and communities throughout Berks County.",
    Icon: MapPin,
  },
  {
    title: "Personally reviewed",
    body: "Requests are reviewed by a local coordinator instead of automatically distributed to a large contractor list.",
    Icon: UserRoundCheck,
  },
  {
    title: "Better handoffs",
    body: "The provider receives the important details before contacting you, helping reduce delays and repeated explanations.",
    Icon: Handshake,
  },
] as const;

export function WhyBprSection() {
  return (
    <section className="section-pad border-b border-stone-200 bg-stone-50 px-4">
      <div className="page-container-wide md:max-w-4xl">
        <h2 className="font-display text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-left md:text-3xl">
          You should not have to call five companies to find the right one.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-stone-600 md:mx-0 md:text-left md:text-base">
          Different property problems require different types of service. Berks Property Response
          gives homeowners, landlords, and property managers one local place to start. We review the
          situation, identify the appropriate service category, and coordinate the introduction.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {benefits.map(({ title, body, Icon }) => (
            <li key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

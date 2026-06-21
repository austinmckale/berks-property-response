import Link from "next/link";
import {
  CloudLightning,
  Droplets,
  Home,
  Pipette,
  type LucideIcon,
} from "lucide-react";
import { triageCards } from "@/lib/problems";

const iconMap: Record<string, { Icon: LucideIcon; iconBg: string; iconColor: string; accent: string }> = {
  drain: {
    Icon: Pipette,
    iconBg: "bg-red-50",
    iconColor: "text-red-700",
    accent: "border-l-red-600 hover:border-l-red-700",
  },
  plumbing: {
    Icon: Droplets,
    iconBg: "bg-stone-100",
    iconColor: "text-stone-700",
    accent: "border-l-stone-600 hover:border-l-stone-800",
  },
  "water-damage": {
    Icon: Home,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-800",
    accent: "border-l-sky-700 hover:border-l-sky-900",
  },
  major: {
    Icon: CloudLightning,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-800",
    accent: "border-l-amber-600 hover:border-l-amber-700",
  },
};

export function TriageCards() {
  return (
    <section className="section-pad px-4">
      <div className="page-container-wide md:max-w-6xl">
        <p className="eyebrow">Start here</p>
        <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
          What&apos;s going on?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-stone-600 md:text-base">
          Pick the closest match — we&apos;ll pre-fill the request form below.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {triageCards.map((card) => {
            const style = iconMap[card.icon] ?? iconMap.plumbing;
            const { Icon } = style;
            return (
              <Link
                key={card.title}
                href={`/?problem=${card.problem}#get-help`}
                className={`card-touch card-elevated group block border-l-4 bg-white p-5 transition hover:shadow-md ${style.accent}`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${style.iconColor}`} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold leading-snug text-stone-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand group-hover:underline">
                  {card.cta}
                  <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

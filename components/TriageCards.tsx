"use client";

import {
  CloudLightning,
  Droplets,
  Home,
  Pipette,
  type LucideIcon,
} from "lucide-react";
import { triageCards } from "@/lib/problems";
import type { ProblemTypeId } from "@/lib/problemTypes";

const iconMap: Record<
  string,
  { Icon: LucideIcon; iconBg: string; iconColor: string; accent: string }
> = {
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

interface TriageCardsProps {
  /** When provided, cards select in-place instead of navigating */
  onSelect?: (problem: ProblemTypeId) => void;
  selected?: ProblemTypeId;
  /** Pass null to hide the section heading (parent already titled the intake) */
  heading?: "default" | null;
}

export function TriageCards({
  onSelect,
  selected,
  heading = "default",
}: TriageCardsProps = {}) {
  return (
    <div>
      {heading === "default" && (
        <>
          <p className="eyebrow">Start here</p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
            What&apos;s going on?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-stone-600 md:text-base">
            Pick the closest match — we&apos;ll open the request form next.
          </p>
        </>
      )}
      <div
        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 ${
          heading === "default" ? "mt-6" : ""
        }`}
        role={onSelect ? "listbox" : undefined}
        aria-label={onSelect ? "Problem category" : undefined}
      >
        {triageCards.map((card) => {
          const style = iconMap[card.icon] ?? iconMap.plumbing;
          const { Icon } = style;
          const isSelected = selected === card.problem;
          const className = `card-touch card-elevated group block w-full border-l-4 bg-white p-5 text-left transition hover:shadow-md ${style.accent} ${
            isSelected ? "ring-2 ring-stone-900 ring-offset-2" : ""
          }`;

          const content = (
            <>
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${style.iconColor}`} strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold leading-snug text-stone-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand group-hover:underline">
                {isSelected ? "Selected" : card.cta}
                <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </span>
            </>
          );

          if (onSelect) {
            return (
              <button
                key={card.title}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelect(card.problem)}
                className={className}
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={card.title}
              href={`/?problem=${card.problem}#get-help`}
              className={className}
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}

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
        </>
      )}
      <div
        className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4 ${
          heading === "default" ? "mt-6" : ""
        }`}
      >
        {triageCards.map((card) => {
          const style = iconMap[card.icon] ?? iconMap.plumbing;
          const { Icon } = style;
          const isSelected = selected === card.problem;
          const className = `card-touch card-elevated group flex min-h-12 w-full items-center gap-3 border-l-4 bg-white p-3 text-left transition hover:shadow-md sm:block sm:p-5 ${style.accent} ${
            isSelected ? "ring-2 ring-stone-900 ring-offset-2" : ""
          }`;

          const content = (
            <>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-11 sm:w-11 sm:rounded-xl ${style.iconBg}`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${style.iconColor}`} strokeWidth={2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 sm:block">
                <h3 className="font-semibold leading-snug text-stone-900 sm:mt-4">{card.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-stone-600 sm:mt-2 sm:leading-relaxed">{card.description}</p>
              </span>
              <span className="ml-auto text-lg font-semibold text-brand sm:ml-0 sm:mt-4 sm:inline-flex sm:text-sm sm:group-hover:underline">
                <span className="hidden sm:inline">{isSelected ? "Selected" : card.cta}</span>
                <span className="transition group-hover:translate-x-0.5 sm:ml-1" aria-hidden>
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
                aria-pressed={isSelected}
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

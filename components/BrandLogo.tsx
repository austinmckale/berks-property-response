import Link from "next/link";
import { BRAND_SHORT, BRAND_TAGLINE } from "@/lib/brand";
import { SITE_NAME } from "@/lib/siteConfig";

type BrandLogoVariant = "header" | "footer" | "compact" | "mark";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  linked?: boolean;
  className?: string;
}

export function BrandMark({
  className = "",
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="40" height="40" rx="10" fill="#1c1917" />
      <path
        d="M20 9L10 18v13h6v-7h8v7h6V18L20 9z"
        fill="#fafaf9"
      />
      <path
        d="M28 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"
        fill="#b45309"
      />
      <circle cx="28" cy="12" r="1.5" fill="#1c1917" />
    </svg>
  );
}

export function BrandLogo({
  variant = "header",
  linked = true,
  className = "",
}: BrandLogoProps) {
  const isFooter = variant === "footer";
  const isCompact = variant === "compact";
  const isMark = variant === "mark";

  const content = isMark ? (
    <BrandMark size={32} />
  ) : (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <BrandMark size={isCompact ? 32 : 40} className="shrink-0" />
      <span className="min-w-0 text-left leading-tight">
        {isCompact ? (
          <span className="block text-sm font-bold tracking-tight text-inherit">{BRAND_SHORT}</span>
        ) : (
          <>
            <span
              className={`block font-semibold tracking-tight ${
                isFooter ? "font-display text-lg text-white" : "text-sm text-stone-900 sm:text-base"
              }`}
            >
              {SITE_NAME}
            </span>
            <span
              className={`mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] ${
                isFooter ? "block" : "hidden min-[390px]:block"
              } ${
                isFooter ? "text-stone-500" : "text-brand"
              }`}
            >
              {BRAND_TAGLINE}
            </span>
          </>
        )}
      </span>
    </span>
  );

  if (!linked || isMark) {
    return content;
  }

  return (
    <Link href="/" className={`min-w-0 shrink ${className}`} aria-label={SITE_NAME}>
      {content}
    </Link>
  );
}

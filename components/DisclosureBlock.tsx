import Link from "next/link";
import { REFERRAL_DISCLOSURE_FULL, REFERRAL_DISCLOSURE_INLINE } from "@/lib/disclosures";

interface DisclosureBlockProps {
  variant?: "full" | "inline";
  className?: string;
}

export function DisclosureBlock({ variant = "full", className = "" }: DisclosureBlockProps) {
  const text = variant === "full" ? REFERRAL_DISCLOSURE_FULL : REFERRAL_DISCLOSURE_INLINE;

  return (
    <p
      className={`text-sm leading-relaxed text-slate-600 ${className}`}
      role="note"
      aria-label="Referral disclosure"
    >
      {text}{" "}
      {variant === "full" && (
        <Link href="/disclosure" className="font-medium text-blue-700 hover:underline">
          Full disclosure
        </Link>
      )}
    </p>
  );
}

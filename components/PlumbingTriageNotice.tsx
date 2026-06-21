import Link from "next/link";

const REDIRECTS = [
  {
    sign: "Multiple drains backing up",
    label: "Emergency drain help",
    href: "/emergency",
  },
  {
    sign: "Sewage or basement floor drain overflow",
    label: "Emergency drain help",
    href: "/emergency",
  },
  {
    sign: "Drywall, flooring, or ceiling damage after the leak stopped",
    label: "Repair after a leak",
    href: "/after-leak",
  },
];

export function PlumbingTriageNotice() {
  return (
    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-stone-800">
      <p className="font-semibold text-stone-900">Not a single-fixture leak?</p>
      <ul className="mt-2 space-y-1.5">
        {REDIRECTS.map((item) => (
          <li key={item.sign}>
            {item.sign} →{" "}
            <Link href={item.href} className="font-medium underline-offset-2 hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

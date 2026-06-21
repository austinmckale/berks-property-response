import Link from "next/link";

const NOT_EVAN_ROUTES = [
  {
    sign: "Multiple drains are backing up at once",
    provider: "Apex Drain Services",
    href: "/emergency",
  },
  {
    sign: "The toilet bubbles when the shower, tub, or sink runs",
    provider: "Apex Drain Services",
    href: "/emergency",
  },
  {
    sign: "Sewage is present or a basement floor drain is backing up",
    provider: "Apex Drain Services",
    href: "/emergency",
  },
  {
    sign: "Drywall, flooring, ceiling, or other water damage repair is needed after the plumbing issue is stopped",
    provider: "RHI Pros",
    href: "/after-leak",
  },
];

export function PlumbingTriageNotice() {
  return (
    <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-800">
      <p className="font-semibold text-stone-900">Not a small fixture repair?</p>
      <p className="mt-1 text-stone-700">
        Ridge Line Plumbing handles isolated, smaller residential plumbing service calls. These situations
        route elsewhere:
      </p>
      <ul className="mt-3 space-y-2">
        {NOT_EVAN_ROUTES.map((item) => (
          <li key={item.sign} className="text-stone-700">
            <span className="font-medium text-stone-900">{item.sign}</span>
            {" → "}
            <Link href={item.href} className="font-medium underline-offset-2 hover:underline">
              {item.provider}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

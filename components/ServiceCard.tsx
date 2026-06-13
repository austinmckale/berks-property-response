import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md"
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <span className="mt-3 inline-block text-sm font-medium text-blue-700">
        Learn more
      </span>
    </Link>
  );
}

import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="hidden px-4 py-3 text-sm text-stone-500 sm:block">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="font-medium text-stone-900">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-stone-900">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

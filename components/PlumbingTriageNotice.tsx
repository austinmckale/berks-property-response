import Link from "next/link";

export function PlumbingTriageNotice() {
  return (
    <aside className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3">
      <p className="text-sm font-semibold text-stone-900">Different problem?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Link
          href="/emergency"
          className="flex min-h-11 items-center rounded-lg border border-amber-300 bg-white px-3 text-sm font-semibold text-stone-900"
        >
          Several drains or sewage
        </Link>
        <Link
          href="/after-leak"
          className="flex min-h-11 items-center rounded-lg border border-amber-300 bg-white px-3 text-sm font-semibold text-stone-900"
        >
          Repair damage after a leak
        </Link>
      </div>
    </aside>
  );
}

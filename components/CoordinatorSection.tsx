/**
 * Personal coordinator section.
 * Slot for a future coordinator photo + name — leave empty until a real asset exists.
 */
export function CoordinatorSection({
  name,
  photoSrc,
}: {
  name?: string;
  photoSrc?: string;
} = {}) {
  return (
    <section className="section-pad-sm border-b border-stone-200 bg-white px-4">
      <div className="page-container flex flex-col items-center gap-6 md:max-w-3xl md:flex-row md:items-start md:gap-8">
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-stone-100 text-stone-400"
          aria-hidden={!photoSrc}
        >
          {photoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- optional future asset path
            <img src={photoSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-3xl font-semibold text-stone-300">BPR</span>
          )}
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900">
            A local person reviews your request
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
            Berks Property Response was created to give Berks County residents one place to start
            when they are unsure whether they need a drain specialist, plumber, or repair contractor.
            Calls and requests are personally reviewed before the provider handoff.
          </p>
          {name ? (
            <p className="mt-3 text-sm font-medium text-stone-800">{name}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

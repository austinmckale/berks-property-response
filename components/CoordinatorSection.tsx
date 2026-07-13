/**
 * Personal coordinator section.
 * Only shows a photo when a real asset is provided — never a fake avatar placeholder.
 */
export function CoordinatorSection({
  name,
  photoSrc,
}: {
  name?: string;
  photoSrc?: string;
} = {}) {
  const hasIdentity = Boolean(name || photoSrc);

  return (
    <section className="section-pad-sm border-b border-stone-200 bg-white px-4">
      <div
        className={`page-container md:max-w-3xl ${
          hasIdentity ? "flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8" : ""
        }`}
      >
        {photoSrc ? (
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element -- optional future asset path */}
            <img
              src={photoSrc}
              alt={name ? `${name}, Berks Property Response` : ""}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className={hasIdentity ? "text-center md:text-left" : "text-center md:text-left"}>
          <p className="eyebrow">Local coordination</p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-stone-900">
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

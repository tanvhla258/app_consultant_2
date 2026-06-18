// components/about/AboutHeadline.tsx
export function AboutHeadline() {
  return (
    <div className="mb-14 lg:mb-20">
      <div className="mb-4 h-px w-12 bg-secondary-400" aria-hidden="true" />
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
        About Us
      </div>
      <h2
        id="about-heading"
        className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-primary-700 lg:text-5xl"
      >
        A <span className="text-secondary-500">Trusted</span> Accounting Partner
        for Businesses in Vietnam
      </h2>
    </div>
  );
}

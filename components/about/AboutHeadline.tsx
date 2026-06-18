"use client";

import { useLang } from "@/lib/i18n/useLang";

export function AboutHeadline() {
  const { t } = useLang();
  const heading = t("about.heading");
  const [before, after] = heading.split("Trusted");
  const hasTrustedSplit = after !== undefined;

  return (
    <div className="mb-14 lg:mb-20">
      <div className="mb-4 h-px w-12 bg-secondary-400" aria-hidden="true" />
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
        {t("about.eyebrow")}
      </div>
      <h2
        id="about-heading"
        className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-primary-700 lg:text-5xl"
      >
        {hasTrustedSplit ? (
          <>
            {before}
            <span className="text-secondary-500">Trusted</span>
            {after}
          </>
        ) : (
          heading
        )}
      </h2>
    </div>
  );
}

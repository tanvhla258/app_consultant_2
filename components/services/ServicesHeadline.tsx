// components/services/ServicesHeadline.tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";

export function ServicesHeadline() {
  const { t } = useLang();
  const heading = t("services.heading");
  const accent = t("services.heading_accent");
  const [before, after] = heading.split(accent);
  const hasSplit = after !== undefined && after.length > 0;

  return (
    <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-4 h-px w-12 bg-secondary-400" aria-hidden="true" />
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
          {t("services.eyebrow")}
        </div>
        <h2
          id="services-heading"
          className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-primary-700 lg:text-5xl"
        >
          {hasSplit ? (
            <>
              {before}
              <span className="text-secondary-500">{accent}</span>
              {after}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      <button
        type="button"
        // TODO: link to /services when the page exists
        className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-primary-700 px-6 text-sm font-medium text-white transition hover:bg-primary-800 lg:self-end"
      >
        {t("services.cta_all")}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

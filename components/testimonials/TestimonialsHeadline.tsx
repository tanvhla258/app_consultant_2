"use client";

import { useLang } from "@/lib/i18n/useLang";

export function TestimonialsHeadline() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2
        id="testimonials-heading"
        className="text-3xl font-semibold leading-tight text-primary-700 md:text-4xl lg:text-5xl"
      >
        {t("testimonials.heading")}
        <br />
        <span className="text-secondary-400">
          {t("testimonials.heading_accent")}
        </span>
      </h2>
    </div>
  );
}

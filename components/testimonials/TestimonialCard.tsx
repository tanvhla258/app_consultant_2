"use client";

import { Quote } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";
import type { Testimonial } from "./data/testimonials";

type Props = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: Props) {
  const { t } = useLang();

  return (
    <article
      className="flex h-full flex-col gap-5 rounded-3xl border border-primary-100 bg-surface p-6 lg:p-7 shadow-[0_8px_30px_rgba(11,37,69,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(11,37,69,0.10)]"
      aria-label={testimonial.alt}
    >
      <Quote className="h-7 w-7 text-secondary-400" aria-hidden="true" />

      <p className="text-sm leading-relaxed text-primary-700/80">
        &ldquo;{t(testimonial.quoteKey)}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${testimonial.accent}`}
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary-700">
            {testimonial.name}
          </span>
          <span className="text-xs text-primary-700/60">
            {t(testimonial.roleKey)} · {testimonial.company}
          </span>
        </div>
      </div>
    </article>
  );
}

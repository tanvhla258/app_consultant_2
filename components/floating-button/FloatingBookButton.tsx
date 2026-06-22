"use client";

import { Calendar } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";

export function FloatingBookButton() {
  const { t } = useLang();

  function handleClick() {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={t("floating.cta")}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-secondary-400 px-5 py-3 text-sm font-semibold text-primary-900 shadow-lg transition-colors hover:bg-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
    >
      <Calendar size={16} strokeWidth={2.25} />
      <span>{t("floating.cta")}</span>
    </button>
  );
}

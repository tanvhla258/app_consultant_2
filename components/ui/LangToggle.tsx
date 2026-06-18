"use client";

import { useLang } from "@/lib/i18n/useLang";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="relative flex h-8 items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-xs font-semibold"
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 h-7 w-9 rounded-full bg-secondary-400 transition-transform duration-200 ${
          lang === "vi" ? "translate-x-9" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`relative z-10 w-9 rounded-full py-1 text-center transition-colors duration-200 ${
          lang === "en" ? "text-primary-900" : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        className={`relative z-10 w-9 rounded-full py-1 text-center transition-colors duration-200 ${
          lang === "vi" ? "text-primary-900" : "text-white/70 hover:text-white"
        }`}
      >
        VI
      </button>
    </div>
  );
}

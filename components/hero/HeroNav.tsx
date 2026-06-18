"use client";

import { useEffect, useState } from "react";
import { BarChart3, Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { LangToggle } from "@/components/ui/LangToggle";
import { useLang } from "@/lib/i18n/useLang";

const NAV_KEYS = [
  { href: "#home",     key: "nav.home",     active: true  },
  { href: "#about",    key: "nav.about",    active: false },
  { href: "#services", key: "nav.services", active: false },
  { href: "#partners", key: "nav.partners", active: false },
  { href: "#contact",  key: "nav.contact",  active: false },
];

export function HeroNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="absolute inset-x-0 top-6 z-20 mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
    <nav
      aria-label="Primary"
      className="flex items-center justify-between gap-8 rounded-full border border-primary-400/20 bg-primary-700/60 px-6 py-3 backdrop-blur-md"
    >
      <a href="#home" className="flex items-center gap-2 text-white">
        <BarChart3 size={20} className="text-secondary-400" />
        <span className="text-sm font-semibold tracking-wide">APP CONSULTANCY</span>
      </a>

      <ul className="hidden items-center gap-7 md:flex">
        {NAV_KEYS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              {l.active && <span className="text-secondary-400">•</span>}
              {t(l.key)}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden items-center gap-3 md:flex">
        <LangToggle />
        <PillButton href="#contact" variant="white">
          {t("nav.cta")}
        </PillButton>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-900 md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-x-0 top-full mt-3 rounded-2xl border border-primary-400/20 bg-primary-700/95 p-5 backdrop-blur md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {NAV_KEYS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-white/90 hover:text-white"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <LangToggle />
            <PillButton href="#contact" variant="white" className="w-full justify-center">
              {t("nav.cta")}
            </PillButton>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
}

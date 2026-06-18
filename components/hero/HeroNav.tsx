"use client";

import { useEffect, useState } from "react";
import { BarChart3, Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

const links = [
  { href: "#home",     label: "Home",     active: true  },
  { href: "#about",    label: "About",    active: false },
  { href: "#services", label: "Services", active: false },
  { href: "#partners", label: "Partners", active: false },
  { href: "#contact",  label: "Contact",  active: false },
];

export function HeroNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 top-6 z-20 mx-auto flex max-w-[1100px] items-center justify-between gap-8 rounded-full border border-primary-400/20 bg-primary-700/60 px-6 py-3 backdrop-blur-md"
    >
      <a href="#home" className="flex items-center gap-2 text-white">
        <BarChart3 size={20} className="text-secondary-400" />
        <span className="text-sm font-semibold tracking-wide">APP CONSULTANCY</span>
      </a>

      <ul className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              {l.active && <span className="text-secondary-400">•</span>}
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <PillButton href="#contact" variant="white">
          Book Consultation
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
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-white/90 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <PillButton href="#contact" variant="white" className="w-full justify-center">
              Book Consultation
            </PillButton>
          </div>
        </div>
      )}
    </nav>
  );
}
# EN/VI Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a client-side EN/VI language toggle to the APP Consultancy marketing site, persisted in `localStorage`, with a sliding gold pill in the nav bar.

**Architecture:** A React Context provider (`LanguageProvider`) wraps the app in `layout.tsx` and stores the active language. A `useLang()` hook exposes `{ lang, setLang, t }` to any client component. Components replace hardcoded strings with `t("section.key")` calls against flat JSON translation files.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4. No test runner — verification is manual (dev server + browser toggle).

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `lib/i18n/en.json` | All English strings keyed by section |
| Create | `lib/i18n/vi.json` | Matching Vietnamese strings (same key set) |
| Create | `lib/i18n/LanguageProvider.tsx` | Context provider — reads/writes `localStorage`, sets `document.documentElement.lang` |
| Create | `lib/i18n/useLang.ts` | Hook returning `{ lang, setLang, t }` |
| Create | `components/ui/LangToggle.tsx` | Sliding gold pill toggle (EN / VI) |
| Modify | `app/layout.tsx` | Wrap `{children}` with `<LanguageProvider>`, remove static `lang="en"` |
| Modify | `components/hero/HeroNav.tsx` | Add `<LangToggle />`, translate nav labels and CTA |
| Modify | `components/hero/HeroCopy.tsx` | Convert to client component, translate all copy |
| Modify | `components/about/AboutHeadline.tsx` | Convert to client component, translate eyebrow + heading |
| Modify | `components/about/AboutCopy.tsx` | Convert to client component, translate body + stat strings |
| Modify | `components/about/ValueCallout.tsx` | Convert to client component, translate heading + body |
| Modify | `components/about/PartnerTriptych.tsx` | Convert to client component, translate sr-only caption |

---

### Task 1: Create translation JSON files

**Files:**
- Create: `lib/i18n/en.json`
- Create: `lib/i18n/vi.json`

- [ ] **Step 1: Create `lib/i18n/en.json`**

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.partners": "Partners",
  "nav.contact": "Contact",
  "nav.cta": "Book Consultation",

  "hero.heading": "Your Vision, Our Mission —\nAccounting & Advisory You Can Trust",
  "hero.subheading": "APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on 20+ years of Big4 expertise — tailored for businesses operating in Vietnam.",
  "hero.cta": "Get a Free Consultation",
  "hero.partner_name": "Michael Pham — Partner (ACCA, VACPA)",
  "hero.quote": "We help businesses navigate VAS, IFRS, tax compliance, and growth — all in one trusted partner.",

  "about.eyebrow": "About Us",
  "about.heading": "A Trusted Accounting Partner for Businesses in Vietnam",
  "about.body": "We’re a dedicated accounting and advisory firm built by leaders from international audit and Big4 backgrounds. We help businesses in Vietnam stay compliant, reduce risk, and manage their finances with clarity — from multinationals to growing SMEs.",
  "about.stat_label": "Big4-Trained Partners",
  "about.stat_sublabel": "KPMG · BDO · Mazars · PKF",
  "about.value_heading": "Your Vision,\nOur Mission",
  "about.value_body": "We turn your business goals into a clear financial roadmap — audit, tax, IFRS, and advisory built on Big4 expertise.",
  "about.partners_sr": "APP Consultancy partners"
}
```

- [ ] **Step 2: Create `lib/i18n/vi.json`**

```json
{
  "nav.home": "Trang chủ",
  "nav.about": "Giới thiệu",
  "nav.services": "Dịch vụ",
  "nav.partners": "Đối tác",
  "nav.contact": "Liên hệ",
  "nav.cta": "Đặt lịch tư vấn",

  "hero.heading": "Tầm nhìn của bạn, Sứ mệnh của chúng tôi —\nKế toán & Tư vấn đáng tin cậy",
  "hero.subheading": "APP Consultancy cung cấp dịch vụ kiểm toán, thuế, IFRS và tư vấn M&A dựa trên hơn 20 năm kinh nghiệm Big4 — được thiết kế riêng cho doanh nghiệp tại Việt Nam.",
  "hero.cta": "Tư vấn miễn phí",
  "hero.partner_name": "Michael Phạm — Đối tác (ACCA, VACPA)",
  "hero.quote": "Chúng tôi giúp doanh nghiệp điều hướng VAS, IFRS, tuân thủ thuế và tăng trưởng — tất cả trong một đối tác đáng tin cậy.",

  "about.eyebrow": "Về chúng tôi",
  "about.heading": "Đối tác kế toán đáng tin cậy cho doanh nghiệp tại Việt Nam",
  "about.body": "Chúng tôi là công ty kế toán và tư vấn chuyên nghiệp được thành lập bởi các lãnh đạo từ nền tảng kiểm toán quốc tế và Big4. Chúng tôi giúp doanh nghiệp tại Việt Nam tuân thủ pháp luật, giảm thiểu rủi ro và quản lý tài chính minh bạch — từ các tập đoàn đa quốc gia đến SME đang phát triển.",
  "about.stat_label": "Đối tác đào tạo Big4",
  "about.stat_sublabel": "KPMG · BDO · Mazars · PKF",
  "about.value_heading": "Tầm nhìn của bạn,\nSứ mệnh của chúng tôi",
  "about.value_body": "Chúng tôi biến mục tiêu kinh doanh của bạn thành lộ trình tài chính rõ ràng — kiểm toán, thuế, IFRS và tư vấn dựa trên chuyên môn Big4.",
  "about.partners_sr": "Đối tác APP Consultancy"
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/en.json lib/i18n/vi.json
git commit -m "feat(i18n): add EN and VI translation JSON files"
```

---

### Task 2: Create LanguageContext and LanguageProvider

**Files:**
- Create: `lib/i18n/LanguageProvider.tsx`

- [ ] **Step 1: Create `lib/i18n/LanguageProvider.tsx`**

```tsx
"use client";

import { createContext, useEffect, useState } from "react";

export type Lang = "en" | "vi";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "vi" || stored === "en") setLangState(stored);
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/i18n/LanguageProvider.tsx
git commit -m "feat(i18n): add LanguageProvider context"
```

---

### Task 3: Create useLang hook

**Files:**
- Create: `lib/i18n/useLang.ts`

- [ ] **Step 1: Create `lib/i18n/useLang.ts`**

```ts
"use client";

import { useContext } from "react";
import { LanguageContext, type Lang } from "./LanguageProvider";
import en from "./en.json";
import vi from "./vi.json";

const dictionaries: Record<Lang, Record<string, string>> = { en, vi };

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);

  function t(key: string): string {
    return dictionaries[lang][key] ?? dictionaries["en"][key] ?? key;
  }

  return { lang, setLang, t };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/i18n/useLang.ts
git commit -m "feat(i18n): add useLang hook with t() lookup and EN fallback"
```

---

### Task 4: Wire LanguageProvider into app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

The current `layout.tsx` has `<html lang="en" ...>`. The `LanguageProvider` will update `document.documentElement.lang` dynamically, so remove the static attribute. Wrap `{children}` with `<LanguageProvider>`.

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file content with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APP Consultancy — Accounting, Tax & Advisory in Vietnam",
  description:
    "APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on 20+ years of Big4 expertise — tailored for businesses operating in Vietnam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

Note: We keep `lang="en"` as the SSR default on `<html>`. The `LanguageProvider` overrides it on the client via `document.documentElement.lang` after hydration.

- [ ] **Step 2: Verify build compiles**

```bash
npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(i18n): wrap layout with LanguageProvider"
```

---

### Task 5: Create LangToggle component

**Files:**
- Create: `components/ui/LangToggle.tsx`

The toggle is a pill with two segments: "EN" and "VI". The active segment gets a gold background (`bg-secondary-400`) that slides between them via a conditional `translate-x`. It lives in the nav bar between the links and the CTA, and inside the mobile drawer below the nav links.

- [ ] **Step 1: Create `components/ui/LangToggle.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/LangToggle.tsx
git commit -m "feat(i18n): add LangToggle sliding gold pill component"
```

---

### Task 6: Wire LangToggle into HeroNav + translate nav strings

**Files:**
- Modify: `components/hero/HeroNav.tsx`

Current `HeroNav.tsx` has hardcoded link labels and a hardcoded "Book Consultation" CTA. We need to:
1. Import `LangToggle` and `useLang`
2. Replace hardcoded `label` values in the `links` array with `t()` calls
3. Replace hardcoded CTA text with `t("nav.cta")`
4. Place `<LangToggle />` between the `<ul>` and the CTA `<div>` on desktop
5. Place `<LangToggle />` inside the mobile drawer below the nav links, above the CTA

- [ ] **Step 1: Replace `components/hero/HeroNav.tsx`**

```tsx
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
```

- [ ] **Step 2: Start the dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000. Confirm:
- Gold pill toggle appears in nav between links and "Book Consultation"
- Clicking "VI" slides the gold highlight to the VI segment
- Nav link labels and CTA text switch between EN and VI
- Mobile: open the drawer and confirm LangToggle appears below nav links

- [ ] **Step 3: Commit**

```bash
git add components/hero/HeroNav.tsx
git commit -m "feat(i18n): wire LangToggle into HeroNav, translate nav strings"
```

---

### Task 7: Convert HeroCopy to client component + translate hero strings

**Files:**
- Modify: `components/hero/HeroCopy.tsx`

Currently a server component with all hardcoded strings. Add `"use client"` and use `useLang()`.

The heading has a `<br />` mid-sentence. The `en.json` / `vi.json` `hero.heading` key stores the full string; we render the newline as `<br />` by splitting on `\n`.

- [ ] **Step 1: Replace `components/hero/HeroCopy.tsx`**

```tsx
"use client";

import { PillButton } from "@/components/ui/PillButton";
import { useLang } from "@/lib/i18n/useLang";

export function HeroCopy() {
  const { t } = useLang();
  const headingParts = t("hero.heading").split("\n");

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-semibold leading-none tracking-tight text-white lg:text-5xl">
        {headingParts[0]}
        {headingParts[1] && <><br />{headingParts[1]}</>}
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-white/70">
        {t("hero.subheading")}
      </p>

      <div className="mt-8">
        <PillButton href="#contact" variant="white">
          {t("hero.cta")}
        </PillButton>
      </div>

      <div className="mt-16 h-px w-24 bg-secondary-400/30" />

      <p className="mt-6 font-medium text-white">
        {t("hero.partner_name")}
      </p>
      <p className="mt-2 max-w-md text-sm italic text-white/60">
        &ldquo;{t("hero.quote")}&rdquo;
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

With the dev server running, toggle to VI and confirm the hero heading, subheading, CTA button, partner name, and quote all update. Toggle back to EN and confirm they revert.

- [ ] **Step 3: Commit**

```bash
git add components/hero/HeroCopy.tsx
git commit -m "feat(i18n): translate HeroCopy hero strings"
```

---

### Task 8: Convert About components to client + translate about strings

**Files:**
- Modify: `components/about/AboutHeadline.tsx`
- Modify: `components/about/AboutCopy.tsx`
- Modify: `components/about/ValueCallout.tsx`
- Modify: `components/about/PartnerTriptych.tsx`

All four are currently server components with hardcoded strings.

- [ ] **Step 1: Replace `components/about/AboutHeadline.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";

export function AboutHeadline() {
  const { t } = useLang();

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
        {t("about.heading")}
      </h2>
    </div>
  );
}
```

Note: The EN heading has `<span className="text-secondary-500">Trusted</span>` for the gold highlight. Since `t()` returns a plain string we lose that inline span. To keep the gold highlight, hardcode the word boundary: the EN heading is "A **Trusted** Accounting Partner for Businesses in Vietnam" — split on "Trusted" to wrap it. But this only works for EN; VI has "đáng tin cậy" mid-sentence. The spec does not mention this decorative highlight as a requirement, so it is acceptable to render the heading as plain text. If you want to restore the gold highlight for EN, add a component-level check:

```tsx
// inside AboutHeadline, after const { t } = useLang():
const heading = t("about.heading");
const [before, after] = heading.split("Trusted");
const hasTrustedSplit = after !== undefined;
```

Then render:
```tsx
<h2 ...>
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
```

Use this version for the final implementation.

- [ ] **Step 2: Replace `components/about/AboutCopy.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";
import { StatBlock } from "./StatBlock";

export function AboutCopy() {
  const { t } = useLang();

  return (
    <div className="flex w-full flex-col">
      <p className="max-w-sm text-base leading-relaxed text-primary-700/80">
        {t("about.body")}
      </p>
      <div className="mt-8">
        <StatBlock
          value="20+"
          label={t("about.stat_label")}
          sublabel={t("about.stat_sublabel")}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Replace `components/about/ValueCallout.tsx`**

The value heading uses `<br />` mid-string. Same `\n` split pattern as HeroCopy.

```tsx
"use client";

import { Compass } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";

export function ValueCallout() {
  const { t } = useLang();
  const headingParts = t("about.value_heading").split("\n");

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-secondary-400">
        <Compass size={22} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-tight tracking-tight text-primary-700 lg:text-2xl">
        {headingParts[0]}
        {headingParts[1] && <><br />{headingParts[1]}</>}
      </h3>
      <p className="text-sm leading-relaxed text-primary-700/70">
        {t("about.value_body")}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Replace `components/about/PartnerTriptych.tsx`**

```tsx
"use client";

import { PartnerCard } from "./PartnerCard";
import { PARTNERS } from "./data/partners";
import { useLang } from "@/lib/i18n/useLang";

export function PartnerTriptych() {
  const { t } = useLang();

  return (
    <figure className="relative flex w-full flex-col rounded-3xl border border-primary-100 bg-white p-5 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-6">
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -left-2 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <figcaption className="sr-only">{t("about.partners_sr")}</figcaption>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-3 lg:gap-4">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.name} {...p} />
        ))}
      </div>
    </figure>
  );
}
```

- [ ] **Step 5: Run lint to catch type errors**

```bash
npm run lint 2>&1 | tail -30
```

Expected: no errors. If lint errors appear, fix them before committing.

- [ ] **Step 6: Verify in browser**

With the dev server running, toggle to VI. Confirm:
- About section eyebrow ("About Us" → "Về chúng tôi")
- About heading
- About body paragraph
- StatBlock label and sublabel
- ValueCallout heading and body
- PartnerTriptych sr-only caption (inspect DOM)

Toggle back to EN and confirm all revert. Refresh the page while on VI and confirm the preference persists (localStorage).

- [ ] **Step 7: Commit**

```bash
git add components/about/AboutHeadline.tsx components/about/AboutCopy.tsx components/about/ValueCallout.tsx components/about/PartnerTriptych.tsx
git commit -m "feat(i18n): translate About section components"
```

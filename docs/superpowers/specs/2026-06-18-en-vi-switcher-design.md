# EN/VI Language Switcher — Design Spec

**Date:** 2026-06-18
**Status:** Approved

---

## Overview

Add a client-side English / Vietnamese language switcher to the APP Consultancy marketing site. The selected language persists in `localStorage` and re-renders all translatable copy without a page reload. The toggle is a sliding gold pill in the nav bar.

---

## Scope

- All site sections (Hero, About, Services, Partners, Contact, nav links, CTAs)
- Translation strings for sections not yet built are pre-structured in the JSON files and wired up as each section is implemented
- Out of scope: SEO/meta tag translation, RTL layout, URL-based locale routing

---

## File Structure

```
lib/
  i18n/
    en.json                  ← all English strings, keyed by section
    vi.json                  ← matching Vietnamese strings
    LanguageProvider.tsx     ← context provider; reads/writes localStorage
    useLang.ts               ← hook: returns { lang, setLang, t }

components/
  ui/
    LangToggle.tsx           ← sliding gold pill toggle (EN / VI)
```

---

## Translation JSON Shape

Flat keys namespaced by section. Both `en.json` and `vi.json` share identical key sets.

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.partners": "Partners",
  "nav.contact": "Contact",
  "nav.cta": "Book Consultation",

  "hero.heading": "Your Vision, Our Mission — Accounting & Advisory You Can Trust",
  "hero.subheading": "APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on 20+ years of Big4 expertise — tailored for businesses operating in Vietnam.",
  "hero.cta": "Get a Free Consultation",
  "hero.partner_name": "Michael Pham — Partner (ACCA, VACPA)",
  "hero.quote": "We help businesses navigate VAS, IFRS, tax compliance, and growth — all in one trusted partner."
}
```

Keys for future sections (about, services, etc.) are added to both JSON files when those sections are built.

---

## Architecture

### LanguageProvider (`lib/i18n/LanguageProvider.tsx`)

- `"use client"` component that wraps `app/layout.tsx` children
- Initializes `lang` state from `localStorage.getItem("lang")`, falling back to `"en"`
- On `lang` change: calls `localStorage.setItem("lang", lang)` and sets `document.documentElement.lang`
- Exposes `{ lang, setLang }` via React Context

### useLang hook (`lib/i18n/useLang.ts`)

- Calls `useContext(LanguageContext)` and returns `{ lang, setLang, t }`
- `t(key: string): string` — looks up `key` in the active language's JSON; falls back to the EN value if the VI key is missing, preventing blank text

### LangToggle (`components/ui/LangToggle.tsx`)

- `"use client"` component
- Calls `useLang()` to read `lang` and call `setLang`
- Renders a two-segment pill: active language shows a gold (`bg-secondary-400`) highlight that slides between EN and VI
- Placed in `HeroNav` between the nav link list and the "Book Consultation" CTA
- On mobile: rendered inside the drawer menu below the nav links

### Component consumption pattern

Any component that renders translatable copy:
1. Is marked `"use client"` (if not already)
2. Calls `const { t } = useLang()`
3. Replaces hardcoded strings with `t("section.key")`

---

## Data Flow

```
Page load
  └── LanguageProvider reads localStorage → sets lang ("en" default)
        └── all subscribed components render with active lang's strings

User clicks LangToggle
  └── setLang("vi")
        ├── Context re-renders → all components re-render with VI strings
        ├── localStorage.setItem("lang", "vi")
        └── document.documentElement.lang = "vi"
```

---

## Edge Cases

| Scenario | Behaviour |
|---|---|
| Missing VI translation key | `t()` falls back to EN string — no blank text |
| First render before localStorage read | Defaults to `"en"` — no flash of wrong language |
| `LanguageProvider` as client wrapper in server layout | Accepts `children` as prop — standard Next.js App Router pattern |
| Mobile nav drawer | `LangToggle` rendered inside drawer below nav links |

---

## Integration Points

- `app/layout.tsx` — wrap `{children}` with `<LanguageProvider>`; remove static `lang="en"` from `<html>` (provider sets it dynamically)
- `components/hero/HeroNav.tsx` — add `<LangToggle />` between links list and CTA button
- `components/hero/HeroCopy.tsx` — convert to client component, replace hardcoded strings with `t()` calls
- Future sections — same pattern: add keys to JSON files, call `t()` in components

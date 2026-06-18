# Core Services Section — Design Spec

**Date:** 2026-06-18
**Section:** 04 — Core Services
**Visual reference:** `public/images/sections/04-core-services.webp`
**Content source:** `docs/requirement.md` (sections "Our Services")

---

## 1. Goal

Replace the static reference image with a working "Core Services" section that lists all seven service categories from `docs/requirement.md` in a single-open accordion, with a static photo on the right.

Section is built English-only with copy structured so that an in-progress EN/VI translation effort can drop in later by editing one data file.

## 2. Scope

In scope:
- New section component tree under `components/services/`.
- Service data file with all seven categories from `requirement.md` verbatim bullets + hand-written one-line descriptions.
- Mount the section under the existing `AboutSection` on the landing page (`app/page.tsx`).
- Section follows the layout container convention from `CLAUDE.md`.

Out of scope (explicit non-goals):
- Dedicated `/services` route or per-service detail pages — CTAs are placeholder buttons.
- EN/VI translation wiring — strings are inline English; only the data file is structured to make extraction easy later.
- Per-item photo swapping. One static image for the whole section.
- Animation library. Height transitions use plain CSS.

## 3. Content (final)

### Headline
"Core Services To Simplify Your Finances" — "Simplify Your Finances" rendered as the gold accent span (mirrors `AboutHeadline` split-accent pattern).

### Section CTA
Top-right of the headline row: "View All Services" pill (button, no nav).

### Services list (7 items, in this order)

Each item carries an index label `[01]`–`[07]`, a title, a one-line description (to be drafted in the firm's voice during implementation), and verbatim bullets from `requirement.md`.

| Index | id              | Title              | Bullets                                                                                                                                                                          |
|-------|-----------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [01]  | accounting      | Accounting         | Bookkeeping and preparation of financial statements; Audit and review of financial statements; Consulting on converting financial statements to IFRS; Payroll, tax and employee insurance services |
| [02]  | tax             | Tax                | Tax planning; Tax support and filing; Tax compliance consulting and review; Tax audit support                                                                                     |
| [03]  | financial       | Financial Advisory | Building a Management Reporting System According to the Needs and Management Purposes of the Enterprise; Budget planning consulting                                              |
| [04]  | training        | Training Services  | Providing accounting training services at enterprises (including financial accounting and management accounting); Training on International Financial Reporting Standards (IFRS) |
| [05]  | business        | Business Advisory  | Business Restructuring Consulting; Establish and improve internal audit function; Improve internal control and financial management                                              |
| [06]  | ma              | M&A Advisory       | Tax Due Diligence; Financial Due Diligence; Legal Due Diligence                                                                                                                  |
| [07]  | transfer        | Transfer Pricing   | Transfer pricing documentation; Transfer pricing review; Transfer pricing investigation support                                                                                  |

Per-item description copy will be drafted at implementation time and reviewed inline as part of the implementation PR.

### Per-item CTA
"Explore Service Details" pill inside the open accordion body (button, no nav).

## 4. Component tree

```
components/services/
  CoreServicesSection.tsx     // Server component. Section container + layout.
  ServicesHeadline.tsx        // Server. Split-accent headline.
  ServiceAccordion.tsx        // 'use client'. Owns openId state, renders items.
  ServiceAccordionItem.tsx    // Presentational. Index, title, +/- toggle, body.
  ServiceImage.tsx            // Server. Static <Image> from Unsplash URL.
  data/
    services.ts               // Service[] data; English only for now.
```

### Data shape

```ts
// components/services/data/services.ts
export type Service = {
  id: string;          // 'accounting' | 'tax' | 'financial' | ...
  index: string;       // '[01]' .. '[07]'
  title: string;
  description: string; // one-line value-prop
  bullets: string[];   // verbatim from requirement.md
};

export const services: Service[] = [ /* 7 entries */ ];
export const defaultOpenId = 'accounting';
```

When EN/VI translation lands, this file becomes the extraction point: swap each
`string` to whatever shape the i18n layer expects (e.g. `{ en: string; vi: string }`)
without touching component files.

## 5. Behavior

**Accordion:** single-open. `ServiceAccordion` holds `const [openId, setOpenId] = useState<string | null>(defaultOpenId)`. Opening an item collapses the previous; clicking the open item collapses it (openId → null).

**Height transition:** CSS `grid-template-rows: 0fr` → `1fr` on the body wrapper, `transition-[grid-template-rows] duration-300 ease-out`. Inner `<div class="overflow-hidden">` holds the content. No JS measurement, no animation library.

**Toggle affordance:** trailing `+` / `−` icon in each row header. Whole row is the click target (`<button type="button">`).

**Default open item:** `accounting` (`[01]`).

**CTAs:** both the per-item "Explore Service Details" and the section "View All Services" render as `<PillButton>` (or equivalent inline) with `type="button"` and no `href`. Marked with `// TODO: link to /services` comments at both call sites.

## 6. Layout

Container (from `CLAUDE.md`):
```
mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16
```

Inner grid:
- `lg+`: two columns, `grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start`. Accordion left, image right.
- `<lg`: stacked, image on top, accordion below.

Headline row:
- `lg+`: headline left, "View All Services" CTA top-right (flex `justify-between items-start`).
- `<lg`: CTA renders below the headline.

Image:
- Single `<Image>` with `<Unsplash URL TBD at impl time>`, `alt` describes the photo content, marked `// TODO: replace with self-hosted asset`.
- Aspect ratio matches the mockup roughly (4:3 portraitless landscape).
- `priority={false}` — this section is below the fold.

## 7. Styling

- Reuses brand tokens from `globals.css` (`bg-surface`, `text-primary`, `text-secondary-*`).
- Index label `[01]` uses a slightly muted color (e.g. `text-primary/70`).
- Open item: subtle top border accent + gold-tinted background for the body, matching the mockup's softer treatment.
- Bullets: small filled circle (gold-on-navy) + check icon, matching the mockup. Use `lucide-react` `Check` if already in deps; otherwise inline SVG. (Implementer to verify deps before adding.)

## 8. Integration

`app/page.tsx` renders `<CoreServicesSection />` directly after `<AboutSection />`. No other landing-page changes.

## 9. i18n preparedness (translation in progress)

The translation effort is in progress separately. This section does **not** wire up the i18n library, but takes two cheap steps to make the future swap mechanical:

1. All user-facing strings for the seven services live in `components/services/data/services.ts`. Components do not contain literal service copy.
2. Headline accent words are wrapped in dedicated `<span>`s so a future translation can re-split per language (Vietnamese word order may differ from English).

Inline strings elsewhere (headline, CTA labels) are accepted now and will be moved when the i18n PR lands.

## 10. Acceptance criteria

- All seven services from `requirement.md` appear in the accordion, in the order in section 3.
- On load, `[01] Accounting` is expanded; the other six are collapsed.
- Clicking any closed item opens it and collapses whichever was previously open.
- Clicking the currently open item collapses it (no item open).
- Right-side image is visible on `lg+` next to the accordion; on `<lg` it stacks above.
- "View All Services" and "Explore Service Details" are visible and clickable but do not navigate.
- Section uses the standard container width per `CLAUDE.md`.
- No console warnings (key props, hydration mismatches, missing `alt`).
- Lints clean: `npm run lint`.

## 11. Risks / open items

- **Unsplash image URL** is chosen at implementation time; pick a photo that matches the warm wood-desk / hands-on-paperwork tone of `04-core-services.webp`. Implementer to verify the URL renders via `next/image` (may require a `remotePatterns` entry in `next.config`).
- **Lucide-react availability:** implementer must check `package.json` before relying on it; fall back to inline SVG if absent.
- **Per-service description copy** is hand-written; reviewer should approve copy in the implementation PR before merge.

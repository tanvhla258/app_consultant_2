# CPA Team Section — Design Spec

**Date:** 2026-06-22
**Section:** 07 — Meet Our Expert CPA Team
**Visual reference:** `public/images/sections/07-cpa-team.webp`
**Content source:** `docs/requirement.md` (Head of Our Business — the 3 Partners).

---

## 1. Goal

Replace the static reference image with a working "CPA Team" section: a left-aligned headline + supporting copy on the right, followed by a row of partner cards focused on **credentials, experience, and industry coverage** — distinct from the bio-driven `AboutSection`/`PartnerTriptych` that already exists.

This section reuses the same 3 Partners (Christ Vo, Dennis Nguyen, Michael Pham) but presents them through a **credentials-grid lens** rather than bio narrative — answering "who are the qualified CPAs behind this firm?" without duplicating the `about.*` content.

The template's 4-card layout is reduced to 3 cards to match the firm's actual partnership. Social icons in the template are dropped (no data, no need).

Section ships with full EN and VI copy in the same PR.

## 2. Scope

In scope:
- New section component tree under `components/team/`.
- Typed team data file that **imports** `PARTNERS` from `components/about/data/partners.ts` to avoid duplication; layers on credential-focused fields (years of experience, Big4 firms, industry focus) sourced from `requirement.md`.
- Mount the section under `TestimonialsSection` in `app/page.tsx`.
- EN + VI i18n keys added to `lib/i18n/en.json` and `lib/i18n/vi.json`.
- Section follows the layout container convention from `CLAUDE.md`.

Out of scope:
- New partner photos — reuse `/images/partners/{chris_vo_1,dennis,michael}.jpg`.
- Social media icons / links — template shows them but no underlying data; dropped.
- A 4th card (template shows 4 — firm has 3 partners).
- Modal/expanded bio view — `AboutSection` already covers bio depth.
- A dedicated `/team` route.
- Animation library.

## 3. Content (final, EN)

### Headline (split-accent, left-aligned)
- Base: "Meet Our Expert"
- Accent (gold, new line): "CPA Team"

### Supporting copy (right column on desktop, below heading on mobile)
"Dedicated professionals providing reliable, transparent, and growth-focused accounting solutions — Big4-trained, dual VAS/IFRS fluent, and grounded in 17+ years of industry leadership."

### Three partner cards

| # | Name           | Title       | Credentials               | Experience              | Big4 / Notable Firms           | Industry focus                                              |
|---|----------------|-------------|---------------------------|-------------------------|--------------------------------|-------------------------------------------------------------|
| 1 | Christ Vo      | Partner     | ACCA · VACPA              | 20+ years               | ex-KPMG (10 yrs)               | Consumer Goods · Real Estate · Services                     |
| 2 | Dennis Nguyen  | Partner     | MBA · ACCA · VACPA        | 19+ years               | Big4 (7+ yrs)                  | Manufacturing · Property · Hospitality · Retail · Logistics |
| 3 | Michael Pham   | Partner     | ACCA · VACPA              | 17+ years               | ex-KPMG · BDO · Mazars · PKF   | Banking · Investment · Retail · Real Estate · F&B           |

### Provenance (every claim sourced to `requirement.md`)
- Christ Vo: "over 20 years", "nearly 10 years at KPMG", consumer goods / real estate / service.
- Dennis Nguyen: "more than 19 years", "over 7 years working in Big4", manufacturing / property / retail / hospitality / logistics.
- Michael Pham: "nearly 17 years with KPMG Vietnam and more than 5 years … BDO, Mazars, PKF", banking / investment funds / retail / real estate / F&B.

## 4. Content (final, VI)

VI strings translated at implementation; brand/firm names verbatim. Industry tags translated to natural VI equivalents (Real Estate → Bất động sản, Banking → Ngân hàng, etc.).

Draft VI strings:

- `team.heading`: "Đội ngũ CPA"
- `team.heading_accent`: "Chuyên gia của chúng tôi"
- `team.subheading`: "Đội ngũ chuyên nghiệp, mang đến giải pháp kế toán đáng tin cậy, minh bạch và đồng hành cùng tăng trưởng — đào tạo tại Big4, thông thạo cả VAS và IFRS, với 17+ năm dẫn dắt ngành."
- `team.label.credentials`: "Chứng chỉ"
- `team.label.experience`: "Kinh nghiệm"
- `team.label.firms`: "Đã làm việc tại"
- `team.label.industries`: "Lĩnh vực chuyên môn"
- Per-partner experience strings translated (e.g. "20+ years" → "20+ năm").

## 5. Architecture

### Component tree

```
components/team/
  TeamSection.tsx        // section wrapper, headline row + grid
  TeamHeadline.tsx       // left-aligned split-accent H2 + right-side subhead
  TeamMemberCard.tsx     // presentational: photo, name, role, credential rows
  data/
    team.ts              // typed array of 3 members, imports PARTNERS for photo/name
```

### Data shape

```ts
import { PARTNERS, type Partner } from "@/components/about/data/partners";

export type TeamMember = Partner & {
  id: "christ" | "dennis" | "michael";
  experienceKey: string;       // e.g. "team.christ.experience" → "20+ years"
  firmsKey: string;            // e.g. "team.christ.firms" → "ex-KPMG (10 yrs)"
  industriesKey: string;       // e.g. "team.christ.industries" → "Consumer Goods · Real Estate · Services"
};

export const TEAM: readonly TeamMember[] = [
  { ...PARTNERS[0], id: "christ",  experienceKey: "team.christ.experience",  firmsKey: "team.christ.firms",  industriesKey: "team.christ.industries"  },
  { ...PARTNERS[1], id: "dennis",  experienceKey: "team.dennis.experience",  firmsKey: "team.dennis.firms",  industriesKey: "team.dennis.industries"  },
  { ...PARTNERS[2], id: "michael", experienceKey: "team.michael.experience", firmsKey: "team.michael.firms", industriesKey: "team.michael.industries" },
] as const;
```

### Why reuse PARTNERS
Single source of truth for partner identity (name, title, photo, alt). If a partner is added / replaced / re-photographed, both AboutSection and TeamSection update via one file. `team.ts` only adds credential-grid-specific fields.

## 6. Layout & styling

### Section wrapper (TeamSection.tsx)
- `<section id="team" aria-labelledby="team-heading" className="bg-surface py-24 lg:py-32">`
- Inner container: `mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16` (CLAUDE.md rule).
- Inside: `<TeamHeadline />`, then the grid.

### Headline row (TeamHeadline.tsx)
- Grid: `grid gap-6 lg:grid-cols-2 lg:gap-12 lg:items-end`
- Left: H2 with `id="team-heading"`, `text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary-700`. Accent span: `text-secondary-400`, new line via `<br />`.
- Right: subhead `text-base lg:text-lg text-primary-700/70`. On mobile sits below H2 with `mt-4` (grid stacks).

### Grid
- `grid gap-6 lg:gap-8 mt-14 lg:mt-16`
- Mobile: `grid-cols-1`
- Tablet (`md:`): `grid-cols-2`
- Desktop (`lg:`): `grid-cols-3` (single row, no 4th card)

### Card (TeamMemberCard.tsx)
- Outer: `flex h-full flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 lg:p-7 shadow-[0_8px_30px_rgba(11,37,69,0.06)]`
- Photo: `relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface`, `<Image fill className="object-cover" />`.
- Name + role row: `flex flex-col gap-0.5` — name `text-lg font-semibold text-primary-700`; role+credentials `text-sm text-primary-700/60`.
- Credential rows: stacked `<dl>` with 3 entries (experience / firms / industries). Each: `<dt className="text-xs uppercase tracking-wide text-primary-700/50">` + `<dd className="text-sm text-primary-700/80 mt-0.5">`.
- No social icons. No CTA button.
- Hover (desktop): `transition-shadow hover:shadow-[0_12px_40px_rgba(11,37,69,0.10)]`.

## 7. i18n

Keys added to both files:

```
team.heading
team.heading_accent
team.subheading

team.label.credentials
team.label.experience
team.label.firms
team.label.industries

team.christ.experience
team.christ.firms
team.christ.industries

team.dennis.experience
team.dennis.firms
team.dennis.industries

team.michael.experience
team.michael.firms
team.michael.industries
```

Partner names + titles + photo credentials (ACCA · VACPA) come from `PARTNERS` data — already strings, not i18n keys (proper nouns).

## 8. Accessibility

- Section labelled by `team-heading`.
- Photo `alt` from `PARTNERS[i].alt` (e.g. "Christ Vo, Partner at APP Consultancy").
- `<dl>/<dt>/<dd>` provides semantic grouping for credential rows.
- No interactive elements; no focus styles needed.

## 9. Mounting

`app/page.tsx` after testimonials:

```tsx
<TestimonialsSection />
<TeamSection />
```

If TestimonialsSection isn't merged at integration time, mount directly after `TrustSection` and leave a TODO.

## 10. Risks / notes

- **Duplication concern with AboutSection**: AboutSection uses a 3-partner triptych for "trust" framing. TeamSection uses the same 3 partners for "credentials" framing. Two sections about the same 3 people risks feeling repetitive on a single page. Mitigation: card content is entirely structured data (no narrative), photos are smaller, and visual treatment is grid-like vs. About's hero-like triptych. If still feels repetitive in review, consider folding into About (out of scope here).
- **3 cards on a 4-card template**: template shows 4 evenly-spaced cards; we ship 3. Visual balance verified at implementation; if it looks sparse on wide screens, constrain grid `max-w-5xl mx-auto` to tighten the row.
- **Industry list strings**: shown as inline `·`-separated text in EN; ensure VI translation preserves the dot separators or swaps for VI-natural punctuation (comma).
- No new dependencies.

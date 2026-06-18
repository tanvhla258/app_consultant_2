# Section 2 — Trusted Partner / About — Design Spec

**Date:** 2026-06-18
**Scope:** Second section of the marketing landing page — APP Consultancy "About" block, sitting directly under the hero.
**Reference image:** `public/images/sections/02-trusted-partner.webp`
**Content source:** `docs/requirement.md`
**Related spec:** `docs/superpowers/specs/2026-06-18-hero-section-design.md`

---

## 1. Goals

Introduce APP Consultancy as a firm: who the people are, what credentials anchor the work, and what the brand promise is. Sits directly below the hero and gives the page its first "breath" by switching from navy to light surface.

Mirrors the visual structure of `02-trusted-partner.webp` (headline + 3-column body with a central group photo, a left stat block, and a right callout card) but swaps:

- The stock photo of four anonymous professionals → a triptych of APP's three real partners (Christ Vo, Dennis Nguyen, Michael Pham).
- The fabricated "1,250+ Successful Cases" stat → a verifiable "20+ Big4-Trained Partners" stat sourced from partner bios in `requirement.md`.
- The generic "Accounting That Works for You" callout → APP's actual brand slogan ("Your Vision, Our Mission") with a short gloss.
- The template's "Learn More About Us" CTA → removed (Section 2 already tells the about story; the button is redundant).

## 2. Out of scope

- Other landing-page sections (03–08 are separate specs).
- Individual partner detail pages or modals.
- A full services breakdown (Section 3 owns this).
- Animated number counters (use static values).
- Dark-mode-specific styling — section uses the light surface palette in both modes.
- Background-removal for partner portraits — JPGs as shipped will be used; tonality is unified via a subtle navy gradient overlay (§5.2).

## 3. Layout

### 3.1 Container

- Light section: `bg-surface` (#F5F7FA), `py-24 lg:py-32`.
- Inner container: `max-w-7xl mx-auto px-6 lg:px-16`.
- Two-row composition: headline strip on top, 3-column content row below.

### 3.2 Desktop grid (≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│ Row 1 — Headline strip                                       │
│   eyebrow + H2 (left-aligned, max-w-2xl)                     │
│                                                              │
│ Row 2 — 3-column content (grid-cols-12, gap-10)              │
│ ┌──────────────┐ ┌───────────────────┐ ┌──────────────────┐  │
│ │ AboutCopy    │ │ PartnerTriptych   │ │ ValueCallout     │  │
│ │ col-span-3   │ │ col-span-6        │ │ col-span-3       │  │
│ └──────────────┘ └───────────────────┘ └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Responsive

| Breakpoint | Behavior |
|---|---|
| ≥1280px | 3-column as above, H2 `text-5xl`, gap `gap-10` |
| 1024–1279px | Same 3-column, H2 `text-4xl`, gap `gap-8` |
| 768–1023px | PartnerTriptych spans full width on top; AboutCopy + ValueCallout sit side-by-side below (`grid-cols-2 gap-6`) |
| <768px | Single column stack: H2 → triptych → AboutCopy (with StatBlock) → ValueCallout. Triptych keeps `grid-cols-3` internally so the "team" read is preserved. |

## 4. Headline strip (`AboutHeadline`)

```
─── (gold-400 divider, w-12 h-px) ───
ABOUT US                              ← eyebrow
A Trusted Accounting Partner          ← H2 line 1
for Businesses in Vietnam             ← H2 line 2
```

- Divider: `h-px w-12 bg-secondary-400 mb-4`.
- Eyebrow: `text-xs font-semibold tracking-[0.2em] uppercase text-secondary-500 mb-3`.
- H2: `text-4xl lg:text-5xl font-semibold tracking-tight text-primary-700 leading-[1.15] max-w-2xl`.
- The word **"Trusted"** wrapped in `<span className="text-secondary-500">` — same emphasis pattern recommended for any future highlighted word; uses existing tokens only.
- Bottom margin `mb-14 lg:mb-20` before the 3-column row.

## 5. Left column — `AboutCopy`

Two stacked blocks.

### 5.1 Body paragraph (top)

> We're a dedicated accounting and advisory firm built by leaders from international audit and Big4 backgrounds. We help businesses in Vietnam stay compliant, reduce risk, and manage their finances with clarity — from multinationals to growing SMEs.

- `text-base text-primary-700/80 leading-relaxed max-w-sm`.
- Paraphrased from `requirement.md` §"Our Company" — no fabricated claims.

### 5.2 StatBlock (below, `mt-8`)

```
┌────────────────────────────────┐
│  20+                           │
│  ─── (h-px w-10 secondary-400/40)
│  Big4-Trained Partners         │
│  KPMG · BDO · Mazars · PKF     │
└────────────────────────────────┘
```

- Card: `bg-white border border-primary-100 rounded-2xl p-6 shadow-[0_1px_2px_rgba(11,37,69,0.04)]`.
- Number: `text-5xl font-semibold text-secondary-500 tracking-tight leading-none`.
- Divider: `mt-3 h-px w-10 bg-secondary-400/40`.
- Label: `mt-3 text-sm font-semibold text-primary-700` → "Big4-Trained Partners".
- Sublabel: `mt-1 text-xs text-primary-700/60` → "KPMG · BDO · Mazars · PKF".

**Sourcing note:** "20+" reflects Christ Vo (20y), Dennis (19y), Michael (17y) per `requirement.md` partner bios. Firm names are all explicitly listed in the same bios (Christ → KPMG; Michael → KPMG, BDO, Mazars, PKF). No fabricated numbers.

## 6. Center column — `PartnerTriptych`

Three equal portraits in a single rounded card, with a name/title strip beneath each.

### 6.1 Card

- Wrapper: `bg-white border border-primary-100 rounded-3xl p-5 lg:p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)]`.
- Inner grid: `grid grid-cols-3 gap-3 lg:gap-4`.
- Decorative accents (anchored to the card, not the portraits):
  - Two small gold sparkle dots: `bg-secondary-400 rounded-full w-1.5 h-1.5` at `-top-1 -right-1` and `-bottom-2 -left-2` (echoes the hero's SparkleField at a quieter volume).

### 6.2 Portrait cell

- `next/image`, sources:
  - `public/images/partners/chris_vo_1.jpg`
  - `public/images/partners/dennis.jpg`
  - `public/images/partners/michael.jpg`
- Wrapper: `relative aspect-[3/4] overflow-hidden rounded-2xl bg-primary-50`.
- Image: `object-cover object-top` so faces stay framed regardless of crop.
- Tonality overlay (unifies three disparate source photos): an absolute-positioned div `bg-gradient-to-t from-primary-900/30 via-transparent to-transparent pointer-events-none`.
- `priority={false}` — section is below the fold.

### 6.3 Caption strip

For each portrait, vertically stacked below it:

- Name: `mt-3 text-sm font-semibold text-primary-700`.
- Title: `text-xs text-primary-700/60` → "Partner".
- Credentials: `text-xs text-secondary-600 font-medium tracking-wide`.

**Data (from `requirement.md` §"Head of Our Business"):**

| Portrait | Name | Title | Credentials |
|---|---|---|---|
| 1 | Christ Vo | Partner | ACCA · VACPA |
| 2 | Dennis Nguyen | Partner | MBA · ACCA · VACPA |
| 3 | Michael Pham | Partner | ACCA · VACPA |

### 6.4 Mobile (<768px)

The card stays a single unit; the inner grid stays `grid-cols-3` (splitting it would lose the "team" read). Caption font drops to `text-[11px]`, card padding `p-4`, sparkle dots remain.

## 7. Right column — `ValueCallout`

A vertically stacked card that grounds the section in the brand slogan.

```
┌───────────────────────────┐
│  [icon]                   │  ← icon chip (gold on navy)
│                           │
│  Your Vision,             │  ← title (2 lines)
│  Our Mission              │
│                           │
│  We turn your business    │  ← supporting copy
│  goals into a clear       │
│  financial roadmap —      │
│  audit, tax, IFRS, and    │
│  advisory.                │
└───────────────────────────┘
```

- Card: `bg-white border border-primary-100 rounded-3xl p-6 lg:p-7 shadow-[0_8px_30px_rgba(11,37,69,0.06)] flex flex-col gap-5`.
- Icon chip: `w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-secondary-400`. Icon = Lucide `Compass` (or `Target`) at `size={22}`.
- Title: `text-xl lg:text-2xl font-semibold text-primary-700 leading-tight tracking-tight`.
- Supporting copy: `text-sm text-primary-700/70 leading-relaxed`.

**Copy:**

> **Your Vision, Our Mission**
> We turn your business goals into a clear financial roadmap — audit, tax, IFRS, and advisory built on Big4 expertise.

(Slogan sourced verbatim from `requirement.md` §"Our Slogan".)

## 8. Component file plan

```
app/
  page.tsx                                composes <Hero /> + <AboutSection />

components/
  about/
    AboutSection.tsx                      server component, top-level <section>
    AboutHeadline.tsx                     eyebrow + H2 (server)
    AboutCopy.tsx                         paragraph + <StatBlock /> (server)
    StatBlock.tsx                         pure presentational card
    PartnerTriptych.tsx                   server component, renders 3 <PartnerCard />
    PartnerCard.tsx                       portrait + caption (server, props-driven)
    ValueCallout.tsx                      icon chip + slogan card (server)

  about/data/
    partners.ts                           typed array of {name, title, credentials, image}

  ui/
    (no new primitives required for this section)

public/images/partners/
  chris_vo_1.jpg                          (already present)
  dennis.jpg                              (already present)
  michael.jpg                             (already present)
```

**Boundaries:**

- `AboutSection.tsx` only composes — no styling logic of its own beyond the outer container.
- No client components are required for this section (no interactivity).
- `StatBlock`, `PartnerCard`, and `ValueCallout` are pure props-driven primitives with no domain knowledge — copy and data come from the parent or `partners.ts`.
- Partner data lives in `components/about/data/partners.ts` so future sections (e.g., a dedicated Partners section) can reuse it without duplication.

## 9. Tokens used

All colors come from existing `globals.css` brand tokens — no new tokens introduced.

- `--surface` (#F5F7FA) — section background.
- `--primary-700` — headings, body text.
- `--primary-700/60`, `/70`, `/80` — text hierarchy.
- `--primary-500` — icon chip background.
- `--primary-100` — card borders.
- `--primary-50` — portrait wrapper background fallback.
- `--primary-900/30` — tonality overlay on portraits.
- `--secondary-400` — divider, sparkle dots, icon, span emphasis backup.
- `--secondary-500` — eyebrow, stat number, emphasized H2 word ("Trusted").
- `--secondary-600` — credential micro-copy.
- White — card surfaces.

## 10. Accessibility

- Section wrapped in `<section id="about" aria-labelledby="about-heading">` so the hero's nav anchor (`#about`) resolves to it.
- H2 has `id="about-heading"`.
- Each portrait `<Image>` has alt `"{Name}, Partner at APP Consultancy"`.
- The triptych card is a `<figure>` with `<figcaption className="sr-only">APP Consultancy partners</figcaption>`.
- Decorative sparkle dots are `aria-hidden="true"`.
- Contrast against `--surface`:
  - `--primary-700` text → ≥ 14:1 (AAA).
  - `--primary-700/60` micro-copy → ≥ 7:1 (AAA for normal, AA-large floor).
  - `--secondary-500` on white card → ≥ 4.5:1 (AA body).
- No interactive controls in this section — keyboard navigation is unaffected.

## 11. Open questions / follow-ups

- Partner JPGs have inconsistent backgrounds and lighting. The `from-primary-900/30` bottom gradient unifies tone; if the result still reads as mismatched after first render, follow-up is to either (a) crop tighter to faces in `scripts/`, or (b) commission a unified shoot. Spec does not block on this.
- Icon choice for the ValueCallout chip — Lucide `Compass` is the default; `Target` or `Sparkles` are acceptable swaps. No new dependency: `lucide-react` is already expected to be added by the hero spec.
- Section anchor (`#about`) assumes the hero nav uses that exact id — confirm during integration with the hero's nav link list.

## 12. Done criteria

- `app/page.tsx` renders `<AboutSection />` directly after `<Hero />`.
- Visual match to `02-trusted-partner.webp` at 1440×900 within the documented adaptations (real partner triptych, Big4 stat, slogan callout, no "Learn More" CTA).
- Responsive behavior matches §3.3 at 1440, 1024, 768, 375 widths.
- All three partner portraits load via `next/image` with correct alt text.
- No console errors. `npm run lint` and `npm run build` both pass.

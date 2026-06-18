# Hero Section — Design Spec

**Date:** 2026-06-18
**Scope:** Marketing site landing page hero (replaces the `create-next-app` placeholder in `app/page.tsx`).
**Reference image:** `public/images/sections/01-hero.webp`
**Content source:** `docs/requirement.md`

---

## 1. Goals

Replace the default Next.js placeholder with a polished hero that:

- Establishes APP Consultancy's brand (navy + gold) and slogan ("YOUR VISION — OUR MISSION").
- Positions APP as a Big4-pedigreed firm serving businesses in Vietnam (audit, tax, IFRS, M&A).
- Drives the primary conversion: **Book a free consultation**.
- Mirrors the visual structure of the reference template (`01-hero.webp`) — 2-column desktop layout with a pill nav, left-aligned headline/CTA, and a right-aligned partner portrait with floating trust badges — but swaps the stock imagery and fake "Top CPA Firm 2026"-style claims for verifiable APP credentials (named partner, Big4 background, VAS/IFRS expertise, 15+ industries).

## 2. Out of scope

- Other landing-page sections (02–08 will be separate specs).
- Logo SVG design (use a simple icon + wordmark placeholder).
- Background-removal automation for the partner photo (the spec assumes a PNG with transparent background is provided manually).
- Internationalization (English only).
- Dark-mode-specific styling — the hero is navy on both light and dark.
- Animations beyond simple CSS keyframes.

## 3. Layout

### 3.1 Container

- Full viewport hero: `min-h-screen`, `relative`, `overflow-hidden`.
- Background: solid `bg-primary-500` (#0B2545).
- Decorative layers (absolute, z-index ordered behind content):
  - **GlobeBackdrop** — inline SVG world-outline, centered behind the portrait, `opacity-10`, stroke `--primary-300`.
  - **SparkleField** — 5–8 small star/sparkle SVGs scattered, gold `--secondary-400`, opacity 30–50%, with a slow CSS `twinkle` keyframe.

### 3.2 Desktop grid (≥1024px)

Two columns inside a `max-w-7xl` centered container, `px-16 pt-32 pb-24`:

- **Left column (~60% width):** `HeroCopy` block — headline, subhead, CTA, divider, partner intro.
- **Right column (~40% width):** `HeroPortrait` — Michael photo, globe backdrop, three floating badges.

The pill nav (`HeroNav`) sits at the top, absolute-positioned `top-6 inset-x-0`, centered, with `max-w-[1100px]`.

### 3.3 Responsive

| Breakpoint | Behavior |
|------------|----------|
| `≥1024px` | 2-column grid, all 3 badges floating, headline `text-6xl` |
| `768–1023px` | 2-column grid, tighter padding, headline `text-5xl`, badges scaled to 90% |
| `<768px` | Stacked: nav → copy → portrait. Badges render inline as a row below the portrait, with one badge dropped (keep Ex-Big4 + VAS/IFRS). |

## 4. Top Nav (`HeroNav`)

Floating pill bar, `position: absolute; top: 1.5rem`, centered.

**Structure** (left → right):
- Logo: small icon (chart/bars, gold) + wordmark "APP CONSULTANCY" (`text-white font-semibold tracking-wide text-sm`).
- Nav links: `Home · About · Services · Partners · Contact` (`text-white/80 hover:text-white text-sm`). Active link prefixed with a gold `•`.
- CTA "Book Consultation": pill button — `bg-white text-primary-700 rounded-full px-5 py-2 text-sm font-medium` with a circular arrow icon at the end.

**Styling:**
- Container: `bg-primary-700/60 backdrop-blur-md border border-primary-400/20 rounded-full px-6 py-3 flex items-center gap-8`.

**Mobile:** Collapse nav links into a hamburger button; clicking opens a full-width drawer sheet (client component, local React state).

## 5. Left Column — Copy (`HeroCopy`)

Vertical stack inside `max-w-xl`, padded `pt-32`.

```
Headline (H1):
  Your Vision, Our Mission —
  Accounting & Advisory You Can Trust

Subhead (p):
  APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on
  20+ years of Big4 expertise — tailored for businesses operating in Vietnam.

CTA:
  [ Get a Free Consultation → ]    (white pill, navy text)

---- divider, gold/20, mt-16 ----

Partner intro:
  Michael Pham — Partner (ACCA, VACPA)
  "We help businesses navigate VAS, IFRS, tax compliance, and growth —
   all in one trusted partner."
```

**Typography:**
- H1: `text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]`.
- Subhead: `text-lg text-white/70 mt-6 leading-relaxed`.
- CTA: `mt-8`, PillButton variant `white`, includes inline arrow icon at the end.
- Divider: `mt-16 h-px w-24 bg-secondary-400/30`.
- Partner name: `mt-6 text-white font-medium`.
- Quote: `text-white/60 italic text-sm mt-2 max-w-md`.

## 6. Right Column — Portrait + Badges (`HeroPortrait`)

Wrapper: `relative w-full h-full flex items-end justify-center`.

### 6.1 Portrait

- Source: `public/images/partners/michael_2.png` (background-removed version of `michael_2.jpg`). The PNG must have a transparent background so the silhouette blends into the navy hero.
- Render: `next/image` with `priority`, `fill`-style positioning inside an aspect-ratio wrapper, `object-contain object-bottom`. Max height ≈ 80% of hero height.
- Behind the portrait: `GlobeBackdrop` SVG (centered, scaled to ~120% of portrait width) and a radial gradient (`from-primary-400/40 via-transparent to-transparent`) to give a soft glow.

### 6.2 Trust badges

Three `<TrustBadge>` components, absolute-positioned around the portrait.

**Badge data:**

| # | Icon | Label | Sublabel |
|---|------|-------|----------|
| 1 | 🎓 (graduation-cap) | Ex-Big4 Partners | KPMG · BDO · Mazars |
| 2 | 📊 (chart-bar) | VAS & IFRS | Expertise |
| 3 | 🏢 (building) | 15+ Industries Served | Manufacturing · F&B · Real Estate |

(Icons rendered as Lucide React or inline SVG — not emoji.)

**Positions (desktop):**
- Badge 1: `top-8 -right-4`
- Badge 2: `top-1/2 -left-8`
- Badge 3: `bottom-12 -right-12`

**Styling:**
- `bg-primary-800/70 backdrop-blur border border-secondary-400/30 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-lg`.
- Icon container: `w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-secondary-400`.
- Label: `text-white text-sm font-medium`.
- Sublabel: `text-white/50 text-xs`.
- Entrance: CSS `@keyframes` fade + translate-up, staggered 100ms.

**Mobile:** Badges render inline as a horizontal scroll row below the portrait (drop badge #3).

## 7. Component file plan

```
app/
  page.tsx                       composes <Hero />
  globals.css                    unchanged

components/
  hero/
    Hero.tsx                     server component, top-level <section>
    HeroNav.tsx                  client component (mobile drawer state)
    HeroCopy.tsx                 server component
    HeroPortrait.tsx             server component
    TrustBadge.tsx               reusable badge primitive
    GlobeBackdrop.tsx            inline SVG world outline
    SparkleField.tsx             inline SVG stars, aria-hidden

  ui/
    PillButton.tsx               variants: white | dark — used by HeroNav and HeroCopy

public/images/
  partners/michael_2.png         (TODO: background-removed version, provided manually)
  hero/globe.svg                 (TODO: world outline SVG asset)
```

**Boundaries:**
- `Hero.tsx` only composes — no styling logic of its own.
- `HeroNav` is the only client component in the tree.
- `TrustBadge` and `PillButton` are pure primitives with no domain knowledge — they accept props only.

## 8. Tokens used

All colors come from existing `globals.css` brand tokens — no new tokens introduced.

- `--primary-500` (#0B2545) — hero background
- `--primary-700`, `--primary-800` — nav and badge surfaces
- `--primary-400` — globe stroke, gradient highlight
- `--secondary-400` (#D4A24C) — sparkles, badge accent border, active nav dot, icon color
- White + `white/70`, `white/60`, `white/50` — text hierarchy

## 9. Accessibility

- Hero is wrapped in `<section aria-label="Hero">`.
- Decorative SVGs (`GlobeBackdrop`, `SparkleField`) are `aria-hidden="true"`.
- Portrait `<Image>` has descriptive alt: `"Michael Pham, Partner at APP Consultancy"`.
- Nav uses semantic `<nav>` with a list; mobile drawer is keyboard-dismissable (Esc) and traps focus while open.
- CTA buttons have visible focus rings (`focus-visible:ring-2 ring-secondary-400`).
- All copy contrast checked against `--primary-500`: white ≥ 14:1, white/70 ≥ 9:1 — passes WCAG AAA for body.

## 10. Open questions / follow-ups

- Background-removed `michael_2.png` needs to be produced (manually via remove.bg, or via a `sharp`-based script in `scripts/`). Spec does not block on this — implementation can use the raw `.jpg` as a fallback with a CSS `mix-blend` workaround until the PNG lands.
- Logo icon — use a placeholder Lucide icon (`BarChart3`) until a proper APP logomark is delivered.
- Nav link destinations point to anchors (`#about`, `#services`, etc.) for now — once those sections exist, links will resolve to them.

## 11. Done criteria

- `app/page.tsx` renders `<Hero />` and nothing else (placeholder removed).
- Visual match to `01-hero.webp` at 1440×900 within the adaptations listed in this spec.
- Responsive behavior matches the table in §3.3 at 1440, 1024, 768, 375 widths.
- No console errors. `npm run lint` and `npm run build` both pass.

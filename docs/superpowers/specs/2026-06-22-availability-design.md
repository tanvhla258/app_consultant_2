# Availability Section — Design Spec

**Date:** 2026-06-22
**Section:** 08 — Availability / Consultation Support
**Visual reference:** `public/images/sections/08-availability.webp`
**Content source:** `docs/requirement.md` (Christ Vo contact email for CTA). Consultation hours use **standard VN office hours** (Mon–Fri 08:30–17:30, Sat 08:30–12:00, Sun closed) — the template's hours are decorative and not authoritative.

---

## 1. Goal

Replace the static reference image with a working "Availability" section: a left-aligned headline + supporting copy on top, then a 2-column row — a hero photo on the left, a blue "Consultation Hours" card on the right with a schedule table and a primary CTA that opens the user's mail client to request an appointment with Christ Vo.

Section ships with full EN and VI copy in the same PR.

## 2. Scope

In scope:
- New section component tree under `components/availability/`.
- Typed hours data file (3 schedule rows).
- Mount the section under `TeamSection` in `app/page.tsx`.
- EN + VI i18n keys added to `lib/i18n/en.json` and `lib/i18n/vi.json`.
- Section follows the layout container convention from `CLAUDE.md`.
- CTA: `<a href="mailto:cvo@app.com?subject=...">` — server-rendered anchor, no JS.

Out of scope:
- Calendar embed (Calendly, Cal.com, Google Calendar).
- Booking form / modal.
- Live "online now" indicator.
- Time-zone conversion.
- A dedicated `/contact` or `/book` route.
- Animation library.

## 3. Content (final, EN)

### Headline (split-accent, left-aligned, top of section)
- Base: "We're Available All Week for"
- Accent (gold, new line): "Flexible Consultation Support"

### Supporting copy (right column on desktop, below heading on mobile)
"Get expert financial guidance at the time that works best for you."

### Hero photo (left column of bottom row)
- File: `public/images/sections/08-availability.webp` (already exists — this section's reference image, reused).
- Rendered in a rounded container, fills its column.

### Consultation Hours card (right column of bottom row)
- Pin icon (lucide `Pin` or `MapPin` — use `Pin` for the "pinned note" connotation matching the template).
- Title: "Consultation Hours"
- Subline: "We're available throughout the week and ready to assist with flexible consultation times."
- Schedule table (3 rows):

| Day              | Hours          |
|------------------|----------------|
| Monday – Friday  | 08:30 – 17:30  |
| Saturday         | 08:30 – 12:00  |
| Sunday           | Closed         |

- CTA: "Get Appointment" → `mailto:cvo@app.com?subject=Appointment%20Request%20%E2%80%94%20APP%20Consultancy`

### Provenance
- Email `cvo@app.com` — from `requirement.md` ("Christ Vo — Partner … Email: cvo@app.com").
- Hours: business decision, defaulted to standard VN office hours. Owner can override before merge.

## 4. Content (final, VI)

Draft VI strings:

- `availability.heading`: "Chúng tôi luôn sẵn sàng tư vấn"
- `availability.heading_accent`: "Linh hoạt theo lịch của bạn"
- `availability.subheading`: "Nhận tư vấn tài chính chuyên môn vào thời điểm phù hợp nhất với bạn."
- `availability.card.title`: "Giờ Tư Vấn"
- `availability.card.subtitle`: "Chúng tôi sẵn sàng phục vụ suốt tuần với lịch tư vấn linh hoạt."
- `availability.row.mon_fri.day`: "Thứ Hai – Thứ Sáu"
- `availability.row.mon_fri.hours`: "08:30 – 17:30"
- `availability.row.sat.day`: "Thứ Bảy"
- `availability.row.sat.hours`: "08:30 – 12:00"
- `availability.row.sun.day`: "Chủ Nhật"
- `availability.row.sun.hours`: "Nghỉ"
- `availability.cta`: "Đặt Lịch Hẹn"

## 5. Architecture

### Component tree

```
components/availability/
  AvailabilitySection.tsx     // section wrapper, headline + 2-col row
  AvailabilityHeadline.tsx    // left-aligned split-accent H2 + right-side subhead
  HoursCard.tsx               // blue card: icon, title, subtitle, schedule, CTA
  data/
    hours.ts                  // typed 3-row schedule
```

### Data shape

```ts
export type ScheduleRow = {
  id: "mon_fri" | "sat" | "sun";
  dayKey: string;   // e.g. "availability.row.mon_fri.day"
  hoursKey: string; // e.g. "availability.row.mon_fri.hours"
};

export const HOURS: readonly ScheduleRow[] = [
  { id: "mon_fri", dayKey: "availability.row.mon_fri.day", hoursKey: "availability.row.mon_fri.hours" },
  { id: "sat",     dayKey: "availability.row.sat.day",     hoursKey: "availability.row.sat.hours"     },
  { id: "sun",     dayKey: "availability.row.sun.day",     hoursKey: "availability.row.sun.hours"     },
] as const;

export const APPOINTMENT_MAILTO =
  "mailto:cvo@app.com?subject=Appointment%20Request%20%E2%80%94%20APP%20Consultancy";
```

## 6. Layout & styling

### Section wrapper (AvailabilitySection.tsx)
- `<section id="availability" aria-labelledby="availability-heading" className="bg-white py-24 lg:py-32">`
- Inner container: `mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16` (CLAUDE.md rule).
- Inside: `<AvailabilityHeadline />`, then the 2-col row.

### Headline row (AvailabilityHeadline.tsx)
- Grid: `grid gap-6 lg:grid-cols-2 lg:gap-12 lg:items-end`
- Left: H2 with `id="availability-heading"`, `text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary-700`. Accent span: `text-secondary-400`, new line via `<br />`.
- Right: subhead `text-base lg:text-lg text-primary-700/70`.

### 2-col row (under headline)
- `grid gap-6 lg:grid-cols-2 lg:gap-10 mt-14 lg:mt-16 items-stretch`
- Left col: hero image
  - `relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden`
  - `<Image src="/images/sections/08-availability.webp" alt="" fill className="object-cover" />`
  - `alt=""` because the image is decorative; meaning carried by surrounding text.
- Right col: `<HoursCard />`

### HoursCard
- Outer: `flex h-full flex-col gap-6 rounded-3xl bg-[var(--color-cta-blue)] p-7 lg:p-9 text-white shadow-[0_12px_40px_rgba(28,67,217,0.25)]`
  - Use the existing CTA blue token (verify in `app/globals.css`; if absent, define `--color-cta-blue: #2A4BFF` or pull the exact hex from `lib/theme.ts`).
- Pin icon chip: `inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15` with `<Pin className="h-5 w-5 text-white" aria-hidden="true" />`.
- Title: `<h3 className="text-2xl font-semibold leading-tight">`
- Subtitle: `<p className="text-sm text-white/75">`
- Schedule: `<ul className="flex flex-col divide-y divide-white/15">`, each `<li className="flex items-center justify-between py-3 text-sm">` with day on the left and hours on the right (`tabular-nums`).
- CTA: pill button at bottom — `inline-flex items-center gap-2 self-start rounded-full bg-white text-primary-700 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors`. Trailing `ArrowRight` icon from lucide (`h-4 w-4`).
- Anchor element: `<a href={APPOINTMENT_MAILTO}>` — no JS, server-rendered.

## 7. i18n

Keys added to both files:

```
availability.heading
availability.heading_accent
availability.subheading

availability.card.title
availability.card.subtitle

availability.row.mon_fri.day
availability.row.mon_fri.hours
availability.row.sat.day
availability.row.sat.hours
availability.row.sun.day
availability.row.sun.hours

availability.cta
```

## 8. Accessibility

- Section labelled by `availability-heading`.
- Hero image is decorative — `alt=""`.
- Pin icon `aria-hidden="true"` — title carries meaning.
- Schedule rendered as `<ul>/<li>` (visual list of pairs); acceptable since it's a flat day→hours mapping. If reviewer prefers `<table>`, swap with `<dl>` (semantic equivalent without table cruft).
- CTA `<a>` is a true link (mailto), keyboard-focusable by default.
- Color contrast: white text on the CTA-blue background — verified by Hero's existing usage of the same blue, but re-check WCAG AA at implementation (subtle text-on-blue 75% opacity may fail; bump to 80%+ if needed).

## 9. Mounting

`app/page.tsx` after the team section:

```tsx
<TeamSection />
<AvailabilitySection />
```

If TeamSection isn't merged at integration time, mount directly after `TestimonialsSection`/`TrustSection` and leave a TODO.

## 10. Risks / notes

- **mailto: UX**: mailto links break for users without a configured mail client (common on shared/work machines). Acceptable for v1 — owner explicitly chose mailto over a form. Future iteration could add an alternate "Copy email" button.
- **Hours accuracy**: defaulted to standard VN hours. If the firm's actual hours differ (e.g. lunch break 12–13:30 commonly observed in VN), the owner must confirm before merge.
- **Image reuse**: the section image (`08-availability.webp`) is currently the *template reference* — used for design comparison only. We are repurposing the same file as production content. Confirm the firm has rights to it (it appears to be a generic stock-style photo); if not, swap for a licensed alternative.
- **Blue token**: depends on `--color-cta-blue` existing in `globals.css` / `lib/theme.ts`. If not present, define it in both files in the same PR per CLAUDE.md's "keep them in sync" rule.
- Lucide icons used: `Pin`, `ArrowRight` — both already pulled in via `lucide-react` elsewhere; no new dep.

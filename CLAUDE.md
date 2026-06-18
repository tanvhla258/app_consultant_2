# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16 — breaking changes

This project uses Next.js 16 + React 19 + Tailwind v4. APIs, conventions, and file structure may differ from older Next.js you may know. Before writing code that touches Next.js APIs (routing, params, caching, fetch, Image, font, metadata, server actions), read the relevant guide under `node_modules/next/dist/docs/` and heed deprecation notices. Do not assume Next 13/14/15 patterns still apply.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the built app
- `npm run lint` — ESLint (flat config, extends `next/core-web-vitals` + `next/typescript`)

There is no test runner configured.

Image-processing scripts (run with `node scripts/<name>.js`) depend on `sharp`, which is **not** in `package.json`. Install it locally (`npm i -D sharp`) before running:
- `scripts/probe.js` — slice `public/images/template1.webp` into 400px-tall strips for layout probing.
- `scripts/crop-template.js` — slice the same source into the named section files in `public/images/sections/`.

## Project purpose & content source of truth

This is a marketing site for **APP Consultancy** (accounting/tax/advisory firm in HCMC, Vietnam). Brand voice, services list, partner bios, client industries, and contact info all come from `docs/requirement.md` — treat that file as canonical for copy. `docs/requirement.pdf` is the original source; prefer the markdown.

The visual design reference is `public/images/template1.webp`, pre-sliced into eight numbered section files in `public/images/sections/` (`01-hero` … `08-availability`). When implementing a section, look at its corresponding image first.

## Architecture

App Router under `app/` (currently only the root `layout.tsx` + `page.tsx` — the page is still the create-next-app placeholder and should be replaced with the marketing layout per the section images).

- `app/layout.tsx` — loads Geist Sans/Mono via `next/font/google`, exposes them as CSS variables, applies them to `<html>`. Root layout uses `min-h-full flex flex-col`; child pages should use `flex-1` to fill height.
- `app/globals.css` — Tailwind v4 entrypoint (`@import "tailwindcss"`). Defines brand tokens as CSS custom properties under `:root` and re-exports them to Tailwind via `@theme inline` so utilities like `bg-primary`, `text-secondary-400`, `bg-surface` work. **This is the source of truth used at runtime.**
- `lib/theme.ts` — the same brand palette as a typed TS object (`colors.primary`, `colors.secondary`, etc.). Use this when you need hex values in TS/JS (inline styles, chart configs). Any palette change MUST be made in both files to keep them in sync.

Brand palette: deep navy primary (`#0B2545`), gold secondary (`#D4A24C`), neutral surface (`#F5F7FA`). Dark mode is wired in `globals.css` via `prefers-color-scheme`.

Path alias: `@/*` → repo root (see `tsconfig.json`).

## Layout conventions

All page sections must use the same container as the Hero:

```
mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16
```

Do not use `max-w-7xl` or other widths for section containers.

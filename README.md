# Veraft

Marketing website for Veraft — an AI-first software studio. Built with Next.js (App Router),
TypeScript, Tailwind CSS v3.4, Motion, and Lenis.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run lint     # eslint
```

## Environment notes

**Tailwind v3, not v4.** This project was set up behind a corporate registry that **blocks the
native Tailwind v4 oxide binary** (`@tailwindcss/oxide-win32-x64-msvc` → `403 Forbidden`). The
WASM fallback installs, but its class scanner does not run, so Tailwind v4 emitted no utilities at
all. We use **Tailwind v3.4** instead — a pure-JS engine that needs no native binary and works in
any environment. Design tokens still live in CSS (`app/globals.css` `:root`) and are mapped to
utilities in `tailwind.config.ts`. If you later move to a network where the v4 native binary is
reachable, migrating back is straightforward.

**Corporate root CA.** Node must trust the OS certificate store for `npm install` to succeed
through the intercepting proxy:

```bash
export NODE_OPTIONS=--use-system-ca   # trusts the Windows certificate store
```

## Environment variables

Copy `.env.example` to `.env.local`. Without `RESEND_API_KEY`, booking requests are logged to the server console instead of emailed.

## Structure

- `app/` — App Router routes, `globals.css` (design tokens as CSS variables).
- `components/ui/` — primitives (Button, Container, Section, Eyebrow, …).
- `components/sections/` — composed page sections.
- `components/layout/` — Header, Footer, mobile menu, logo.
- `components/motion/` — Lenis smooth scroll + reveal helpers.
- `lib/` — site config, fonts, helpers.

See `CLAUDE.md` for design-system conventions.

# Veraft Website

AI-first software company marketing site. Next.js (App Router) + TypeScript + Tailwind v3.4 + Motion + Lenis. Positioning: end-to-end software delivery (build → integrate → secure → deploy → maintain) by AI agents (Claude, ChatGPT, DeepSeek…) reviewed by engineers, priced by tokens burned.

## Design system

- Everything derives from design tokens. Colors live as RGB channel triples in `app/globals.css` (`:root`, `--c-*`) and are mapped to utilities in `tailwind.config.ts`. No hardcoded colors in components — use token utilities (`bg-paper`, `text-ink`, `border-line`, `text-accent`, etc.). For direct CSS/SVG/inline use, solid `--color-*` vars are also exposed.
- Tailwind **v3.4** (pure-JS engine). v4 was unusable here: the corporate registry blocks the native oxide binary and the WASM fallback's scanner emits no utilities. See README.
- Aesthetic: "blueprint blocks" (Laravel-site inspired) — the page is a stack of framed `<Section>` blocks: full-bleed bottom hairline, 1200px column with vertical hairlines and accent corner squares (`components/ui/section.tsx`). Accent `#001FFE` used surgically.
- Light + dark themes, chosen manually (header Sun/Moon toggle), default light, never from the OS preference. Dark = `:root[data-theme="dark"]` channel overrides in `globals.css`; Tailwind `dark:` variant maps to the same selector. Accent FILLS (`bg-accent`, `fill-accent`) are the exact brand blue `#001FFE` in both themes; accent TEXT must use `text-accent-fg` (same blue in light, lifted `#5C7AFF` in dark for contrast). Use `text-on-accent`/`fill-on-accent` (always white) on accent fills — never `text-paper`, which flips in dark. Theme logic: `lib/theme.ts` + `components/layout/theme-toggle.tsx`.
- Light theme is white-dominant.
- The closing CTA (`components/sections/cta-band.tsx`) is a vivid "aurora" band (`.cta-aurora` in globals.css: brand-blue gradient, conic light rays, bottom bloom, SVG grain). It uses fixed `brand-*` tokens that are intentionally identical in both themes. Hairline 1px borders over heavy shadows; `.bg-iso-grid` isometric grid behind hero/CTA; giant gradient wordmark (`.wordmark-mask` + `.wordmark-aurora`: brand-blue gradient, bottom bloom, grain) in the footer.
- Motion is restrained: fast, ease-out, scroll-reveal once, reduced-motion respected (incl. SMIL dots via `.flow-dot`). When unsure, don't animate.
- Signature element: the isometric brick stack in the home hero (`components/sections/hero-stack.tsx`, pure SVG computed from an iso projection). Ambient motion lives mainly there.
- Third-party AI models appear as text wordmarks only — never their logos.

## Typography

- Display + body: **Geist Sans** (`geist/font/sans`), differentiated by scale/weight/tracking.
- Mono: **Geist Mono** (`geist/font/mono`) for eyebrows, labels, data, code.
- Self-hosted via the `geist` npm package (no external font requests, no layout shift).
- NOTE: original brief asked for Satoshi; swapped to Geist because the build environment cannot reach Google Fonts / Fontshare. To restore Satoshi, drop its `.woff2` into `app/fonts/`, load via `next/font/local`, and point `--font-display` at it.

## Conventions

- App Router, server components by default; client components (`"use client"`) only where interaction/animation needs them.
- Tailwind utility-first; extract repeated patterns into components (`components/ui`, `components/sections`), not `@apply` soup.
- Icons: lucide-react, consistent stroke width (1.5).
- Reusable section components in `components/sections/`, primitives in `components/ui/`, motion helpers in `components/motion/`.
- Site nav/config in `lib/site.ts`; all marketing copy in `lib/content.ts`; per-page metadata via `pageMetadata()` in `lib/seo.ts` (sets canonical — never set canonical in the root layout).
- Booking form → `POST /api/contact` → Resend (`lib/email.ts`). Schema shared client/server in `lib/contact-schema.ts`.

## Commands

- `npm run dev` / `npm run build` / `npm run lint`

## Rules

- Type-strict, no `any`. Build must pass clean before a phase is done.
- Don't introduce new dependencies without noting why.
- One feature/route per working session.

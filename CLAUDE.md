# Veraft Website

AI-first software company marketing site. Next.js (App Router) + TypeScript + Tailwind v3.4 + Motion + Lenis. Positioning: end-to-end software delivery (build → integrate → secure → deploy → maintain) by AI agents (Claude, ChatGPT, DeepSeek…) reviewed by engineers, priced by tokens burned.

## Design system

- Everything derives from design tokens. Colors live as RGB channel triples in `app/globals.css` (`:root`, `--c-*`) and are mapped to utilities in `tailwind.config.ts`. No hardcoded colors in components — use token utilities (`bg-paper`, `text-ink`, `border-line`, `text-accent`, etc.). For direct CSS/SVG/inline use, solid `--color-*` vars are also exposed.
- Tailwind **v3.4** (pure-JS engine). v4 was unusable here: the corporate registry blocks the native oxide binary and the WASM fallback's scanner emits no utilities. See README.
- Palette ("ink & blue"): white `#FFFFFF` page, stone `#F5F4F1` blocks/cards, hairline `#E8E6E1`, warm grey `#6B6963` secondary text, ink `#141413` text/dark blocks, and ONE accent — blue `#4E50F5`. Documented at the top of `app/globals.css`. (History: electric blue `#001FFE` → steel blues → lime `#E4F222` → this blue.)
- Aesthetic: "blueprint blocks" (Laravel-site inspired) — the page is a stack of framed `<Section>` blocks: full-bleed bottom hairline, 1200px column with vertical hairlines and accent corner squares (`components/ui/section.tsx`).
- Light + dark themes, chosen manually (header Sun/Moon toggle), default light, never from the OS preference. Dark = `:root[data-theme="dark"]` channel overrides in `globals.css`. Blue fills (`bg-accent`: primary buttons, pills, highlights, selected states) carry `text-on-accent` (white, in every scope). Accent TEXT/icons use `text-accent-fg` (the same blue on light, lifted `#9698FF` on dark). Structural lines, bars, underlines and marks stay `ink` — the accent is spent surgically. Text on fixed-dark media (the CTA photo) uses `text-on-dark` (white). Theme logic: `lib/theme.ts` + `components/layout/theme-toggle.tsx`.
- Avoid a wall of white. Sections alternate `tone="paper" | "mist" | "deep"`. `deep` is a near-black block in both themes: the `.surface-deep` class re-maps every token inside it, so children keep using `bg-paper`/`text-ink`/`border-line`, and Tailwind's `dark:` variant also matches inside it. Page heroes and the footer sit on `mist`. Keep copy short: one line per card, no paragraph where a heading will do.
- Feature cards (Ramp-style, `components/sections/feature-grid.tsx`): rounded `bg-stone` cards with a `.bg-dots` texture, two-tone headings (ink lead + `text-stone-muted` continuation), a square ↗ button, and app-window mockups on `bg-sheet`. Status pills/icon chips may use the fixed `spot-*` colours (green, violet, rose, sky, amber, orange) — mockups only.
- The audience is non-technical clients — no terminals, code or jargon in client-facing visuals.
- The closing CTA (`components/sections/cta-band.tsx`) sits on the light-beams photo `public/images/cta-beams.png` (rendered `grayscale`, then recoloured by a `bg-brand-500 mix-blend-color` layer so the beams take the accent blue), via `next/image` (`fill`, `object-bottom`) so it ships as AVIF/WebP. White `text-on-dark` copy, white button with `text-brand-900`. Hairline 1px borders over heavy shadows; `.bg-iso-grid` isometric grid behind hero; giant gradient wordmark (`.wordmark-mask` + `.wordmark-aurora`: brand-blue ramp from periwinkle to deep blue, one step lighter on dark surfaces, grain) in the footer.
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

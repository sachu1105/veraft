import type { Config } from "tailwindcss";

/**
 * Tokens are defined as RGB channel triples in `:root` (app/globals.css) and
 * mapped here as `rgb(var(--c-…) / <alpha-value>)`, so opacity modifiers like
 * `bg-accent/5` work while the design tokens stay the single source of truth.
 */
const color = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: color("ink"),
        "ink-soft": color("ink-soft"),
        paper: color("paper"),
        mist: color("mist"),
        line: color("line"),
        "line-dark": color("line-dark"),
        muted: color("muted"),
        "muted-dark": color("muted-dark"),
        accent: color("accent"),
        "accent-press": color("accent-press"),
        "accent-2": color("accent-2"),
        danger: color("danger"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.78rem", { lineHeight: "1", letterSpacing: "0.16em" }],
        "display-xl": [
          "clamp(2.75rem, 1.7rem + 4.4vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 1.6rem + 2.9vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        heading: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.012em" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        label: ["0.8125rem", { lineHeight: "1.4" }],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

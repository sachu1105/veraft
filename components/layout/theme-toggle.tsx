"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { THEME_COLORS, THEME_KEY, type Theme } from "@/lib/theme";

/* A tiny external store over <html data-theme>, so every toggle on the page
   (header, mobile menu) stays in sync without context or effects. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode / blocked storage: the choice still applies for this page view.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  listeners.forEach((l) => l());
}

const icon =
  "absolute transition-[transform,opacity] duration-500 ease-out-quint motion-reduce:transition-none";

/**
 * Single theme button. Shows a moon in light mode and a sun in dark mode;
 * the icons rotate and scale into each other on click.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const dark = theme === "dark";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-10 items-center justify-center overflow-hidden rounded-md border border-line bg-paper text-ink/80 transition-colors duration-150 hover:border-ink/25 hover:text-ink",
        className,
      )}
    >
      <Moon
        size={17}
        strokeWidth={1.75}
        aria-hidden
        className={cn(icon, dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")}
      />
      <Sun
        size={17}
        strokeWidth={1.75}
        aria-hidden
        className={cn(icon, dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0")}
      />
    </button>
  );
}

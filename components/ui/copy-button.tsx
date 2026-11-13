"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Copies a value to the clipboard — for visitors whose mail links open the
 * wrong app (or nothing) because they use webmail.
 */
export function CopyButton({
  value,
  label = "Copy",
  tone = "default",
  className,
}: {
  value: string;
  label?: string;
  /** "onColor" for use on a filled/gradient surface: translucent white. */
  tone?: "default" | "onColor";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context / permissions) — the value is still visible to select.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `${label} ${value}`}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-3 text-body-sm transition-colors duration-150",
        tone === "onColor"
          ? "border-on-dark/30 bg-on-dark/10 text-on-dark hover:bg-on-dark/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
          : "border-line bg-paper text-ink hover:border-ink/25 hover:bg-mist",
        className,
      )}
    >
      {copied ? (
        <Check
          size={15}
          strokeWidth={2}
          aria-hidden
          className={tone === "onColor" ? undefined : "text-accent-fg"}
        />
      ) : (
        <Copy size={15} strokeWidth={1.5} aria-hidden />
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

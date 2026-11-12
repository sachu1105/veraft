"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { site } from "@/lib/site";

/**
 * "Email us" button that copies the address to the clipboard instead of
 * following a `mailto:` link — which makes the browser show its own
 * "Open Outlook?" prompt. Falls back to `mailto:` if the clipboard is blocked.
 */
export function CopyEmail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={site.email}
      aria-label={`Copy our email address, ${site.email}`}
      className={className}
    >
      {copied ? (
        <>
          <Check size={15} strokeWidth={2} aria-hidden />
          Email copied
        </>
      ) : (
        children
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? `Copied ${site.email} to clipboard` : ""}
      </span>
    </button>
  );
}

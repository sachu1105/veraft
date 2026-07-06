"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({
  open,
  onClose,
  contactEmail,
}: {
  open: boolean;
  onClose: () => void;
  contactEmail: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Portal target only exists on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  // Portaled to <body>: the header animates with `transform`/`backdrop-filter`,
  // which would otherwise become the containing block for this fixed overlay
  // and clip it to the header's box.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper"
            variants={{
              hidden: { x: "100%" },
              visible: { x: 0 },
            }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Logo onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-mist"
              >
                <X size={22} strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col px-6 pt-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="border-b border-line py-4 font-display text-display-md text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 px-6 pb-10">
              <ButtonLink href="/contact" size="lg" onClick={onClose}>
                Start a project
              </ButtonLink>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 font-mono text-body-sm text-muted hover:text-ink"
              >
                {contactEmail}
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Inbox, Check } from "lucide-react";

/**
 * The signature element: a request flows in, the Veraft agent handles it,
 * a resolved outcome emerges. Ambient motion lives ONLY here.
 *
 * - Request/outcome chips cycle through real-sounding examples.
 * - Accent dots travel the connectors continuously (the "flow").
 * - The agent core pulses while it "works".
 * - Under reduced motion: a single static, resolved state. No looping.
 */

const EXAMPLES = [
  { request: "New support ticket", outcome: "Resolved in 40s" },
  { request: "Invoice received", outcome: "Logged to system" },
  { request: "Customer question", outcome: "Answered from docs" },
  { request: "Form submitted", outcome: "Routed to sales" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function SignaturePipeline() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % EXAMPLES.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const example = EXAMPLES[index];

  return (
    <div
      className="relative w-full rounded-[18px] border border-line bg-paper p-6 sm:p-8"
      role="img"
      aria-label="A request enters, the Veraft agent processes it, and a resolved outcome comes out."
    >
      {/* Console header */}
      <div className="mb-7 flex items-center justify-between">
        <span className="font-mono text-label uppercase tracking-[0.14em] text-muted">
          Live pipeline
        </span>
        <span className="flex items-center gap-1.5 font-mono text-label text-muted">
          <span
            className="size-1.5 rounded-full bg-accent"
            aria-hidden
          />
          running
        </span>
      </div>

      {/* Request / outcome chips, aligned to the nodes below */}
      <div className="flex items-center justify-between gap-3">
        <Chip side="request" reduced={!!reduced} keyId={example.request}>
          {example.request}
        </Chip>
        <Chip side="outcome" reduced={!!reduced} keyId={example.outcome}>
          {example.outcome}
        </Chip>
      </div>

      {/* The pipeline */}
      <div className="mt-5 flex items-center">
        <Node label="Request">
          <Inbox size={22} strokeWidth={1.5} aria-hidden />
        </Node>

        <Connector reduced={!!reduced} delay={0} />

        <AgentNode reduced={!!reduced} />

        <Connector reduced={!!reduced} delay={0.7} />

        <Node label="Outcome" accent>
          <Check size={22} strokeWidth={1.75} aria-hidden />
        </Node>
      </div>
    </div>
  );
}

function Chip({
  children,
  side,
  reduced,
  keyId,
}: {
  children: string;
  side: "request" | "outcome";
  reduced: boolean;
  keyId: string;
}) {
  const accent = side === "outcome";
  const content = (
    <span
      className={
        "inline-flex max-w-[10rem] items-center gap-2 truncate rounded-pill border px-3 py-1.5 font-mono text-label sm:max-w-none " +
        (accent
          ? "border-accent/25 bg-accent/5 text-ink"
          : "border-line bg-mist text-muted")
      }
    >
      <span
        aria-hidden
        className={
          "size-1.5 shrink-0 rounded-full " +
          (accent ? "bg-accent" : "bg-muted")
        }
      />
      {children}
    </span>
  );

  if (reduced) return content;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={keyId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {content}
      </motion.span>
    </AnimatePresence>
  );
}

function Node({
  children,
  label,
  accent = false,
}: {
  children: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5">
      <div
        className={
          "flex size-14 items-center justify-center rounded-[14px] border sm:size-16 " +
          (accent
            ? "border-accent/30 bg-accent/5 text-accent"
            : "border-line bg-mist text-ink")
        }
      >
        {children}
      </div>
      <span className="font-mono text-label text-muted">{label}</span>
    </div>
  );
}

function AgentNode({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5">
      <div className="relative flex size-16 items-center justify-center rounded-[16px] border border-ink/15 bg-ink sm:size-20">
        {/* Pulsing rings — the "working" signal */}
        {!reduced && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-[16px] ring-1 ring-accent/40"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-[16px] ring-1 ring-accent/30"
              animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1,
              }}
            />
          </>
        )}
        {/* Core echoes the logo mark */}
        <motion.span
          aria-hidden
          className="size-4 rounded-full bg-accent sm:size-5"
          animate={
            reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 16px var(--color-accent-2)" }}
        />
      </div>
      <span className="font-mono text-label text-ink">Veraft agent</span>
    </div>
  );
}

function Connector({
  reduced,
  delay,
}: {
  reduced: boolean;
  delay: number;
}) {
  return (
    <div className="relative mx-2 -mt-7 h-px flex-1 sm:mx-3">
      <div className="absolute inset-0 bg-line" />
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ boxShadow: "0 0 12px var(--color-accent-2)" }}
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
            delay,
          }}
        />
      )}
    </div>
  );
}

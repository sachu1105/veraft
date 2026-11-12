"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Terminal } from "lucide-react";
import { consoleTabs, type ConsoleLine } from "@/lib/content";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const who: Record<ConsoleLine["by"], { label: string; className: string }> = {
  cmd: { label: "›", className: "text-muted" },
  sys: { label: "▸", className: "text-muted" },
  claude: { label: "claude", className: "text-accent-fg" },
  chatgpt: { label: "chatgpt", className: "text-ink" },
  deepseek: { label: "deepseek", className: "text-accent-2" },
  gemini: { label: "gemini", className: "text-muted" },
  engineer: { label: "engineer", className: "text-ink font-semibold" },
};

/**
 * Tabbed "agent session" — one tab per delivery stage, showing which agent
 * did what and where an engineer signed off. Illustrative example.
 */
export function AgentConsole() {
  const [active, setActive] = useState(consoleTabs[2].id);
  const tab = consoleTabs.find((t) => t.id === active) ?? consoleTabs[0];
  const baseId = useId();

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Delivery stage"
        className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-paper p-1 shadow-[0_1px_2px_rgb(var(--c-ink)/0.04)] [scrollbar-width:none]"
      >
        {consoleTabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActive(t.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-body-sm transition-colors duration-150",
                selected
                  ? "bg-paper text-ink shadow-[0_1px_3px_rgb(var(--c-ink)/0.12)] ring-1 ring-line"
                  : "text-muted hover:text-ink",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab.id}`}
        className="mt-5 overflow-hidden rounded-xl border border-line bg-paper"
      >
        <div className="flex items-center justify-between border-b border-line bg-mist/60">
          <div className="flex">
            <span className="flex items-center gap-2 border-r border-line bg-paper px-4 py-3 font-mono text-label text-ink">
              <Terminal size={14} strokeWidth={1.75} className="text-accent-fg" aria-hidden />
              {tab.id}.log
            </span>
            <span className="hidden items-center gap-2 border-r border-line px-4 py-3 font-mono text-label text-muted sm:flex">
              estimate.json
            </span>
          </div>
          <span className="pr-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            example session
          </span>
        </div>

        <div className="min-h-[260px] overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.9] sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ol
              key={tab.id}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            >
              {tab.lines.map((line, i) => {
                const w = who[line.by];
                return (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                    className="flex gap-3 sm:whitespace-nowrap"
                  >
                    {line.by === "cmd" ? (
                      <>
                        <span className="text-accent-fg">veraft</span>
                        <span className="text-ink">{line.text}</span>
                      </>
                    ) : (
                      <>
                        <span className={cn("inline-block w-[5.5rem] shrink-0", w.className)}>
                          {line.by === "sys" ? "  ▸" : `  ${w.label}`}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1.5",
                            line.by === "engineer" ? "text-ink" : "text-muted",
                          )}
                        >
                          {line.by === "engineer" && (
                            <Check size={14} strokeWidth={2.25} className="text-accent-fg" aria-hidden />
                          )}
                          {line.text}
                        </span>
                      </>
                    )}
                  </motion.li>
                );
              })}
            </motion.ol>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

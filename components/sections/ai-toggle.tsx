"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";

/**
 * Statement block with a working switch in the middle of the headline.
 * Flip it off to see what the same project looks like without agents.
 */
export function AiToggle() {
  const [on, setOn] = useState(true);

  return (
    <Section aria-labelledby="ai-toggle-heading">
      <div className="px-6 text-center sm:px-10">
        <h2 id="ai-toggle-heading" className="text-display-lg text-ink">
          Ship real products with an
          <br className="hidden sm:block" />{" "}
          <span
            className={cn(
              "whitespace-nowrap transition-colors duration-300",
              on ? "text-ink" : "text-muted/50",
            )}
          >
            AI-native
          </span>{" "}
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="AI agents"
            onClick={() => setOn((v) => !v)}
            className={cn(
              "relative mx-1 inline-flex h-[0.82em] w-[1.5em] translate-y-[0.08em] items-center rounded-full align-baseline transition-[background-color,box-shadow] duration-300 ease-out-quint",
              on
                ? "bg-accent shadow-[0_12px_40px_-6px_rgb(var(--c-accent)/0.65)]"
                : "bg-line shadow-none",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1/2 size-[0.62em] -translate-y-1/2 rounded-full bg-on-accent shadow-sm transition-[left] duration-300 ease-out-quint",
                on ? "left-[calc(100%-0.72em)]" : "left-[0.1em]",
              )}
            />
          </button>{" "}
          team
        </h2>

        <p
          aria-live="polite"
          className="mx-auto mt-7 max-w-xl text-body-lg text-muted"
        >
          {on
            ? "Agents do the heavy lifting. Engineers make the calls."
            : "Same team, weeks of boilerplate — billed by the hour."}
        </p>
      </div>
    </Section>
  );
}

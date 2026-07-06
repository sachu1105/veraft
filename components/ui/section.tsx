import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ColumnFrame } from "./column-frame";

type Tone = "paper" | "mist" | "ink";
// Constrained to HTML tags on purpose: an open `ElementType` here would
// intersect with the three.js elements R3F merges into JSX, collapsing the
// children type to `never`.
type SectionTag = "section" | "div" | "article" | "aside";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink-soft text-paper",
};

/**
 * Vertical rhythm wrapper. ~96–160px padding on desktop, scaled down on
 * mobile. `tone` switches between the light surfaces and the dark sections.
 */
export function Section({
  children,
  tone = "paper",
  className,
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: SectionTag;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-20 sm:py-28 lg:py-32",
        toneClass[tone],
        className,
      )}
    >
      <ColumnFrame onDark={tone === "ink"} />
      {children}
    </Tag>
  );
}

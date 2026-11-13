import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "paper" | "mist" | "deep";
type Padding = "default" | "compact" | "none";
type SectionTag = "section" | "div" | "article" | "aside" | "header";

/**
 * Section backgrounds. Alternate them so the page has rhythm instead of one
 * long white sheet. `deep` is a navy block in both themes: `.surface-deep`
 * re-maps every token inside it, so children use the usual utilities.
 */
const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  deep: "surface-deep bg-paper text-ink",
};

const paddingClass: Record<Padding, string> = {
  default: "py-20 sm:py-24 lg:py-28",
  compact: "py-14 sm:py-16",
  none: "",
};

/**
 * A small accent square that sits on the intersection of the column frame
 * and a section's bottom hairline — the "blueprint" corner marker.
 */
export function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 hidden size-1.5 bg-ink min-[1264px]:block",
        className,
      )}
    />
  );
}

/**
 * The page is built from stacked "blocks": each is full-bleed with a bottom
 * hairline, and its 1200px content column carries vertical hairlines (on wide
 * screens) with accent squares where the lines meet. Brick by brick.
 */
export function Section({
  children,
  tone = "paper",
  padding = "default",
  className,
  frameClassName,
  as: Tag = "section",
  id,
  corners = true,
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  padding?: Padding;
  /** Classes for the full-bleed outer element (backgrounds, overflow). */
  className?: string;
  /** Classes for the framed 1200px column. */
  frameClassName?: string;
  as?: SectionTag;
  id?: string;
  corners?: boolean;
  "aria-labelledby"?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative border-b border-line",
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "relative mx-auto h-full w-full max-w-[1200px] min-[1264px]:border-x min-[1264px]:border-line",
          paddingClass[padding],
          frameClassName,
        )}
      >
        {children}
        {corners && (
          <>
            <Corner className="-bottom-[3.5px] -left-[3.5px]" />
            <Corner className="-bottom-[3.5px] -right-[3.5px]" />
          </>
        )}
      </div>
    </Tag>
  );
}

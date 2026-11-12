import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal gutters inside a framed <Section>. The section already caps the
 * width at 1200px; this only insets content from the frame lines.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-12", className)}>
      {children}
    </div>
  );
}

import { cn } from "@/lib/cn";

/**
 * Small mono label above headings. The blue square is the only color spent
 * here — keeps the "software / data" texture without shouting.
 */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-eyebrow uppercase",
        onDark ? "text-muted-dark" : "text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-[2px] bg-accent" />
      {children}
    </span>
  );
}

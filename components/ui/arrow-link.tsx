import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Text link with a nudging arrow. Accent-colored — links are one of the
 * few places the accent is spent.
 */
export function ArrowLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-body-sm font-medium",
        onDark ? "text-accent-2" : "text-accent",
        className,
      )}
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={1.75}
        aria-hidden
        className="transition-transform duration-150 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5"
      />
    </Link>
  );
}

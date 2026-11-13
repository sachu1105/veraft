import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Brand logo: the word "veraft" set in Geist — no image. Lowercase, semibold,
 * tight tracking. Uses `text-ink`, so it follows the theme automatically.
 */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Veraft — home"
      className={cn(
        "inline-flex items-center rounded-md text-[1.3125rem] font-semibold leading-none tracking-[-0.045em] text-ink md:text-[1.4375rem]",
        className,
      )}
    >
      veraft
    </Link>
  );
}

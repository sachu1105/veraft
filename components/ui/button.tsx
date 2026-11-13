import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium leading-none " +
  "transition duration-150 ease-out-quint " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // The one place the accent fills a surface.
  primary: "bg-accent text-on-accent hover:bg-accent-press",
  secondary:
    "border border-line bg-paper text-ink shadow-[0_1px_2px_rgb(var(--c-ink)/0.05)] hover:border-ink/25 hover:bg-mist",
  ghost: "text-ink hover:bg-mist",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-body-sm",
  // A touch more compact on phones so two lg buttons fit side by side.
  lg: "h-12 px-4 text-body-sm sm:h-[3.25rem] sm:px-7 sm:text-body",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = { variant?: Variant; size?: Size };

/** Anchor-style CTA (internal routes via next/link). */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & { children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Real <button> for forms and JS handlers. */
export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...rest
}: StyleProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Trimmed from the supplied public/images/veraft-logo.png (transparent PNG,
// pure-black wordmark). Intrinsic size of the trimmed asset:
const LOGO = {
  src: "/images/veraft-logo-trimmed.png",
  width: 1296,
  height: 401,
};

/**
 * Brand logo. Renders the Veraft wordmark image. On dark surfaces the
 * pure-black artwork is inverted to white.
 */
export function Logo({
  className,
  onDark = false,
  onClick,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Veraft — home"
      className={cn("inline-flex items-center rounded-md", className)}
    >
      <Image
        src={LOGO.src}
        width={LOGO.width}
        height={LOGO.height}
        alt="Veraft"
        priority={priority}
        className={cn("h-7 w-auto", onDark && "invert")}
      />
    </Link>
  );
}

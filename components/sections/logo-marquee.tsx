import Image from "next/image";
import { ColumnFrame } from "@/components/ui/column-frame";

/**
 * Auto-scrolling client/partner logo strip (the Stripe "trusted by" device):
 * seamless infinite loop, pauses on hover, fades at both edges, and freezes
 * under prefers-reduced-motion.
 *
 * TODO: replace the placeholder wordmarks below with real client logos. Drop
 * SVG/PNG files into `public/images/logos/` and give each item a `src` — the
 * component renders an <Image> when `src` is present, otherwise the `name`
 * as a styled wordmark.
 */
type Client = { name: string; src?: string; width?: number; height?: number };

const clients: Client[] = [
  { name: "Northwind" },
  { name: "Lumen" },
  { name: "Vertex" },
  { name: "Meridian" },
  { name: "Atlas" },
  { name: "Cobalt" },
  { name: "Hartwell" },
  { name: "Juno" },
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-x-16 pr-16"
    >
      {clients.map((c) => (
        <li key={c.name} className="flex items-center">
          {c.src ? (
            <Image
              src={c.src}
              alt={c.name}
              width={c.width ?? 120}
              height={c.height ?? 32}
              className="h-7 w-auto opacity-70 grayscale transition hover:opacity-100"
            />
          ) : (
            <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-ink/55">
              {c.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-paper py-9">
      <ColumnFrame />
      <p className="relative mb-8 text-center text-body-sm text-muted">
        Trusted to build the software behind everyday operations.
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="flex w-max animate-marquee [animation-play-state:running] hover:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

/**
 * Auto-scrolling client/partner logo strip (the Stripe "trusted by" device):
 * full-bleed, seamless infinite loop, pauses on hover while the other logos
 * dim, fades at both edges, and freezes under prefers-reduced-motion.
 *
 * Seamless trick: the row is rendered twice and the track animates by exactly
 * -50%. Each row carries its own trailing gap (`pr-16` == `gap-x-16`) so its
 * width is a clean unit and -50% lands precisely on the duplicate — no jump.
 *
 * TODO: replace the placeholder wordmarks with real client logos. Drop
 * SVG/PNG files into `public/images/logos/` and give each item a `src`; the
 * component renders an <Image> when `src` is present, otherwise the styled
 * `name`. Add as many as you like — more logos = a longer, fuller loop.
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
        <li
          key={c.name}
          className="flex items-center transition-opacity duration-300 group-has-[li:hover]/m:opacity-30 hover:!opacity-100"
        >
          {c.src ? (
            <Image
              src={c.src}
              alt={c.name}
              width={c.width ?? 120}
              height={c.height ?? 32}
              className="h-8 w-auto"
            />
          ) : (
            <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-ink/60">
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
    <section className="border-y border-line bg-paper py-9">
      <p className="mb-8 text-center text-body-sm text-muted">
        Trusted to build the software behind everyday operations.
      </p>
      {/* Full-bleed viewport with edge fade. `group/m` drives the hover state. */}
      <div className="group/m relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max animate-marquee group-hover/m:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}

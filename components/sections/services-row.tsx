import Link from "next/link";
import { ArrowRight, Bot, CloudUpload, Globe, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pillars } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** Icon per pillar — used by the services overview list. */
export const pillarIcons: Record<string, LucideIcon> = {
  "web-development": Globe,
  "ai-solutions": Bot,
  automation: Workflow,
  deployment: CloudUpload,
};

/**
 * The four services as a timeline: a row of dots joined by a hairline, each
 * with a title, one line of description and a mono label. Horizontal on
 * desktop, a vertical timeline on small screens. Sits on the navy block.
 */
export function ServicesRow({
  heading = "Four bricks. Use one, or stack them all.",
}: {
  heading?: string;
}) {
  return (
    <Section tone="deep" aria-labelledby="services-heading">
      <div className="px-6 sm:px-10 lg:px-12">
        <h2 id="services-heading" className="max-w-2xl text-display-md text-ink">
          {heading}
        </h2>

        <ol className="mt-14 grid gap-x-10 lg:mt-16 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const first = i === 0;
            const last = i === pillars.length - 1;
            return (
              <li key={p.slug} className="relative">
                {/* Connector: vertical on mobile, horizontal on desktop */}
                {!last && (
                  <>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[6px] top-6 w-px bg-line lg:hidden"
                    />
                    <span
                      aria-hidden
                      className="absolute -right-7 left-6 top-[6px] hidden h-px bg-line lg:block"
                    />
                  </>
                )}

                <Link
                  href={p.href}
                  className="group block pb-10 pl-9 lg:pb-0 lg:pl-0 lg:pr-4"
                >
                  {/* Dot */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 flex size-[13px] items-center justify-center rounded-full transition-colors duration-200",
                      first ? "bg-accent-fg/20" : "bg-line group-hover:bg-accent-fg/20",
                    )}
                  >
                    <span
                      className={cn(
                        "size-[5px] rounded-full transition-colors duration-200",
                        first ? "bg-accent-fg" : "bg-muted group-hover:bg-accent-fg",
                      )}
                    />
                  </span>

                  <h3 className="text-body font-medium text-ink transition-colors group-hover:text-accent-fg lg:mt-14">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-muted">{p.tagline}</p>
                  <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted/80">
                    {String(i + 1).padStart(2, "0")} · {p.offerings.length} services
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>

        <Link
          href="/services"
          className="group mt-4 inline-flex items-center gap-1.5 text-body-sm text-muted transition-colors hover:text-ink lg:mt-16"
        >
          View all services
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            aria-hidden
            className="transition-transform duration-150 ease-out-quint group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </Section>
  );
}

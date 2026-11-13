import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, CloudUpload, Globe, PenTool, Rocket, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pillars } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Icon per pillar — used by the home grid and the services overview. */
export const pillarIcons: Record<string, LucideIcon> = {
  mvp: Rocket,
  "web-development": Globe,
  "ai-solutions": Bot,
  "product-design": PenTool,
  security: ShieldCheck,
  deployment: CloudUpload,
};

/**
 * The service pillars as a hairline grid on the deep block: icon, number,
 * title and one line each. The whole cell links to the pillar page.
 */
export function ServicesRow({
  heading = "Complete engineering capabilities.",
}: {
  heading?: string;
}) {
  return (
    <Section tone="deep" aria-labelledby="services-heading">
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 id="services-heading" className="mt-5 max-w-xl text-display-md text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-lg text-body-lg text-muted">
            From the first requirement to production. Use one, or let us deliver
            the whole product.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[p.slug];
            return (
              <li key={p.slug} className="bg-paper">
                <Link
                  href={p.href}
                  className="group flex h-full items-start gap-4 p-5 sm:flex-col sm:items-stretch sm:gap-0 sm:p-7"
                >
                  {/* Phones: icon beside the text, as a compact row. sm+: a card. */}
                  <div className="flex shrink-0 items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-md border border-line text-accent-fg">
                      {Icon && <Icon size={19} strokeWidth={1.5} aria-hidden />}
                    </span>
                    <span className="hidden font-mono text-label text-muted sm:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1.5 text-heading text-ink transition-colors group-hover:text-accent-fg sm:mt-8">
                      {p.title}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        aria-hidden
                        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </h3>
                    <p className="mt-1 text-body-sm text-muted sm:mt-2">{p.tagline}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/services"
          className="group mt-8 inline-flex items-center gap-1.5 text-body-sm text-muted transition-colors hover:text-ink"
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

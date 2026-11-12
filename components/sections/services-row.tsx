import Link from "next/link";
import { ArrowRight, Bot, CloudUpload, Globe, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pillars } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

export const pillarIcons: Record<string, LucideIcon> = {
  "web-development": Globe,
  "ai-solutions": Bot,
  automation: Workflow,
  deployment: CloudUpload,
};

/** The four services as one row of linked bricks. */
export function ServicesRow({
  eyebrow = "What we build",
  heading = "Four bricks. Use one, or stack them all.",
}: {
  eyebrow?: string;
  heading?: string;
}) {
  return (
    <Section padding="none" aria-labelledby="services-heading">
      <div className="px-6 pb-12 pt-20 sm:px-10 sm:pt-24 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="services-heading" className="mt-5 max-w-2xl text-display-md text-ink">
          {heading}
        </h2>
      </div>
      <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const Icon = pillarIcons[p.slug] ?? Globe;
          return (
            <li key={p.slug} className="bg-paper">
              <Link
                href={p.href}
                className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-mist/70 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-md border border-line bg-paper text-ink transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon size={20} strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="font-mono text-label text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-heading text-ink">{p.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-body-sm font-medium text-accent">
                  Explore
                  <ArrowRight
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden
                    className="transition-transform duration-150 ease-out-quint group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

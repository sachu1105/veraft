import Link from "next/link";
import { ArrowRight, Bot, Globe, LayoutGrid, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pillars, type Pillar } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import {
  RevealGroup,
  RevealItem,
} from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  "ai-solutions": Bot,
  "custom-software": LayoutGrid,
  "web-development": Globe,
  automation: Workflow,
};

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = icons[pillar.slug] ?? Bot;
  return (
    <Link
      href={pillar.href}
      className={cn(
        "group flex h-full flex-col rounded-card border border-line bg-paper p-6 sm:p-7",
        "transition-colors duration-200 hover:border-ink/20 hover:bg-mist/60",
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-[11px] border border-line bg-mist text-ink transition-colors duration-200 group-hover:border-accent/30 group-hover:text-accent">
        <Icon size={20} strokeWidth={1.5} aria-hidden />
      </span>

      <h3 className="mt-5 text-heading text-ink">{pillar.title}</h3>
      <p className="mt-2.5 text-body-sm text-muted">{pillar.summary}</p>

      <p className="mt-5 font-mono text-label text-muted/80">
        {pillar.offerings.slice(0, 3).join(" · ")}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent">
        Explore
        <ArrowRight
          size={16}
          strokeWidth={1.75}
          aria-hidden
          className="transition-transform duration-150 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export function Pillars({
  eyebrow = "What we do",
  heading = "Four ways we build with you.",
  intro,
  tone = "paper",
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  tone?: "paper" | "mist";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display-md text-ink">{heading}</h2>
          {intro && <p className="mt-5 text-body-lg text-muted">{intro}</p>}
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.slug} className="h-full">
              <PillarCard pillar={pillar} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

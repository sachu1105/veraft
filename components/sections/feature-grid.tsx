import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  GitPullRequest,
  LayoutDashboard,
  LayoutTemplate,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Cell shell                                                          */
/* ------------------------------------------------------------------ */

function FeatureCell({
  title,
  body,
  points,
  href,
  cta,
  visual,
  className,
}: {
  title: string;
  body: string;
  points?: string[];
  href: string;
  cta: string;
  visual: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex flex-col overflow-hidden", className)}>
      <div className="px-6 pt-14 sm:px-10 sm:pt-16 lg:px-12">
        <h3 className="text-[1.5rem] leading-tight tracking-[-0.02em] text-ink">{title}</h3>
        <p className="mt-3 max-w-lg text-body-sm text-muted">{body}</p>
        {points && (
          <ul className="mt-5 flex flex-col gap-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-body-sm text-ink">
                <Check size={16} strokeWidth={2} className="mt-[3px] shrink-0 text-accent-fg" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={href}
          className="mt-7 inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-3.5 py-2 text-body-sm text-ink shadow-[0_1px_2px_rgb(var(--c-ink)/0.05)] transition-colors hover:border-ink/25 hover:bg-mist"
        >
          {cta}
          <ArrowUpRight size={15} strokeWidth={1.75} className="text-accent-fg" aria-hidden />
        </Link>
      </div>
      <div aria-hidden className="relative mt-12 flex flex-1 flex-col justify-end">
        {visual}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals (decorative, illustrative)                                  */
/* ------------------------------------------------------------------ */

function ReviewVisual() {
  return (
    <div className="ml-6 rounded-tl-xl border-l border-t border-line bg-paper shadow-[0_-20px_60px_-30px_rgb(var(--c-accent)/0.35)] sm:ml-10 lg:ml-12">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <span className="flex min-w-0 items-center gap-2.5 text-body-sm text-ink">
          <GitPullRequest size={16} strokeWidth={1.75} className="shrink-0 text-accent-fg" />
          <span className="truncate">#42 Booking availability engine</span>
        </span>
        <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.6875rem] text-on-accent">
          approved
        </span>
      </div>
      <div className="px-5 py-4 font-mono text-[0.75rem] leading-[1.9]">
        <p className="text-muted">deepseek opened · claude reviewed · +412 −38</p>
        <p className="mt-2 text-accent-fg">+ export async function getSlots(day, staffId) {"{"}</p>
        <p className="text-accent-fg">+   const tz = clinic.timezone;</p>
        <p className="text-muted line-through decoration-muted/40">-   const tz = &quot;UTC&quot;; // TODO</p>
        <p className="text-accent-fg">+   return freeSlots(day, staffId, tz);</p>
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-line bg-mist px-3 py-2.5 font-sans text-[0.8125rem] leading-snug text-ink">
          <MessageSquare size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent-fg" />
          <span>
            <span className="font-semibold">engineer:</span>{" "}use the clinic&apos;s timezone, not
            UTC — DST will bite. <span className="text-accent-fg">✓ resolved</span>
          </span>
        </div>
      </div>
    </div>
  );
}

const pipeline = [
  { step: "build", time: "1m 12s" },
  { step: "test · 264 passing", time: "48s" },
  { step: "security scan", time: "22s" },
  { step: "migrate database", time: "6s" },
];

function DeployVisual() {
  return (
    <div className="flex justify-center px-6 pb-0">
      <div className="relative w-full max-w-sm">
        <span className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[0.75rem] text-paper shadow-lg">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
          </span>
          live
        </span>
        <div className="rounded-t-2xl border-x border-t border-line bg-mist p-2 pb-0">
          <div className="rounded-t-xl border-x border-t border-line bg-paper px-5 pb-6 pt-7">
            <ul className="flex flex-col gap-2.5 font-mono text-[0.75rem]">
              {pipeline.map((p) => (
                <li key={p.step} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-ink">
                    <Check size={14} strokeWidth={2.25} className="text-accent-fg" />
                    {p.step}
                  </span>
                  <span className="text-muted">{p.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 font-mono text-[0.75rem]">
              <span className="text-ink">app.yourclinic.com</span>
              <span className="text-accent-fg">deployed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const checks = [
  { label: "Tests passing", value: "264 / 264", pct: 100 },
  { label: "Dependency audit", value: "0 critical", pct: 100 },
  { label: "OWASP Top 10 review", value: "10 / 10", pct: 100 },
  { label: "Lighthouse performance", value: "96", pct: 96 },
];

function QualityVisual() {
  return (
    <div className="ml-6 rounded-tl-xl border-l border-t border-line bg-paper px-5 pb-8 pt-5 shadow-[0_-20px_60px_-30px_rgb(var(--c-accent)/0.35)] sm:ml-10 lg:ml-12">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
        Milestone 3 · quality gate
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {checks.map((c) => (
          <li key={c.label}>
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-ink">{c.label}</span>
              <span className="font-mono text-label text-accent-fg">{c.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist">
              <div className="h-full rounded-full bg-accent" style={{ width: `${c.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const screens: { file: string; icon: LucideIcon }[] = [
  { file: "landing.tsx", icon: LayoutTemplate },
  { file: "dashboard.tsx", icon: LayoutDashboard },
  { file: "checkout.tsx", icon: CreditCard },
  { file: "app.native.tsx", icon: Smartphone },
];

function ScreensVisual() {
  return (
    <div className="relative h-[300px]">
      {screens.map(({ file, icon: Icon }, i) => (
        <div
          key={file}
          className="absolute right-0 rounded-tl-xl border-l border-t border-line bg-paper shadow-[0_-12px_30px_-18px_rgb(var(--c-ink)/0.25)]"
          style={{ top: `${i * 66}px`, left: `${(3 - i) * 32 + 24}px`, bottom: 0 }}
        >
          <div className="flex items-center border-b border-line">
            <span className="flex items-center gap-2.5 border-r border-line px-5 py-3.5 text-body text-ink">
              <Icon size={18} strokeWidth={1.75} className="text-accent-fg" />
              {file}
            </span>
          </div>
          {i === screens.length - 1 && (
            <div className="flex gap-2 px-5 py-5">
              <span className="h-2.5 w-24 rounded-full bg-mist" />
              <span className="h-2.5 w-24 rounded-full bg-mist" />
              <span className="h-2.5 w-14 rounded-full bg-mist" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The 2×2 grid                                                        */
/* ------------------------------------------------------------------ */

export function FeatureGrid() {
  return (
    <>
      <Section padding="none" aria-label="Build and deploy">
        <div className="grid divide-y divide-line lg:grid-cols-[1.25fr_1fr] lg:divide-x lg:divide-y-0">
          <FeatureCell
            title="Production-grade, not prototype-grade"
            body="Anyone can get a demo out of a chatbot. We build the parts demos skip — auth, data models, error handling, edge cases — in code your next developer can actually read."
            points={["Engineer review on every pull request", "Typed, tested and documented"]}
            href="/services/web-development"
            cta="Explore web apps & SaaS"
            visual={<ReviewVisual />}
          />
          <FeatureCell
            title="Deployed, monitored, handed over"
            body="Hosting, CI/CD, domains, monitoring and backups — set up in accounts you own. Keep the keys, or let us keep it running."
            points={["Your cloud and repo — no lock-in", "Optional care plan after launch"]}
            href="/services/deployment"
            cta="Explore deploy & maintain"
            visual={<DeployVisual />}
          />
        </div>
      </Section>

      <Section padding="none" aria-label="Quality and design">
        <div className="grid divide-y divide-line lg:grid-cols-[1fr_1.15fr] lg:divide-x lg:divide-y-0">
          <FeatureCell
            title="Security and quality, brick by brick"
            body="Every layer is checked before the next goes on: automated tests, dependency audits, an auth review and accessibility checks at each milestone."
            points={["Quality gate at every milestone", "Secrets, rate limits and backups by default"]}
            href="/approach"
            cta="See our process"
            visual={<QualityVisual />}
          />
          <FeatureCell
            title="UI/UX shaped around your users"
            body="From your brand kit or from scratch — interfaces designed for the people who'll use them, responsive on every screen, web or mobile."
            href="/contact"
            cta="Talk about your product"
            visual={<ScreensVisual />}
          />
        </div>
      </Section>
    </>
  );
}

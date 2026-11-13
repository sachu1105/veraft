import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Gauge,
  ListChecks,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/*
 * The value proposition as four cards: intelligent AI, specialised
 * expertise, production-ready quality and design. (Speed is told by the
 * process section.) Mockups
 * stay in plain English for non-technical clients.
 */

/* ------------------------------------------------------------------ */
/* Card shell                                                          */
/* ------------------------------------------------------------------ */

/**
 * Ramp-style feature card: stone surface, a fine dot texture, a two-tone
 * heading (dark lead + grey continuation), a square arrow button, and an
 * illustrative app-window mockup anchored to the bottom edge. The whole card
 * is the link.
 */
function FeatureCard({
  lead,
  rest,
  href,
  dotsAt,
  className,
  children,
}: {
  lead: string;
  rest: string;
  href: string;
  /** Tailwind arbitrary property placing the dot texture, e.g. "[--dots-at:…]". */
  dotsAt: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex h-[27rem] flex-col overflow-hidden rounded-2xl border border-stone-line bg-stone transition-[border-color,box-shadow] duration-300 ease-out-quint hover:border-ink/15 hover:shadow-raised",
        className,
      )}
    >
      <span aria-hidden className={cn("bg-dots pointer-events-none absolute inset-0 -z-10", dotsAt)} />
      <div className="flex items-start justify-between gap-6 px-6 pt-6 sm:px-8 sm:pt-8">
        <h3 className="max-w-[20rem] text-[1.375rem] leading-[1.22] tracking-[-0.02em] text-ink sm:text-[1.5rem]">
          {lead} <span className="text-stone-muted">{rest}</span>
        </h3>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-stone-line bg-sheet text-ink shadow-[0_1px_2px_rgb(var(--c-shadow)/0.06)] transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
        </span>
      </div>
      <div aria-hidden className="relative mt-6 flex-1">
        {children}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Mockup primitives                                                   */
/* ------------------------------------------------------------------ */

/** A white app window with grey "traffic light" dots and an optional title. */
function Window({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-t-xl border border-b-0 border-stone-line bg-sheet shadow-raised",
        className,
      )}
    >
      <div className="relative flex h-8 items-center gap-1.5 border-b border-stone-line px-3">
        <span className="size-2 rounded-full bg-stone-line" />
        <span className="size-2 rounded-full bg-stone-line" />
        <span className="size-2 rounded-full bg-stone-line" />
        {title && (
          <span className="absolute inset-x-0 text-center text-[0.6875rem] text-muted">{title}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Small green status pill — the "it's done" signal clients look for. */
function Done({ children = "Done" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-spot-green/10 px-2 py-0.5 text-[0.6875rem] font-medium text-spot-green">
      <Check size={11} strokeWidth={3} />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Specialised expertise — a preview + updates                     */
/* ------------------------------------------------------------------ */

const slots = ["9:00", "9:30", "10:00", "11:30", "2:00", "3:30"];

function PreviewVisual() {
  return (
    <>
      <Window title="preview.yourclinic.com" className="bottom-0 left-6 right-16 top-14 sm:left-8 sm:right-24">
        <div className="p-5">
          <p className="text-label font-medium text-ink">Book an appointment</p>
          <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-[0.6875rem]">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-md py-1.5",
                  i === 2 ? "bg-accent text-on-accent" : "bg-stone text-muted",
                )}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[0.6875rem]">
            {slots.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "rounded-md border py-1.5",
                  i === 1 ? "border-ink font-medium text-ink" : "border-stone-line text-ink",
                )}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-stone-line px-3 py-2.5">
            <span className="text-[0.75rem] text-ink">Dr. Mehta · Wed, 9:30</span>
            <span className="rounded-md bg-accent px-2.5 py-1 text-[0.6875rem] font-medium text-on-accent">
              Confirm
            </span>
          </div>
        </div>
      </Window>

      <div className="absolute left-12 top-0 max-w-[15rem] rounded-2xl rounded-bl-md bg-sheet px-4 py-3 text-body-sm leading-snug text-ink shadow-raised sm:left-16">
        ✨ Frontend, backend and database built in parallel.
      </div>
      <div className="absolute right-4 top-[7.5rem] max-w-[15rem] rounded-2xl rounded-br-md bg-sheet px-4 py-3 text-body-sm leading-snug text-ink shadow-raised sm:right-6">
        ✅ Reviewed by your engineer — 3 fixes made.
        <span className="mt-1.5 block text-[0.75rem] text-muted">Try it on your preview link.</span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Quality — a plain-English quality report                        */
/* ------------------------------------------------------------------ */

const report: { icon: LucideIcon; label: string; chip: string; status: ReactNode }[] = [
  { icon: UserCheck, label: "Code review", chip: "bg-spot-violet/10 text-spot-violet", status: <Done>Approved</Done> },
  { icon: ListChecks, label: "Automated tests", chip: "bg-spot-sky/10 text-spot-sky", status: <Done>Passing</Done> },
  { icon: Smartphone, label: "Works on phones", chip: "bg-spot-orange/10 text-spot-orange", status: <Done>Checked</Done> },
  { icon: ShieldCheck, label: "Security checks", chip: "bg-spot-rose/10 text-spot-rose", status: <Done>Passed</Done> },
  {
    icon: Gauge,
    label: "Speed score",
    chip: "bg-spot-amber/10 text-spot-amber",
    status: <span className="rounded-full bg-spot-sky/10 px-2 py-0.5 text-[0.6875rem] font-medium text-spot-sky">96 / 100</span>,
  },
];

function QualityVisual() {
  return (
    <Window className="bottom-0 left-6 right-6 top-2 sm:left-8 sm:right-8">
      <div className="flex items-center justify-between border-b border-stone-line px-4 py-3">
        <span className="text-label font-medium text-ink">Quality report</span>
        <span className="text-[0.6875rem] text-muted">Milestone 3</span>
      </div>
      <ul>
        {report.map(({ icon: Icon, label, chip, status }) => (
          <li key={label} className="flex items-center gap-3 border-b border-stone-line/70 px-4 py-2.5 last:border-0">
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", chip)}>
              <Icon size={14} strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1 truncate text-body-sm text-ink">{label}</span>
            {status}
          </li>
        ))}
      </ul>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Designed around your users — desktop + phone                    */
/* ------------------------------------------------------------------ */

function DesignVisual() {
  return (
    <>
      <Window className="bottom-0 left-6 right-14 top-4 sm:left-8">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-12 rounded-full bg-ink/80" />
            <span className="flex gap-2">
              <span className="h-1.5 w-6 rounded-full bg-stone-line" />
              <span className="h-1.5 w-6 rounded-full bg-stone-line" />
              <span className="h-1.5 w-6 rounded-full bg-stone-line" />
            </span>
          </div>
          <div className="mt-5 h-3 w-4/5 rounded-full bg-ink/80" />
          <div className="mt-2 h-3 w-3/5 rounded-full bg-ink/80" />
          <div className="mt-3 h-1.5 w-2/3 rounded-full bg-stone-line" />
          <div className="mt-3 h-5 w-16 rounded-md bg-ink" />
          <div className="mt-4 h-24 rounded-lg bg-gradient-to-br from-accent via-accent/50 to-stone" />
        </div>
      </Window>

      {/* Phone */}
      <div className="absolute -bottom-6 right-5 h-[15.5rem] w-[8.25rem] rounded-[1.6rem] border-[5px] border-ink bg-sheet p-2 shadow-raised">
        <span className="mx-auto block h-1.5 w-10 rounded-full bg-ink/80" />
        <div className="mt-3 h-14 rounded-lg bg-gradient-to-br from-accent to-accent/30" />
        {["bg-spot-violet/15", "bg-spot-green/15", "bg-spot-orange/15"].map((tone) => (
          <div key={tone} className="mt-2 flex items-center gap-1.5">
            <span className={cn("size-5 shrink-0 rounded-md", tone)} />
            <span className="flex-1 space-y-1">
              <span className="block h-1.5 w-full rounded-full bg-stone-line" />
              <span className="block h-1.5 w-2/3 rounded-full bg-stone-line" />
            </span>
          </div>
        ))}
        <div className="mt-3 h-5 rounded-md bg-accent" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Intelligent AI — each task routed to the right model             */
/* ------------------------------------------------------------------ */

const routes: { task: string; to: string; tone: string; human?: boolean }[] = [
  { task: "Fix a typo on the pricing page", to: "Lightweight model", tone: "bg-spot-green/10 text-spot-green" },
  { task: "Build the checkout flow", to: "Coding model", tone: "bg-spot-sky/10 text-spot-sky" },
  { task: "Plan how the data is stored", to: "Reasoning model", tone: "bg-spot-violet/10 text-spot-violet" },
  { task: "Approve the release", to: "Senior engineer", tone: "bg-ink/[0.07] text-ink", human: true },
];

function RoutingVisual() {
  return (
    <Window title="Task routing" className="bottom-0 left-6 right-6 top-2 sm:left-8 sm:right-8">
      <ul className="px-4 pt-2">
        {routes.map((r) => {
          const Icon = r.human ? UserCheck : Sparkles;
          return (
            <li key={r.task} className="flex items-center gap-3 border-b border-stone-line/70 py-2.5">
              <span className="min-w-0 flex-1 truncate text-body-sm text-ink">{r.task}</span>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
                  r.tone,
                )}
              >
                <Icon size={11} strokeWidth={2.25} />
                {r.to}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="px-4 pb-5 pt-4">
        <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted">AI cost for the same work</p>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="w-24 shrink-0 text-[0.6875rem] text-muted">One big model</span>
          <span className="h-2 flex-1 rounded-full bg-ink/15" />
        </div>
        <div className="mt-2 flex items-center gap-2.5">
          <span className="w-24 shrink-0 text-[0.6875rem] font-medium text-ink">Right model</span>
          <span className="flex-1">
            <span className="block h-2 w-[45%] rounded-full bg-accent" />
          </span>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* The grid: two cards, then three                                     */
/* ------------------------------------------------------------------ */

export function FeatureGrid() {
  return (
    <Section aria-label="Why teams build with Veraft">
      <div className="grid gap-4 px-6 sm:px-10 lg:grid-cols-2 lg:gap-5 lg:px-12">
        <FeatureCard
          lead="Intelligent AI,"
          rest="the right model for every task"
          href="/approach#models"
          dotsAt="[--dots-at:70%_70%_at_50%_60%]"
          className="lg:h-[30rem]"
        >
          <RoutingVisual />
        </FeatureCard>
        <FeatureCard
          lead="Specialised expertise,"
          rest="on every layer"
          href="/services"
          dotsAt="[--dots-at:55%_70%_at_85%_0%]"
          className="lg:h-[30rem]"
        >
          <PreviewVisual />
        </FeatureCard>
        <FeatureCard
          lead="Production-ready quality,"
          rest="checked at every stage"
          href="/approach#quality"
          dotsAt="[--dots-at:60%_50%_at_100%_0%]"
          className="lg:h-[30rem]"
        >
          <QualityVisual />
        </FeatureCard>
        <FeatureCard
          lead="Designed around your users,"
          rest="on every screen"
          href="/services/product-design"
          dotsAt="[--dots-at:55%_60%_at_0%_0%]"
          className="lg:h-[30rem]"
        >
          <DesignVisual />
        </FeatureCard>
      </div>
    </Section>
  );
}

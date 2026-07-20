"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  Sparkles,
  Globe,
  Smartphone,
  Workflow,
  Boxes,
  Plug,
  Camera,
  Music,
  Map,
  Mail,
  Calendar,
  MessageCircle,
  Phone,
  Compass,
  Wifi,
  BatteryFull,
  SignalHigh,
  ChevronLeft,
  Check,
  ArrowRight,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";
import { site } from "@/lib/site";

/**
 * The hero's signature: a phone mock-up whose home screen shows a grid of
 * apps, with Veraft's service notifications dropping in as white cards.
 * Tapping a notification opens that service's detail sheet; tapping the Mail
 * app opens a working compose sheet that sends through /api/contact.
 */

type Service = {
  title: string;
  desc: string;
  icon: LucideIcon;
  blurb: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "AI integration",
    desc: "Assistants & agents",
    icon: Sparkles,
    blurb:
      "Assistants trained on your business that quietly handle the questions your team answers all day.",
    points: ["Support chatbots", "Knowledge-base search", "Internal copilots"],
  },
  {
    title: "Web development",
    desc: "SaaS & web apps",
    icon: Globe,
    blurb:
      "Fast, accessible web products — from marketing sites to full SaaS applications that hold up under real traffic.",
    points: ["Marketing sites", "SaaS products", "Web applications"],
  },
  {
    title: "Mobile app development",
    desc: "iOS & Android",
    icon: Smartphone,
    blurb:
      "Native-feeling apps for iOS and Android, built from one codebase and shipped to the stores.",
    points: ["Cross-platform apps", "App store delivery", "Offline-first sync"],
  },
  {
    title: "Automation",
    desc: "Runs itself in the background",
    icon: Workflow,
    blurb:
      "Connect the tools you already use and let the repetitive work run itself — reliably, in the background.",
    points: ["Workflow automation", "Scheduled jobs", "System integrations"],
  },
  {
    title: "Custom software",
    desc: "Internal tools & platforms",
    icon: Boxes,
    blurb:
      "Internal tools and platforms built around how your team actually works — not bent to fit off-the-shelf software.",
    points: ["Dashboards & portals", "CRM / ERP modules", "Inventory systems"],
  },
  {
    title: "API integration",
    desc: "Connect your stack",
    icon: Plug,
    blurb:
      "Move data cleanly between your systems so no one has to copy and paste it between tools again.",
    points: ["REST & webhooks", "Third-party APIs", "Reliable data sync"],
  },
];

/** Decorative home-screen apps — dark tiles on the light wallpaper. */
const apps: { icon: LucideIcon; tint: string }[] = [
  { icon: Camera, tint: "bg-ink-soft" },
  { icon: Music, tint: "bg-ink" },
  { icon: Map, tint: "bg-ink-soft" },
  { icon: Calendar, tint: "bg-ink" },
  { icon: MessageCircle, tint: "bg-ink-soft" },
  { icon: Phone, tint: "bg-ink" },
  { icon: Compass, tint: "bg-ink-soft" },
];

/** Fine matte grain, encoded as an inline SVG noise texture. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function NotificationCard({ title, desc, icon: Icon }: Service) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-line bg-paper p-3 shadow-xl shadow-ink/10">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={17} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold leading-tight text-ink">
          {title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted">{desc}</p>
      </div>
    </div>
  );
}

/** The slide-up detail sheet for a tapped service. */
function ServiceDetail({
  service,
  onBack,
}: {
  service: Service;
  onBack: () => void;
}) {
  const Icon = service.icon;
  return (
    <SheetShell>
      <div className="relative flex items-center gap-2 px-4 pb-3 pt-10">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 rounded-full py-1 pl-1 pr-2 text-sm text-muted transition hover:text-ink"
        >
          <ChevronLeft size={18} strokeWidth={2} aria-hidden />
          Back
        </button>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-inset ring-line">
          <Icon size={26} strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.blurb}</p>

        <ul className="mt-5 space-y-2.5">
          {service.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check size={12} strokeWidth={2.5} aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-press"
        >
          Start a project
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </SheetShell>
  );
}

/** Compose sheet that posts to the real /api/contact endpoint. */
function EmailCompose({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const firstError =
          data?.message ||
          (data?.errors ? Object.values(data.errors)[0] : null) ||
          "Please check your details and try again.";
        setError(String(firstError));
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <SheetShell>
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-inset ring-line">
            <Check size={30} strokeWidth={2.5} aria-hidden />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-ink">Message sent</h3>
          <p className="mt-1.5 text-sm text-muted">
            Thanks — we’ll be in touch shortly.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-press"
          >
            Done
          </button>
        </div>
      </SheetShell>
    );
  }

  const sending = status === "sending";
  const canSend = name.trim() && email.trim() && message.trim() && !sending;

  return (
    <SheetShell>
      <form onSubmit={submit} className="relative flex flex-1 flex-col">
        {/* Compose header, iOS Mail style */}
        <div className="flex items-center justify-between px-4 pb-3 pt-10">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted transition hover:text-ink"
          >
            Cancel
          </button>
          <span className="text-sm font-semibold text-ink">New message</span>
          <button
            type="submit"
            disabled={!canSend}
            className="flex items-center gap-1 text-sm font-semibold text-accent transition disabled:opacity-40"
          >
            {sending ? "Sending…" : "Send"}
            {!sending && <Send size={14} strokeWidth={2} aria-hidden />}
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-5">
          <div className="rounded-xl bg-mist px-3 py-2 text-sm text-muted ring-1 ring-inset ring-line">
            To: <span className="text-ink">{site.name}</span>{" "}
            <span className="text-muted">·</span> {site.email}
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-xl bg-mist px-3 py-2 text-sm text-ink outline-none ring-1 ring-inset ring-line placeholder:text-muted focus:ring-accent"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="rounded-xl bg-mist px-3 py-2 text-sm text-ink outline-none ring-1 ring-inset ring-line placeholder:text-muted focus:ring-accent"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project…"
            className="flex-1 resize-none rounded-xl bg-mist px-3 py-2 text-sm text-ink outline-none ring-1 ring-inset ring-line placeholder:text-muted focus:ring-accent"
          />
          {status === "error" && (
            <p className="text-xs text-danger">{error}</p>
          )}
        </div>
      </form>
    </SheetShell>
  );
}

/** Shared full-screen sheet chrome (light, slides up from bottom). */
function SheetShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
      className="absolute inset-0 z-20 flex flex-col overflow-hidden rounded-[2.25rem] bg-paper"
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-paper to-mist" />
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </motion.div>
  );
}

export function HeroNotifications() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [emailOpen, setEmailOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // Only run the cycling when the phone is near / in the viewport.
  const inView = useInView(rootRef, { margin: "150px" });
  const sheetOpen = selected !== null || emailOpen;

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[300px]">
      {/* Device frame */}
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.75rem] border-[3px] border-white/10 bg-ink p-2 shadow-2xl shadow-ink/40">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-mist">
          {/* Wallpaper: light matte gradient with a faint brand bloom */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-paper to-mist" />
          <div
            aria-hidden
            className="absolute -top-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 right-0 size-56 rounded-full bg-accent-2/10 blur-3xl"
          />
          {/* Grain overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
          />

          {/* App grid — anchored to the bottom of the home screen */}
          <div className="absolute inset-x-0 bottom-9 grid grid-cols-4 gap-x-4 gap-y-5 px-5">
            {/* Prominent, clickable Mail app */}
            <button
              type="button"
              onClick={() => setEmailOpen(true)}
              aria-label="Email us"
              className="group relative flex flex-col items-center gap-1 outline-none"
            >
              {/* pulsing halo to signal it's tappable */}
              <span
                aria-hidden
                className="absolute left-1/2 top-6 size-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-accent/40"
              />
              <span className="relative flex size-12 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/40 ring-2 ring-white/40 transition group-hover:scale-105 group-active:scale-95">
                <Mail size={22} strokeWidth={2} className="text-white" aria-hidden />
                {/* unread badge */}
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-paper">
                  1
                </span>
              </span>
              <span className="text-[10px] font-medium text-ink/70">Mail</span>
            </button>

            {/* Decorative apps */}
            {apps.map(({ icon: Icon, tint }, i) => (
              <div
                key={i}
                aria-hidden
                className={`flex size-12 items-center justify-center self-start rounded-full ${tint} ring-1 ring-inset ring-white/10`}
              >
                <Icon size={22} strokeWidth={1.75} className="text-white" aria-hidden />
              </div>
            ))}
          </div>

          {/* Notifications dropping over the top of the home screen */}
          <div className="absolute inset-x-0 top-12 px-3">
            <AnimatedList
              items={services}
              maxVisible={3}
              interval={2400}
              paused={sheetOpen || !inView}
              className="flex flex-col gap-2.5"
              renderItem={(s) => (
                <button
                  type="button"
                  onClick={() => setSelected(s)}
                  aria-label={`Open ${s.title} details`}
                  className="block w-full text-left transition active:scale-[0.98]"
                >
                  <NotificationCard {...s} />
                </button>
              )}
            />
          </div>

          {/* Sheets */}
          <AnimatePresence>
            {selected && (
              <ServiceDetail service={selected} onBack={() => setSelected(null)} />
            )}
            {emailOpen && <EmailCompose onClose={() => setEmailOpen(false)} />}
          </AnimatePresence>

          {/* Status bar (sits above everything, incl. the sheets) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-3 text-ink">
            <span className="font-mono text-xs font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <SignalHigh size={14} strokeWidth={2} aria-hidden />
              <Wifi size={14} strokeWidth={2} aria-hidden />
              <BatteryFull size={16} strokeWidth={2} aria-hidden />
            </div>
          </div>

          {/* Dynamic island */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black"
          />

          {/* Home indicator */}
          <div
            aria-hidden
            className="absolute bottom-2.5 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/25"
          />
        </div>
      </div>
    </div>
  );
}

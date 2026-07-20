"use client";

import { Sparkles, Globe, Smartphone, Workflow, Boxes, Plug } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/cn";

/**
 * The hero's single ambient element: a live feed of what Veraft builds,
 * cycling as notification cards. Accent-blue and paper cards alternate.
 */

type Service = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: boolean;
};

const services: Service[] = [
  { title: "AI integration", desc: "Assistants & agents", icon: Sparkles, accent: true },
  { title: "Web development", desc: "SaaS & web apps", icon: Globe, accent: false },
  { title: "Mobile app development", desc: "iOS & Android", icon: Smartphone, accent: true },
  { title: "Automation", desc: "Workflows that run themselves", icon: Workflow, accent: false },
  { title: "Custom software", desc: "Internal tools & platforms", icon: Boxes, accent: true },
  { title: "API integration", desc: "Connect your stack", icon: Plug, accent: false },
];

function NotificationCard({ title, desc, icon: Icon, accent }: Service) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border p-4",
        accent
          ? "border-transparent bg-accent text-white shadow-lg shadow-accent/20"
          : "border-line bg-paper text-ink shadow-sm",
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          accent ? "bg-white/15 text-white" : "bg-accent/10 text-accent",
        )}
      >
        <Icon size={20} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-tight">{title}</p>
        <p className={cn("mt-0.5 text-sm", accent ? "text-white/70" : "text-muted")}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export function HeroNotifications() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-sm [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_100%)]"
    >
      <AnimatedList
        items={services}
        maxVisible={4}
        interval={2400}
        className="flex flex-col gap-3"
        renderItem={(s) => <NotificationCard {...s} />}
      />
    </div>
  );
}

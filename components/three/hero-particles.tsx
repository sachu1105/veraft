"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Lazy, client-only: three.js never ships in the SSR/initial bundle and only
// loads once the gate below passes (desktop + motion allowed).
const ParticleSphere = dynamic(
  () => import("./particle-sphere").then((m) => m.ParticleSphere),
  { ssr: false, loading: () => null },
);

export function HeroParticles() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Only on wide screens — keeps three.js off mobile entirely.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pause rendering when scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  if (reduced || !enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[82%] translate-x-[14%] lg:block"
    >
      <ParticleSphere active={inView} />
    </div>
  );
}

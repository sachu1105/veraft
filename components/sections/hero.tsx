"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SignaturePipeline } from "./signature-pipeline";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* A single, faint accent glow — the only flourish in the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 hidden size-[36rem] rounded-full bg-accent/5 blur-3xl lg:block"
      />
      <Container className="relative pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
        >
          <div className="max-w-xl">
            <motion.div variants={item}>
              <Eyebrow>AI-first software studio</Eyebrow>
            </motion.div>
            <motion.h1
              variants={item}
              className="mt-6 text-display-xl text-ink"
            >
              Software that works alongside your team.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-body-lg text-muted"
            >
              Veraft designs and builds custom web applications, business
              platforms, and AI systems that automate the repetitive work and
              improve how customers experience your business.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                See what we build
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div variants={item} className="lg:pl-4">
            <SignaturePipeline />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

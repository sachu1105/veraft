import type { ReactNode } from "react";
import { Lock, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The hero's signature: an isometric stack of "bricks" — deploy, security,
 * the Veraft build layer, the agent layer, and product bricks on top — that
 * drops into place one layer at a time. AI agents (Claude, ChatGPT, DeepSeek,
 * Gemini) feed in along the floor on the left; a live product ships out on
 * the right.
 *
 * Pure SVG, server-rendered, no JS. Geometry is computed from a true
 * isometric projection so every face, label and pill lines up exactly.
 * Motion: CSS brick drop-in (once) + SMIL token dots (hidden under
 * reduced motion via `.flow-dot`).
 */

/* ---------- isometric projection ---------- */

const C = Math.sqrt(3) / 2; // cos 30°
const S = 0.5; // sin 30°
const OX = 500; // screen position of world origin
const OY = 320;

/** Tower footprint (world units): W along x (down-right), D along y (down-left). */
const W = 150;
const D = 230;

const r = (n: number) => Math.round(n * 10) / 10;
const sx = (x: number, y: number) => OX + (x - y) * C;
const sy = (x: number, y: number, z = 0) => OY + (x + y) * S - z;

type P3 = readonly [number, number, number];
const poly = (pts: P3[]) =>
  pts.map(([x, y, z]) => `${r(sx(x, y))},${r(sy(x, y, z))}`).join(" ");

/** Local 2D frame on a right face (plane x = const): +x runs up-right, +y runs down. */
const rightFrame = (x: number, y: number, z: number) =>
  `matrix(${r(C * 1000) / 1000} ${-S} 0 1 ${r(sx(x, y))} ${r(sy(x, y, z))})`;
/** Local 2D frame on a left face (plane y = const): +x runs down-right, +y runs down. */
const leftFrame = (x: number, y: number, z: number) =>
  `matrix(${r(C * 1000) / 1000} ${S} 0 1 ${r(sx(x, y))} ${r(sy(x, y, z))})`;
/** Lying on the floor, reading toward the tower (world −y). */
const floorTowardTower = (x: number, y: number) =>
  `matrix(${r(C * 1000) / 1000} ${-S} ${r(C * 1000) / 1000} ${S} ${r(sx(x, y))} ${r(sy(x, y))})`;
/** Lying on the floor, reading away from the tower (world +x). */
const floorAlongX = (x: number, y: number) =>
  `matrix(${r(C * 1000) / 1000} ${S} ${-r(C * 1000) / 1000} ${S} ${r(sx(x, y))} ${r(sy(x, y))})`;

/* ---------- a single brick ---------- */

type Face = { className?: string; fill?: string };

function Brick({
  x = 0,
  y = 0,
  z,
  w = W,
  d = D,
  h,
  top,
  left,
  right,
  leftContent,
  rightContent,
  delay,
}: {
  x?: number;
  y?: number;
  z: number;
  w?: number;
  d?: number;
  h: number;
  top: Face;
  left: Face;
  right: Face;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  delay: number;
}) {
  const x1 = x + w;
  const y1 = y + d;
  const z1 = z + h;
  return (
    <g className="brick-in" style={{ animationDelay: `${delay}s` }}>
      <polygon
        points={poly([
          [x, y, z1],
          [x1, y, z1],
          [x1, y1, z1],
          [x, y1, z1],
        ])}
        fill={top.fill}
        className={top.className}
      />
      <polygon
        points={poly([
          [x, y1, z],
          [x1, y1, z],
          [x1, y1, z1],
          [x, y1, z1],
        ])}
        fill={left.fill}
        className={left.className}
      />
      <polygon
        points={poly([
          [x1, y, z],
          [x1, y1, z],
          [x1, y1, z1],
          [x1, y, z1],
        ])}
        fill={right.fill}
        className={right.className}
      />
      {leftContent && <g transform={leftFrame(x, y1, z1)}>{leftContent}</g>}
      {rightContent && <g transform={rightFrame(x1, y1, z1)}>{rightContent}</g>}
    </g>
  );
}

/* ---------- agent feeds ---------- */

const agents = [
  { name: "claude", x: 18, pill: 300, line: "stroke-accent", dot: "fill-accent", dur: 3.1 },
  { name: "chatgpt", x: 56, pill: 200, line: "stroke-ink/70", dot: "fill-ink", dur: 3.7 },
  { name: "deepseek", x: 94, pill: 330, line: "stroke-accent-2", dot: "fill-accent-2", dur: 2.8 },
  { name: "gemini", x: 132, pill: 230, line: "stroke-muted/70", dot: "fill-muted", dur: 3.4 },
] as const;

const FAR = D + 460; // where feed lines start (off-canvas)
const NEAR = D + 16; // floor-plate edge
const OUT_Y = 150; // y of the outbound "live" line
const PLATE = 16;

const feedPath = (x: number) =>
  `M ${r(sx(x, FAR))} ${r(sy(x, FAR))} L ${r(sx(x, NEAR))} ${r(sy(x, NEAR))}`;
const outPath = `M ${r(sx(W + PLATE, OUT_Y))} ${r(sy(W + PLATE, OUT_Y))} L ${r(
  sx(W + 340, OUT_Y),
)} ${r(sy(W + 340, OUT_Y))}`;

/* ---------- face styles ---------- */

const ink = "stroke-ink";
const faces = {
  deploy: {
    top: { className: cn("fill-ink-soft", ink) },
    left: { className: cn("fill-ink", ink) },
    right: { className: cn("fill-ink", ink) },
  },
  secure: {
    top: { className: cn("fill-paper", ink) },
    left: { fill: "url(#vs-glass)", className: ink },
    right: { className: cn("fill-paper", ink) },
  },
  build: {
    top: { className: cn("fill-accent-2", ink) },
    left: { className: cn("fill-accent-press", ink) },
    right: { className: cn("fill-accent", ink) },
  },
  agents: {
    top: { className: cn("fill-paper", ink) },
    left: { fill: "url(#vs-glass-strong)", className: ink },
    right: { className: cn("fill-mist", ink) },
  },
  light: {
    top: { className: cn("fill-paper", ink) },
    left: { className: cn("fill-mist", ink) },
    right: { className: cn("fill-paper", ink) },
  },
  accent: {
    top: { className: cn("fill-accent-2", ink) },
    left: { className: cn("fill-accent-press", ink) },
    right: { className: cn("fill-accent", ink) },
  },
} satisfies Record<string, { top: Face; left: Face; right: Face }>;

function FaceLabel({
  x,
  y,
  children,
  className,
}: {
  x: number;
  y: number;
  children: string;
  className?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={11}
      letterSpacing="0.08em"
      className={cn("font-mono uppercase", className)}
    >
      {children}
    </text>
  );
}

export function HeroStack({ className }: { className?: string }) {
  const TOP = 222; // z of the agent layer's top face

  return (
    <svg
      viewBox="0 0 700 640"
      role="img"
      aria-labelledby="vs-title vs-desc"
      className={cn("h-auto w-full select-none overflow-visible", className)}
    >
      <title id="vs-title">Your product, built brick by brick</title>
      <desc id="vs-desc">
        An isometric stack of building blocks — deploy, security and tests, the
        Veraft build layer, AI agents, and UI, AI and auth bricks on top — fed by
        Claude, ChatGPT, DeepSeek and Gemini, shipping a live product.
      </desc>

      <defs>
        <linearGradient id="vs-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.14 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-paper)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="vs-glass-strong" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: "var(--color-accent-2)", stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.12 }} />
        </linearGradient>
        <filter id="vs-white">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
      </defs>

      {/* Floor plate */}
      <polygon
        className="fade-in fill-mist stroke-line"
        points={poly([
          [-PLATE, -PLATE, 0],
          [W + PLATE, -PLATE, 0],
          [W + PLATE, D + PLATE, 0],
          [-PLATE, D + PLATE, 0],
        ])}
      />

      {/* Agent feeds (left) and the live output (right) */}
      <g className="fade-in" style={{ animationDelay: "1.1s" }} strokeLinecap="round">
        {agents.map((a) => (
          <g key={a.name}>
            <path d={feedPath(a.x)} className={a.line} strokeWidth={1.5} fill="none" />
            <ellipse
              cx={r(sx(a.x, NEAR))}
              cy={r(sy(a.x, NEAR))}
              rx={7}
              ry={4}
              strokeWidth={1.5}
              className={cn("fill-paper", a.line)}
            />
            <circle r={3.5} className={cn("flow-dot", a.dot)}>
              <animateMotion dur={`${a.dur}s`} repeatCount="indefinite" path={feedPath(a.x)} />
            </circle>
            <g transform={floorTowardTower(a.x, NEAR + a.pill)}>
              <rect
                x={0}
                y={-11}
                width={a.name.length * 7.4 + 32}
                height={22}
                rx={11}
                strokeWidth={1.25}
                className={cn("fill-paper", a.line)}
              />
              <circle cx={12} cy={0} r={3.5} className={a.dot} />
              <text x={22} y={4} fontSize={12} className="fill-ink font-mono">
                {a.name}
              </text>
            </g>
          </g>
        ))}

        <path d={outPath} className="stroke-accent" strokeWidth={1.5} fill="none" />
        <ellipse
          cx={r(sx(W + PLATE, OUT_Y))}
          cy={r(sy(W + PLATE, OUT_Y))}
          rx={7}
          ry={4}
          strokeWidth={1.5}
          className="fill-paper stroke-accent"
        />
        <circle r={3.5} className="flow-dot fill-accent">
          <animateMotion dur="2.6s" repeatCount="indefinite" path={outPath} />
        </circle>
        <g transform={floorAlongX(W + 34, OUT_Y)}>
          <rect x={0} y={-11} width={164} height={22} rx={11} className="fill-accent" />
          <circle cx={13} cy={0} r={3.5} className="fill-on-accent" />
          <text x={23} y={4} fontSize={12} className="fill-on-accent font-mono">
            live · yourapp.com
          </text>
        </g>
      </g>

      {/* The stack, bottom to top */}
      <g strokeWidth={1.25} strokeLinejoin="round">
        <Brick
          z={0}
          h={30}
          delay={0.1}
          {...faces.deploy}
          rightContent={
            <FaceLabel x={22} y={19} className="fill-paper/80">
              Deploy · Monitor
            </FaceLabel>
          }
        />
        <Brick
          z={38}
          h={34}
          delay={0.25}
          {...faces.secure}
          rightContent={
            <g>
              <ShieldCheck x={20} y={8} size={18} strokeWidth={1.75} className="text-accent-fg" />
              <FaceLabel x={46} y={21} className="fill-ink">
                Security · Tests
              </FaceLabel>
            </g>
          }
        />
        <Brick
          z={80}
          h={100}
          delay={0.4}
          {...faces.build}
          leftContent={
            <g className="fill-on-accent/30">
              <rect x={18} y={22} width={64} height={6} rx={3} />
              <rect x={30} y={36} width={90} height={6} rx={3} />
              <rect x={30} y={50} width={52} height={6} rx={3} />
              <rect x={18} y={64} width={78} height={6} rx={3} />
            </g>
          }
          rightContent={
            <image
              href="/images/veraft-wordmark.png"
              x={30}
              y={29}
              width={170}
              height={42.1}
              filter="url(#vs-white)"
              preserveAspectRatio="xMidYMid meet"
            />
          }
        />
        <Brick
          z={188}
          h={26}
          delay={0.55}
          {...faces.agents}
          rightContent={
            <FaceLabel x={22} y={17} className="fill-accent">
              claude · gpt · deepseek
            </FaceLabel>
          }
        />

        {/* Product bricks, back to front */}
        <Brick
          x={18}
          y={0}
          z={TOP}
          w={W - 18}
          d={68}
          h={50}
          delay={0.7}
          {...faces.light}
          rightContent={
            <Palette x={23} y={14} size={22} strokeWidth={1.6} className="text-ink" />
          }
        />
        <Brick
          x={0}
          y={76}
          z={TOP}
          w={W}
          d={74}
          h={66}
          delay={0.82}
          {...faces.accent}
          rightContent={
            <Sparkles x={26} y={22} size={22} strokeWidth={1.6} className="text-on-accent" />
          }
        />
        <Brick
          x={34}
          y={158}
          z={TOP}
          w={W - 34}
          d={72}
          h={42}
          delay={0.94}
          {...faces.light}
          rightContent={
            <Lock x={25} y={10} size={20} strokeWidth={1.6} className="text-ink" />
          }
        />
      </g>
    </svg>
  );
}

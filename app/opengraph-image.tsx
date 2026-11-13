import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

// Satori can't read CSS variables, so the brand tokens are restated here.
const INK = "#141413";
const MUTED = "#6B6963";
const LINE = "#E8E6E1";
const ACCENT = "#5965C7";
const ACCENT_2 = "#4852AC";
const PAPER = "#FFFFFF";
const MIST = "#F5F4F1";

/** Stacked bricks, echoing the hero illustration. */
const bricks = [
  { w: 300, h: 44, bg: PAPER, border: INK },
  { w: 300, h: 34, bg: MIST, border: INK },
  { w: 300, h: 110, bg: ACCENT, border: INK },
  { w: 300, h: 40, bg: PAPER, border: INK },
  { w: 300, h: 34, bg: INK, border: INK },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          fontFamily: "sans-serif",
          borderBottom: `12px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 0 64px 80px",
            width: 760,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, background: ACCENT }} />
            <div style={{ display: "flex", color: INK, fontSize: 34, fontWeight: 700 }}>
              {site.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: INK,
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            Your software, built brick by brick with AI agents.
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 26 }}>
            Build · Integrate · Deploy — priced by the tokens we burn
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderLeft: `1px solid ${LINE}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 96, height: 56, background: PAPER, border: `2px solid ${INK}` }} />
              <div style={{ width: 96, height: 56, background: ACCENT_2, border: `2px solid ${INK}` }} />
              <div style={{ width: 92, height: 56, background: PAPER, border: `2px solid ${INK}` }} />
            </div>
            {bricks.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: b.w,
                  height: b.h,
                  background: b.bg,
                  border: `2px solid ${b.border}`,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                {i === 2 ? site.name : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

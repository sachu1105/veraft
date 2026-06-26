import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C10",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "3px solid #3D6BFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#001FFE",
              }}
            />
          </div>
          <div
            style={{ display: "flex", color: "#fff", fontSize: 40, fontWeight: 600 }}
          >
            Veraft
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            color: "#fff",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          Build intelligent software that grows your business.
        </div>

        {/* Footer line */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 4, background: "#001FFE" }} />
          <div
            style={{
              display: "flex",
              color: "#9AA1AD",
              fontSize: 26,
              letterSpacing: "0.04em",
            }}
          >
            {site.tagline} · {site.domain}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "@/lib/siteConfig";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
          color: "#fafaf9",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#d6d3d1",
            maxWidth: 820,
          }}
        >
          {TAGLINE}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            color: "#a8a29e",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Berks County, Pennsylvania
        </div>
      </div>
    ),
    { ...size }
  );
}

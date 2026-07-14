import { ImageResponse } from "next/og";
import { homeOgImage } from "@/lib/ogHomeImage";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(homeOgImage(), {
    width: 1200,
    height: 630,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

import { ImageResponse } from "next/og";
import { homeOgImage } from "@/lib/ogHomeImage";
import { SITE_NAME } from "@/lib/siteConfig";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(homeOgImage(), { ...size });
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1917",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "9px solid #fafaf9",
            marginTop: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#b45309",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

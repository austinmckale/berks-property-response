import type { ReactNode } from "react";

const colors = {
  charcoal: "#1c1917",
  charcoalSoft: "#292524",
  orange: "#c65f00",
  orangeLight: "#f6c38b",
  cream: "#fafaf9",
  muted: "#d6d3d1",
  water: "#cce9f5",
  red: "#b91c1c",
};

function HouseMark(): ReactNode {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: 58,
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          backgroundColor: colors.cream,
          color: colors.charcoal,
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        ⌂
      </div>
      <div
        style={{
          width: 13,
          height: 13,
          marginLeft: -15,
          marginTop: -28,
          borderRadius: 999,
          backgroundColor: colors.orange,
          border: `3px solid ${colors.charcoal}`,
        }}
      />
    </div>
  );
}

export function homeOgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        padding: "68px 82px",
        color: colors.cream,
        backgroundColor: colors.charcoal,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          right: -130,
          top: 35,
          borderRadius: 999,
          border: `42px solid ${colors.orange}`,
          opacity: 0.92,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 310,
          height: 310,
          right: 55,
          top: 160,
          borderRadius: 999,
          backgroundColor: colors.water,
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 185,
          height: 185,
          right: 118,
          top: 222,
          borderRadius: 999,
          border: `28px solid ${colors.charcoalSoft}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 18,
          height: 112,
          right: 202,
          top: 88,
          borderRadius: 999,
          backgroundColor: colors.water,
          transform: "rotate(35deg)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <HouseMark />
          <div
            style={{
              marginLeft: 18,
              display: "flex",
              flexDirection: "column",
              fontSize: 25,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Berks Property
            <br />
            Response
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 82, flexDirection: "column", maxWidth: 770 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: "-0.055em",
            }}
          >
            Drain, plumbing,
            <br />
            or water damage?
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 31,
              lineHeight: 1.25,
              fontWeight: 500,
              color: colors.orangeLight,
            }}
          >
            Local help across Berks County
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            fontSize: 23,
            fontWeight: 600,
            color: colors.muted,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              marginRight: 12,
              borderRadius: 999,
              backgroundColor: colors.red,
            }}
          />
          Call or request help online
        </div>
      </div>
    </div>
  );
}

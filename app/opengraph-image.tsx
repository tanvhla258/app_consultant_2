import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (keep in sync with lib/theme.ts / globals.css).
const NAVY = "#0B2545";
const GOLD = "#D4A24C";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: NAVY,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 8,
            background: GOLD,
            borderRadius: 999,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          APP Consultancy
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: GOLD,
            fontWeight: 600,
          }}
        >
          Accounting · Tax · Advisory
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 30,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Big4-grade expertise for businesses in Vietnam
        </div>
      </div>
    ),
    { ...size },
  );
}

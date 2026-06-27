import { ImageResponse } from "next/og";

export const alt = "David Budeli - Produtos digitais, IA e automação";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(126deg, rgba(93, 167, 255, 0.18) 0%, transparent 28%, rgba(255,255,255,0.055) 58%, transparent 82%), linear-gradient(135deg, #030303 0%, #081019 48%, #030303 100%)",
          color: "#fffaf1",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.14)",
            padding: "54px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <div
              style={{
                width: "132px",
                height: "86px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                letterSpacing: "-0.09em",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.16)",
              }}
            >
              DB
            </div>
            <div style={{ width: 1, height: 72, background: "#5da7ff" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 44, letterSpacing: "0.22em" }}>
                DAVID BUDELI
              </span>
              <span
                style={{
                  marginTop: 12,
                  fontSize: 22,
                  letterSpacing: "0.32em",
                  color: "rgba(255,250,241,0.62)",
                }}
              >
                PRODUTO / IA / AUTOMAÇÃO
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 68, lineHeight: 0.98, maxWidth: 860 }}>
              Produto. IA. Conversão.
            </span>
            <span
              style={{
                marginTop: 30,
                fontSize: 22,
                letterSpacing: "0.22em",
                color: "rgba(255,250,241,0.42)",
              }}
            >
              SITES / SISTEMAS / AUTOMAÇÕES / PERFORMANCE
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "React Component Library";
  const type = searchParams.get("type") || "";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 72px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          height: "100%",
          maxWidth: "520px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {type && (
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "16px",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "4px 12px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {type}
          </div>
        )}

        <div
          style={{
            display: "flex",
            fontSize: title.length > 26 ? "56px" : "68px",
            fontWeight: "700",
            color: "#fff",
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
            marginBottom: "auto",
            maxWidth: "100%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "14px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.04em",
            marginTop: "48px",
            fontWeight: 500,
            gap: "4px",
          }}
        >
          <span style={{ opacity: 0.4 }}>Sync UI —</span>
          <span>syncui.design</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "340px",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {renderIllustration(type)}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

function renderIllustration(type) {
  const commonProps = {
    width: "320",
    height: "240",
    viewBox: "0 0 320 240",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (type?.toLowerCase()) {
    case "components":
      return (
        <svg {...commonProps}>
          <defs>
            <pattern
              id="grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                rx="1"
                fill="rgba(255,255,255,0.15)"
              />
            </pattern>
          </defs>
          <rect width="320" height="240" fill="url(#grid)" />
        </svg>
      );

    case "blocks":
      return (
        <svg {...commonProps}>
          <rect
            x="20"
            y="20"
            width="280"
            height="40"
            rx="6"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="20"
            y="76"
            width="180"
            height="40"
            rx="6"
            fill="rgba(255,255,255,0.12)"
          />
          <rect
            x="20"
            y="132"
            width="240"
            height="40"
            rx="6"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="20"
            y="188"
            width="280"
            height="32"
            rx="6"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      );

    case "docs":
      return (
        <svg {...commonProps}>
          <rect
            x="20"
            y="20"
            width="100"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.2)"
          />
          <rect
            x="20"
            y="44"
            width="240"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="20"
            y="68"
            width="200"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="20"
            y="92"
            width="260"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="20"
            y="116"
            width="160"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="20"
            y="140"
            width="220"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="20"
            y="164"
            width="280"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      );

    case "templates":
      return (
        <svg {...commonProps}>
          <rect
            x="20"
            y="20"
            width="280"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="20"
            y="60"
            width="72"
            height="140"
            rx="4"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x="104"
            y="60"
            width="196"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="104"
            y="96"
            width="196"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            x="104"
            y="132"
            width="196"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            x="104"
            y="168"
            width="196"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      );

    case "showcase":
      return (
        <svg {...commonProps}>
          <rect
            x="20"
            y="20"
            width="88"
            height="120"
            rx="6"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="116"
            y="20"
            width="88"
            height="80"
            rx="6"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x="212"
            y="20"
            width="88"
            height="100"
            rx="6"
            fill="rgba(255,255,255,0.07)"
          />
          <rect
            x="116"
            y="108"
            width="88"
            height="80"
            rx="6"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            x="20"
            y="148"
            width="88"
            height="70"
            rx="6"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            x="212"
            y="128"
            width="88"
            height="90"
            rx="6"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <rect
            x="20"
            y="20"
            width="120"
            height="60"
            rx="8"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x="160"
            y="20"
            width="140"
            height="60"
            rx="8"
            fill="rgba(255,255,255,0.04)"
          />
          <rect
            x="20"
            y="100"
            width="280"
            height="60"
            rx="8"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            x="20"
            y="180"
            width="180"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.03)"
          />
        </svg>
      );
  }
}

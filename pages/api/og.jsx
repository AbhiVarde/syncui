import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const config = {
  runtime: "nodejs",
};

const geistBold = fs.readFileSync(
  path.join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2",
  ),
);
const geistMono = fs.readFileSync(
  path.join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
  ),
);

export default function handler(req) {
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
        padding: "72px 80px",
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          height: "100%",
          maxWidth: "580px",
        }}
      >
        {type ? (
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "24px",
            }}
          >
            {type}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: title.length > 22 ? "58px" : "72px",
            fontWeight: "700",
            color: "#fff",
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
            marginBottom: "auto",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "GeistMono",
            fontSize: "14px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
            marginTop: "48px",
          }}
        >
          Sync UI — syncui.design
        </div>
      </div>

      <svg
        width="340"
        height="240"
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="340" height="18" fill="white" />
        <rect
          x="0"
          y="50"
          width="250"
          height="18"
          fill="rgba(255,255,255,0.6)"
        />
        <rect
          x="0"
          y="100"
          width="160"
          height="18"
          fill="rgba(255,255,255,0.35)"
        />
        <rect
          x="0"
          y="150"
          width="250"
          height="18"
          fill="rgba(255,255,255,0.6)"
        />
        <rect x="0" y="200" width="340" height="18" fill="white" />
        <rect
          x="300"
          y="0"
          width="14"
          height="218"
          fill="rgba(255,255,255,0.12)"
          transform="skewX(-6)"
        />
      </svg>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
        { name: "GeistMono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}

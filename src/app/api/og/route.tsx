import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Component";
  const category = searchParams.get("category") || "docs";

  return new ImageResponse(
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "60px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "60px",
          top: "0",
          bottom: "0",
          width: "2px",
          background: "white",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "0",
          right: "0",
          height: "2px",
          background: "white",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "40px",
          marginLeft: "40px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            fontFamily: '"Doto", sans-serif',
            color: "white",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 40,
            fontFamily: "Geist Mono",
            color: "#a1a1a1",
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

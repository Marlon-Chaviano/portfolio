import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0b0b0b",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 2 }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: 12, height: 12, background: "#ededed" }} />
            <span style={{ marginLeft: 16 }}>{site.role.toUpperCase()}</span>
          </span>
          <span style={{ color: "#8f8f8f" }}>{site.location.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 500, lineHeight: 1, letterSpacing: -5 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.25, color: "#c8c8c8", maxWidth: 980 }}>
            {site.tagline[locale]}
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 1, background: "#3a3a3a" }} />
      </div>
    ),
    size,
  );
}

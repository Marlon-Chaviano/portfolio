import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Marlon Chaviano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const portrait = await readFile(join(process.cwd(), "src/assets/og-portrait.jpg"), "base64");
  const role = lang === "es" ? "Ingeniero full stack de IA" : site.role;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#111110", color: "#f6f3ec", padding: 32 }}>
      <div style={{ display: "flex", width: "100%", border: "1px solid #5d5a55" }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", padding: "36px 40px" }}>
          <span style={{ fontSize: 25, color: "#c8c4bd" }}>{site.location}</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 105, lineHeight: 1, letterSpacing: -6 }}>
            <span>Marlon</span><span>Chaviano</span>
          </div>
          <span style={{ fontSize: 33, borderTop: "1px solid #5d5a55", paddingTop: 20 }}>{role}</span>
        </div>
        {/* ImageResponse embeds the local portrait in the generated PNG. */}
        <img alt="" width={444} height={564} src={`data:image/jpeg;base64,${portrait}`} style={{ objectFit: "cover" }} />
      </div>
    </div>,
    size,
  );
}

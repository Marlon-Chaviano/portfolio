import { mkdir, writeFile } from "node:fs/promises";
import * as icons from "simple-icons";

// Official brand shapes distributed by Simple Icons; retain provenance for updates.
const names = {
  react: "siReact", vue: "siVuedotjs", next: "siNextdotjs", astro: "siAstro",
  typescript: "siTypescript", rails: "siRubyonrails", postgresql: "siPostgresql",
  redis: "siRedis", sidekiq: "siSidekiq", expo: "siExpo", mcp: "siModelcontextprotocol",
  x: "siX", leetcode: "siLeetcode", node: "siNodedotjs", pnpm: "siPnpm",
  zod: "siZod", vitest: "siVitest", githubactions: "siGithubactions",
  tanstack: "siTanstack", tailwind: "siTailwindcss", stripe: "siStripe",
  analytics: "siGoogleanalytics", firebase: "siFirebase", gsap: "siGreensock",
  reacthookform: "siReacthookform", sqlite: "siSqlite", jest: "siJest",
  radix: "siRadixui", vercel: "siVercel", whatsapp: "siWhatsapp",
};
const provenance = {
  github: { source: "https://github.com/logos", provider: "Brandfetch" },
  twilio: { source: "https://www.twilio.com", provider: "Brandfetch" },
  playwright: { source: "https://github.com/microsoft/playwright.dev/blob/main/static/img/playwright-logo.svg", provider: "Microsoft" },
  rspec: { source: "https://rspec.info/images/logo.png", provider: "RSpec" },
  heroku: { source: "https://www.heroku.com", provider: "Brandfetch" },
  maestro: { source: "https://maestro.dev/favicon.svg", provider: "Maestro" },
  zustand: { source: "https://github.com/pmndrs/zustand/blob/main/docs/favicon.ico", provider: "Zustand", note: "Official favicon converted to PNG" },
};
await mkdir("public/brands", { recursive: true });
for (const [name, key] of Object.entries(names)) {
  const icon = icons[key];
  if (!icon) throw new Error(`Missing official icon: ${key}`);
  await writeFile(`public/brands/${name}.svg`, icon.svg.replace("<svg", `<svg fill="#${icon.hex}"`));
  provenance[name] = { source: icon.source, provider: "Simple Icons", license: icon.license?.type ?? "CC0-1.0 collection; brand trademarks belong to their owners" };
}
await writeFile("public/brands/sources.json", JSON.stringify(provenance, null, 2) + "\n");
console.log(`Generated ${Object.keys(names).length} local brand icons.`);

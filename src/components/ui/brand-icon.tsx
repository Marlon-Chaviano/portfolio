import Image from "next/image";

const brands: Record<string, { file: string; mono?: boolean; format?: "png" }> = {
  React: { file: "react" }, "React Native": { file: "react" },
  Vue: { file: "vue" }, "Vue 3": { file: "vue" },
  "Next.js": { file: "next", mono: true }, Astro: { file: "astro" },
  TypeScript: { file: "typescript" }, Rails: { file: "rails" }, "Ruby on Rails": { file: "rails" },
  PostgreSQL: { file: "postgresql" }, "PostgreSQL (RLS)": { file: "postgresql" },
  Redis: { file: "redis" }, Sidekiq: { file: "sidekiq" },
  Expo: { file: "expo", mono: true }, "Expo Router": { file: "expo", mono: true }, EAS: { file: "expo", mono: true },
  "Twilio Voice": { file: "twilio" }, MCP: { file: "mcp", mono: true },
  "Node.js": { file: "node" }, "pnpm workspaces": { file: "pnpm" }, Zod: { file: "zod" },
  Vitest: { file: "vitest" }, "GitHub Actions": { file: "githubactions" },
  "TanStack Query": { file: "tanstack" }, "Tailwind CSS": { file: "tailwind" }, Stripe: { file: "stripe" },
  GA4: { file: "analytics" }, "Firebase Messaging": { file: "firebase" },
  GSAP: { file: "gsap" }, "React Hook Form": { file: "reacthookform" }, SQLite: { file: "sqlite" },
  Jest: { file: "jest" }, "Radix UI": { file: "radix", mono: true }, Vercel: { file: "vercel", mono: true },
  Playwright: { file: "playwright" },
  RSpec: { file: "rspec", format: "png" }, Heroku: { file: "heroku", format: "png" },
  Zustand: { file: "zustand", format: "png" }, Maestro: { file: "maestro" },
  github: { file: "github", mono: true }, x: { file: "x", mono: true },
  leetcode: { file: "leetcode" }, whatsapp: { file: "whatsapp" },
};

export function BrandIcon({ name, size = 24, monochrome = false }: { name: string; size?: number; monochrome?: boolean }) {
  const brand = brands[name] ?? (name.startsWith("Expo ") ? brands.Expo : name.startsWith("React Native ") ? brands["React Native"] : undefined);
  if (!brand) return null;
  return <Image src={`/brands/${brand.file}.${brand.format ?? "svg"}`} alt="" aria-hidden="true" width={size} height={size} className={`brand-icon${monochrome || brand.mono ? " brand-icon-mono" : ""}`} style={{ width: size, height: size }} />;
}

export function TechnologyList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-5">
      {items.map((name) => (
        <li key={name} className="flex min-h-9 items-center gap-2.5 text-sm">
          <BrandIcon name={name} />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

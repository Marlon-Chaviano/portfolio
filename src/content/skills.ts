import type { Localized } from "@/lib/i18n";
import type { ProjectSlug } from "./slugs";

export type SkillArea = "frontend" | "backend" | "ai" | "mobile";

export type Skill = {
  name: string;
  area: SkillArea;
  /** learning: studying it · practicing: using it on a project · shipping: in production work */
  level: "learning" | "practicing" | "shipping";
  /** YYYY-MM you started; shown on skills still in progress. */
  since?: string;
  /** Case studies where it is used. */
  evidence?: ProjectSlug[];
  note?: Localized;
  sample?: boolean;
};

/**
 * Skills, with proof. "shipping" entries link to the projects that use them.
 * TODO(marlon): add what you are learning right now (level: "learning").
 */
export const skills: Skill[] = [
  { name: "TypeScript", area: "frontend", level: "shipping", evidence: ["diodi", "grialink", "first-commit", "bmori-mobile"] },
  { name: "Vue 3", area: "frontend", level: "shipping", evidence: ["diodi", "grialink"] },
  { name: "React", area: "frontend", level: "shipping", evidence: ["bmori-mobile", "global-dentistry-group"] },
  { name: "Astro", area: "frontend", level: "shipping", evidence: ["grialink", "global-dentistry-group"] },
  { name: "Tailwind CSS", area: "frontend", level: "shipping", evidence: ["diodi", "global-dentistry-group"] },
  { name: "GSAP + WebGL", area: "frontend", level: "shipping", evidence: ["grialink", "diodi"] },
  { name: "Playwright", area: "frontend", level: "shipping", evidence: ["diodi", "grialink"] },

  { name: "Ruby on Rails", area: "backend", level: "shipping", evidence: ["diodi", "grialink"] },
  { name: "PostgreSQL", area: "backend", level: "shipping", evidence: ["diodi", "grialink"] },
  { name: "Background jobs", area: "backend", level: "shipping", evidence: ["diodi"] },
  { name: "Stripe billing", area: "backend", level: "shipping", evidence: ["diodi"] },
  { name: "Node.js CLIs", area: "backend", level: "shipping", evidence: ["first-commit"] },

  { name: "AI agents with tools", area: "ai", level: "shipping", evidence: ["grialink"] },
  { name: "Voice agents (Twilio)", area: "ai", level: "shipping", evidence: ["grialink"] },
  { name: "MCP servers", area: "ai", level: "shipping", evidence: ["first-commit"] },
  { name: "Answer engine optimization", area: "ai", level: "shipping", evidence: ["diodi"] },

  { name: "React Native", area: "mobile", level: "shipping", evidence: ["grialink", "bmori-mobile"] },
  { name: "Expo + EAS", area: "mobile", level: "shipping", evidence: ["grialink", "bmori-mobile"] },
  { name: "Push + VoIP calls", area: "mobile", level: "practicing", evidence: ["grialink"] },
  { name: "Biometrics + secure storage", area: "mobile", level: "practicing", evidence: ["bmori-mobile", "grialink"] },

  {
    name: "WebGPU",
    area: "frontend",
    level: "learning",
    since: "2026-11",
    sample: true,
  },
];

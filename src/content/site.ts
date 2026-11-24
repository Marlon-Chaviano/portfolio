import type { Localized } from "@/lib/i18n";

/**
 * Everything personal lives here. Empty strings are simply not rendered,
 * so fill them in as you go.
 */
export const site = {
  name: "Marlon Chaviano",
  role: "Full Stack AI Engineer",
  location: "Villa Clara, Cuba",
  timeZone: "America/Havana",

  /** Production origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL on the host. */
  url: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  ).origin,

  // Public contact details confirmed by Marlon.
  email: "chavianomarlon@gmail.com",
  // International format without punctuation for wa.me.
  whatsapp: "5354897630",
  cv: {
    en: "/cv/Marlon-Chaviano-Resume.pdf",
    es: "/cv/Marlon-Chaviano-CV.pdf",
  } satisfies Localized,
  socials: {
    github: "https://github.com/Marlon-Chaviano",
    x: "https://x.com/marlonchaviano",
    leetcode: "https://leetcode.com/u/Marlon-Chaviano/",
    linkedin: "",
  },

  chess: {
    // Public profile confirmed by Marlon.
    username: "marlon-ch",
    // Optional: your personal friend link from the Chess.com app (Friends → Share link).
    friendLink: "",
  },

  leetcode: { username: "Marlon-Chaviano" },

  tagline: {
    en: "I’m a full-stack engineer building AI products for web and mobile. My work includes voice agents that book appointments and tools that track brand mentions in AI search.",
    es: "Soy ingeniero full stack y desarrollo productos de IA para web y móvil. He creado agentes de voz que agendan citas y herramientas que rastrean menciones de marcas en buscadores de IA.",
  } satisfies Localized,

  /** One citable sentence. Used in metadata, JSON-LD and llms.txt. */
  description: {
    en: "Marlon Chaviano is a Full Stack AI Engineer based in Villa Clara, Cuba. He builds web products, mobile apps and AI tools, including Grialink, Diodi and first-commit.",
    es: "Marlon Chaviano es ingeniero full stack de IA en Villa Clara, Cuba. Conoce su trabajo en aplicaciones web y móviles como Grialink, Diodi y B-Morï.",
  } satisfies Localized,

  knowsAbout: [
    "Frontend engineering",
    "React",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "Ruby on Rails",
    "React Native",
    "Expo",
    "AI agents",
    "Voice AI",
    "Model Context Protocol",
    "Answer engine optimization",
    "PostgreSQL",
  ],
};

export const socialLinks = () =>
  Object.entries(site.socials).filter(([, url]) => url) as [string, string][];

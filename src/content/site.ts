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
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

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
    en: "Full Stack AI Engineer. I build web and mobile products that bring AI into calls, conversations and analytics.",
    es: "Ingeniero full stack de IA. Construyo productos web y móviles que incorporan IA en llamadas, conversaciones y análisis de datos.",
  } satisfies Localized,

  /** One citable sentence. Used in metadata, JSON-LD and llms.txt. */
  description: {
    en: "Marlon Chaviano is a Full Stack AI Engineer based in Villa Clara, Cuba. He builds web products, mobile apps and AI tools, including Grialink, Diodi and first-commit.",
    es: "Marlon Chaviano es un Full Stack AI Engineer radicado en Villa Clara, Cuba. Construye productos web, apps móviles y herramientas con IA, entre ellos Grialink, Diodi y first-commit.",
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

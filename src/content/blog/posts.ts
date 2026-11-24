import type { Locale } from "@/lib/i18n";

export type Post = {
  /** URL segment, and the file name: <slug>.<lang>.mdx in this folder. */
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  /** Languages the post is written in. One is enough. */
  langs: Locale[];
  title: Partial<Record<Locale, string>>;
  summary: Partial<Record<Locale, string>>;
  tags: string[];
  image?: string;
  /** Reading time in minutes. */
  minutes: number;
  /** Hidden from the site while true. */
  draft?: boolean;
  /** Placeholder post: shows a "sample" tag. */
  sample?: boolean;
};

/**
 * To publish a post:
 *   1. Write it in this folder as <slug>.en.mdx and/or <slug>.es.mdx.
 *   2. Add an entry here (newest first).
 */
const all: Post[] = [
  {
    slug: "why-first-commit",
    image: "/projects/details/first-commit-configurator-dark.webp",
    date: "2026-11-24",
    langs: ["en", "es"],
    title: {
      en: "Why I built first-commit",
      es: "Por qué creé first-commit",
    },
    summary: {
      en: "I wanted to keep the agent skills I used to start a project. Building apps for Bonafide made me want to keep the brand settings, too.",
      es: "Quería guardar las skills que usaba al empezar un proyecto. Trabajando para Bonafide me di cuenta de que también quería guardar la marca.",
    },
    tags: ["first-commit", "GitHub"],
    minutes: 3,
  },
];

export const posts = all.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** The post's text in the visitor's language, falling back to the language it was written in. */
export function localizePost(post: Post, locale: Locale) {
  const lang = post.langs.includes(locale) ? locale : post.langs[0];
  return { lang, title: post.title[lang] ?? post.slug, summary: post.summary[lang] ?? "" };
}

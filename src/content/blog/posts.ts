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
 * TODO(marlon): replace the sample post with your first real one.
 */
const all: Post[] = [
  {
    slug: "hello-world",
    date: "2026-11-16",
    langs: ["en", "es"],
    title: {
      en: "A first post, and how this blog works",
      es: "Un primer artículo, y cómo funciona este blog",
    },
    summary: {
      en: "A placeholder that shows what a post looks like here: headings, code, quotes and lists, written in MDX.",
      es: "Un texto de ejemplo que muestra cómo se ve un artículo aquí: títulos, código, citas y listas, escrito en MDX.",
    },
    tags: ["meta"],
    minutes: 2,
    sample: true,
  },
];

export const posts = all.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** The post's text in the visitor's language, falling back to the language it was written in. */
export function localizePost(post: Post, locale: Locale) {
  const lang = post.langs.includes(locale) ? locale : post.langs[0];
  return { lang, title: post.title[lang] ?? post.slug, summary: post.summary[lang] ?? "" };
}

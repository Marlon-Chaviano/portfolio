import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";
import { navRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; langs: readonly Locale[] }[] = [
    ...navRoutes.map((r) => ({ path: r.path, langs: locales })),
    ...projects.map((p) => ({ path: `/work/${p.slug}`, langs: locales })),
    ...posts.filter((post) => !post.sample).map((p) => ({ path: `/blog/${p.slug}`, langs: p.langs })),
  ];

  return pages.flatMap(({ path, langs }) =>
    langs.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: path === "/library" || path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/work") ? 0.8 : 0.6,
      alternates: { languages: languageAlternates(path, langs) },
    })),
  );
}

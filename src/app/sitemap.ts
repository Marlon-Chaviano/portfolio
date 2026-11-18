import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";
import { navRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navRoutes.map((r) => r.path),
    ...projects.map((p) => `/work/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: path === "/library" || path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/work") ? 0.8 : 0.6,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
          "x-default": `${site.url}/en${path}`,
        },
      },
    })),
  );
}

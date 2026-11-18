import type { Metadata } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "./i18n";

export const absolute = (path: string) => `${site.url}${path}`;

/** hreflang map for a locale-less path such as "/work". */
export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  "x-default": `/en${path}`,
});

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `/${locale}${path}`;
  // Nested pages replace the inherited Open Graph block, so the shared card is named here.
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: `${site.name} — ${site.role}` };
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const sameAs = () => Object.values(site.socials).filter(Boolean);

/** The one Person node every page points at. */
export const personLd = (locale: Locale) => ({
  "@type": "Person",
  "@id": absolute("/#person"),
  name: site.name,
  jobTitle: site.role,
  description: site.description[locale],
  url: absolute(`/${locale}`),
  address: { "@type": "PostalAddress", addressRegion: "Villa Clara", addressCountry: "CU" },
  knowsAbout: site.knowsAbout,
  knowsLanguage: ["es", "en"],
  sameAs: sameAs(),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

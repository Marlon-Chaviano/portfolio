import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Instrument_Serif } from "next/font/google";
import { localizePost, posts } from "@/content/blog/posts";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { BackgroundHost } from "@/components/scene/background-host";
import { Cursor } from "@/components/scene/cursor";
import { Sparks } from "@/components/scene/sparks";
import { SmoothScroll } from "@/components/scene/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { CommandPalette, type PaletteItem } from "@/components/site/command-palette";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SoundEffects } from "@/components/sound/sound";
import { locales, otherLocale } from "@/lib/i18n";
import { getDict } from "@/lib/locale";
import { navRoutes } from "@/lib/routes";
import { absolute, personLd } from "@/lib/seo";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Every route is prerendered; the build fails if request-time work sneaks in.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDict();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
    description: site.description[locale],
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getDict();

  const palette: PaletteItem[] = [
    ...navRoutes.map((route) => ({
      group: t.palette.pages,
      label: t.nav[route.key],
      href: `/${locale}${route.path}`,
    })),
    ...projects.map((project) => ({
      group: t.palette.projects,
      label: project.name,
      href: `/${locale}/work/${project.slug}`,
    })),
    ...posts.map((post) => ({
      group: t.palette.posts,
      label: localizePost(post, locale).title,
      href: `/${locale}/blog/${post.slug}`,
    })),
    { group: t.palette.actions, label: t.palette.toggleSound, hint: "M", action: "sound" as const },
    {
      group: t.palette.actions,
      label: t.palette.switchLanguage,
      hint: otherLocale(locale).toUpperCase(),
      href: `/${otherLocale(locale)}`,
    },
  ];

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${instrument.variable} ${geistMono.variable} antialiased`}
    >
      <body id="top" className="min-h-svh overflow-x-clip">
        <a
          href="#content"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          {t.nav.skip}
        </a>

        <BackgroundHost />
        <Header
          locale={locale}
          name={site.name}
          cvHref={site.cv[locale]}
          labels={{
            home: t.nav.home,
            work: t.nav.work,
            about: t.nav.about,
            library: t.nav.library,
            blog: t.nav.blog,
            contact: t.nav.contact,
            menu: t.nav.menu,
            close: t.nav.close,
            language: t.nav.language,
            languageLabel: t.nav.languageLabel,
            search: t.palette.open,
            cv: t.home.ctaCv,
            soundOn: t.sound.on,
            soundOff: t.sound.off,
            soundHint: t.sound.hint,
          }}
        />

        <div className="site-frame flex min-h-dvh flex-col">
          <div id="content" tabIndex={-1} className="grid flex-1 grid-cols-1 outline-none">
            <Sparks>{children}</Sparks>
          </div>

          <Footer locale={locale} t={t} />
        </div>

        <CommandPalette
          items={palette}
          placeholder={t.palette.placeholder}
          empty={t.palette.empty}
          hint={t.palette.hint}
        />
        <SoundEffects />
        <SmoothScroll />
        <Cursor />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": absolute("/#website"),
                url: site.url,
                name: site.name,
                description: site.description[locale],
                inLanguage: locales,
                publisher: { "@id": absolute("/#person") },
              },
              personLd(locale),
            ],
          }}
        />
      </body>
    </html>
  );
}

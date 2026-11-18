import type { Metadata } from "next";
import { localizePost, posts } from "@/content/blog/posts";
import { books } from "@/content/books";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { Clock } from "@/components/site/clock";
import { MagnetLink } from "@/components/ui/magnet-link";
import { MoveLink } from "@/components/ui/move-link";
import { PageShell, Row } from "@/components/ui/page-shell";
import { ProjectIndex } from "@/components/ui/project-index";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata, personLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return {
    ...pageMetadata({ locale, path: "", title: t.meta.home.title, description: site.description[locale] }),
    title: { absolute: t.meta.home.title },
  };
}

export default async function HomePage() {
  const { locale, t } = await getDict();
  const h = t.home;
  const reading = books.find((b) => b.status === "reading");
  const latest = posts[0];
  const now = [
    { label: h.nowBuilding, value: "Diodi, Grialink", href: `/${locale}/work` },
    { label: h.nowReading, value: reading?.title ?? h.nothing, href: `/${locale}/library` },
    {
      label: h.nowWriting,
      value: latest ? localizePost(latest, locale).title : h.nothing,
      href: latest ? `/${locale}/blog/${latest.slug}` : `/${locale}/blog`,
    },
  ];

  return (
    <PageShell>
      <header className="page-header">
        <div className="section-label hidden space-y-2 lg:block">
          <p>{h.kicker}</p>
          <p className="text-xs">{site.location}</p>
          <p className="font-mono text-xs tabular-nums"><Clock timeZone={site.timeZone} label={t.footer.localTime} /></p>
        </div>
        <div className="editorial-content">
          <h1 aria-label={site.name} className="display page-title max-w-4xl">
            {h.hero.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{site.tagline[locale]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagnetLink href={`/${locale}/work`} className="btn btn-primary">{h.ctaWork}</MagnetLink>
            <MoveLink href={`/${locale}/contact`} className="btn">{h.ctaContact}</MoveLink>
            <a href={site.cv[locale]} download className="btn">{h.ctaCv}</a>
          </div>
        </div>
      </header>
      <div className="page-sections">
        <Row index="05" label={h.selected}>
          <ProjectIndex
            locale={locale}
            sourceLabel={t.caseStudy.source}
            privateLabel={t.work.privatePreview}
            items={projects.filter((p) => ["grialink", "diodi", "first-commit"].includes(p.slug)).map((p) => ({
              slug: p.slug,
              name: p.name,
              year: p.year,
              status: p.status[locale],
              tagline: p.tagline[locale],
              kinds: p.kinds.map((k) => t.work.kinds[k]),
              kindKeys: p.kinds,
              preview: p.preview,
              repo: p.repo,
            }))}
          />
          <MoveLink href={`/${locale}/work`} className="label link mt-6 inline-block">
            {h.allWork} →
          </MoveLink>
        </Row>

        <Row index="06" label={h.nowTitle}>
          <ul>
            {now.map((item) => (
              <li key={item.label}>
                <MoveLink
                  href={item.href}
                  className="group grid grid-cols-[7rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-line py-4"
                >
                  <span className="label text-faint">{item.label}</span>
                  <span className="title text-2xl">{item.value}</span>
                  <span aria-hidden className="text-faint transition-transform group-hover:translate-x-1 group-hover:text-fg">
                    →
                  </span>
                </MoveLink>
              </li>
            ))}
          </ul>
        </Row>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": absolute(`/${locale}#profile`),
          url: absolute(`/${locale}`),
          inLanguage: locale,
          name: t.meta.home.title,
          mainEntity: personLd(locale),
        }}
      />
    </PageShell>
  );
}

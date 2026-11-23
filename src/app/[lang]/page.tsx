import Image from "next/image";
import { ViewTransition } from "react";
import type { Metadata } from "next";
import { localizePost, posts } from "@/content/blog/posts";
import { books } from "@/content/books";
import { getProject, projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroShowcase, type ShowcaseLayer } from "@/components/ui/hero-showcase";
import { ContactInvitation } from "@/components/site/contact-invitation";
import { ToolCarousel } from "@/components/site/tool-carousel";
import { ActivitySection } from "@/components/home/activity-section";
import { ScrollReveals } from "@/components/home/scroll-reveals";
import { MoveLink } from "@/components/ui/move-link";
import { PageShell } from "@/components/ui/page-shell";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import "./home.css";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata, personLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return {
    ...pageMetadata({ locale, path: "", title: t.meta.home.title, description: site.description[locale] }),
    title: { absolute: t.meta.home.title },
  };
}

function localizeShot(media: Project["caseMedia"], locale: Locale) {
  const src = typeof media.src === "string" ? media.src : media.src?.[locale];
  if (!src) return undefined;
  return {
    src,
    dark: typeof media.dark === "string" ? media.dark : media.dark?.[locale],
    width: media.width,
    height: media.height,
  };
}

function recordedView(base: string, holdMs?: number): ShowcaseLayer {
  return {
    holdMs,
    shot: {
      src: base + "-light.webp", dark: base + "-dark.webp",
      clip: base + "-light.mp4", darkClip: base + "-dark.mp4", width: 960, height: 600,
    },
  };
}

function showcaseLayers(project: Project, mobile: Project | undefined, locale: Locale): ShowcaseLayer[] {
  const desktop = { shot: localizeShot(project.caseMedia, locale) };
  const folder = "/projects/showcase";
  const phone: ShowcaseLayer[] = mobile ? [{ phone: true, shot: localizeShot(mobile.showcaseMedia ?? mobile.caseMedia, locale) }] : [];
  if (project.slug === "grialink") {
    return [
      ...phone,
      recordedView(`${folder}/grialink-landing-${locale}`, 8500),
      recordedView(`${folder}/grialink-agents-${locale}`),
    ];
  }
  if (project.slug === "bmori") {
    const web = `${folder}/bmori-web-dark`;
    return [...phone, { shot: { src: web + ".webp", clip: web + ".mp4", width: 1200, height: 750 } }];
  }
  if (project.slug === "diodi") {
    const home = `${folder}/diodi-home-${locale}`;
    return [
      { shot: { src: home + ".webp", clip: home + ".mp4", width: 960, height: 568 } },
      recordedView(`${folder}/diodi-dashboard-${locale}`),
    ];
  }
  if (project.slug === "first-commit") {
    return [
      recordedView(`${folder}/first-commit-home`, 10500),
      recordedView(`${folder}/first-commit-kit`, 13000),
      recordedView(`${folder}/first-commit-brands`),
    ];
  }
  return [...phone, project.websitePending ? {} : desktop];
}

export default async function HomePage() {
  const { locale, t } = await getDict();
  const h = t.home;
  const reading = books.find((b) => b.status === "reading");
  const latest = posts[0];
  const selected = projects.filter((p) => ["grialink", "diodi", "first-commit"].includes(p.slug));
  const showcase = ["grialink", "diodi", "first-commit", "bmori"].flatMap((slug) => {
    const project = getProject(slug);
    if (!project) return [];
    const mobile = projects.find((item) => item.parent === slug);
    return [{
      slug, name: project.name, logo: project.logo,
      layers: showcaseLayers(project, mobile, locale),
      websitePending: project.websitePending,
      platforms: mobile?.platforms ?? [],
    }];
  });
  const post = latest && localizePost(latest, locale);

  return (
    <PageShell className="home-page">
      <header className="home-hero">
        <div className="home-intro">
          <h1 className="display" aria-label={site.name}>
            {h.hero.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="home-lede">{site.tagline[locale]}</p>
          <div className="home-actions">
            <a href="#selected-work" className="btn btn-primary">{h.ctaWork} <span aria-hidden>↓</span></a>
            <MoveLink href={`/${locale}/contact`} className="btn btn-white">{h.ctaContact}</MoveLink>
          </div>
        </div>
        <HeroShowcase items={showcase} locale={locale} labels={h.showcase} />
      </header>
      <ScrollReveals>
        <section id="selected-work" aria-labelledby="selected-title" className="home-section frame-rule-top">
          <div className="home-heading" data-reveal="up">
            <h2 id="selected-title" className="display">{h.selected}</h2>
            <MoveLink href={`/${locale}/work`} className="link">{h.allWork} <span aria-hidden>→</span></MoveLink>
          </div>
          <ul className="home-projects">
            {selected.map((project) => (
              <li key={project.slug} data-reveal="project">
                <MoveLink href={`/${locale}/work/${project.slug}`} className="home-project" data-project={project.slug}>
                  <div className="home-project-content">
                    <div className="home-project-top">
                      <ViewTransition name={`project-logo-${project.slug}`} share="morph" default="none">
                        <Image src={project.logo} alt="" width={64} height={64} />
                      </ViewTransition>
                      <span className="label">{project.year}</span>
                    </div>
                    <h3 className="title">
                      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                        <span>{project.name}</span>
                      </ViewTransition>
                      <span aria-hidden>→</span>
                    </h3>
                    <p>{(project.shortDescription ?? project.tagline)[locale]}</p>
                  </div>
                </MoveLink>
              </li>
            ))}
          </ul>
        </section>
        <section className="home-section frame-rule-top" aria-labelledby="now-title">
          <div className="home-heading" data-reveal="up"><h2 id="now-title" className="display">{h.nowTitle}</h2></div>
          <div className="home-now">
            <div className="home-building" data-reveal="left">
              <h3 className="label">{h.nowBuilding}</h3>
              <ul>
                {t.about.currentProjects.map((item) => {
                  const project = getProject(item.slug);
                  if (!project) return null;
                  return (
                    <li key={project.slug} data-project={project.parent ?? project.slug}>
                      <MoveLink href={`/${locale}/work/${project.parent ?? project.slug}`}>
                        <Image src={project.logo} alt="" width={40} height={40} />
                        <div><strong>{item.name}</strong><p>{item.description}</p></div>
                        <span aria-hidden>→</span>
                      </MoveLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <article className="home-reading" data-reveal="right">
              <h3 className="label">{h.nowReading}</h3>
              {reading ? (
                <MoveLink className="home-book" href={`/${locale}/library`}>
                  {reading.cover && <Image src={reading.cover} width={148} height={208} alt="" className="home-cover" />}
                  <div>
                    <h4 className="title">{reading.title}</h4>
                    <p className="home-author">{reading.author}</p>
                    {reading.description && <p className="home-book-note">{reading.description[locale]}</p>}
                    <span className="home-text-action">{t.nav.library} <span aria-hidden>→</span></span>
                  </div>
                </MoveLink>
              ) : <p>{h.nothing}</p>}
            </article>
            <article className="home-writing" data-reveal="up">
              <h3 className="label">{h.nowWriting}</h3>
              {post && latest ? (
                <MoveLink href={`/${locale}/blog/${latest.slug}`}>
                  <div><p className="home-post-meta"><time dateTime={latest.date}>{formatDate(latest.date, locale)}</time> · {latest.minutes} {t.blog.minutes}{latest.sample && ` · ${t.blog.sample}`}</p>
                    <h4 className="title">{post.title}</h4>
                  </div>
                  <span aria-hidden>→</span>
                </MoveLink>
              ) : <p>{t.blog.empty}</p>}
            </article>
          </div>
        </section>
        <ActivitySection locale={locale} labels={h.activity} />
        <div className="home-tools">
          <ToolCarousel label={t.about.skills} pause={t.home.showcase.pause} />
        </div>
      </ScrollReveals>
      <ContactInvitation locale={locale} t={t} placement="work" />

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

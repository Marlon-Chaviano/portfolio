import Image from "next/image";
import { CareerEntryContent, CareerMarker, CareerProgress } from "@/components/site/career-progress";
import { ScrollInkText } from "@/components/site/scroll-ink-text";
import type { Metadata } from "next";
import { Suspense } from "react";
import { career, education } from "@/content/career";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { PageShell, Row } from "@/components/ui/page-shell";
import { CvDownload } from "@/components/ui/cv-download";
import { SocialLinks } from "@/components/site/social-links";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ToolCarousel } from "@/components/site/tool-carousel";
import { TilePuzzle } from "@/components/play/tile-puzzle";
import { ChessRatings } from "@/components/site/chess-ratings";
import { LeetCodeStats } from "@/components/site/leetcode-stats";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata, personLd } from "@/lib/seo";
import "./about.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/about", title: t.meta.about.title, description: t.meta.about.description });
}

export default async function AboutPage() {
  const { locale, t } = await getDict();
  const a = t.about;
  const activities = [
    {
      name: "Chess.com",
      icon: "chessdotcom",
      href: site.chess.friendLink || `https://www.chess.com/member/${encodeURIComponent(site.chess.username)}`,
      action: a.addFriend,
      loading: a.chessLoading,
      stats: <ChessRatings labels={a} />,
    },
    {
      name: "LeetCode",
      icon: "leetcode",
      href: site.socials.leetcode,
      action: a.viewProfile,
      loading: a.leetcodeLoading,
      stats: <LeetCodeStats labels={a} locale={locale} />,
    },
  ];

  return (
    <PageShell>
      <header className="page-header about-header">
        <p className="section-label hidden lg:block">{a.title}</p>
        <div className="editorial-content about-signature">
          <div className="about-intro">
            <h1 className="display page-title">{site.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{site.role} · {site.location}</p>
          </div>
          <div className="about-portrait-frame">
            <Image src="/marlon-chaviano.webp" alt="" fill
              sizes="(min-width: 1167px) 280px, (min-width: 640px) 24vw, 30vw"
              className="about-portrait" />
          </div>
        </div>
      </header>
      <div className="page-sections">
        <Row label={a.profile}>
          <ScrollInkText text={a.bio} intro />
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">{a.bioMore}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <SocialLinks />
            <CvDownload href={site.cv[locale]} label={t.home.ctaCv} className="social-link" />
          </div>
        </Row>
        <section id="career" aria-labelledby="career-title" className="frame-rule-top scroll-mt-16 py-8">
          <h2 id="career-title" className="mb-6 text-sm text-muted">{a.timeline}</h2>
          <div className="career-inner relative">
            <CareerProgress />
            <ol className="career-timeline">
              {[...career, education].map((entry) => (
                <li key={entry.title.en} data-current={entry.current}>
                  <div className="career-period">
                    <CareerMarker />
                    <p className="label text-muted">{entry.period[locale]}</p>
                  </div>
                  <CareerEntryContent>
                    <h3 className="title text-3xl sm:text-4xl">{entry.title[locale]}</h3>
                    <p className="mt-2 font-medium">{entry.role[locale]}</p>
                    <ul className="mt-4 max-w-prose space-y-2 leading-relaxed text-muted">
                      {entry.highlights.map((detail) => (
                        <li key={detail.en}><ScrollInkText text={detail[locale]} /></li>
                      ))}
                    </ul>
                    {entry.links && (
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {entry.links.map(({ label, url, logo }) => {
                          const internal = url.startsWith("/");
                          const content = (
                            <>
                              {logo && <Image src={logo} width={24} height={24} alt="" className="career-logo" />}
                              <span className="link">{label}</span>
                              <span aria-hidden>{internal ? "→" : "↗"}</span>
                            </>
                          );
                          return internal ? (
                            <MoveLink key={url} className="career-link" href={`/${locale}${url}`}>{content}</MoveLink>
                          ) : (
                            <a key={url} className="career-link" href={url}>{content}</a>
                          );
                        })}
                      </div>
                    )}
                  </CareerEntryContent>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <Row label={a.current} className="about-building">
          <ul role="list" className="about-projects">
            {a.currentProjects.map((project) => (
              <li key={project.slug} className="min-w-0">
                <MoveLink href={`/${locale}/work/${project.slug}`} className="about-project-link" data-project={project.slug}>
                  <span className="about-project-mark">
                    <Image src={`/career/${project.slug}.png`} alt="" width={52} height={52} />
                  </span>
                  <span className="about-project-copy">
                    <span className="title about-project-name block truncate">{project.name}</span>
                    <span title={project.description} className="mt-1 block truncate text-xs text-muted sm:text-sm">{project.description}</span>
                  </span>
                  <svg aria-hidden="true" className="about-project-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
                </MoveLink>
              </li>
            ))}
          </ul>
        </Row>
        <Row id="tools" label={a.skills} className="about-tools scroll-mt-16">
          <ToolCarousel label={a.skills} pause={t.home.showcase.pause} />
        </Row>
        <Row label={a.offTitle}>
          <ul role="list" className="about-activities">
            {activities.map(({ name, icon, href, action, loading, stats }) => (
              <li key={icon} className="min-w-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={action}
                  className="about-activity-link"
                >
                  <span className="about-activity-mark"><BrandIcon name={icon} size={24} /></span>
                  <div className="about-activity-copy">
                    <h3 className="title text-base sm:text-lg">{name}</h3>
                    <span className="sr-only">{action}</span>
                    <div className="about-activity-value">
                      <Suspense fallback={<p role="status" className="text-xs text-muted">{loading}</p>}>
                        {stats}
                      </Suspense>
                    </div>
                  </div>
                  <svg aria-hidden="true" className="about-activity-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </Row>
        <Row label={a.play}>
          <TilePuzzle labels={a.puzzle} />
        </Row>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: absolute(`/${locale}/about`), inLanguage: locale, name: `${a.title} — ${site.name}`, mainEntity: personLd(locale) }} />
    </PageShell>
  );
}

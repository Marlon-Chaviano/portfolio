import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { PageHeader, PageShell, Row } from "@/components/ui/page-shell";
import { SocialLinks } from "@/components/site/social-links";
import { TechnologyList } from "@/components/ui/brand-icon";
import { TilePuzzle } from "@/components/play/tile-puzzle";
import { ChessRatings } from "@/components/site/chess-ratings";
import { LeetCodeStats } from "@/components/site/leetcode-stats";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata, personLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/about", title: t.meta.about.title, description: t.meta.about.description });
}

export default async function AboutPage() {
  const { locale, t } = await getDict();
  const a = t.about;

  return (
    <PageShell>
      <PageHeader index="02" label={a.title} title={site.name} intro={`${site.role} · ${site.location}`} />
      <div className="page-sections">
        <Row label={a.profile}>
          <p className="max-w-2xl text-xl leading-relaxed sm:text-2xl">{a.bio}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">{a.bioMore}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={site.cv[locale]} download className="link">{t.home.ctaCv}</a>
            <SocialLinks />
          </div>
        </Row>
        <Row label={a.experience}>
          <p className="label text-muted">{a.engagements}</p>
          <h3 className="title mt-3 text-3xl">{a.freelance}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{a.collaboration}</p>
          <ul className="mt-6 border-t border-line">
            {a.clientWork.map((client) => (
              <li key={client.name} className="grid items-baseline gap-2 border-b border-line py-4 sm:grid-cols-[12rem_1fr]">
                <a href={client.url} className="link w-fit font-medium">{client.name} ↗</a>
                <span className="text-sm leading-relaxed text-muted">{client.contribution}</span>
              </li>
            ))}
          </ul>
        </Row>
        <Row label={a.current}>
          <ul>
            {a.currentProjects.map((project) => (
              <li key={project.slug} className="border-b border-line last:border-0">
                <MoveLink href={`/${locale}/work/${project.slug}`} className="group grid items-baseline gap-2 py-5 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)_1rem] sm:gap-6">
                  <span className="title text-2xl group-hover:underline">{project.name}</span>
                  <span className="text-sm leading-relaxed text-muted">{project.description}</span>
                  <svg aria-hidden="true" className="hidden sm:block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
                </MoveLink>
              </li>
            ))}
          </ul>
        </Row>
        <Row label={a.skills}>
          <dl className="divide-y divide-line border-y border-line">
            {a.stackSummary.map((area) => (
              <div key={area.title} className="grid gap-4 py-6 sm:grid-cols-[minmax(8rem,1fr)_2fr]">
                <dt className="title text-2xl">{area.title}</dt>
                <dd>
                  <TechnologyList items={area.tools} />
                  <MoveLink href={`/${locale}/work/${area.project}`} className="link mt-3 inline-block text-sm text-muted">
                    {area.example} ↗
                  </MoveLink>
                </dd>
              </div>
            ))}
          </dl>
        </Row>
        <Row label={a.chess}>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="min-h-18 w-40 shrink-0">
              <Suspense fallback={<p role="status" className="text-sm text-muted">{a.chessLoading}</p>}>
                <ChessRatings labels={a} />
              </Suspense>
            </div>
            <a href={site.chess.friendLink || `https://www.chess.com/member/${encodeURIComponent(site.chess.username)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {a.addFriend}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </a>
          </div>
        </Row>
        <Row label="LeetCode">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="min-h-18 w-40 shrink-0">
              <Suspense fallback={<p role="status" className="text-sm text-muted">{a.leetcodeLoading}</p>}>
                <LeetCodeStats labels={a} locale={locale} />
              </Suspense>
            </div>
            <a href={site.socials.leetcode} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {a.viewProfile}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </a>
          </div>
        </Row>
        <Row label={a.play}>
          <TilePuzzle labels={a.puzzle} />
        </Row>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: absolute(`/${locale}/about`), inLanguage: locale, name: `${a.title} — ${site.name}`, mainEntity: personLd(locale) }} />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getProject, projects, type CaseMedia, type Project } from "@/content/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { BrandIcon, TechnologyList } from "@/components/ui/brand-icon";
import { PageShell, Row } from "@/components/ui/page-shell";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/locale";
import { absolute, breadcrumbLd, pageMetadata } from "@/lib/seo";
import "./case-study.css";

// Prerender the whole case so React can morph the logo and title in one commit.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getDict();
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${project.name} — ${project.tagline[locale]}`,
    description: project.summary[locale],
  });
}

function CaseIdentity({ project, heading = false }: { project: Project; heading?: boolean }) {
  const Tag = heading ? "h1" : "span";
  return (
    <Tag className={`case-identity${heading ? " case-identity-hero" : ""}`} data-project={project.slug}>
      <ViewTransition name={`project-logo-${project.slug}`} share="morph" default="none">
        <Image src={project.logo} alt="" width={72} height={72} className="case-logo" loading={heading ? "eager" : undefined} />
      </ViewTransition>
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <span className={`display ${heading ? "page-title" : "case-next-title"}`}>{project.name}</span>
      </ViewTransition>
    </Tag>
  );
}

function CaseFigure({ media, locale, pendingLabel }: { media: CaseMedia; locale: Locale; pendingLabel: string }) {
  const src = typeof media.src === "string" ? media.src : media.src?.[locale];
  const dark = typeof media.dark === "string" ? media.dark : media.dark?.[locale];
  return (
    <figure className="case-media" data-orientation={media.width < media.height ? "portrait" : "landscape"}>
      {src ? (
        <picture>
          {dark && <source media="(prefers-color-scheme: dark)" srcSet={dark} />}
          <Image src={src} alt="" width={media.width} height={media.height} unoptimized />
        </picture>
      ) : (
        <div className="case-media-placeholder" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
          {pendingLabel}
        </div>
      )}
      <figcaption>{media.caption[locale]}</figcaption>
    </figure>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getDict();
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const mobile = projects.find((candidate) => candidate.parent === project.slug);
  const c = t.caseStudy;
  const { caseMedia: media } = project;
  const projectImage = typeof media.src === "string" ? media.src : media.src[locale];
  const portrait = media.width < media.height;
  const meta = [
    { label: c.role, value: project.role[locale] },
    { label: c.year, value: project.year },
    {
      label: c.status,
      value: <span className="case-status">{project.status[locale]}</span>,
    },
  ];

  return (
    <PageShell className="case-page">
      <article>
        <header className="page-header case-header">
          <p className="section-label">
            <MoveLink href={`/${locale}/work`} transitionTypes={["move-back"]} className="link text-muted">
              ← {c.back}
            </MoveLink>
          </p>
          <div className="editorial-content">
            <CaseIdentity project={project} heading />
            <div className="case-intro">
              <p className="case-tagline">{project.tagline[locale]}</p>
              {(project.url || project.repo || mobile || project.platforms) && (
                <div className="case-actions">
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn">
                      {c.source} <BrandIcon name="github" size={16} />
                    </a>
                  )}
                  {mobile && (
                    <MoveLink href={`/${locale}/work/${mobile.slug}`} transitionTypes={["move-forward"]} className="btn">
                      {t.work.viewMobileApp}
                    </MoveLink>
                  )}
                  {project.platforms && (
                    <ul role="list" className="case-platforms">
                      {project.platforms.map((platform) => {
                        const store = project.storeLinks?.[platform];
                        const icon = <BrandIcon name={platform} size={18} />;
                        return (
                          <li key={platform}>
                            {store ? (
                              <a href={store} target="_blank" rel="noopener noreferrer" className="btn">
                                {icon} {platform === "iOS" ? "App Store" : "Google Play"}
                              </a>
                            ) : (
                              <>{icon} {platform}</>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary case-site-link">
                      {t.work.visitSite}
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
            <dl className="case-meta">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="page-sections">
          <Row label={c.context} className="case-context-row">
            <div className="case-context">
              <p>{project.summary[locale]}</p>
              <p>{project.problem[locale]}</p>
            </div>
          </Row>

          <Row label={c.built}>
            <div className={`case-delivery${portrait ? " case-delivery-portrait" : ""}`}>
              <ul role="list" className="case-points">
                {project.built.map((point) => (
                  <li key={point.title.en}>
                    <h3 className="title">{point.title[locale]}</h3>
                    <p>{point.body[locale]}</p>
                  </li>
                ))}
              </ul>
              <div className="case-visuals">
                <CaseFigure media={media} locale={locale} pendingLabel={c.screenshotPending} />
                {project.additionalMedia && <CaseFigure media={project.additionalMedia} locale={locale} pendingLabel={c.screenshotPending} />}
              </div>
            </div>
          </Row>

          {project.decisions.length > 0 && (
            <Row label={c.decisions}>
              <ul role="list" className="case-points case-decisions">
                {project.decisions.map((decision) => (
                  <li key={decision.title.en}>
                    <h3 className="title">{decision.title[locale]}</h3>
                    <p>{decision.body[locale]}</p>
                  </li>
                ))}
              </ul>
            </Row>
          )}

          <Row label={c.outcome}>
            <p className="case-outcome">{project.outcome[locale]}</p>
            {project.facts.length > 0 && (
              <ul role="list" className="case-facts">
                {project.facts.map((fact) => (
                  <li key={fact.value + fact.label.en}>
                    <span className="display">{typeof fact.value === "number" ? fact.value.toLocaleString(locale) : fact.value}</span>
                    <span>{fact.label[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </Row>

          <Row label={c.stack}>
            <TechnologyList items={project.stack} />
          </Row>
        </div>
      </article>

      <div className="frame-rule-top case-next">
        <span className="case-next-label">{c.next}</span>
        <div className="editorial-content">
          <MoveLink
            href={`/${locale}/work/${next.slug}`}
            transitionTypes={["move-forward"]}
            aria-label={`${c.next} · ${next.name}`}
            className="case-next-link"
          >
            <CaseIdentity project={next} />
            <svg className="case-next-arrow" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
          </MoveLink>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": project.schemaType,
          name: project.name,
          description: project.summary[locale],
          inLanguage: locale,
          ...(project.url ? { url: project.url } : {}),
          ...(project.repo ? { codeRepository: project.repo } : {}),
          image: absolute(projectImage),
          ...(project.schemaType === "MobileApplication"
            ? { operatingSystem: project.platforms?.join(", ") ?? "iOS, Android", applicationCategory: project.applicationCategory }
            : {}),
          ...(project.schemaType === "SoftwareApplication"
            ? {
                applicationCategory: project.applicationCategory ?? "BusinessApplication",
                operatingSystem: ["Web", ...(mobile?.platforms ?? [])].join(", "),
              }
            : {}),
          ...(project.schemaType === "SoftwareSourceCode" ? { programmingLanguage: "TypeScript" } : {}),
          keywords: project.stack.join(", "),
          [project.schemaType === "WebSite" ? "creator" : "author"]: { "@id": absolute("/#person") },
          mainEntityOfPage: absolute(`/${locale}/work/${project.slug}`),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: t.nav.home, path: `/${locale}` },
          { name: t.nav.work, path: `/${locale}/work` },
          { name: project.name, path: `/${locale}/work/${project.slug}` },
        ])}
      />
    </PageShell>
  );
}

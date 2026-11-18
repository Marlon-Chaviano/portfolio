import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getProject, projects } from "@/content/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { TechnologyList } from "@/components/ui/brand-icon";
import { PageShell, Row } from "@/components/ui/page-shell";
import { getDict } from "@/lib/locale";
import { absolute, breadcrumbLd, pageMetadata } from "@/lib/seo";

// Each case study is prerendered whole, so the navigation waits for the full
// page instead of a placeholder; that keeps the title morph in one commit.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getDict();
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const c = t.caseStudy;
  const impact = project.impact?.[locale];
  const pendingImpact = impact?.startsWith("[");

  const meta = [
    { label: c.role, value: project.role[locale] },
    { label: c.year, value: project.year },
    { label: c.status, value: project.status[locale] },
  ];

  return (
    <PageShell>
      <article>
        <header className="page-header">
          <p className="section-label">
            <MoveLink href={`/${locale}/work`} transitionTypes={["move-back"]} className="link text-muted">
              ← {c.back}
            </MoveLink>
          </p>
          <div className="editorial-content">
            <h1 className="min-w-0">
              <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                <span className="display page-title block">{project.name}</span>
              </ViewTransition>
            </h1>

            <div className="mt-5 max-w-xl">
              <p className="rise text-xl leading-snug text-muted">{project.tagline[locale]}</p>
              {(project.url || project.repo) && (
                <p className="rise mt-6 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener" className="btn btn-primary">
                      {c.visit} {new URL(project.url).hostname.replace(/^www\./, "")} ↗
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener" className="btn">
                      {c.source} ↗
                    </a>
                  )}
                </p>
              )}
            </div>
          </div>
        </header>

        {project.preview && (
          <div
            className="rise relative mt-14 aspect-[16/10] overflow-hidden border border-line bg-card"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Image
              src={project.preview}
              alt={`${project.name} — ${project.tagline[locale]}`}
              fill
              priority
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="page-sections mt-8">
          <Row as="div" label={project.name}>
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="label text-faint">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="reveal mt-12 max-w-3xl text-2xl leading-snug sm:text-3xl">{project.summary[locale]}</p>

            {project.facts.length > 0 && (
              <ul className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-6 sm:grid-cols-3">
                {project.facts.map((fact) => (
                  <li key={fact.value + fact.label.en} className="reveal">
                    <span className="display block text-6xl">{fact.value}</span>
                    <span className="mt-2 block text-sm text-muted">{fact.label[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </Row>

          <Row index="01" label={c.problem}>
            <p className="reveal max-w-2xl text-lg leading-relaxed">{project.problem[locale]}</p>
          </Row>

          <Row index="02" label={c.built}>
            <ol className="max-w-2xl">
              {project.built.map((item, i) => (
                <li key={i} className="reveal grid grid-cols-[2.5rem_1fr] border-b border-line py-5 leading-relaxed first:pt-0">
                  <span className="label pt-1.5 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ol>
          </Row>

          <Row index="03" label={c.decisions}>
            <div className="grid max-w-2xl gap-10">
              {project.decisions.map((decision) => (
                <div key={decision.title.en} className="reveal">
                  <h3 className="title text-3xl">{decision.title[locale]}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{decision.body[locale]}</p>
                </div>
              ))}
            </div>
          </Row>

          <Row index="04" label={c.outcome}>
            <p className="reveal max-w-2xl text-lg leading-relaxed">{project.outcome[locale]}</p>
            {impact && (!pendingImpact || process.env.NODE_ENV === "development") && (
              <p className="mt-4 max-w-2xl border-l border-line pl-4 text-sm leading-relaxed text-muted">{impact}</p>
            )}
          </Row>

          <Row index="05" label={c.stack}>
            <TechnologyList items={project.stack} />
          </Row>
        </div>
      </article>

      <MoveLink
        href={`/${locale}/work/${next.slug}`}
        transitionTypes={["move-forward"]}
        className="frame-rule-top group mt-24 grid gap-x-10 gap-y-3 pt-5 lg:grid-cols-[13rem_minmax(0,1fr)]"
      >
        <span className="label text-muted">{c.next}</span>
        <span className="editorial-content flex items-baseline justify-between gap-6">
          <span className="display text-[clamp(2.5rem,6.5vw,5.5rem)]">{next.name}</span>
          <span aria-hidden className="text-3xl text-faint transition-transform group-hover:translate-x-2 group-hover:text-fg">
            →
          </span>
        </span>
      </MoveLink>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": project.schemaType,
          name: project.name,
          description: project.summary[locale],
          inLanguage: locale,
          ...(project.url ? { url: project.url } : {}),
          ...(project.repo ? { codeRepository: project.repo } : {}),
          ...(project.preview ? { image: absolute(project.preview) } : {}),
          ...(project.schemaType === "MobileApplication"
            ? { operatingSystem: "iOS, Android", applicationCategory: "FinanceApplication" }
            : {}),
          ...(project.schemaType === "SoftwareApplication"
            ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" }
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

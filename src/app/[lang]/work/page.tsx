import type { Metadata } from "next";
import { projects, type ProjectKind } from "@/content/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, PageShell, Row } from "@/components/ui/page-shell";
import { ProjectIndex } from "@/components/ui/project-index";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/work", title: t.meta.work.title, description: t.meta.work.description });
}

export default async function WorkPage() {
  const { locale, t } = await getDict();
  const kinds = [...new Set(projects.flatMap((p) => p.kinds))] as ProjectKind[];

  return (
    <PageShell>
      <PageHeader index="01" label={t.nav.work} title={t.work.title} intro={t.work.intro} />

      <Row label={`${projects.length} ${t.work.count}`}>
        <ProjectIndex
          locale={locale}
          sourceLabel={t.caseStudy.source}
          privateLabel={t.work.privatePreview}
          filters={[
            { key: "all", label: t.work.filterAll },
            ...kinds.map((k) => ({ key: k, label: t.work.kinds[k] })),
          ]}
          items={projects.map((p) => ({
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
      </Row>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: absolute(`/${locale}/work`),
          name: t.meta.work.title,
          description: t.meta.work.description,
          inLanguage: locale,
          author: { "@id": absolute("/#person") },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: absolute(`/${locale}/work/${p.slug}`),
            })),
          },
        }}
      />
    </PageShell>
  );
}

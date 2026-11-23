import { ContactInvitation } from "@/components/site/contact-invitation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import type { ProjectSlug } from "@/content/slugs";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { WorkGallery } from "@/components/ui/work-gallery";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata } from "@/lib/seo";
import "./work-gallery.css";

const darkPreviews = new Set<ProjectSlug>(["grialink", "first-commit"]);

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/work", title: t.meta.work.title, description: t.meta.work.description });
}

export default async function WorkPage() {
  const { locale, t } = await getDict();
  const items = projects.filter((project) => !project.parent).map((project) => {
    const mobile = projects.find((candidate) => candidate.parent === project.slug);
    const webPreview = project.slug === "bmori" ? project.caseMedia : undefined;
    return {
      slug: project.slug,
      name: project.name,
      description: project.shortDescription?.[locale] ?? project.summary[locale],
      kinds: [...new Set([...project.kinds, ...(mobile?.kinds ?? [])])],
      url: project.url,
      websitePending: project.websitePending,
      repo: project.repo,
      logo: project.logo,
      preview: {
        src: (typeof webPreview?.src === "string" ? webPreview.src : webPreview?.src?.[locale])
          ?? `/projects/previews/${project.slug}-light.webp`,
        dark: darkPreviews.has(project.slug) ? `/projects/previews/${project.slug}-dark.webp` : undefined,
        width: webPreview?.width ?? 1280,
        height: webPreview?.height ?? 800,
      },
      mobile: mobile && { slug: mobile.slug },
    };
  });
  const kinds = [...new Set(items.flatMap((project) => project.kinds))];

  return (
    <PageShell className="work-page">
      <PageHeader index="01" label={t.nav.work} title={t.work.title} intro={t.work.intro} />

      <WorkGallery
        locale={locale}
        labels={{
          count: `${items.length} ${t.work.count}`,
          filter: t.work.filterLabel,
          visit: t.work.visitSite,
          source: t.caseStudy.source,
          mobile: t.work.mobileApp,
          unavailable: t.work.unavailable,
        }}
        filters={[
          { key: "all", label: t.work.filterAll },
          ...kinds.map((kind) => ({ key: kind, label: t.work.kinds[kind] })),
        ]}
        items={items}
      />

      <ContactInvitation locale={locale} t={t} placement="work" />
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
            itemListElement: items.map((p, i) => ({
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, localizePost, posts } from "@/content/blog/posts";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { PageShell, SampleTag } from "@/components/ui/page-shell";
import { formatDate } from "@/lib/format";
import { getDict } from "@/lib/locale";
import { absolute, breadcrumbLd, pageMetadata } from "@/lib/seo";
import "../blog.css";

// Posts are prerendered whole; the navigation waits for the article itself.
export const instant = false;

export function generateStaticParams() {
  // The build needs at least one value even before the first post exists.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getDict();
  const post = getPost(slug);
  if (!post) return {};
  const text = localizePost(post, locale);
  const base = pageMetadata({ locale, path: `/blog/${slug}`, title: text.title, description: text.summary });
  return {
    ...base,
    ...(post.sample && { robots: { index: false, follow: true } }),
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, authors: [absolute(`/${locale}/about`)] },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getDict();
  const post = getPost(slug);
  if (!post) notFound();

  const b = t.blog;
  const text = localizePost(post, locale);
  const { default: Body } = await import(`@/content/blog/${post.slug}.${text.lang}.mdx`);
  const next = posts[posts.indexOf(post) + 1];

  return (
    <PageShell className="blog-post">
      <article lang={text.lang} className="grid gap-x-10 gap-y-8 pt-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="label rise flex flex-row flex-wrap gap-x-6 gap-y-2 text-faint lg:sticky lg:top-24 lg:flex-col lg:self-start" lang={locale}>
          <MoveLink href={`/${locale}/blog`} transitionTypes={["move-back"]} className="link text-muted">
            ← {b.back}
          </MoveLink>
          <time dateTime={post.date} className="lg:mt-6">
            {formatDate(post.date, locale)}
          </time>
          <span>
            {post.minutes} {b.minutes}
          </span>
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
          {post.sample && (
            <span>
              <SampleTag label={b.sample} />
            </span>
          )}
        </aside>

        <div className="max-w-[44rem]">
          <h1 className="display rise text-[clamp(2.5rem,6vw,5rem)]" style={{ "--i": 1 } as React.CSSProperties}>
            {text.title}
          </h1>
          <p className="serif rise mt-6 text-2xl leading-snug text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            {text.summary}
          </p>
          {text.lang !== locale && (
            <p className="label mt-6 text-faint" lang={locale}>
              {b.onlyIn}
            </p>
          )}

          <div className="blog-section-rule prose rise mt-12 pt-10" style={{ "--i": 3 } as React.CSSProperties}>
            <Body />
          </div>

          <footer className="blog-section-rule label mt-16 flex flex-wrap items-center justify-between gap-4 pt-5" lang={locale}>
            <span className="text-faint">{site.name}</span>
            {next ? (
              <MoveLink href={`/${locale}/blog/${next.slug}`} className="link">
                {b.next}: {localizePost(next, locale).title} →
              </MoveLink>
            ) : (
              <MoveLink href={`/${locale}/contact`} className="link">
                {t.home.ctaContact} →
              </MoveLink>
            )}
          </footer>
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: text.title,
          description: text.summary,
          datePublished: post.date,
          inLanguage: text.lang,
          keywords: post.tags.join(", "),
          author: { "@id": absolute("/#person") },
          publisher: { "@id": absolute("/#person") },
          mainEntityOfPage: absolute(`/${locale}/blog/${post.slug}`),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: t.nav.home, path: `/${locale}` },
          { name: t.nav.blog, path: `/${locale}/blog` },
          { name: text.title, path: `/${locale}/blog/${post.slug}` },
        ])}
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { localizePost, posts } from "@/content/blog/posts";
import { JsonLd } from "@/components/seo/json-ld";
import { MoveLink } from "@/components/ui/move-link";
import { PageHeader, PageShell, Row, SampleTag } from "@/components/ui/page-shell";
import { formatDate } from "@/lib/format";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/blog", title: t.meta.blog.title, description: t.meta.blog.description });
}

export default async function BlogPage() {
  const { locale, t } = await getDict();
  const b = t.blog;

  return (
    <PageShell>
      <PageHeader index="04" label={t.nav.blog} title={b.title} intro={b.intro} />

      <Row label={`${posts.length} · ${t.palette.posts}`}>
        {posts.length === 0 && <p className="text-muted">{b.empty}</p>}
        <ol>
          {posts.map((post, i) => {
            const text = localizePost(post, locale);
            return (
              <li key={post.slug} className="reveal">
                <MoveLink
                  href={`/${locale}/blog/${post.slug}`}
                  transitionTypes={["move-forward"]}
                  className="group grid gap-x-10 gap-y-3 border-b border-line py-8 first:pt-0 md:grid-cols-[9rem_minmax(0,1fr)_auto]"
                >
                  <span className="label flex flex-col gap-1 text-faint">
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                    <span>
                      {post.minutes} {b.minutes}
                    </span>
                  </span>
                  <span lang={text.lang}>
                    <span
                      className={`display block transition-transform duration-300 group-hover:translate-x-1 ${
                        i === 0 ? "text-[clamp(2rem,4.5vw,3.75rem)]" : "text-3xl"
                      }`}
                    >
                      {text.title}
                    </span>
                    <span className="mt-3 block max-w-2xl leading-relaxed text-muted">{text.summary}</span>
                    <span className="label mt-4 flex flex-wrap items-center gap-3 text-faint">
                      {post.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                      {post.sample && <SampleTag label={b.sample} />}
                    </span>
                  </span>
                  <span aria-hidden className="text-2xl text-faint transition-transform group-hover:translate-x-1 group-hover:text-fg">
                    →
                  </span>
                </MoveLink>
              </li>
            );
          })}
        </ol>
      </Row>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          url: absolute(`/${locale}/blog`),
          name: `${t.meta.blog.title} — Marlon Chaviano`,
          description: t.meta.blog.description,
          inLanguage: locale,
          author: { "@id": absolute("/#person") },
          blogPost: posts
            .filter((p) => !p.sample)
            .map((p) => ({
              "@type": "BlogPosting",
              headline: localizePost(p, locale).title,
              datePublished: p.date,
              url: absolute(`/${locale}/blog/${p.slug}`),
            })),
        }}
      />
    </PageShell>
  );
}

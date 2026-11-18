import type { Metadata } from "next";
import { books, bookCategories } from "@/content/books";
import { BookCollection } from "@/components/library/book-collection";
import { LibraryTabs } from "@/components/library/library-tabs";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { getDict } from "@/lib/locale";
import { absolute, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/library", title: t.meta.library.title, description: t.meta.library.description });
}

export default async function LibraryPage() {
  const { locale, t } = await getDict();
  const l = t.library;

  return (
    <PageShell>
      <PageHeader index="03" label={t.nav.library} title={l.title} intro={l.intro} />
      <LibraryTabs
        label={l.categoriesLabel}
        shelves={bookCategories.map((category) => ({
          id: category,
          label: l.categories[category],
          content: <BookCollection books={books.filter((book) => book.category === category)} locale={locale} labels={l} />,
        }))}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: absolute(`/${locale}/library`),
          name: t.meta.library.title,
          description: t.meta.library.description,
          inLanguage: locale,
          author: { "@id": absolute("/#person") },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: books.map((book, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Book",
                name: book.title,
                ...(book.author ? { author: { "@type": "Person", name: book.author } } : {}),
                ...(book.description ? { description: book.description[locale] } : {}),
              },
            })),
          },
        }}
      />
    </PageShell>
  );
}

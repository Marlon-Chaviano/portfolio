import Image from "next/image";
import type { Book } from "@/content/books";
import { Row } from "@/components/ui/page-shell";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";

function Cover({ book, sizes }: { book: Book; sizes: string }) {
  return (
    <div aria-hidden="true" className="relative aspect-[2/3] overflow-hidden bg-card shadow-[0_30px_40px_-30px_rgb(0_0_0/0.45)]">
      {book.cover ? (
        <Image src={book.cover} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full flex-col justify-between p-4">
          <span className="title text-lg leading-tight">{book.title}</span>
          {book.author && <span className="text-sm text-muted">{book.author}</span>}
        </div>
      )}
    </div>
  );
}

export function BookCollection({ books, locale, labels }: { books: Book[]; locale: Locale; labels: Dict["library"] }) {
  const reading = books.filter((book) => book.status === "reading");
  const read = books.filter((book) => book.status === "read");
  const queue = books.filter((book) => book.status === "queue");
  const dateFormat = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <div className="page-sections">
      {reading.length > 0 && (
        <Row label={labels.reading}>
          <div className="grid gap-14">
            {reading.map((book) => (
              <article key={book.title} className="grid items-start gap-x-10 gap-y-6 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <h3 className="display text-balance text-[clamp(2rem,3.5vw,3.5rem)]">{book.title}</h3>
                  {book.author && <p className="serif mt-3 text-2xl text-muted">{book.author}</p>}
                  {book.description && <p className="mt-5 max-w-xl leading-relaxed text-muted">{book.description[locale]}</p>}
                </div>
                <div className="w-48 sm:order-first sm:w-full">
                  <Cover book={book} sizes="(min-width: 640px) 220px, 192px" />
                </div>
              </article>
            ))}
          </div>
        </Row>
      )}

      {read.length > 0 && (
        <Row label={`${labels.read} · ${read.length}`}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
            {read.map((book) => (
              <li key={book.title} className="min-w-0">
                <Cover book={book} sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw" />
                <h3 className="title mt-4 text-xl">{book.title}</h3>
                {book.author && <p className="mt-1 text-sm text-muted">{book.author}</p>}
                {book.finished && (
                  <time dateTime={book.finished} className="label mt-2 block text-faint">
                    {dateFormat.format(new Date(`${book.finished}-01T12:00:00Z`))}
                  </time>
                )}
              </li>
            ))}
          </ul>
        </Row>
      )}

      {queue.length > 0 && (
        <Row label={`${labels.queue} · ${queue.length}`}>
          <details className="group/queue">
            <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-4 text-sm [&::-webkit-details-marker]:hidden">
              <span className="group-open/queue:hidden">{labels.showQueue}</span>
              <span className="hidden group-open/queue:inline">{labels.hideQueue}</span>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-open/queue:rotate-180"><path d="m6 9 6 6 6-6" /></svg>
            </summary>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {queue.map((book) => (
                <li key={book.title} className="border-t border-line py-4">
                  <h3 className="font-medium leading-snug">{book.title}</h3>
                  {book.author && <p className="mt-1 text-sm text-muted">{book.author}</p>}
                </li>
              ))}
            </ul>
          </details>
        </Row>
      )}
      {books.length === 0 && <Row label={labels.read}><p className="text-muted">{labels.empty}</p></Row>}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import { MoveLink } from "./move-link";

export type ProjectIndexItem = {
  slug: string;
  name: string;
  year: string;
  status: string;
  tagline: string;
  kinds: string[];
  kindKeys: string[];
  preview?: string;
  repo?: string;
};

/**
 * Work as an index, not a gallery: a list of names on the left and one
 * preview "stage" on the right that shows whichever row is under the pointer.
 * On small screens each row carries its own preview.
 */
export function ProjectIndex({
  items,
  locale,
  filters,
  privateLabel,
  sourceLabel,
}: {
  items: ProjectIndexItem[];
  locale: string;
  filters?: { key: string; label: string }[];
  privateLabel: string;
  sourceLabel: string;
}) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(items[0]?.slug);
  const visible = items.filter((item) => filter === "all" || item.kindKeys.includes(filter));
  const shown = visible.find((item) => item.slug === active) ?? visible[0];

  const cover = (item: ProjectIndexItem, sizes: string, priority = false) =>
    item.preview ? (
      <Image src={item.preview} alt="" fill sizes={sizes} priority={priority} className="grayscale object-cover object-top" />
    ) : (
      <span className="poster absolute inset-0 grid place-items-center">
        <span className="label text-muted">{privateLabel}</span>
      </span>
    );

  return (
    <div>
      {filters && (
        <div role="group" className="label mb-6 flex flex-wrap gap-x-5 gap-y-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              data-sound="tab"
              className="py-1 text-faint transition-colors hover:text-fg aria-pressed:text-fg aria-pressed:underline aria-pressed:underline-offset-4"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <ol className="border-b border-line">
          {items.map((item, i) => (
            <li key={item.slug} hidden={!visible.includes(item)} className="border-t border-line py-5" onPointerEnter={() => setActive(item.slug)} onFocus={() => setActive(item.slug)}>
              <MoveLink
                href={`/${locale}/work/${item.slug}`}
                transitionTypes={["move-forward"]}
                className="group block"
              >
                <span className="relative mb-4 block aspect-[16/10] overflow-hidden border border-line bg-card lg:hidden">
                  {cover(item, "100vw", i === 0)}
                  <span className="label absolute bottom-2 left-2 max-w-[90%] border border-line bg-card px-2 py-1">{item.status}</span>
                </span>
                <span className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3">
                  <span className="label text-faint" aria-hidden>{String(visible.indexOf(item) + 1).padStart(2, "0")}</span>
                  <ViewTransition name={`project-${item.slug}`} share="morph" default="none">
                    <span
                      className={`title text-3xl transition-[color,translate] duration-300 group-hover:translate-x-1 sm:text-4xl ${
                        shown?.slug === item.slug ? "" : "lg:text-faint"
                      } group-hover:text-fg`}
                    >
                      {item.name}
                    </span>
                  </ViewTransition>
                  <span className="label text-faint">{item.year}</span>
                  <span className="col-span-2 col-start-2 mt-2 max-w-md text-sm leading-relaxed text-muted">{item.tagline}</span>
                  <span className="label col-start-2 mt-2 flex flex-wrap gap-x-3 text-faint">
                    {item.kinds.map((kind) => (
                      <span key={kind}>{kind}</span>
                    ))}
                  </span>
                </span>
              </MoveLink>
              {item.repo && (
                <a href={item.repo} className="link label ml-11 mt-3 inline-block py-1">
                  {sourceLabel}<span className="sr-only"> · {item.name}</span> ↗
                </a>
              )}
            </li>
          ))}
        </ol>

        <div aria-hidden className="hidden lg:block">
          <div className="sticky top-24">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-card">
              {visible.map((item, i) => (
                <span
                  key={item.slug}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    shown?.slug === item.slug ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {cover(item, "(min-width: 1320px) 660px, 50vw", i === 0)}
                </span>
              ))}
            </div>
            <p className="label mt-3 flex justify-between text-faint">
              <span className="flex flex-wrap gap-x-3"><strong className="text-fg">{shown?.name}</strong>{shown?.status}</span>
              <span>
                {String(visible.indexOf(shown!) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

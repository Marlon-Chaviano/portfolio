"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, ViewTransition } from "react";
import type { Project, ProjectKind } from "@/content/projects";
import { BrandIcon } from "./brand-icon";
import { MoveLink } from "./move-link";
import { Row } from "./page-shell";

type GalleryItem = Pick<Project, "slug" | "name" | "url" | "repo" | "kinds" | "logo" | "websitePending"> & {
  description: string;
  preview: { src: string; dark?: string; width: number; height: number };
  mobile?: Pick<Project, "slug" | "platforms">;
};
type GalleryLabels = { count: string; filter: string; visit: string; source: string; mobile: string; unavailable: string };
type FilterKey = "all" | ProjectKind;
type PreviewPosition = ReturnType<typeof getPreviewPosition>;
type ActivePreview = {
  slug: Project["slug"];
  card: HTMLElement;
  aspectRatio: number;
  position: PreviewPosition;
};

function getPreviewPosition(card: HTMLElement, aspectRatio: number) {
  const rect = card.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const gutter = 12;
  const preferredWidth = Math.min(Math.max(rect.width, 384), 325 * aspectRatio, viewportWidth - gutter * 2);
  const spaceAbove = rect.top - 72;
  const spaceBelow = window.innerHeight - rect.bottom - 16;
  const above = spaceAbove >= preferredWidth / aspectRatio * 0.75 || spaceAbove >= spaceBelow;
  const width = Math.min(preferredWidth, Math.max(0, above ? spaceAbove : spaceBelow) * aspectRatio);
  const centeredLeft = rect.left + (rect.width - width) / 2;
  const left = Math.max(gutter, Math.min(centeredLeft, viewportWidth - width - gutter)) - rect.left;
  return { above, width, left };
}

function ProjectCard({ item, locale, labels, previewPosition, onPreviewOpen, onPreviewClose }: {
  item: GalleryItem;
  locale: string;
  labels: GalleryLabels;
  previewPosition?: PreviewPosition;
  onPreviewOpen: (card: HTMLElement) => void;
  onPreviewClose: () => void;
}) {
  const card = useRef<HTMLElement>(null);
  const unavailableHint = useId();
  const { preview } = item;
  const hasActions = Boolean(item.url || item.repo || item.mobile || item.websitePending);
  const siteIcon = <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10" /></svg>;

  function showPreview() {
    if (card.current) onPreviewOpen(card.current);
  }

  return (
    <article
      ref={card}
      className="work-card"
      data-project={item.slug}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") showPreview();
      }}
      onPointerLeave={() => {
        if (!card.current?.querySelector(".work-card-link:focus-visible")) onPreviewClose();
      }}
    >
      <MoveLink
        href={`/${locale}/work/${item.slug}`}
        transitionTypes={["move-forward"]}
        className="work-card-link"
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) showPreview();
        }}
        onBlur={() => {
          if (!card.current?.matches(":hover")) onPreviewClose();
        }}
        onNavigate={onPreviewClose}
      >
        <ViewTransition name={`project-logo-${item.slug}`} share="morph" default="none">
          <Image src={item.logo} alt="" width={52} height={52} className="work-card-logo" />
        </ViewTransition>
        <div className="work-card-heading">
          <h3 className="min-w-0">
            <ViewTransition name={`project-${item.slug}`} share="morph" default="none">
              <span className="title work-card-title block">{item.name}</span>
            </ViewTransition>
          </h3>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </div>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{item.description}</p>
      </MoveLink>
      <div className="work-card-actions">
        {!item.url && item.websitePending && (
          <span className="work-disabled-site" title={labels.unavailable}>
            <button type="button" className="work-card-action work-site-link" aria-describedby={unavailableHint} disabled>
              {labels.visit} {siteIcon}
            </button>
            <span id={unavailableHint} hidden>{labels.unavailable}</span>
          </span>
        )}
        {!hasActions && (
          <button type="button" className="work-card-action" disabled>
            {labels.unavailable}
          </button>
        )}
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${labels.visit} · ${item.name}`} className="work-card-action work-site-link">
            {labels.visit} {siteIcon}
          </a>
        )}
        {item.repo && (
          <a href={item.repo} target="_blank" rel="noopener noreferrer" aria-label={`${labels.source} · ${item.name} (GitHub)`} className="work-card-action">
            {labels.source}
            <BrandIcon name="github" size={18} />
          </a>
        )}
        {item.mobile && (
          <MoveLink
            href={`/${locale}/work/${item.mobile.slug}`}
            aria-label={`${labels.mobile} · ${item.name}`}
            className="work-card-action work-mobile-link"
            onNavigate={onPreviewClose}
          >
            <span>{labels.mobile}</span>
            {item.mobile.platforms && (
              <span className="work-mobile-platforms" aria-hidden="true">
                {item.mobile.platforms.map((platform) => <BrandIcon key={platform} name={platform} size={13} monochrome />)}
              </span>
            )}
          </MoveLink>
        )}
      </div>
      {previewPosition && previewPosition.width > 0 && (
        <div
          className="work-card-preview"
          data-placement={previewPosition.above ? "above" : "below"}
          style={{ left: previewPosition.left, width: previewPosition.width }}
          aria-hidden="true"
        >
          <div className="work-preview-frame">
            <picture>
              {preview.dark && <source media="(prefers-color-scheme: dark)" srcSet={preview.dark} />}
              <Image src={preview.src} alt="" width={preview.width} height={preview.height} loading="eager" unoptimized />
            </picture>
          </div>
        </div>
      )}
    </article>
  );
}

export function WorkGallery({ items, locale, filters, labels }: {
  items: GalleryItem[];
  locale: string;
  filters: { key: FilterKey; label: string }[];
  labels: GalleryLabels;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null);
  const visible = items.filter((item) => filter === "all" || item.kinds.includes(filter));
  const activeCard = activePreview?.card;
  const activeAspectRatio = activePreview?.aspectRatio;

  useEffect(() => {
    if (!activeCard || !activeAspectRatio) return;

    const reposition = () => {
      const position = getPreviewPosition(activeCard, activeAspectRatio);
      setActivePreview((current) => current?.card === activeCard ? { ...current, position } : current);
    };
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") setActivePreview(null);
    }

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("keydown", dismiss);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("keydown", dismiss);
    };
  }, [activeCard, activeAspectRatio]);

  return (
    <Row label={labels.count} className="work-projects">
      <div role="group" aria-label={labels.filter} className="work-filters">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className="work-filter"
            aria-pressed={filter === key}
            onClick={() => {
              setActivePreview(null);
              setFilter(key);
            }}
            data-sound="tab"
          >
            {label}
          </button>
        ))}
      </div>
      <ol role="list" className="work-gallery-grid" data-filter={filter}>
        {visible.map((item) => (
          <li key={item.slug}>
            <ProjectCard
              item={item}
              locale={locale}
              labels={labels}
              previewPosition={activePreview?.slug === item.slug ? activePreview.position : undefined}
              onPreviewOpen={(card) => {
                const aspectRatio = item.preview.width / item.preview.height;
                setActivePreview({ slug: item.slug, card, aspectRatio, position: getPreviewPosition(card, aspectRatio) });
              }}
              onPreviewClose={() => {
                setActivePreview((current) => current?.slug === item.slug ? null : current);
              }}
            />
          </li>
        ))}
      </ol>
    </Row>
  );
}

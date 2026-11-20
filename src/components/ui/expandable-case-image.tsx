"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

export function ExpandableCaseImage({ children, ratio, caption, expand, close }: {
  children: ReactNode; ratio: number; caption: string; expand: string; close: string;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  function setThumbnailTransform() {
    const thumbnail = trigger.current!.getBoundingClientRect();
    const full = frame.current!.getBoundingClientRect();
    const transform = `translate(${thumbnail.left - full.left}px, ${thumbnail.top - full.top}px) scale(${thumbnail.width / full.width}, ${thumbnail.height / full.height})`;
    dialog.current!.style.setProperty("--thumbnail-transform", transform);
  }

  function openImage() {
    const modal = dialog.current!;
    modal.showModal();
    setThumbnailTransform();
    // Commit the thumbnail geometry before starting the transition to full size.
    frame.current!.firstElementChild!.getBoundingClientRect();
    modal.dataset.ready = "";
    modal.dataset.expanded = "";
  }

  async function closeImage() {
    const modal = dialog.current!;
    if (!modal.hasAttribute("data-expanded")) return;
    setThumbnailTransform();
    delete modal.dataset.expanded;
    const image = frame.current!.firstElementChild!;
    await Promise.allSettled(image.getAnimations().map(animation => animation.finished));
    modal.close();
    delete modal.dataset.ready;
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className="case-image-trigger" aria-haspopup="dialog"
        aria-label={`${expand} · ${caption}`} onClick={openImage}>
        {children}
        <span className="case-image-enlarge" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" />
          </svg>
        </span>
      </button>
      <dialog ref={dialog} className="case-zoom" aria-label={caption} data-lenis-prevent
        style={{ "--case-image-ratio": ratio } as CSSProperties}
        onCancel={event => { event.preventDefault(); void closeImage(); }}
        onClick={event => { if (event.target === event.currentTarget) void closeImage(); }}>
        <div ref={frame} className="case-zoom-frame">{children}</div>
        <button type="button" className="case-zoom-close" aria-label={close} onClick={closeImage}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m5 5 14 14M19 5 5 19" />
          </svg>
        </button>
      </dialog>
    </>
  );
}

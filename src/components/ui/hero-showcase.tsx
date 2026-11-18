"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoveLink } from "./move-link";

export type ShowcaseItem = { slug: string; name: string; host: string; preview: string };

/**
 * The hero's proof: real products in a browser frame, cycling on their own.
 * The frame leans slightly toward the pointer; hovering pauses the cycle.
 */
export function HeroShowcase({ items, locale, cta }: { items: ShowcaseItem[]; locale: string; cta: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const current = items[index];

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((index + 1) % items.length), 4200);
    return () => window.clearTimeout(id);
  }, [index, paused, items.length]);

  const tilt = (event: React.PointerEvent) => {
    const el = frame.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
  };
  const settle = () => {
    setPaused(false);
    if (frame.current) frame.current.style.transform = "";
  };

  return (
    <div onPointerEnter={() => setPaused(true)} onPointerLeave={settle} onPointerMove={tilt} className="[perspective:1600px]">
      <MoveLink
        href={`/${locale}/work/${current.slug}`}
        transitionTypes={["move-forward"]}
        aria-label={`${cta}: ${current.name}`}
        className="group block"
      >
        <div
          ref={frame}
          className="border border-line bg-card shadow-[0_60px_80px_-50px_rgb(0_0_0/0.55)] transition-transform duration-500 ease-out will-change-transform"
        >
          <div className="flex h-9 items-center gap-1.5 border-b border-line px-3">
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="label mx-auto pr-9 text-faint">{current.host}</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            {items.map((item, i) => (
              <Image
                key={item.slug}
                src={item.preview}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 640px, 100vw"
                className={`object-cover object-top transition-[opacity,scale] duration-700 ease-out ${
                  i === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                }`}
              />
            ))}
            <span className="label absolute right-3 bottom-3 bg-fg px-2.5 py-1.5 text-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {cta} →
            </span>
          </div>
        </div>
      </MoveLink>

      <div role="tablist" className="label mt-5 grid grid-flow-col auto-cols-fr gap-3">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            data-sound="tab"
            className="group/tab border-t border-line pt-2 text-left text-faint transition-colors hover:text-fg aria-selected:border-fg aria-selected:text-fg"
          >
            <span className="mr-2 text-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden sm:inline">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

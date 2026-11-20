"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dict } from "@/i18n/en";
import { BrandIcon } from "./brand-icon";
import { MoveLink } from "./move-link";

type Shot = { src: string; dark?: string; clip?: string; darkClip?: string; width: number; height: number };
export type ShowcaseLayer = { shot?: Shot; phone?: boolean; holdMs?: number };
type ShowcaseItem = {
  slug: string;
  name: string;
  logo: string;
  layers: ShowcaseLayer[];
  websitePending?: boolean;
  platforms: string[];
};

const transitionMs = 1650;
const holdMs = (layer: ShowcaseLayer, last: boolean) => layer.holdMs ?? (last ? 5000 : 3200);

function WebShot({ shot, eager = false }: { shot: Shot; eager?: boolean }) {
  return (
    <picture>
      {shot.dark && <source media="(prefers-color-scheme: dark)" srcSet={shot.dark} />}
      <Image src={shot.src} alt="" width={shot.width} height={shot.height}
        loading={eager ? "eager" : "lazy"} unoptimized />
    </picture>
  );
}

function ShowcaseClip({ shot, paused, onFinish }: {
  shot: Shot; paused: boolean; onFinish?: (state: "playing" | "ended" | "unavailable") => void;
}) {
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    function update() {
      if (!video) return;
      const src = dark.matches ? shot.darkClip ?? shot.clip : shot.clip;
      if (!src || !motion.matches || document.hidden) {
        video.pause();
        return;
      }
      if (video.getAttribute("src") !== src) {
        video.style.opacity = "0";
        onFinish?.("playing");
        video.src = src;
      }
      if (paused) {
        video.pause();
      } else if (!video.ended) {
        void video.play().catch((error: DOMException) => {
          if (error.name !== "AbortError") onFinish?.("unavailable");
        });
      }
    }
    update();
    motion.addEventListener("change", update);
    dark.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      motion.removeEventListener("change", update);
      dark.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [shot, paused, onFinish]);
  return <video ref={player}
    onLoadedData={(e) => { e.currentTarget.style.opacity = "1"; }}
    onEnded={() => onFinish?.("ended")}
    onError={(e) => { e.currentTarget.style.opacity = "0"; onFinish?.("unavailable"); }}
    preload="auto" muted playsInline aria-hidden="true" />;
}

function ProjectLayers({ item, presenting, paused, autoAdvance, onNext, pendingLabel, eager }: {
  item: ShowcaseItem; presenting: boolean; paused: boolean; autoAdvance: boolean; onNext: () => void;
  pendingLabel: string; eager: boolean;
}) {
  const [front, setFront] = useState(0);
  const [departing, setDeparting] = useState<number | null>(null);
  const [finalClip, setFinalClip] = useState<"playing" | "ended" | "unavailable">("playing");
  const last = item.layers.length - 1;
  const finalLayer = item.layers[last];

  useEffect(() => {
    if (!presenting || !autoAdvance || front !== last) return;
    if (finalLayer.shot?.clip && finalClip === "playing") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    function advanceWhenReady() {
      window.clearTimeout(timer);
      if (motion.matches || document.hidden) return;
      if (finalClip === "ended") onNext();
      else timer = window.setTimeout(onNext, holdMs(finalLayer, true));
    }
    advanceWhenReady();
    document.addEventListener("visibilitychange", advanceWhenReady);
    motion.addEventListener("change", advanceWhenReady);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", advanceWhenReady);
      motion.removeEventListener("change", advanceWhenReady);
    };
  }, [front, last, finalLayer, finalClip, presenting, autoAdvance, onNext]);
  return (
    <div className="home-feature-art" aria-hidden="true" style={{
      "--showcase-hold": `${holdMs(item.layers[front], front === last)}ms`,
      "--showcase-transition": `${transitionMs}ms`,
    } as CSSProperties}>
      {item.layers.map(({ shot, phone }, i) => {
        const position = i < front ? "back" : i === front ? "front" : i === front + 1 ? "next" : "far";
        const playClip = position === "front" && departing !== i;
        return (
          <div key={i} className={phone ? "home-phone-shot" : "home-desktop-shot"}
            data-position={position} data-exiting={presenting && position === "front" && i < last}
            onAnimationStart={(event) => {
              if (event.target === event.currentTarget && event.animationName === "showcase-send-back") setDeparting(i);
            }}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && event.animationName === "showcase-send-back") setFront(i + 1);
            }}>
            {shot ? <>
              <WebShot shot={shot} eager={eager && i < 2} />
              {shot.clip && presenting && position !== "far" && <ShowcaseClip shot={shot} paused={paused || !playClip} onFinish={i === last ? setFinalClip : undefined} />}
            </> : (
              <div className="home-web-placeholder">
                <Image src={item.logo} alt="" width={42} height={42} /><span>{pendingLabel}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function HeroShowcase({ items, locale, labels }: {
  items: ShowcaseItem[];
  locale: string;
  labels: Dict["home"]["showcase"];
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [centered, setCentered] = useState(true);
  const [mode, setMode] = useState<"auto" | "manual" | "paused">("auto");
  const playing = mode === "auto";
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.5), { threshold: 0.5 });
    observer.observe(element);
    function syncPosition() {
      if (!element) return;
      const width = element.getBoundingClientRect().width;
      if (!width) return;
      const index = Math.max(0, Math.min(items.length - 1, Math.round(element.scrollLeft / width)));
      setActive(index);
      setCentered(Math.abs(element.scrollLeft - index * width) <= 1);
    }
    const resize = new ResizeObserver(syncPosition);
    resize.observe(element);
    element.addEventListener("scroll", syncPosition, { passive: true });
    return () => {
      observer.disconnect();
      resize.disconnect();
      element.removeEventListener("scroll", syncPosition);
    };
  }, [items.length]);

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    const next = (index + items.length) % items.length;
    // CSS chooses smooth or instant movement according to the motion preference.
    el.scrollTo({ left: next * el.clientWidth, behavior: next !== index ? "instant" : "auto" });
  }, [items.length]);

  const nextProject = useCallback(() => goTo(active + 1), [active, goTo]);

  if (!items.length) return null;
  return (
    <section className="home-showcase" aria-label={labels.label}
      onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => { if (event.target.matches(":focus-visible") && playing) setMode("manual"); }}>
      <div className="home-slide-track" ref={track} data-lenis-prevent-horizontal
        onTouchStart={() => { if (playing) setMode("manual"); }}>
        {items.map((item, index) => (
          <MoveLink href={`/${locale}/work/${item.slug}`} key={item.slug} className="home-feature"
            data-presenting={visible && active === index} data-paused={mode === "paused" || !centered}
            data-project={item.slug} tabIndex={active === index ? 0 : -1} aria-hidden={active !== index}>
            <ProjectLayers key={active === index && visible ? "active" : "idle"} item={item}
              autoAdvance={playing && centered && !hovered && items.length > 1} onNext={nextProject}
              presenting={active === index && visible} paused={mode === "paused" || !centered} pendingLabel={labels.pendingWeb} eager={index === 0} />
            <div className="home-feature-caption">
              <strong>{item.name}</strong>
              <span title={item.websitePending ? labels.pendingWeb : "Web"}>
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                  <rect x="2.5" y="4" width="19" height="13" rx="1.5" /><path d="M12 17v3m-5 0h10" />
                </svg>
                <span className="sr-only">{item.websitePending ? labels.pendingWeb : "Web"}</span>
              </span>
              {item.platforms.map((platform) => (
                <span key={platform} title={platform}><BrandIcon name={platform} size={16} /><span className="sr-only">{platform}</span></span>
              ))}
            </div>
          </MoveLink>
        ))}
      </div>
      {items.length > 1 && (
        <div className="home-slide-controls">
          <button type="button" aria-label={labels.previous} onClick={() => { setMode("manual"); goTo(active - 1); }}>
            <span aria-hidden>←</span>
          </button>
          <button className="home-slide-play" type="button" aria-label={playing ? labels.pause : labels.play} onClick={() => setMode(playing ? "paused" : "auto")}>
            <svg aria-hidden width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d={playing ? "M3 2h3v12H3zM10 2h3v12h-3z" : "M4 2l10 6-10 6z"} />
            </svg>
          </button>
          <button type="button" aria-label={labels.next} onClick={() => { setMode("manual"); goTo(active + 1); }}>
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
      <span className="sr-only" aria-live={playing ? "off" : "polite"}>{items[active]?.name}</span>
    </section>
  );
}

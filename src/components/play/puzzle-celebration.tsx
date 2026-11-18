"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import type confetti from "canvas-confetti";
import { playSound } from "@/components/sound/sound";

/** A short, optional victory moment. Never intercepts the page or the next game. */
export function PuzzleCelebration({ board }: { board: RefObject<HTMLDivElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const instance = useRef<confetti.CreateTypes | null>(null);

  useEffect(() => {
    const surface = canvas.current;
    if (!surface) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let fire: confetti.CreateTypes | undefined;
    const timers: number[] = [];
    const stop = () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      fire?.reset();
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") stop(); };
    const onVisibility = () => { if (document.hidden) stop(); };
    const onMotion = () => { if (reduced.matches) stop(); };

    playSound("check");
    if (!reduced.matches && !document.hidden) {
      import("canvas-confetti").then(({ default: confetti }) => {
        if (cancelled || reduced.matches || document.hidden) return;
        // A dedicated instance lets a reset or navigation cancel only this celebration.
        instance.current ??= confetti.create(surface, { resize: true, useWorker: true, disableForReducedMotion: true });
        fire = instance.current;
        const rect = board.current?.getBoundingClientRect();
        const compact = window.innerWidth < 640;
        const options: confetti.Options = {
          colors: ["#ff6b6b", "#ffd166", "#55d6be", "#7c9cff", "#c6a0f6"],
          ticks: 200, gravity: 1.1, scalar: compact ? 0.85 : 1.1,
          disableForReducedMotion: true,
        };
        void fire({ ...options, particleCount: compact ? 55 : 100, spread: 100, startVelocity: 38,
          origin: { x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
            y: rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6 } });
        const volley = () => {
          if (cancelled) return;
          const burst = { ...options, particleCount: compact ? 30 : 55, spread: 65, startVelocity: 52 };
          void fire?.({ ...burst, angle: 60, origin: { x: 0, y: 0.75 } });
          void fire?.({ ...burst, angle: 120, origin: { x: 1, y: 0.75 } });
        };
        volley();
        timers.push(window.setTimeout(volley, 240), window.setTimeout(volley, 480));
      }).catch(() => { /* The solved board and message remain the success feedback. */ });
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotion);
    return () => {
      stop();
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotion);
    };
  }, [board]);

  if (typeof document === "undefined") return null;
  return createPortal(<canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] h-full w-full" data-puzzle-confetti="" />, document.body);
}

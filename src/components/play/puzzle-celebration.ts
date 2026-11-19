import type confetti from "canvas-confetti";
import { playSound } from "@/components/sound/sound";

/** Starts a celebration for a winning move and returns its cancellation callback. */
export function celebratePuzzle(board: HTMLDivElement | null) {
  playSound("check");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches || document.hidden) return;

  const bounce = board?.animate([
    { transform: "none" },
    { offset: 0.35, transform: "translateY(-10px) rotate(-2deg) scale(1.04)" },
    { offset: 0.65, transform: "translateY(-4px) rotate(1deg) scale(1.02)" },
    { transform: "none" },
  ], { duration: 700, delay: 200, easing: "ease-out" });

  let cancelled = false;
  let surface: HTMLCanvasElement | undefined;
  let fire: confetti.CreateTypes | undefined;
  const timers: number[] = [];

  const stop = () => {
    if (cancelled) return;
    cancelled = true;
    timers.forEach(window.clearTimeout);
    bounce?.cancel();
    fire?.reset();
    surface?.remove();
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("visibilitychange", onVisibility);
    reduced.removeEventListener("change", onMotion);
  };
  const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") stop(); };
  const onVisibility = () => { if (document.hidden) stop(); };
  const onMotion = () => { if (reduced.matches) stop(); };

  document.addEventListener("keydown", onKey);
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", onMotion);

  import("canvas-confetti").then(({ default: confetti }) => {
    if (cancelled) return;
    surface = document.createElement("canvas");
    surface.className = "pointer-events-none fixed inset-0 z-[100] h-full w-full";
    surface.setAttribute("aria-hidden", "true");
    surface.dataset.puzzleConfetti = "";
    document.body.append(surface);

    const cannon = confetti.create(surface, { resize: true, useWorker: true, disableForReducedMotion: true });
    fire = cannon;
    const rect = board?.getBoundingClientRect();
    const compact = window.innerWidth < 640;
    const options: confetti.Options = {
      colors: ["#333333", "#696969", "#969696", "#c6c6c6", "#ededed"],
      ticks: 200, gravity: 1.1, scalar: compact ? 0.85 : 1.1,
      disableForReducedMotion: true,
    };
    void cannon({
      ...options, particleCount: compact ? 55 : 100, spread: 100, startVelocity: 38,
      origin: {
        x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
        y: rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6,
      },
    });

    const volley = () => {
      const burst = { ...options, particleCount: compact ? 30 : 55, spread: 65, startVelocity: 52 };
      void cannon({ ...burst, angle: 60, origin: { x: 0, y: 0.75 } });
      return cannon({ ...burst, angle: 120, origin: { x: 1, y: 0.75 } });
    };
    void volley();
    timers.push(
      window.setTimeout(() => { void volley(); }, 240),
      window.setTimeout(() => { void Promise.resolve(volley()).then(stop, stop); }, 480),
    );
  }).catch(stop);

  return stop;
}

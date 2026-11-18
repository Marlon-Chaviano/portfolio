"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Recipe } from "../sounds/react-bits-sound";
import check from "../sounds/check";
import hover from "../sounds/hover";
import place from "../sounds/place";
import swish from "../sounds/swish";
import tab from "../sounds/tab";
import tink from "../sounds/tink";

const recipes = { check, hover, place, swish, tab, tink } satisfies Record<string, Recipe>;
export type SoundName = keyof typeof recipes;

const STORAGE_KEY = "sound";

/*
 * Sound is opt-in: off until the visitor turns it on, and the choice is
 * remembered. The synth engine is only downloaded once sound is enabled.
 */
let enabled = false;
let hydrated = false;
/** Browsers keep audio suspended until a gesture; never queue sounds before one. */
let unlocked = false;
const listeners = new Set<() => void>();

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    enabled = localStorage.getItem(STORAGE_KEY) === "on" && !reducedMotion();
  } catch {
    enabled = false;
  }
}

const subscribe = (listener: () => void) => {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => {
  hydrate();
  return enabled;
};

let engine: Promise<typeof import("../sounds/react-bits-sound")> | null = null;
const loadEngine = () => {
  engine ??= import("../sounds/react-bits-sound").then((mod) => {
    mod.setSoundVolume(0.6);
    return mod;
  });
  return engine;
};

export function playSound(name: SoundName) {
  if (!enabled || !unlocked) return;
  loadEngine()
    .then((mod) => mod.playSound(recipes[name]))
    .catch(() => undefined);
}

export function setSoundEnabled(next: boolean) {
  enabled = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Private mode: the choice just lasts for this visit.
  }
  listeners.forEach((listener) => listener());
  if (next) {
    unlocked = true;
    playSound("check");
  }
}

export const toggleSound = () => setSoundEnabled(!enabled);

export const useSoundEnabled = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);

const INTERACTIVE = "a[href], button, [data-sound]";

/** Wires UI sounds to the whole document by delegation. Renders nothing. */
export function SoundEffects() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    playSound("swish");
  }, [pathname]);

  useEffect(() => {
    let lastHover: Element | null = null;

    const unlock = () => {
      unlocked = true;
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = (event.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      if (target === lastHover) return;
      lastHover = target;
      if (target) playSound("hover");
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest?.(INTERACTIVE);
      if (!target) return;
      const custom = target.getAttribute("data-sound");
      if (custom === "none") return;
      playSound(custom && custom in recipes ? (custom as SoundName) : "tink");
    };

    const onKey = (event: KeyboardEvent) => {
      unlock();
      if (event.key.toLowerCase() !== "m") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const el = event.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable]")) return;
      toggleSound();
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

export function SoundToggle({ on, off, hint }: { on: string; off: string; hint: string }) {
  const isOn = useSoundEnabled();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={isOn}
      title={`${isOn ? on : off} · ${hint}`}
      data-sound="none"
      className="flex items-center gap-2 py-2 text-faint uppercase transition-colors hover:text-fg aria-pressed:text-fg"
    >
      <span aria-hidden className="flex h-3 items-end gap-[2px]">
        {[0.45, 1, 0.65, 0.85].map((h, i) => (
          <span
            key={i}
            className="w-[2px] origin-bottom bg-current transition-transform duration-300"
            style={{ height: "100%", transform: `scaleY(${isOn ? h : 0.18})` }}
          />
        ))}
      </span>
      <span className="sr-only sm:not-sr-only">{isOn ? on : off}</span>
    </button>
  );
}

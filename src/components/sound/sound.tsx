"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { hasDesktopInteractions, useDesktopInteractions } from "@/lib/desktop-interactions";
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
  if (!enabled || !unlocked || !hasDesktopInteractions()) return;
  loadEngine()
    .then((mod) => {
      if (enabled && hasDesktopInteractions()) return mod.playSound(recipes[name]);
    })
    .catch(() => undefined);
}

export function setSoundEnabled(next: boolean) {
  if (!hasDesktopInteractions()) return;
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
  const desktop = useDesktopInteractions();

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    playSound("swish");
  }, [pathname]);

  useEffect(() => {
    if (!desktop) return;
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
      if (!event.ctrlKey || !event.shiftKey || event.metaKey || event.altKey || event.repeat) return;
      const el = event.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable]")) return;
      event.preventDefault();
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
  }, [desktop]);

  return null;
}

export function SoundToggle({ on, off, hint }: { on: string; off: string; hint: string }) {
  const isOn = useSoundEnabled();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={isOn ? on : off}
      aria-pressed={isOn}
      aria-keyshortcuts="Control+Shift+M"
      title={`${isOn ? on : off} · ${hint}`}
      data-sound="none"
      className="nav-tool aria-pressed:text-fg"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h4l5-4v14l-5-4H3z" />
        {isOn ? <path d="M15.5 8a6 6 0 0 1 0 8M18.5 5a10 10 0 0 1 0 14" /> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
    </button>
  );
}

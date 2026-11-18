import type { Localized } from "@/lib/i18n";

export type Game = {
  title: string;
  status: "playing" | "completed" | "dropped" | "backlog";
  platform: string;
  hours?: number;
  /** 1–10 */
  rating?: number;
  /** YYYY-MM, for completed games. */
  finished?: string;
  note?: Localized;
  sample?: boolean;
};

/**
 * Your games, kept by hand — no API. Add an object per game; put the one you
 * are playing now first.
 * TODO(marlon): replace the sample entries with your own.
 */
export const games: Game[] = [
  {
    title: "Elden Ring",
    status: "playing",
    platform: "PC",
    hours: 62,
    sample: true,
  },
  {
    title: "Hollow Knight",
    status: "completed",
    platform: "PC",
    hours: 48,
    rating: 10,
    finished: "2026-06",
    note: {
      en: "The map is the game.",
      es: "El mapa es el juego.",
    },
    sample: true,
  },
  {
    title: "The Witcher 3: Wild Hunt",
    status: "completed",
    platform: "PC",
    hours: 120,
    rating: 9,
    finished: "2025-12",
    sample: true,
  },
];

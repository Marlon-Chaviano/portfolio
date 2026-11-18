import { cacheLife } from "next/cache";
import { site } from "@/content/site";

export type TimeClass = "rapid" | "blitz" | "bullet" | "daily";

export type ChessData = {
  username: string;
  profileUrl: string;
  challengeUrl: string;
  friendUrl: string;
  ratings: Partial<Record<TimeClass, number>>;
};

const API = "https://api.chess.com/pub/player";

async function get<T>(url: string): Promise<T | null> {
  // One retry: a single slow response should not blank the ratings.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        // Chess.com asks API clients to identify themselves.
        headers: { "User-Agent": `${site.name} Portfolio (contact: ${site.email})` },
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) return (await response.json()) as T;
      if (response.status === 404) return null;
    } catch {
      // Network error or timeout: fall through to the retry.
    }
  }
  return null;
}

/**
 * Current Chess.com ratings. Cached for hours: Chess.com itself only refreshes
 * this data a couple of times a day. Returns null when no username is set or
 * the API cannot be reached.
 */
export async function getChess(username: string, friendLink: string): Promise<ChessData | null> {
  "use cache";

  if (!username) {
    cacheLife("max");
    return null;
  }
  const user = encodeURIComponent(username.toLowerCase());

  const stats = await get<Record<string, { last?: { rating: number } }>>(`${API}/${user}/stats`);
  if (!stats) {
    // Do not remember a failed lookup for long.
    cacheLife("minutes");
    return null;
  }
  cacheLife("hours");

  const ratings: ChessData["ratings"] = {};
  for (const key of ["rapid", "blitz", "bullet", "daily"] as const) {
    const rating = stats[`chess_${key}`]?.last?.rating;
    if (typeof rating === "number" && Number.isFinite(rating) && rating > 0) ratings[key] = rating;
  }

  const profileUrl = `https://www.chess.com/member/${user}`;
  return {
    username,
    profileUrl,
    challengeUrl: `https://www.chess.com/play/online/new?opponent=${user}`,
    friendUrl: friendLink || profileUrl,
    ratings,
  };
}

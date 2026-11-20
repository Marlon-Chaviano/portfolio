import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import snapshot from "@/content/activity-snapshot.json";

export type ActivitySource = "github" | "leetcode";
export const DAY = 86_400_000;

function isoDay(time: number) {
  return new Date(time).toISOString().slice(0, 10);
}

async function githubDays() {
  const profile = new URL(site.socials.github);
  const response = await fetch(`https://github.com/users${profile.pathname}/contributions`, {
    headers: { "Accept-Language": "en" }, signal: AbortSignal.timeout(5500),
  });
  if (!response.ok) throw new Error("GitHub calendar unavailable");
  const html = await response.text();
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>\s*(No|[\d,]+) contributions? on /gi)) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    if (id) counts.set(id, match[2] === "No" ? 0 : Number(match[2].replaceAll(",", "")));
  }
  const days = new Map<string, number>();
  for (const [cell] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = cell.match(/\bdata-date="([^"]+)"/)?.[1];
    const count = counts.get(cell.match(/\bid="([^"]+)"/)?.[1] ?? "");
    if (date && count !== undefined) days.set(date, count);
  }
  return days;
}

async function leetcodeDays(year: number) {
  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: site.socials.leetcode },
    body: JSON.stringify({
      query: "query Activity($username: String!, $year: Int!) { matchedUser(username: $username) { userCalendar(year: $year) { submissionCalendar } } }",
      variables: { username: site.leetcode.username, year },
    }),
    signal: AbortSignal.timeout(5500),
  });
  if (!response.ok) throw new Error("LeetCode calendar unavailable");
  const result = await response.json();
  const raw = result.data?.matchedUser?.userCalendar?.submissionCalendar;
  if (result.errors?.length || typeof raw !== "string") throw new Error("Invalid LeetCode calendar");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid submission calendar");
  const days = new Map<string, number>();
  for (const [stamp, count] of Object.entries(parsed)) {
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) throw new Error("Invalid submission count");
    days.set(isoDay(Number(stamp) * 1000), count);
  }
  return days;
}

export async function getActivity(source: ActivitySource) {
  "use cache";
  try {
    const end = Date.parse(isoDay(Date.now()));
    const weekday = (new Date(end).getUTCDay() + 6) % 7;
    const start = end - (25 * 7 + weekday) * DAY;
    let days: Map<string, number>;
    if (source === "github") {
      days = await githubDays();
    } else {
      const years = new Set([new Date(start).getUTCFullYear(), new Date(end).getUTCFullYear()]);
      const calendars = await Promise.all(Array.from(years, leetcodeDays));
      days = new Map(calendars.flatMap(calendar => [...calendar]));
    }
    const counts: number[] = [];
    for (let time = start; time <= end; time += DAY) {
      const count = days.get(isoDay(time));
      // GitHub lists zero days explicitly. LeetCode omits days with no submissions.
      if (source === "github" && count === undefined) throw new Error("Incomplete contribution calendar");
      counts.push(count ?? 0);
    }
    cacheLife("hours");
    return { start: isoDay(start), counts };
  } catch {
    cacheLife("minutes");
    return { start: snapshot.start, counts: snapshot[source] };
  }
}

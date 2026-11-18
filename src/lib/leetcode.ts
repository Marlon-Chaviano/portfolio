import { cacheLife } from "next/cache";
import { site } from "@/content/site";

type LeetCodeResponse = {
  errors?: unknown[];
  data?: {
    matchedUser?: {
      submitStatsGlobal?: {
        acSubmissionNum?: { difficulty?: string; count?: unknown }[];
      };
    } | null;
  };
};

/** Accepted problems, not submission attempts. Zero is a valid solved total. */
export async function getLeetCodeSolved(username: string): Promise<number | null> {
  "use cache";

  let solved: number | null = null;
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": `https://leetcode.com/u/${encodeURIComponent(username)}/`,
        "User-Agent": `${site.name} Portfolio (contact: ${site.email})`,
      },
      body: JSON.stringify({
        query: "query PortfolioSolved($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }",
        variables: { username },
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const result = await response.json() as LeetCodeResponse;
      const entries = result.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
      if (!result.errors?.length && Array.isArray(entries)) {
        const count = entries.find((entry) => entry.difficulty === "All")?.count;
        if (typeof count === "number" && Number.isSafeInteger(count) && count >= 0) solved = count;
      }
    }
  } catch {
    // Leave the profile link available when LeetCode cannot be reached.
  }

  if (solved === null) cacheLife("minutes");
  else cacheLife("hours");
  return solved;
}

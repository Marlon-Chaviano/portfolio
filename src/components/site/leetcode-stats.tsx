import { site } from "@/content/site";
import { getLeetCodeSolved } from "@/lib/leetcode";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";

export async function LeetCodeStats({ labels, locale }: { labels: Dict["about"]; locale: Locale }) {
  const solved = await getLeetCodeSolved(site.leetcode.username);

  return solved !== null ? (
    <dl>
      <dt className="text-sm text-muted">{labels.problemsSolved}</dt>
      <dd className="title mt-2 text-4xl tabular-nums">{new Intl.NumberFormat(locale).format(solved)}</dd>
    </dl>
  ) : (
    <p className="text-sm text-muted">{labels.leetcodeUnavailable}</p>
  );
}

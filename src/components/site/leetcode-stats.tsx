import { site } from "@/content/site";
import { getLeetCodeSolved } from "@/lib/leetcode";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";

export async function LeetCodeStats({ labels, locale }: { labels: Dict["about"]; locale: Locale }) {
  const solved = await getLeetCodeSolved(site.leetcode.username);

  return solved !== null ? (
      <dl className="about-activity-metric">
        <dt className="text-xs text-muted">{labels.problemsSolved}</dt>
        <dd className="title text-2xl tabular-nums">{new Intl.NumberFormat(locale).format(solved)}</dd>
    </dl>
  ) : (
      <p className="text-xs text-muted">{labels.leetcodeUnavailable}</p>
  );
}

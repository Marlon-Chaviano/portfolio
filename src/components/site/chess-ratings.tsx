import { getChess } from "@/lib/chess";
import { site } from "@/content/site";
import type { Dict } from "@/i18n/en";

export async function ChessRatings({ labels }: { labels: Dict["about"] }) {
  const chess = await getChess(site.chess.username, site.chess.friendLink);
  const rating = chess?.ratings.rapid;

  return (
    rating ? (
      <dl className="about-activity-metric">
        <dt className="text-xs text-muted">{labels.rapid}</dt>
        <dd className="title text-2xl tabular-nums">{rating}</dd>
      </dl>
    ) : (
      <p className="text-xs text-muted">{labels.chessUnavailable}</p>
    )
  );
}

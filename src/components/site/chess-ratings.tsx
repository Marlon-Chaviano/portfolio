import { getChess } from "@/lib/chess";
import { site } from "@/content/site";
import type { Dict } from "@/i18n/en";

export async function ChessRatings({ labels }: { labels: Dict["about"] }) {
  const chess = await getChess(site.chess.username, site.chess.friendLink);
  const rating = chess?.ratings.rapid;

  return (
    rating ? (
      <dl>
        <dt className="text-sm text-muted">{labels.rapid}</dt>
        <dd className="title mt-2 text-4xl tabular-nums">{rating}</dd>
      </dl>
    ) : (
      <p className="text-sm text-muted">{labels.chessUnavailable}</p>
    )
  );
}

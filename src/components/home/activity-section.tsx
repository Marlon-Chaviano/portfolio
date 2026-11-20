import { Suspense } from "react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { site } from "@/content/site";
import { DAY, getActivity, type ActivitySource } from "@/lib/activity";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/i18n/en";

type Labels = Dict["home"]["activity"];
const platforms = { github: "GitHub", leetcode: "LeetCode" } as const;

async function ActivityCalendar({ source, locale, labels }: {
  source: ActivitySource; locale: Locale; labels: Labels;
}) {
  const { start, counts } = await getActivity(source);
  const total = counts.reduce((sum, n) => sum + n, 0);
  const startTime = Date.parse(start);
  const lastDay = startTime + (counts.length - 1) * DAY;
  const number = new Intl.NumberFormat(locale);
  const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const period = date.formatRange(startTime, lastDay);
  const unit = labels[source];
  const levels = source === "github" ? [1, 4, 10, 20] : [1, 2, 4, 8];
  return (
    <>
      <p className="activity-total"><strong>{number.format(total)}</strong> {unit}</p>
      <div className="activity-grid" role="img" aria-label={`${number.format(total)} ${unit} · ${period}`}>
        {counts.map((count, i) => (
          <span key={i} data-level={levels.filter(threshold => count >= threshold).length}
            title={`${date.format(startTime + i * DAY)} · ${number.format(count)} ${unit}`} />
        ))}
      </div>
      <div className="activity-key">
        <span>{period}</span>
        <span className="activity-scale">{labels.less}
          <span aria-hidden="true">{levels.map((_, i) => <i key={i} data-level={i + 1} />)}</span>
          {labels.more}
        </span>
      </div>
    </>
  );
}

export function ActivitySection({ locale, labels }: { locale: Locale; labels: Labels }) {
  return (
    <section className="home-section frame-rule-top" aria-labelledby="activity-title">
      <div className="home-heading" data-reveal="up">
        <h2 className="display" id="activity-title">{labels.title}</h2>
        <span className="label">{labels.period}</span>
      </div>
      <div className="home-activity">
        {(["github", "leetcode"] as const).map((source, i) => (
          <article key={source} className="home-activity-card" data-source={source} data-reveal={i ? "right" : "left"}>
            <h3 className="title">
              <a href={site.socials[source]}><BrandIcon name={source} size={22} />{platforms[source]}<span aria-hidden="true">↗</span></a>
            </h3>
            <Suspense fallback={<p className="activity-loading">{labels.loading}</p>}>
              <ActivityCalendar source={source} locale={locale} labels={labels} />
            </Suspense>
          </article>
        ))}
      </div>
    </section>
  );
}

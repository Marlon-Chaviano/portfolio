import { site } from "@/content/site";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";
import { navRoutes } from "@/lib/routes";
import { MoveLink } from "../ui/move-link";
import { Clock } from "./clock";
import { SocialLinks } from "./social-links";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const f = t.footer;
  const column = "label text-faint";
  const item = "text-muted transition-colors hover:text-fg";

  return (
    <footer className="relative z-10 text-fg">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <div className="frame-rule-top grid gap-x-10 gap-y-10 py-8 sm:grid-cols-2 lg:grid-cols-[13rem_repeat(3,minmax(0,1fr))]">
          <div className="text-sm">
            <p>{site.name}</p>
            <p className="text-muted">{site.role}</p>
          </div>

          <nav aria-label={f.explore}>
            <p className={column}>{f.explore}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <MoveLink href={`/${locale}${route.path}`} className={item}>
                    {t.nav[route.key]}
                  </MoveLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={column}>{f.elsewhere}</p>
            <div className="mt-4"><SocialLinks variant="text" /></div>
          </div>

          <div>
            <p className={column}>{f.status}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li>{site.location}</li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="live-dot size-1.5 bg-fg" />
                <Clock timeZone={site.timeZone} label={f.localTime} />
                <span>{f.localTime.toLowerCase()}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="frame-rule-top label flex flex-col gap-2 py-5 text-faint sm:flex-row sm:justify-between">
          <p>
            © {site.name} · {f.built}
          </p>
          <a href="#top" className="transition-colors hover:text-fg">
            {f.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

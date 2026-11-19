import { site } from "@/content/site";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";
import { navRoutes } from "@/lib/routes";
import { MoveLink } from "../ui/move-link";
import { Clock, LocalDate } from "./clock";
import { SocialLinks } from "./social-links";
import "./footer.css";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const f = t.footer;

  return (
    <footer className="relative z-10 text-fg">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <div className="footer-navigation frame-rule-top grid items-center gap-x-8 py-2 sm:flex sm:flex-wrap sm:justify-between">
          <nav aria-label={f.explore}>
            <ul role="list" className="footer-nav-links grid grid-cols-3 gap-x-4 text-sm sm:flex sm:flex-wrap lg:gap-x-6">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <MoveLink href={`/${locale}${route.path}`} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-fg">
                    {t.nav[route.key]}
                  </MoveLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.elsewhere}><SocialLinks variant="footer" /></nav>
        </div>

        <div className="footer-meta frame-rule-top grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-3 font-mono text-xs text-muted sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-2">
          <p>
            {f.credit.madeWith}{" "}
            <svg aria-hidden="true" className="inline-block align-[-0.15em] text-fg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.2 3.1 12.4a5.5 5.5 0 0 1 7.8-7.8L12 5.7l1.1-1.1a5.5 5.5 0 0 1 7.8 7.8L12 21.2Z" />
            </svg>
            <span className="sr-only">{f.credit.love}</span>{" "}{f.credit.by}{" "}
            <a href={site.socials.github} target="_blank" rel="me noopener noreferrer" className="whitespace-nowrap text-fg underline underline-offset-4">
              {site.name}
            </a>
          </p>
          <p className="footer-local-time flex flex-wrap items-center gap-x-2 gap-y-1 justify-self-center">
            <span>{site.location}</span>
            <span aria-hidden="true">·</span>
            <Clock timeZone={site.timeZone} label={f.localTime} />
          </p>
          <p className="footer-mobile-date">
            Cuba <span aria-hidden="true">·</span> <LocalDate locale={locale} timeZone={site.timeZone} />
          </p>
          <a href="#top" aria-label={f.top} className="footer-back-to-top inline-flex min-h-11 min-w-11 items-center justify-end gap-2 transition-colors hover:text-fg">
            <span>{f.top}</span>
            <span aria-hidden="true" className="text-base">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

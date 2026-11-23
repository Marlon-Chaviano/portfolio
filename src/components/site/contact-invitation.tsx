import { MoveLink } from "@/components/ui/move-link";
import { Row } from "@/components/ui/page-shell";
import type { Dict } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";

export function ContactInvitation({ locale, t, placement }: {
  locale: Locale;
  t: Dict;
  placement: "work" | "caseStudy" | "about";
}) {
  const { heading, detail } = t.invitation[placement];
  const shortDetail = placement === "work" ? t.invitation.work.shortDetail : undefined;

  return (
    <Row label={t.nav.contact}>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="min-w-0">
          <h3 className="serif text-balance text-[clamp(1.875rem,3vw,2.75rem)] leading-tight">{heading}</h3>
          {detail && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {shortDetail && <span className="min-[480px]:hidden">{shortDetail}</span>}
              <span className={shortDetail ? "hidden min-[480px]:inline" : undefined}>{detail}</span>
            </p>
          )}
        </div>
        <MoveLink href={`/${locale}/contact`} className="btn btn-white min-h-11 shrink-0">
          {t.invitation.action}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </MoveLink>
      </div>
    </Row>
  );
}

import { ViewTransition, type ReactNode } from "react";

const directional = {
  "move-forward": "move-forward",
  "move-back": "move-back",
  default: "auto",
} as const;

/** The frame every page shares; it also joins the directional page transition. */
export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <main className={`page-shell relative z-10 mx-auto flex w-full max-w-[1320px] flex-col px-5 pt-14 pb-16 sm:px-10 ${className}`}>
        {children}
      </main>
    </ViewTransition>
  );
}

/**
 * The site's one layout rule: a narrow margin column for the label, a wide
 * column for the content. Headers and sections all hang from it.
 */
export function Row({
  id,
  label,
  children,
  as: Tag = "section",
  className = "",
}: {
  id?: string;
  label: ReactNode;
  index?: string;
  children: ReactNode;
  as?: "section" | "header" | "div";
  className?: string;
}) {
  return (
    <Tag id={id} className={`editorial-row ${className}`}>
      <h2 className="section-label">{label}</h2>
      <div className="editorial-content">{children}</div>
    </Tag>
  );
}

/**
 * Page headings and body sections share the same content edge.
 * `heading` accepts a custom `<h1>` for case study transitions.
 */
export function PageHeader({
  label,
  title,
  heading,
  intro,
}: {
  index: string;
  label: string;
  title?: string;
  heading?: ReactNode;
  intro?: string;
}) {
  return (
    <header className="page-header">
      <p className="section-label hidden lg:block">{label}</p>
      <div className="editorial-content">
        {heading ?? (
          <h1 className="display page-title min-w-0">
            {title}
          </h1>
        )}
        {intro && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

export const SampleTag = ({ label }: { label: string }) => (
  <span className="label border border-dashed border-line px-1.5 py-0.5 text-faint">{label}</span>
);

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useDesktopInteractions } from "@/lib/desktop-interactions";
import { otherLocale, stripLocale, type Locale } from "@/lib/i18n";
import { navRoutes, sectionOf, type NavKey } from "@/lib/routes";
import { SoundToggle } from "../sound/sound";
import { MoveLink } from "../ui/move-link";
import { CvDownload } from "../ui/cv-download";
import { openPalette } from "./command-palette";
import "./header.css";

type Labels = Record<NavKey, string> & {
  menu: string;
  close: string;
  language: string;
  languageLabel: string;
  search: string;
  soundOn: string;
  soundOff: string;
  soundHint: string;
  cv: string;
};

/** A ruled bar: square cells split by hairlines, the current page marked with a rule underneath. */
export function Header({ locale, name, cvHref, labels }: { locale: Locale; name: string; cvHref: string; labels: Labels }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const desktop = useDesktopInteractions();
  const macShortcut = desktop && /^Mac/i.test(window.navigator.platform);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navLabel = locale === "es" ? "Principal" : "Main";
  const active = sectionOf(pathname);
  const switchHref = `/${otherLocale(locale)}${stripLocale(pathname)}`;

  return (
    <header
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      style={{ viewTransitionName: "site-header" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 text-fg backdrop-blur-md"
    >
      <div className="site-navbar mx-auto flex h-14 max-w-[1320px] items-stretch justify-between pl-3 sm:pl-10">
        <div className="flex min-w-0 items-center gap-0.5 sm:gap-2">
          <MoveLink href={`/${locale}`} className="display text-base sm:text-xl">
            {name}
          </MoveLink>
          <CvDownload href={cvHref} label={labels.cv} className="nav-icon" />
        </div>

        <nav aria-label={navLabel} className="hidden items-stretch lg:flex">
          {navRoutes.slice(1).map((route) => (
            <MoveLink
              key={route.key}
              href={`/${locale}${route.path}`}
              aria-current={route.key === active ? "page" : undefined}
              data-sound="tab"
              className="flex items-center px-4 text-sm text-muted transition-colors hover:text-fg aria-[current=page]:text-fg aria-[current=page]:shadow-[inset_0_-2px_0_var(--fg)]"
            >
              {labels[route.key]}
            </MoveLink>
          ))}
        </nav>

        <div className={`label grid shrink-0 grid-cols-[1fr_auto] items-stretch text-faint ${desktop ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
          {desktop && (
            <>
              <button
                type="button"
                onClick={openPalette}
                aria-label={`${labels.search} · ${macShortcut ? "⌘" : "Ctrl"}+K`}
                aria-keyshortcuts={macShortcut ? "Meta+K" : "Control+K"}
                title={`${labels.search} · ${macShortcut ? "⌘" : "Ctrl"}+K`}
                className="nav-tool"
              >
                <span className="nav-shortcut" aria-hidden="true">
                  <kbd className={macShortcut ? "nav-key nav-key-command" : "nav-key"}>{macShortcut ? "⌘" : "Ctrl"}</kbd>
                  <span>+</span>
                  <kbd className="nav-key">K</kbd>
                </span>
              </button>
              <SoundToggle on={labels.soundOn} off={labels.soundOff} hint={labels.soundHint} />
            </>
          )}
          <Link href={switchHref} hrefLang={otherLocale(locale)} lang={otherLocale(locale)} title={labels.languageLabel} className="nav-tool">
            {otherLocale(locale).toUpperCase()}
            <span className="sr-only"> — {labels.language}</span>
          </Link>
          <button
            type="button"
            className="nav-menu-toggle flex items-center justify-center border-l border-line text-fg uppercase lg:hidden"
            aria-expanded={open}
            ref={menuButton}
            aria-controls={open ? "mobile-menu" : undefined}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={navLabel} className="site-mobile-menu absolute inset-x-0 overflow-y-auto bg-bg px-5 sm:px-10 lg:hidden">
          <div className="site-mobile-menu-links flex flex-col">
            {navRoutes.map((route) => (
              <MoveLink
                key={route.key}
                href={`/${locale}${route.path}`}
                aria-current={route.key === active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="display -mx-5 shrink-0 border-b border-line px-5 py-4 text-4xl text-faint aria-[current=page]:text-fg sm:-mx-10 sm:px-10"
              >
                {labels[route.key]}
              </MoveLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

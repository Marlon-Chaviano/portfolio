"use client";

import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  const id = window.setInterval(notify, 15_000);
  return () => window.clearInterval(id);
};

/** Current time in a fixed time zone, to the minute. */
export function Clock({ timeZone, label }: { timeZone: string; label: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date()),
    () => "--:--",
  );
  return (
    <span className="tabular-nums" title={label}>
      {time}
    </span>
  );
}

export function LocalDate({ timeZone, locale }: { timeZone: string; locale: string }) {
  const date = useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat(locale, { timeZone, month: "short", day: "numeric" }).format(new Date()),
    () => "—",
  );
  return <span className="tabular-nums">{date}</span>;
}

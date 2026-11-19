export function CvDownload({ href, label, className }: { href: string; label: string; className: string }) {
  return (
    <a href={href} download aria-label={label} title={label} className={className}>
      <svg aria-hidden="true" width="20" height="20" viewBox="1.5 1.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2.75H6a1.75 1.75 0 0 0-1.75 1.75v15A1.75 1.75 0 0 0 6 21.25h12a1.75 1.75 0 0 0 1.75-1.75V8.5L14 2.75Z" />
        <path d="M14 3v5.5h5.5M12 11v6m-2.6-2.6 2.6 2.6 2.6-2.6" />
      </svg>
    </a>
  );
}

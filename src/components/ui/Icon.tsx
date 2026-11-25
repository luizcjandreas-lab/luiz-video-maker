/** Ícones de linha (24×24, traço 1.5). Para adicionar um, inclua o desenho em `paths`. */
const paths = {
  play: (
    <path
      d="M8 5.6v12.8a.6.6 0 0 0 .9.5l10.2-6.4a.6.6 0 0 0 0-1L8.9 5.1a.6.6 0 0 0-.9.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pause: (
    <>
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  chat: (
    <>
      <path d="M20.2 11.6a8.2 8.2 0 0 1-12 7.3L3.8 20.2l1.3-4.2a8.2 8.2 0 1 1 15.1-4.4Z" />
      <path d="M8.8 11.7h.01M12 11.7h.01M15.2 11.7h.01" strokeWidth="2.2" />
    </>
  ),
  at: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M15.6 8.4v4.8a2.4 2.4 0 0 0 4.8 0V12a8.4 8.4 0 1 0-3.3 6.7" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.8-5.7-6.8-11.2a6.8 6.8 0 0 1 13.6 0C18.8 15.3 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 3.6Z" />,
  check: <path d="m5 12.5 4.3 4.3L19 7.2" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.2c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="9.5" r="1.7" />
      <path d="m4 17.5 5-4.5 3.5 3 3-2.5 4.5 4" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="6.5" width="12.5" height="11" rx="2" />
      <path d="m15.5 10.3 5.5-3v9.4l-5.5-3" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path d="M11 18h2" />
    </>
  ),
  building: (
    <path d="M3.5 20.5h17M6 20.5V5.3a.8.8 0 0 1 .8-.8h6.4a.8.8 0 0 1 .8.8v15.2M14 9.5h3.2a.8.8 0 0 1 .8.8v10.2M9 8h2M9 11.5h2M9 15h2" />
  ),
  camera: (
    <>
      <path d="M4 8.6a2 2 0 0 1 2-2h1.9l1.4-2.1h5.4l1.4 2.1H18a2 2 0 0 1 2 2v8.9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.6Z" />
      <circle cx="12" cy="12.8" r="3.4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.6" height="6.6" rx="1.4" />
      <rect x="13.4" y="4" width="6.6" height="6.6" rx="1.4" />
      <rect x="4" y="13.4" width="6.6" height="6.6" rx="1.4" />
      <rect x="13.4" y="13.4" width="6.6" height="6.6" rx="1.4" />
    </>
  ),
  megaphone: (
    <path d="M4 10.2v3.6a1 1 0 0 0 1 1h2l6.5 4.2V5L7 9.2H5a1 1 0 0 0-1 1ZM16.8 9a4.2 4.2 0 0 1 0 6M19.3 6.5a7.6 7.6 0 0 1 0 11" />
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.8h18M6.3 6.7h.01M8.6 6.7h.01M10 12.8l-2.2 1.8 2.2 1.8M14 12.8l2.2 1.8-2.2 1.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.6h17M8 3v4M16 3v4M8.2 13.6h.01M12 13.6h.01M15.8 13.6h.01M8.2 17h.01M12 17h.01" />
    </>
  ),
  arrowDown: <path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'h-5 w-5', title }: { name: IconName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}

'use client'

interface IconProps {
  size?: number
}

/* WhatsApp - official style rounded app icon */
export function WhatsAppIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#25D366" />
      <path
        d="M24 10c-7.732 0-14 6.268-14 14 0 2.468.64 4.786 1.762 6.8L10 38l7.4-1.94A13.94 13.94 0 0 0 24 38c7.732 0 14-6.268 14-14s-6.268-14-14-14z"
        fill="#fff"
      />
      <path
        d="M30.9 27.4c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.89-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.05.76.86.27 1.64.23 2.26.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z"
        fill="#25D366"
      />
    </svg>
  )
}

/* Telegram - official style rounded app icon */
export function TelegramIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tg-grad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#tg-grad)" />
      <path
        d="M11.2 23.6c6.6-2.87 11-4.77 13.2-5.68 6.28-2.61 7.58-3.06 8.43-3.08.19 0 .6.04.87.26.22.18.28.42.31.6.03.17.06.57.03.87-.34 3.62-1.82 12.4-2.57 16.45-.32 1.71-.94 2.29-1.55 2.34-1.31.12-2.31-.87-3.58-1.7-1.99-1.3-3.11-2.11-5.04-3.39-2.23-1.47-.79-2.28.49-3.6.33-.35 6.13-5.62 6.24-6.1.01-.06.03-.28-.11-.4-.13-.11-.33-.07-.48-.04-.2.05-3.39 2.15-9.55 6.32-.9.62-1.72.92-2.46.9-.81-.02-2.36-.46-3.52-.83-1.42-.46-2.55-.71-2.45-1.5.05-.41.62-.83 1.7-1.26z"
        fill="#fff"
      />
    </svg>
  )
}

/* Other platforms - modern globe app icon */
export function GlobalIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gl-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C6CFF" />
          <stop offset="1" stopColor="#5B4FE0" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#gl-grad)" />
      <circle cx="24" cy="24" r="10" stroke="#fff" strokeWidth="1.8" />
      <ellipse cx="24" cy="24" rx="4.2" ry="10" stroke="#fff" strokeWidth="1.8" />
      <path d="M14 24h20M15.5 19h17M15.5 29h17" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

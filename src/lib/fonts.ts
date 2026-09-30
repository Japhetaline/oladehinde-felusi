import localFont from 'next/font/local';

// Self-hosted variable fonts (no runtime request to Google Fonts).
export const fraunces = localFont({
  src: [
    { path: '../fonts/fraunces-latin-opsz-normal.woff2', style: 'normal', weight: '100 900' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const inter = localFont({
  src: [{ path: '../fonts/inter-latin-wght-normal.woff2', style: 'normal', weight: '100 900' }],
  variable: '--font-sans',
  display: 'swap',
});

export const plexArabic = localFont({
  src: [
    { path: '../fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-arabic',
  display: 'swap',
  // Not preloaded: only Arabic pages use it, so English pages don't pay for it.
  preload: false,
});

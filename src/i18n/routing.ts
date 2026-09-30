import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export const isRtl = (locale: string) => locale === 'ar';

/** Each language's name in its own language, for the language switcher. */
export const localeNames: Record<Locale, string> = { en: 'English', fr: 'Français', ar: 'العربية' };

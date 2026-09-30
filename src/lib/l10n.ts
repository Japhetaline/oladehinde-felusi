import type { Locale } from '@/i18n/routing';

/** A string available in every supported locale. */
export type LocalizedString = { en: string; fr: string; ar: string };

export const l = (value: LocalizedString, locale: string): string =>
  value[(locale as Locale)] ?? value.en;

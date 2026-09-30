const dateLocales: Record<string, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-u-nu-latn' };

export const formatDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(dateLocales[locale] ?? 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

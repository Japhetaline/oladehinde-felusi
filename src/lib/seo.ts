import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, INSTAGRAM_URL, CONTACT_EMAIL } from './site';
import { locales } from '@/i18n/routing';

type BuildArgs = {
  locale: string;
  /** Path WITHOUT locale prefix, e.g. '/shop' or '' for home. */
  path: string;
  title: string;
  description: string;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

/** Open Graph locale per site language. */
const ogLocales: Record<string, string> = { en: 'en_NG', fr: 'fr_FR', ar: 'ar_AE' };

export const localeUrl = (locale: string, path: string) => `${SITE_URL}/${locale}${path}`;

/** Per-page, per-locale metadata with canonical + hreflang alternates and Open Graph. */
export async function buildMetadata({ locale, path, title, description, image, type = 'website', noIndex }: BuildArgs): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localeUrl(l, path);
  languages['x-default'] = localeUrl('en', path);
  const ogImage = image || '/images/runway/runway-sand-coral.jpg';

  return {
    title,
    description,
    alternates: { canonical: localeUrl(locale, path), languages },
    openGraph: {
      type,
      title: `${title} | ${t('siteName')}`,
      description,
      url: localeUrl(locale, path),
      siteName: t('siteName'),
      locale: ogLocales[locale] ?? ogLocales.en,
      alternateLocale: Object.entries(ogLocales).filter(([l]) => l !== locale).map(([, og]) => og),
      images: [{ url: ogImage, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/** Shortcut for simple pages whose copy lives in meta.<key>. */
export async function pageMetadata(locale: string, key: string, path: string, image?: string) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path, title: t(`${key}.title`), description: t(`${key}.description`), image });
}

export const organizationJsonLd = (locale: string, name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  alternateName: 'Oladehinde Felusi Handdyed & Designed in Lagos',
  url: localeUrl(locale, ''),
  logo: `${SITE_URL}/icon.svg`,
  description,
  email: CONTACT_EMAIL,
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  sameAs: [INSTAGRAM_URL],
});

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

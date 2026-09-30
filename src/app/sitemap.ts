import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { locales } from '@/i18n/routing';
import { getAllProducts } from '@/lib/catalog';
import { collections } from '@/data/collections';
import { articles } from '@/data/journal';

const staticPaths = ['', '/shop', '/craft', '/our-story', '/bespoke', '/workshops', '/journal', '/size-guide', '/shipping-returns', '/faq', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...collections.map((c) => `/collections/${c.slug}`),
    ...getAllProducts().map((p) => `/products/${p.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ];
  const now = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path.startsWith('/products') ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : path.startsWith('/products') || path.startsWith('/collections') ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  );
}

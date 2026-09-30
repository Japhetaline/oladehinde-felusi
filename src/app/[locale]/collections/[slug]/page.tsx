import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { buildMetadata, breadcrumbJsonLd, localeUrl } from '@/lib/seo';
import { getProductsByCollection } from '@/lib/catalog';
import { collections, getCollection } from '@/data/collections';
import { l } from '@/lib/l10n';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShopClient } from '@/components/ShopClient';
import { JsonLd } from '@/components/JsonLd';
import { ArrowIcon } from '@/components/Icons';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => collections.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const c = getCollection(slug);
  if (!c) return {};
  return buildMetadata({ locale, path: `/collections/${slug}`, title: l(c.name, locale), description: l(c.description, locale), image: c.image });
}

export default async function CollectionPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const c = getCollection(slug);
  if (!c) notFound();
  const t = await getTranslations();
  const tNav = await getTranslations('nav');
  const products = getProductsByCollection(c.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('common.home'), url: localeUrl(locale, '') },
          { name: tNav('shop'), url: localeUrl(locale, '/shop') },
          { name: l(c.name, locale), url: localeUrl(locale, `/collections/${slug}`) },
        ])}
      />
      <PageHero eyebrow={tNav('collections')} title={l(c.name, locale)} intro={l(c.description, locale)}>
        <Breadcrumbs items={[{ label: tNav('shop'), href: '/shop' }, { label: l(c.name, locale) }]} className="mb-8" />
      </PageHero>
      {c.slug === 'bespoke' && (
        <div className="container mt-10">
          <div className="flex flex-col items-start justify-between gap-4 border border-indigo/20 bg-indigo-50 p-6 md:flex-row md:items-center">
            <p className="max-w-2xl text-ink">{t('bespoke.intro')}</p>
            <Link href="/bespoke" className="btn-primary shrink-0">{t('bespoke.formTitle')} <ArrowIcon width={16} height={16} /></Link>
          </div>
        </div>
      )}
      <div className="container py-12">
        <ShopClient products={products} showCollectionFilter={false} />
      </div>
    </>
  );
}

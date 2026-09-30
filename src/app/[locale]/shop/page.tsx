import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { getAllProducts } from '@/lib/catalog';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShopClient } from '@/components/ShopClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'shop', '/shop');
}

export default async function ShopPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('shop');
  return (
    <>
      <PageHero title={t('title')} intro={t('intro')}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-8" />
      </PageHero>
      <div className="container py-12">
        <ShopClient products={getAllProducts()} />
      </div>
    </>
  );
}

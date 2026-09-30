import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { CartPageClient } from '@/components/CartPageClient';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/cart', title: t('cart.title'), description: t('cart.description'), noIndex: true });
}

export default async function CartPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('cart');
  return (
    <div className="container py-10 md:py-14">
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
      <h1 className="mb-8 text-4xl text-indigo md:text-5xl">{t('title')}</h1>
      <CartPageClient />
    </div>
  );
}

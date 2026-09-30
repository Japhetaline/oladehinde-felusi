import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { CheckoutClient } from '@/components/CheckoutClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/checkout', title: t('checkout.title'), description: t('checkout.description'), noIndex: true });
}

export default async function CheckoutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <CheckoutClient />;
}

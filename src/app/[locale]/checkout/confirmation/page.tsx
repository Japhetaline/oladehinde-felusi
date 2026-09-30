import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { ConfirmationClient } from '@/components/ConfirmationClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/checkout/confirmation', title: t('confirmation.title'), description: t('confirmation.description'), noIndex: true });
}

export default async function ConfirmationPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ConfirmationClient />;
}

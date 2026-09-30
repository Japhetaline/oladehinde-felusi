import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { shippingRates } from '@/data/prices';
import { PageHero, PlaceholderNotice } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Price } from '@/components/Price';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'shipping', '/shipping-returns');
}

export default async function ShippingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('shipping');
  const tm = await getTranslations('checkout.methods');
  const methods = ['lagos', 'nigeria', 'international'] as const;
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-8" />
      </PageHero>
      <div className="container max-w-3xl py-14">
        <PlaceholderNotice>{t('placeholderNotice')}</PlaceholderNotice>
        <h2 className="mt-10 text-3xl text-indigo">{t('shippingTitle')}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b-2 border-indigo text-start">
                <th scope="col" className="py-3 text-start font-medium">{t('tableMethod')}</th>
                <th scope="col" className="py-3 text-start font-medium">{t('tableTime')}</th>
                <th scope="col" className="py-3 text-end font-medium">{t('tableCost')}</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((m) => (
                <tr key={m} className="border-b border-ink/10">
                  <th scope="row" className="py-4 text-start font-medium text-indigo">{tm(m)}</th>
                  <td className="py-4 text-ink-muted">{tm(`${m}Eta`)}</td>
                  <td className="py-4 text-end"><Price prices={shippingRates[m]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="prose-brand mt-10">
          <h2>{t('leadTitle')}</h2>
          <p>{t('leadBody')}</p>
          <h2>{t('dutiesTitle')}</h2>
          <p>{t('dutiesBody')}</p>
          <h2>{t('returnsTitle')}</h2>
          <ul>
            <li>{t('returns1')}</li>
            <li>{t('returns2')}</li>
            <li>{t('returns3')}</li>
            <li>{t('returns4')}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

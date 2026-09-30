import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SizeTable } from '@/components/SizeTable';
import { MeasureIllustration } from '@/components/MeasureIllustration';
import { WhatsAppIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'sizeGuide', '/size-guide');
}

const HOW = ['bust', 'waist', 'hips', 'wrapper', 'top', 'shoulder', 'sleeve', 'height'] as const;
const LABEL_KEY: Record<(typeof HOW)[number], string> = {
  bust: 'bust', waist: 'waist', hips: 'hips', wrapper: 'wrapperLength', top: 'topLength', shoulder: 'shoulder', sleeve: 'sleeve', height: 'height',
};

export default async function SizeGuidePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('sizeGuide');
  const tp = await getTranslations('product.measurements');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-8" />
      </PageHero>
      <section className="container max-w-4xl py-16">
        <SizeTable />
      </section>
      <section className="container pb-8" aria-labelledby="how">
        <h2 id="how" className="text-3xl text-indigo md:text-4xl">{t('howTitle')}</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">{t('howIntro')}</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((k) => (
            <li key={k} className="flex gap-4 border border-ink/10 bg-cotton-100 p-5">
              <MeasureIllustration highlight={k} className="h-32 w-20 shrink-0" />
              <div>
                <h3 className="font-serif text-lg text-indigo">{tp(LABEL_KEY[k])}</h3>
                <p className="mt-1 text-sm text-ink-muted">{t(`how.${k}`)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-start gap-4 border-s-4 border-indigo bg-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl text-indigo">{t('helpTitle')}</h2>
            <p className="text-sm text-ink-muted">{t('helpBody')}</p>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon width={18} height={18} /> WhatsApp</a>
        </div>
      </section>
    </>
  );
}

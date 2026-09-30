import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BespokeForm } from '@/components/BespokeForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'bespoke', '/bespoke', '/images/runway/runway-navy.jpg');
}

export default async function BespokePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('bespoke');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
        <Breadcrumbs items={[{ label: t('eyebrow') }]} className="mb-8" />
      </PageHero>
      <section className="container py-16 md:py-20">
        <h2 className="text-3xl text-indigo md:text-4xl">{t('howTitle')}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="border-t-2 border-indigo pt-5">
              <span className="font-serif text-4xl text-rust">0{n}</span>
              <h3 className="mt-2 text-xl text-indigo">{t(`how${n}`)}</h3>
              <p className="mt-2 text-sm text-ink-muted">{t(`how${n}Body`)}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="container grid gap-12 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-8 text-3xl text-indigo">{t('formTitle')}</h2>
          <BespokeForm />
        </div>
        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/runway/runway-navy.jpg" alt="" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src="/images/details/heart-ombre-detail.jpg" alt="" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

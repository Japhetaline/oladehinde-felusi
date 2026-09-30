import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { PageHero, PlaceholderNotice } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MediaImage } from '@/components/MediaImage';
import { Logo } from '@/components/Logo';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'story', '/our-story');
}

export default async function StoryPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('story');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')}>
        <Breadcrumbs items={[{ label: t('eyebrow') }]} className="mb-8" />
      </PageHero>
      <section className="container py-16 md:py-24">
        <PlaceholderNotice>{t('placeholderNotice')}</PlaceholderNotice>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <MediaImage src={null} alt={t('portraitLabel')} sizes="40vw" className="aspect-[4/5]" placeholderText={tc('placeholderLabel')} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-serif text-2xl leading-snug text-indigo md:text-3xl">{t('intro')}</p>
            <div className="prose-brand mt-8">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container flex flex-col items-center text-center">
          <Logo variant="full" className="text-indigo" />
          <blockquote className="mt-10 max-w-3xl font-sans text-2xl font-medium uppercase leading-snug tracking-wide text-ink md:text-3xl">{t('quote')}</blockquote>
          <p className="mt-4 text-sm uppercase tracking-brand text-ink-muted">— {t('quoteSource')}</p>
        </div>
      </section>
      <section className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/images/runway/runway-mens-orange.jpg" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl text-indigo">{t('teamTitle')}</h2>
            <p className="mt-5 text-lg text-ink-muted">{t('teamBody')}</p>
            <MediaImage src={null} alt={t('studioLabel')} sizes="40vw" className="mt-8 aspect-[16/9]" placeholderText={tc('placeholderLabel')} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/craft" className="btn-primary">{tn('craft')}</Link>
              <Link href="/shop" className="btn-outline">{tn('shopAll')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

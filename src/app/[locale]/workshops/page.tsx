import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { workshops } from '@/data/content';
import { workshopPrices } from '@/data/prices';
import { l } from '@/lib/l10n';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Price } from '@/components/Price';
import { WorkshopBooking } from '@/components/WorkshopBooking';
import { PinIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'workshops', '/workshops', '/images/details/indigo-drape-detail.jpg');
}

export default async function WorkshopsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('workshops');
  const loc = await getLocale();
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} tone="indigo">
        <Breadcrumbs items={[{ label: t('eyebrow') }]} className="mb-8 [&_*]:!text-cotton/80" />
      </PageHero>
      <section className="container py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {workshops.map((w) => (
            <article key={w.slug} className="flex flex-col border border-ink/10 bg-cotton-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={w.image} alt={l(w.imageAlt, loc)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <span className="absolute start-3 top-3 bg-cotton px-2 py-1 text-xs font-medium text-indigo">{t('seats', { count: w.seats })}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-2xl text-indigo">{l(w.title, loc)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{l(w.description, loc)}</p>
                <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
                  <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-muted">{t('dateLabel')}</dt><dd>{l(w.date, loc)}</dd></div>
                  <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-muted">{t('durationLabel')}</dt><dd>{l(w.duration, loc)}</dd></div>
                  <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-muted">{t('locationLabel')}</dt><dd className="flex gap-1"><PinIcon width={16} height={16} className="mt-0.5 shrink-0" />{l(w.location, loc)}</dd></div>
                </dl>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <p className="text-lg text-indigo">
                    <Price prices={workshopPrices[w.slug]} />{' '}
                    <span className="text-xs text-ink-muted">{w.slug === 'private-studio-session' ? t('perGroup') : t('perPerson')}</span>
                  </p>
                  <a href={`#book-${w.slug}`} className="btn-outline !px-4 !py-2 text-xs">{t('book')}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="container pb-12" id="book" aria-labelledby="book-title">
        <div className="mx-auto max-w-2xl border border-ink/10 bg-cotton-100 p-6 md:p-10">
          {workshops.map((w) => <span key={w.slug} id={`book-${w.slug}`} className="block -translate-y-32" aria-hidden />)}
          <h2 id="book-title" className="mb-6 text-3xl text-indigo">{t('formTitle')}</h2>
          <WorkshopBooking options={workshops.map((w) => ({ slug: w.slug, title: l(w.title, loc) }))} />
        </div>
      </section>
    </>
  );
}

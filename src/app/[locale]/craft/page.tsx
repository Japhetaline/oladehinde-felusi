import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { craftSteps } from '@/data/content';
import { l } from '@/lib/l10n';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdireMotif } from '@/components/AdireMotif';
import { ArrowIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'craft', '/craft', '/images/details/emerald-adire-detail.jpg');
}

const stepImages = ['ochre-teal-set-detail', null, 'emerald-adire-detail', 'indigo-kaleidoscope-detail', 'indigo-drape-detail', null, 'runway-sand-coral-detail'];

export default async function CraftPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('craft');
  const tc = await getTranslations('common');
  const loc = await getLocale();
  const glossaryKeys = ['adire', 'iro', 'buba', 'arewa', 'eleko', 'oniko', 'alabere'] as const;

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} tone="indigo">
        <Breadcrumbs items={[{ label: t('eyebrow') }]} className="mb-8 [&_*]:!text-cotton/80" />
      </PageHero>

      {/* Timeline */}
      <section className="container py-20 md:py-28" aria-labelledby="process">
        <div className="max-w-2xl">
          <h2 id="process" className="text-4xl text-indigo md:text-5xl">{t('processTitle')}</h2>
          <p className="mt-4 text-lg text-ink-muted">{t('processIntro')}</p>
        </div>
        <ol className="relative mt-16 space-y-14 before:absolute before:inset-y-2 before:start-[1.1rem] before:w-px before:bg-indigo/25 md:before:start-1/2">
          {craftSteps.map((s, i) => {
            const img = stepImages[i];
            const even = i % 2 === 0;
            return (
              <li key={i} className="relative grid gap-6 ps-14 md:grid-cols-2 md:gap-16 md:ps-0">
                <span className="absolute start-0 top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-indigo font-serif text-cotton md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2">
                  {i + 1}
                </span>
                <div className={`${even ? 'md:pe-16 md:text-end' : 'md:order-2 md:ps-16'}`}>
                  <p className="eyebrow">{l(s.duration, loc)}</p>
                  <h3 className="mt-2 text-2xl text-indigo md:text-3xl">{l(s.title, loc)}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{l(s.body, loc)}</p>
                </div>
                <div className={`${even ? 'md:ps-16' : 'md:order-1 md:pe-16'}`}>
                  {img ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={`/images/details/${img}.jpg`} alt="" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-indigo-100 p-6 text-center text-xs text-indigo">
                      <AdireMotif className="absolute inset-0 text-indigo" opacity={0.15} />
                      <span className="relative bg-cotton/90 px-3 py-2">{l(s.title, loc)} — {tc('placeholderPhoto')}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Heritage + glossary */}
      <section className="bg-cotton-200/70 py-20 md:py-28">
        <div className="container grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-4xl text-indigo md:text-5xl">{t('heritageTitle')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/90">{t('heritageBody1')}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/90">{t('heritageBody2')}</p>
          </div>
          <aside className="border border-indigo/20 bg-cotton p-8 md:col-span-5">
            <h2 className="font-serif text-2xl text-indigo">{t('glossaryTitle')}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {glossaryKeys.map((k) => {
                const [term, ...rest] = t(`glossary.${k}`).split(' — ');
                return (
                  <div key={k}>
                    <dt className="font-semibold text-indigo">{term}</dt>
                    <dd className="text-ink-muted">{rest.join(' — ')}</dd>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>
      </section>

      {/* Values */}
      <section className="container py-20 md:py-28">
        <h2 className="text-4xl text-indigo md:text-5xl">{t('valuesTitle')}</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="border-t-2 border-rust pt-5">
              <h3 className="text-xl text-indigo">{t(`values.v${n}Title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`values.v${n}Body`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 bg-indigo p-10 text-cotton md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl">{t('ctaTitle')}</h2>
            <p className="mt-2 text-cotton/80">{t('ctaBody')}</p>
          </div>
          <Link href="/workshops" className="btn-light shrink-0">{t('ctaButton')} <ArrowIcon width={16} height={16} /></Link>
        </div>
      </section>
    </>
  );
}

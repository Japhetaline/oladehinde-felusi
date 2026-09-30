import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { faqs } from '@/data/content';
import { l } from '@/lib/l10n';
import { whatsappLink } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PlusIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'faq', '/faq');
}

export default async function FaqPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations();
  const loc = await getLocale();
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: l(f.q, loc), acceptedAnswer: { '@type': 'Answer', text: l(f.a, loc) } })),
      }} />
      <PageHero eyebrow={t('faq.eyebrow')} title={t('faq.title')}>
        <Breadcrumbs items={[{ label: t('faq.title') }]} className="mb-8" />
      </PageHero>
      <div className="container max-w-3xl py-14">
        {/* Native <details>/<summary>: keyboard accessible, works without JavaScript */}
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => (
            <details key={i} className="group py-2" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-serif text-lg text-indigo md:text-xl [&::-webkit-details-marker]:hidden">
                {l(f.q, loc)}
                <PlusIcon className="shrink-0 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-ink-muted">{l(f.a, loc)}</p>
            </details>
          ))}
        </div>
        <div className="mt-14 bg-indigo p-8 text-cotton">
          <h2 className="text-2xl">{t('faq.stillTitle')}</h2>
          <p className="mt-2 text-cotton/80">{t('faq.stillBody')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-light">WhatsApp</a>
            <Link href="/contact" className="btn-outline-light">{t('nav.contact')}</Link>
          </div>
        </div>
      </div>
    </>
  );
}

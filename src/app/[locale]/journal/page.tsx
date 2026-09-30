import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { articles } from '@/data/journal';
import { l } from '@/lib/l10n';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArrowIcon } from '@/components/Icons';
import { formatDate } from '@/lib/date';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'journal', '/journal');
}

export default async function JournalPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations();
  const loc = await getLocale();
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero eyebrow={t('journal.eyebrow')} title={t('journal.title')} intro={t('journal.intro')}>
        <Breadcrumbs items={[{ label: t('journal.eyebrow') }]} className="mb-8" />
      </PageHero>
      <section className="container py-16">
        <Link href={`/journal/${lead.slug}`} className="group grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={lead.image} alt={l(lead.imageAlt, loc)} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div>
            <p className="eyebrow">{l(lead.category, loc)} · <time dateTime={lead.date}>{formatDate(lead.date, loc)}</time></p>
            <h2 className="mt-3 text-4xl text-indigo group-hover:text-rust md:text-5xl">{l(lead.title, loc)}</h2>
            <p className="mt-4 text-lg text-ink-muted">{l(lead.excerpt, loc)}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo">{t('common.readArticle')} <ArrowIcon width={16} height={16} /></span>
          </div>
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {rest.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={a.image} alt={l(a.imageAlt, loc)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="eyebrow mt-5">{l(a.category, loc)} · {t('common.minRead', { minutes: a.readMinutes })}</p>
              <h2 className="mt-2 text-2xl text-indigo group-hover:text-rust md:text-3xl">{l(a.title, loc)}</h2>
              <p className="mt-2 text-ink-muted">{l(a.excerpt, loc)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

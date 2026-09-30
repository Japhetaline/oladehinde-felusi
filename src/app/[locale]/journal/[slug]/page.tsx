import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { buildMetadata, breadcrumbJsonLd, localeUrl } from '@/lib/seo';
import { articles, getArticle } from '@/data/journal';
import { SITE_URL } from '@/lib/site';
import { l } from '@/lib/l10n';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { ChevronBackIcon } from '@/components/Icons';
import { formatDate } from '@/lib/date';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ locale, path: `/journal/${slug}`, title: l(a.title, locale), description: l(a.excerpt, locale), image: a.image, type: 'article' });
}

export default async function ArticlePage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const a = getArticle(slug);
  if (!a) notFound();
  const t = await getTranslations();
  const others = articles.filter((x) => x.slug !== slug);

  return (
    <article>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Article', headline: l(a.title, locale), description: l(a.excerpt, locale),
        datePublished: a.date, image: `${SITE_URL}${a.image}`, inLanguage: locale,
        author: { '@type': 'Organization', name: 'Oladehinde Felusi' }, publisher: { '@type': 'Organization', name: 'Oladehinde Felusi' },
        mainEntityOfPage: localeUrl(locale, `/journal/${slug}`),
      }} />
      <JsonLd data={breadcrumbJsonLd([
        { name: t('common.home'), url: localeUrl(locale, '') },
        { name: t('journal.eyebrow'), url: localeUrl(locale, '/journal') },
        { name: l(a.title, locale), url: localeUrl(locale, `/journal/${slug}`) },
      ])} />
      <header className="container max-w-3xl pt-10 text-center">
        <Breadcrumbs items={[{ label: t('journal.eyebrow'), href: '/journal' }, { label: l(a.title, locale) }]} className="mb-10 flex justify-center" />
        <p className="eyebrow">{l(a.category, locale)} · {t('common.minRead', { minutes: a.readMinutes })}</p>
        <h1 className="mt-4 text-4xl leading-tight text-indigo md:text-6xl">{l(a.title, locale)}</h1>
        <p className="mt-5 text-lg text-ink-muted">{l(a.excerpt, locale)}</p>
        <p className="mt-4 text-sm text-ink-muted">{t('journal.published')} <time dateTime={a.date}>{formatDate(a.date, locale)}</time></p>
      </header>
      <div className="container mt-10 max-w-5xl">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={a.image} alt={l(a.imageAlt, locale)} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="prose-brand container mt-12 max-w-2xl text-lg">
        {a.body.map((b, i) => {
          if (b.type === 'p') return <p key={i}>{l(b.text, locale)}</p>;
          if (b.type === 'h2') return <h2 key={i}>{l(b.text, locale)}</h2>;
          if (b.type === 'quote') return <blockquote key={i}>{l(b.text, locale)}</blockquote>;
          return <ul key={i}>{b.items.map((it, j) => <li key={j}>{l(it, locale)}</li>)}</ul>;
        })}
        <Link href="/journal" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-rust">
          <ChevronBackIcon width={16} height={16} /> {t('journal.back')}
        </Link>
      </div>
      <aside className="container mt-20 max-w-5xl border-t border-ink/10 pt-12">
        <h2 className="mb-8 text-3xl text-indigo">{t('journal.related')}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/journal/${o.slug}`} className="group flex gap-5">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden">
                <Image src={o.image} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <p className="eyebrow">{l(o.category, locale)}</p>
                <h3 className="mt-1 text-xl text-indigo group-hover:text-rust">{l(o.title, locale)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </article>
  );
}

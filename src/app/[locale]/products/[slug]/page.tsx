import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata, breadcrumbJsonLd, localeUrl } from '@/lib/seo';
import { getAllProducts, getPriceSet, getProduct, getRelatedProducts } from '@/lib/catalog';
import { getCollection } from '@/data/collections';
import { currencies } from '@/lib/currency';
import { SITE_URL } from '@/lib/site';
import { l } from '@/lib/l10n';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductPurchase } from '@/components/ProductPurchase';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { ChevronDownIcon } from '@/components/Icons';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllProducts().map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({
    locale,
    path: `/products/${slug}`,
    title: l(p.name, locale),
    description: l(p.description, locale).slice(0, 158),
    image: p.images.find((i) => i.src)?.src,
  });
}

export default async function ProductPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const t = await getTranslations();
  const collection = getCollection(product.collection)!;
  const related = getRelatedProducts(product);
  const prices = getPriceSet(product.slug);
  const name = l(product.name, locale);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: l(product.description, locale),
    sku: product.slug,
    brand: { '@type': 'Brand', name: 'Oladehinde Felusi' },
    category: l(collection.name, locale),
    material: t(`fabrics.${product.fabric}`),
    image: product.images.filter((i) => i.src).map((i) => `${SITE_URL}${i.src}`),
    url: localeUrl(locale, `/products/${slug}`),
    offers: currencies.map((c) => ({
      '@type': 'Offer',
      price: prices[c],
      priceCurrency: c,
      availability: product.stock === 'ready' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      url: localeUrl(locale, `/products/${slug}`),
      ...(product.unit === 'yard' ? { eligibleQuantity: { '@type': 'QuantitativeValue', unitCode: 'YRD', value: 1 } } : {}),
    })),
  };

  const details: { title: string; body: string; open?: boolean }[] = [
    { title: t('product.details'), body: l(product.description, locale), open: true },
    { title: t('product.fabric'), body: t(`fabrics.${product.fabric}`) },
    { title: t('product.technique'), body: l(product.technique, locale) },
    { title: t('product.care'), body: l(product.care, locale) },
    { title: t('product.leadTime'), body: l(product.leadTime, locale) },
  ];

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('common.home'), url: localeUrl(locale, '') },
          { name: l(collection.name, locale), url: localeUrl(locale, `/collections/${collection.slug}`) },
          { name, url: localeUrl(locale, `/products/${slug}`) },
        ])}
      />
      <div className="container pb-8 pt-6">
        <Breadcrumbs items={[{ label: t('nav.shop'), href: '/shop' }, { label: l(collection.name, locale), href: `/collections/${collection.slug}` }, { label: name }]} />
      </div>
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images.map((i) => ({ src: i.src, alt: l(i.alt, locale) }))} />
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{l(collection.name, locale)} · {t(`stock.${product.stock}`)}</p>
            <h1 className="mt-3 text-3xl leading-tight text-indigo md:text-4xl">{name}</h1>
            <p className="mt-2 font-serif text-lg italic text-ink-muted">{l(product.tagline, locale)}</p>
            <div className="mt-6">
              <ProductPurchase product={product} />
            </div>
            <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {details.map((d) => (
                <details key={d.title} open={d.open} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {d.title}
                    <ChevronDownIcon width={16} height={16} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{d.body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="container mt-24" aria-labelledby="related">
        <h2 id="related" className="mb-8 text-3xl text-indigo">{t('product.related')}</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}

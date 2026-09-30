import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { getAllProducts, getFeaturedProducts, getProduct, getProductsByCollection } from '@/lib/catalog';
import { collections, getCollection } from '@/data/collections';
import { testimonials } from '@/data/content';
import { l } from '@/lib/l10n';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';
import { ProductCard } from '@/components/ProductCard';
import { MediaImage } from '@/components/MediaImage';
import { AdireMotif } from '@/components/AdireMotif';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowIcon, InstagramIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'home', '');
}

const gallery = [
  'runway-teal', 'runway-cocoa', 'runway-mens-orange', 'runway-rust-halter', 'runway-plum', 'runway-navy',
];

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations();
  const loc = await getLocale();
  const iroBuba = getCollection('iro-buba-sets')!;
  const arewa = getProduct('arewa-embellished-iro-buba')!;
  const featured = getFeaturedProducts().filter((p) => p.collection !== 'iro-buba-sets');
  const iroProducts = getProductsByCollection('iro-buba-sets').filter((p) => p.slug !== arewa.slug).slice(0, 2);
  const studioPicks = [...featured, ...getAllProducts().filter((p) => !p.featured && p.collection === 'tie-dye')].slice(0, 8);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-indigo text-cotton">
        <AdireMotif className="absolute inset-0 text-cotton" opacity={0.07} />
        <div className="container relative grid items-center gap-10 py-14 md:grid-cols-12 md:py-20 lg:py-24">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="eyebrow !text-ochre">{t('home.heroEyebrow')}</p>
            <h1 className="mt-5 text-5xl leading-[1.02] text-cotton sm:text-6xl lg:text-7xl">{t('home.heroTitle')}</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cotton/85">{t('home.heroBody')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-light">{t('home.heroCta')} <ArrowIcon width={16} height={16} /></Link>
              <Link href="/craft" className="btn-outline-light">{t('home.heroCta2')}</Link>
            </div>
          </div>
          <div className="relative md:col-span-6 lg:col-span-7">
            <div className="grid grid-cols-12 items-end gap-4">
              <figure className="col-span-7">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src="/images/runway/runway-crop-set.jpg" alt={l(getProduct('asa-wrap-crop-set')!.images[0].alt, loc)} fill priority sizes="(min-width: 768px) 35vw, 60vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-xs text-cotton/70">{t('home.heroCaption')}</figcaption>
              </figure>
              <div className="col-span-5 -translate-y-10 md:-translate-y-16">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src="/images/products/indigo-kaleidoscope.jpg" alt={l(getProduct('indigo-kaleidoscope-adire')!.images[0].alt, loc)} fill priority sizes="(min-width: 768px) 25vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdireMotif variant="band" className="relative text-cotton" opacity={0.35} />
      </section>

      {/* ───────── Featured collection ───────── */}
      <section className="container py-20 md:py-28" aria-labelledby="featured-collection">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <Link href={`/products/${arewa.slug}`} className="group relative md:col-span-6">
            <MediaImage src={arewa.images[0].src} alt={l(arewa.images[0].alt, loc)} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5]" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute bottom-4 start-4 bg-cotton px-3 py-2 text-sm text-indigo">{l(arewa.name, loc)}</span>
          </Link>
          <div className="flex flex-col justify-center md:col-span-6">
            <p className="eyebrow">{t('home.featuredEyebrow')}</p>
            <h2 id="featured-collection" className="mt-4 text-4xl text-indigo md:text-5xl">{l(iroBuba.name, loc)}</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">{t('home.featuredBody')}</p>
            <Link href="/collections/iro-buba-sets" className="btn-outline mt-8 self-start">{t('home.featuredCta')} <ArrowIcon width={16} height={16} /></Link>
            <div className="mt-12 grid grid-cols-2 gap-5">
              {iroProducts.map((p) => <ProductCard key={p.slug} product={p} sizes="(min-width: 768px) 22vw, 45vw" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Every piece is unique ───────── */}
      <section className="relative overflow-hidden bg-cotton-200/70 py-20 md:py-28">
        <div className="container grid items-center gap-12 md:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 md:col-span-5">
            {['indigo-kaleidoscope', 'indigo-drape'].map((n, i) => (
              <div key={n} className={`relative aspect-square overflow-hidden ${i === 1 ? 'mt-12' : ''}`}>
                <Image src={`/images/details/${n}-detail.jpg`} alt="" fill sizes="(min-width: 768px) 20vw, 45vw" className="object-cover" />
              </div>
            ))}
            <p className="col-span-2 text-xs text-ink-muted">{t('product.oneOfAKind')}</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow">{t('home.uniqueEyebrow')}</p>
            <h2 className="mt-4 text-4xl text-indigo md:text-5xl">{t('home.uniqueTitle')}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t('home.uniqueBody')}</p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="border-t border-indigo/30 pt-4">
                  <dt className="font-serif text-lg text-indigo">{t(`home.uniquePoint${n}Title`)}</dt>
                  <dd className="mt-1 text-sm text-ink-muted">{t(`home.uniquePoint${n}Body`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────── Featured products ───────── */}
      <section className="container py-20 md:py-28" aria-labelledby="studio-picks">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t('home.productsEyebrow')}</p>
            <h2 id="studio-picks" className="mt-3 text-4xl text-indigo md:text-5xl">{t('home.productsTitle')}</h2>
          </div>
          <Link href="/shop" className="link-underline hidden shrink-0 text-sm sm:inline-flex">{t('common.viewAll')}</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {studioPicks.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* ───────── Shop by collection ───────── */}
      <section className="container pb-20 md:pb-28" aria-labelledby="by-collection">
        <h2 id="by-collection" className="mb-8 text-3xl text-indigo md:text-4xl">{t('home.collectionsTitle')}</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
              <MediaImage src={c.image} alt={l(c.imageAlt, loc)} sizes="(min-width: 1024px) 25vw, 50vw" className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950/85 via-indigo-950/40 to-transparent p-5 pt-16 text-cotton">
                <h3 className="font-serif text-xl md:text-2xl">{l(c.name, loc)}</h3>
                <p className="mt-1 text-xs text-cotton/85 md:text-sm">{l(c.short, loc)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────── Heritage teaser ───────── */}
      <section className="relative overflow-hidden bg-indigo-900 text-cotton">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[380px] md:min-h-[560px]">
            <Image src="/images/runway/runway-sand-coral.jpg" alt={l(arewa.images[0].alt, loc)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="relative flex flex-col justify-center px-6 py-16 md:px-14 lg:px-20">
            <AdireMotif className="absolute inset-0 text-cotton" opacity={0.06} />
            <p className="eyebrow relative !text-ochre">{t('home.heritageEyebrow')}</p>
            <h2 className="relative mt-4 text-4xl md:text-5xl">{t('home.heritageTitle')}</h2>
            <p className="relative mt-6 max-w-md text-lg leading-relaxed text-cotton/85">{t('home.heritageBody')}</p>
            <blockquote className="relative mt-8 border-s-2 border-ochre ps-5 font-serif text-lg italic text-cotton/90">{t('story.quote')}</blockquote>
            <div className="relative mt-9 flex flex-wrap gap-3">
              <Link href="/our-story" className="btn-light">{t('home.heritageCta')}</Link>
              <Link href="/craft" className="btn-outline-light">{t('nav.craft')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Instagram-style gallery (static) ───────── */}
      <section className="container py-20 md:py-28" aria-labelledby="gallery">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('home.galleryEyebrow')}</p>
            <h2 id="gallery" className="mt-3 text-3xl text-indigo md:text-4xl">
              {t('home.galleryTitle', { handle: INSTAGRAM_HANDLE })}
            </h2>
            <p className="mt-2 text-xs text-ink-muted">{t('home.galleryNote')}</p>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <InstagramIcon /> Instagram
          </a>
        </div>
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {gallery.map((g) => (
            <li key={g}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden" aria-label={`Instagram — ${INSTAGRAM_HANDLE}`}>
                <Image src={`/images/runway/${g}.jpg`} alt="" fill sizes="(min-width: 768px) 16vw, 33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center bg-indigo/0 text-cotton opacity-0 transition group-hover:bg-indigo/40 group-hover:opacity-100">
                  <InstagramIcon width={28} height={28} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Testimonials (placeholder) ───────── */}
      <section className="bg-cotton-200/70 py-20 md:py-24" aria-labelledby="testimonials">
        <div className="container">
          <p className="eyebrow text-center">{t('home.testimonialsEyebrow')}</p>
          <h2 id="testimonials" className="mt-3 text-center text-3xl text-indigo md:text-4xl">{t('home.testimonialsTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-xs text-rust">{t('home.testimonialsNote')}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <figure key={i} className="flex flex-col border border-indigo/15 bg-cotton p-8">
                <span aria-hidden className="font-serif text-5xl leading-none text-ochre">“</span>
                <blockquote className="mt-2 flex-1 font-serif text-lg leading-relaxed text-indigo">{l(tm.quote, loc)}</blockquote>
                <figcaption className="mt-6 text-sm text-ink-muted">
                  {l(tm.name, loc)} · {l(tm.place, loc)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Newsletter ───────── */}
      <section className="container py-20 md:py-24">
        <div className="relative overflow-hidden border border-indigo/15 bg-cotton-100 px-6 py-12 text-center md:px-16">
          <AdireMotif className="absolute inset-0 text-indigo" opacity={0.05} />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-3xl text-indigo md:text-4xl">{t('newsletter.title')}</h2>
            <p className="mb-8 mt-3 text-ink-muted">{t('newsletter.body')}</p>
            <NewsletterForm idPrefix="home-nl" />
          </div>
        </div>
      </section>
    </>
  );
}

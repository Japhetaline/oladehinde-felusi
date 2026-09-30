import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Product } from '@/data/products';
import { getPriceSet } from '@/lib/catalog';
import { l } from '@/lib/l10n';
import { MediaImage } from './MediaImage';
import { Price } from './Price';

export function ProductCard({ product, priority = false, sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw' }: { product: Product; priority?: boolean; sizes?: string }) {
  const locale = useLocale();
  const t = useTranslations();
  const [first, second] = product.images;
  return (
    <article className="group relative">
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-[3/4] overflow-hidden">
          <MediaImage
            src={first.src}
            alt={l(first.alt, locale)}
            sizes={sizes}
            priority={priority}
            className="absolute inset-0"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            placeholderText={t('common.placeholderPhoto')}
          />
          {second?.src && (
            <MediaImage
              src={second.src}
              alt=""
              sizes={sizes}
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <span className={`absolute start-3 top-3 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider ${product.stock === 'ready' ? 'bg-cotton text-indigo' : 'bg-indigo text-cotton'}`}>
            {t(`stock.${product.stock}`)}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-0.5">
          <h3 className="font-serif text-base leading-snug text-ink group-hover:text-rust md:text-lg">{l(product.name, locale)}</h3>
          <p className="text-xs text-ink-muted">{l(product.tagline, locale)}</p>
          <p className="mt-1 text-sm font-medium text-indigo">
            <Price prices={getPriceSet(product.slug)} />
            {product.unit === 'yard' && <span className="text-ink-muted"> / {t('product.perYard')}</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}

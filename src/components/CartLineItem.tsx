'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useStore, type CartItem } from '@/context/StoreProvider';
import { getPriceSet, getProduct } from '@/lib/catalog';
import { l } from '@/lib/l10n';
import { Price } from './Price';
import { MinusIcon, PlusIcon } from './Icons';
import { AdireMotif } from './AdireMotif';

export function CartLineItem({ item, compact = false, onNavigate }: { item: CartItem; compact?: boolean; onNavigate?: () => void }) {
  const locale = useLocale();
  const t = useTranslations();
  const { updateQuantity, removeItem } = useStore();
  const product = getProduct(item.slug);
  if (!product) return null;
  const img = product.images.find((i) => i.src) ?? product.images[0];
  const isYard = product.unit === 'yard';
  const m = item.measurements;

  return (
    <li className="flex gap-4 py-5">
      <Link href={`/products/${product.slug}`} onClick={onNavigate} className={`relative shrink-0 overflow-hidden bg-cotton-200 ${compact ? 'h-28 w-20' : 'h-36 w-28'}`}>
        {img.src ? (
          <Image src={img.src} alt={l(img.alt, locale)} fill sizes="112px" className="object-cover" />
        ) : (
          <AdireMotif className="absolute inset-0 text-indigo" opacity={0.25} />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link href={`/products/${product.slug}`} onClick={onNavigate} className="font-serif text-base leading-snug hover:text-rust">
            {l(product.name, locale)}
          </Link>
          <Price prices={getPriceSet(product.slug)} multiplier={item.quantity} className="shrink-0 text-sm font-medium" />
        </div>
        <p className="mt-1 text-xs text-ink-muted">{t(`stock.${product.stock}`)} · {l(product.leadTime, locale)}</p>
        {item.size && item.size !== 'custom' && (
          <p className="mt-1 text-xs"><span className="text-ink-muted">{t('cart.size')}:</span> {item.size}</p>
        )}
        {item.size === 'custom' && m && (
          <details className="mt-1 text-xs">
            <summary className="cursor-pointer font-medium text-indigo">{t('cart.custom')}</summary>
            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-ink-muted">
              {(Object.keys(m) as (keyof typeof m)[]).filter((k) => m[k]).map((k) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt>{t(`product.measurements.${k}`)}</dt>
                  <dd className="text-ink" dir="ltr">{m[k]} {t('product.unitCm')}</dd>
                </div>
              ))}
            </dl>
            {item.notes && <p className="mt-2 italic text-ink-muted">“{item.notes}”</p>}
          </details>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-ink/20">
            <button type="button" className="p-2 disabled:opacity-40" aria-label={t('product.decrease')} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <MinusIcon width={14} height={14} />
            </button>
            <span className="min-w-[3.5rem] text-center text-sm" aria-live="polite">
              {isYard ? t('cart.yards', { count: item.quantity }) : item.quantity}
            </span>
            <button type="button" className="p-2" aria-label={t('product.increase')} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <PlusIcon width={14} height={14} />
            </button>
          </div>
          <button type="button" onClick={() => removeItem(item.id)} className="text-xs text-ink-muted underline underline-offset-4 hover:text-rust">
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </li>
  );
}

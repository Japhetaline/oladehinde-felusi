'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Product, Size } from '@/data/products';
import { useStore, type Measurements } from '@/context/StoreProvider';
import { getPriceSet } from '@/lib/catalog';
import { whatsappLink } from '@/lib/site';
import { l } from '@/lib/l10n';
import { Price } from './Price';
import { MeasurementFields, REQUIRED_MEASUREMENTS } from './MeasurementFields';
import { CheckIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons';

export function ProductPurchase({ product }: { product: Product }) {
  const t = useTranslations();
  const locale = useLocale();
  const { addItem, setCartOpen } = useStore();
  const isYard = product.unit === 'yard';
  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<Size | 'custom' | null>(null);
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [notes, setNotes] = useState('');
  const [qty, setQty] = useState(isYard ? 6 : 1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const add = () => {
    setError(null);
    if (hasSizes && !size) return setError(t('product.chooseSizeError'));
    if (size === 'custom' && REQUIRED_MEASUREMENTS.some((k) => !measurements[k])) return setError(t('product.measurementsError'));
    const cleaned = size === 'custom' ? Object.fromEntries(Object.entries(measurements).filter(([, v]) => v)) : undefined;
    addItem({ slug: product.slug, quantity: qty, size: hasSizes ? size : null, measurements: cleaned, notes: size === 'custom' && notes ? notes : undefined });
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const sizeBtn = (value: Size | 'custom', label: string) => (
    <button
      key={value}
      type="button"
      role="radio"
      aria-checked={size === value}
      onClick={() => { setSize(value); setError(null); }}
      className={`min-w-[3rem] border px-3 py-2.5 text-sm transition-colors ${size === value ? 'border-indigo bg-indigo text-cotton' : 'border-ink/25 hover:border-indigo'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <p className="text-2xl text-indigo">
        <Price prices={getPriceSet(product.slug)} />
        {isYard && <span className="text-base text-ink-muted"> / {t('product.perYard')}</span>}
      </p>

      <p className="mt-5 flex gap-2 border-s-2 border-ochre bg-ochre-100/60 px-4 py-3 text-sm text-ink">
        {t('product.oneOfAKind')}
      </p>
      <p className="mt-3 text-sm text-ink-muted">
        <span className="font-medium text-ink">{t('product.leadTime')}:</span> {l(product.leadTime, locale)}
      </p>

      {hasSizes && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span id="size-label" className="text-sm font-medium">{t('product.size')}</span>
            <Link href="/size-guide" className="text-xs underline underline-offset-4 hover:text-rust">{t('product.sizeGuideLink')}</Link>
          </div>
          <div role="radiogroup" aria-labelledby="size-label" className="flex flex-wrap gap-2">
            {product.sizes.map((s) => sizeBtn(s, s))}
            {sizeBtn('custom', t('product.customMeasurements'))}
          </div>
          {size === 'custom' && (
            <div className="mt-5 animate-fade-up border border-indigo/20 bg-white/60 p-5">
              <p className="mb-4 text-sm text-ink-muted">{t('product.customIntro')}</p>
              <MeasurementFields value={measurements} onChange={setMeasurements} idPrefix="pdp-m" />
              <label htmlFor="pdp-notes" className="mb-1 mt-4 block text-xs font-medium">{t('product.notes')}</label>
              <textarea id="pdp-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('product.notesPlaceholder')} className="field !py-2.5 text-sm" />
            </div>
          )}
        </div>
      )}
      {!hasSizes && !isYard && <p className="mt-8 text-sm text-ink-muted">{t('product.oneSize')}</p>}

      <div className="mt-8">
        <span id="qty-label" className="mb-3 block text-sm font-medium">{isYard ? t('product.yards') : t('product.quantity')}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-ink/25" role="group" aria-labelledby="qty-label">
            <button type="button" className="p-3 disabled:opacity-40" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label={t('product.decrease')}>
              <MinusIcon width={16} height={16} />
            </button>
            <span className="min-w-[3rem] text-center" aria-live="polite">{qty}</span>
            <button type="button" className="p-3" onClick={() => setQty((q) => Math.min(isYard ? 30 : 10, q + 1))} aria-label={t('product.increase')}>
              <PlusIcon width={16} height={16} />
            </button>
          </div>
          {isYard && (
            <p className="text-sm text-ink-muted">
              = <Price prices={getPriceSet(product.slug)} multiplier={qty} className="font-medium text-ink" />
            </p>
          )}
        </div>
        {isYard && <p className="mt-2 text-xs text-ink-muted">{t('product.yardsHelp')}</p>}
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-rust">{error}</p>}

      <button type="button" onClick={add} className="btn-primary mt-6 w-full !py-4 text-base">
        {added ? (<><CheckIcon /> {t('product.added')}</>) : t('product.addToBag')}
      </button>

      <div className="mt-5 flex flex-col gap-2 text-sm">
        <a href={whatsappLink(`${t('common.whatsappMessage')} ${l(product.name, locale)}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-rust">
          <WhatsAppIcon width={18} height={18} className="text-[#1F7A4A]" /> {t('product.askWhatsapp')}
        </a>
        {product.collection !== 'bespoke' && (
          <Link href="/bespoke" className="underline underline-offset-4 hover:text-rust">{t('product.bespokeCta')}</Link>
        )}
      </div>
    </div>
  );
}

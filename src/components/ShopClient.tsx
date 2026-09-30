'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Fabric, Product, StockStatus } from '@/data/products';
import { collections, type CollectionSlug } from '@/data/collections';
import { useStore } from '@/context/StoreProvider';
import { getPrice } from '@/lib/catalog';
import { formatPrice } from '@/lib/currency';
import { l } from '@/lib/l10n';
import { ProductCard } from './ProductCard';
import { CloseIcon } from './Icons';

type Sort = 'featured' | 'newest' | 'price-asc' | 'price-desc';
const FABRICS: Fabric[] = ['cotton', 'chiffon', 'satin'];
const STOCK: StockStatus[] = ['ready', 'made-to-order'];

export function ShopClient({ products, showCollectionFilter = true, initialCollection }: { products: Product[]; showCollectionFilter?: boolean; initialCollection?: CollectionSlug }) {
  const t = useTranslations();
  const locale = useLocale();
  const { currency } = useStore();
  const [cols, setCols] = useState<CollectionSlug[]>(initialCollection ? [initialCollection] : []);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [stock, setStock] = useState<StockStatus[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>('featured');
  const [panelOpen, setPanelOpen] = useState(false);

  const priceCeiling = useMemo(() => Math.max(...products.map((p) => getPrice(p.slug, currency))), [products, currency]);
  const step = priceCeiling > 10000 ? 5000 : priceCeiling > 1000 ? 50 : 5;
  const effectiveMax = maxPrice === null ? priceCeiling : Math.min(maxPrice, priceCeiling);

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (cols.length === 0 || cols.includes(p.collection)) &&
        (fabrics.length === 0 || fabrics.includes(p.fabric)) &&
        (stock.length === 0 || stock.includes(p.stock)) &&
        getPrice(p.slug, currency) <= effectiveMax,
    );
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => getPrice(a.slug, currency) - getPrice(b.slug, currency));
    if (sort === 'price-desc') sorted.sort((a, b) => getPrice(b.slug, currency) - getPrice(a.slug, currency));
    if (sort === 'newest') sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    if (sort === 'featured') sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [products, cols, fabrics, stock, effectiveMax, sort, currency]);

  const activeCount = cols.length + fabrics.length + stock.length + (maxPrice !== null && maxPrice < priceCeiling ? 1 : 0);
  const clear = () => {
    setCols(initialCollection ? [initialCollection] : []);
    setFabrics([]);
    setStock([]);
    setMaxPrice(null);
  };

  const checkbox = (id: string, label: string, checked: boolean, onChange: () => void) => (
    <label key={id} htmlFor={id} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-indigo" />
      {label}
    </label>
  );

  const filtersUi = (
    <div className="space-y-8">
      {showCollectionFilter && (
        <fieldset>
          <legend className="eyebrow mb-3">{t('shop.collection')}</legend>
          {collections.map((c) => checkbox(`col-${c.slug}`, l(c.name, locale), cols.includes(c.slug), () => toggle(cols, c.slug, setCols)))}
        </fieldset>
      )}
      <fieldset>
        <legend className="eyebrow mb-3">{t('shop.fabric')}</legend>
        {FABRICS.map((f) => checkbox(`fab-${f}`, t(`fabrics.${f}`), fabrics.includes(f), () => toggle(fabrics, f, setFabrics)))}
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3">{t('shop.availability')}</legend>
        {STOCK.map((s) => checkbox(`stock-${s}`, t(`stock.${s}`), stock.includes(s), () => toggle(stock, s, setStock)))}
      </fieldset>
      <div>
        <label htmlFor="price-range" className="eyebrow mb-3 block">{t('shop.price')}</label>
        <input
          id="price-range"
          type="range"
          min={0}
          max={priceCeiling}
          step={step}
          value={effectiveMax}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-indigo"
          aria-valuetext={formatPrice(effectiveMax, currency, locale)}
        />
        <p className="mt-2 text-sm text-ink-muted">{t('shop.maxPrice', { price: formatPrice(effectiveMax, currency, locale) })}</p>
      </div>
      {activeCount > 0 && (
        <button type="button" onClick={clear} className="text-sm underline underline-offset-4 hover:text-rust">{t('shop.clear')}</button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Desktop filters */}
      <aside className="hidden lg:col-span-3 lg:block" aria-label={t('shop.filters')}>
        <div className="sticky top-28">{filtersUi}</div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <p className="text-sm text-ink-muted" role="status" aria-live="polite">{t('shop.results', { count: filtered.length })}</p>
          <div className="flex items-center gap-3">
            <button type="button" className="btn-outline !px-4 !py-2 lg:hidden" onClick={() => setPanelOpen(true)} aria-expanded={panelOpen} aria-controls="filter-panel">
              {t('shop.showFilters')}{activeCount > 0 && ` (${activeCount})`}
            </button>
            <label htmlFor="sort" className="sr-only">{t('shop.sort')}</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-ink/20 bg-transparent px-3 py-2 text-sm">
              <option value="featured">{t('shop.sortFeatured')}</option>
              <option value="newest">{t('shop.sortNewest')}</option>
              <option value="price-asc">{t('shop.sortPriceAsc')}</option>
              <option value="price-desc">{t('shop.sortPriceDesc')}</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-indigo">{t('shop.noResults')}</p>
            <button type="button" onClick={clear} className="btn-outline mt-6">{t('shop.clear')}</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            <h2 className="sr-only">{t('shop.results', { count: filtered.length })}</h2>
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 3} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />)}
          </div>
        )}
      </div>

      {/* Mobile filter panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="filter-panel">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setPanelOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label={t('shop.filters')} className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-fade-up overflow-y-auto bg-cotton p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-indigo">{t('shop.filters')}</h2>
              <button type="button" onClick={() => setPanelOpen(false)} aria-label={t('common.close')} className="-me-2 p-2"><CloseIcon /></button>
            </div>
            {filtersUi}
            <button type="button" className="btn-primary mt-8 w-full" onClick={() => setPanelOpen(false)}>
              {t('shop.applyFilters', { count: filtered.length })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

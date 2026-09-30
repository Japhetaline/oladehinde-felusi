'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, type Locale } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { searchProducts, getPriceSet } from '@/lib/catalog';
import { l } from '@/lib/l10n';
import { Price } from './Price';
import { CloseIcon, SearchIcon } from './Icons';

const popularSearches: Record<Locale, string[]> = {
  en: ['Arewa', 'Indigo', 'Chiffon', 'Adire'],
  fr: ['Arewa', 'Indigo', 'Mousseline', 'Adire'],
  ar: ['أريوا', 'نيلي', 'شيفون', 'أديري'],
};

export function SearchOverlay() {
  const t = useTranslations('search');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const results = useMemo(() => searchProducts(q), [q]);
  const popular = popularSearches[locale as Locale] ?? popularSearches.en;

  useEffect(() => setSearchOpen(false), [pathname, setSearchOpen]);
  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;
  const close = () => setSearchOpen(false);

  return (
    <div className="fixed inset-0 z-50 animate-fade-in overflow-y-auto bg-cotton" role="dialog" aria-modal="true" aria-label={t('title')}>
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <h2 className="eyebrow">{t('title')}</h2>
          <button type="button" onClick={close} className="-me-2 p-2" aria-label={tc('close')}><CloseIcon /></button>
        </div>
        <div className="mt-6 flex items-center gap-3 border-b-2 border-indigo pb-3">
          <SearchIcon width={26} height={26} className="text-indigo" />
          <label htmlFor="site-search" className="sr-only">{t('title')}</label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full bg-transparent font-serif text-2xl text-indigo placeholder:text-ink-soft focus:outline-none md:text-4xl"
            autoComplete="off"
          />
        </div>
        {!q && (
          <div className="mt-6">
            <p className="mb-3 text-sm text-ink-muted">{t('hint')}</p>
            <p className="eyebrow mb-2">{t('popular')}</p>
            <div className="flex flex-wrap gap-2">
              {popular.map((p) => (
                <button key={p} type="button" onClick={() => setQ(p)} className="border border-ink/20 px-4 py-2 text-sm hover:border-indigo hover:text-indigo">{p}</button>
              ))}
            </div>
          </div>
        )}
        {q && (
          <div className="mt-6">
            <p className="text-sm text-ink-muted" role="status" aria-live="polite">{t('results', { count: results.length })}</p>
            <ul className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {results.map((p) => {
                const img = p.images.find((i) => i.src);
                return (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} onClick={close} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-indigo-100">
                        {img?.src && <Image src={img.src} alt={l(img.alt, locale)} fill sizes="20vw" className="object-cover transition-transform group-hover:scale-105" />}
                      </div>
                      <p className="mt-2 font-serif text-sm group-hover:text-rust">{l(p.name, locale)}</p>
                      <Price prices={getPriceSet(p.slug)} className="text-xs text-indigo" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

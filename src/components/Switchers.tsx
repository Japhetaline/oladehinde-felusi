'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, locales, localeNames } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { currencies, type Currency } from '@/lib/currency';

export function LocaleSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <nav aria-label={t('language')} className={className}>
      <ul className="flex items-center gap-2 text-sm font-medium">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-ink/30">·</span>}
            <Link
              href={pathname}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? 'true' : undefined}
              className={`${l === 'ar' ? 'font-arabic' : 'font-sans'} ${l === locale ? 'text-rust' : 'hover:text-rust'}`}
            >
              {l === 'ar' ? localeNames.ar : l.toUpperCase()}
              {l !== 'ar' && <span className="sr-only"> — {localeNames[l]}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function CurrencySwitcher({ className = '', id = 'currency' }: { className?: string; id?: string }) {
  const t = useTranslations('common');
  const { currency, setCurrency } = useStore();
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">{t('currency')}</label>
      <select
        id={id}
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="cursor-pointer appearance-none border-0 bg-transparent py-1 pe-4 ps-0 text-sm font-medium text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-rust"
        dir="ltr"
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="text-ink">{c}</option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-[0.6rem]">▾</span>
    </div>
  );
}

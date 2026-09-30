'use client';

import { useLocale } from 'next-intl';
import { useStore } from '@/context/StoreProvider';
import { formatPrice, type PriceSet } from '@/lib/currency';

/** Renders a price in the shopper's selected currency, from per-currency stored prices. */
export function Price({ prices, className = '', multiplier = 1 }: { prices: PriceSet; className?: string; multiplier?: number }) {
  const { currency } = useStore();
  const locale = useLocale();
  return (
    <span className={className} dir={locale === "ar" ? undefined : "ltr"} style={{ unicodeBidi: "isolate" }}>
      {formatPrice(prices[currency] * multiplier, currency, locale)}
    </span>
  );
}

export function Amount({ value, className = '' }: { value: number; className?: string }) {
  const { currency } = useStore();
  const locale = useLocale();
  return (
    <span className={className} dir={locale === "ar" ? undefined : "ltr"} style={{ unicodeBidi: "isolate" }}>
      {formatPrice(value, currency, locale)}
    </span>
  );
}

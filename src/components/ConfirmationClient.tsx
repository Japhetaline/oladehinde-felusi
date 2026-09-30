'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getProduct } from '@/lib/catalog';
import { formatPrice, type Currency } from '@/lib/currency';
import { l } from '@/lib/l10n';
import { AdireMotif } from './AdireMotif';
import { CheckIcon } from './Icons';

type Order = { orderNumber: string; email: string; currency: Currency; total: number; items: { slug: string; quantity: number; size: string | null }[] };

export function ConfirmationClient() {
  const t = useTranslations('confirmation');
  const locale = useLocale();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('of-last-order');
      setOrder(raw ? (JSON.parse(raw) as Order) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      <AdireMotif className="absolute inset-0 text-indigo" opacity={0.05} />
      <div className="container relative max-w-2xl py-16 text-center md:py-24">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo text-cotton"><CheckIcon width={30} height={30} /></span>
        <h1 className="mt-6 text-4xl text-indigo md:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-4 inline-block bg-ochre-100 px-3 py-1.5 text-sm text-ink" role="note">{t('prototype')}</p>
        {order === null && <p className="mt-8 text-ink-muted">{t('noOrder')}</p>}
        {order && (
          <div className="mt-10 border border-ink/10 bg-cotton-100 p-6 text-start">
            <p className="text-sm text-ink-muted">{t('orderNumber')}</p>
            <p className="font-serif text-2xl text-indigo" dir="ltr">{order.orderNumber}</p>
            <p className="mt-2 text-sm text-ink-muted">{t('emailNote', { email: order.email })}</p>
            <ul className="mt-5 space-y-1 border-t border-ink/10 pt-4 text-sm">
              {order.items.map((i, idx) => {
                const p = getProduct(i.slug);
                return p ? <li key={idx}>{i.quantity} × {l(p.name, locale)}</li> : null;
              })}
            </ul>
            <p className="mt-4 border-t border-ink/10 pt-4 text-lg font-medium text-indigo">{formatPrice(order.total, order.currency, locale)}</p>
          </div>
        )}
        <div className="mt-10 text-start">
          <h2 className="font-serif text-2xl text-indigo">{t('nextTitle')}</h2>
          <ol className="mt-4 space-y-3">
            {(['next1', 'next2', 'next3'] as const).map((k, i) => (
              <li key={k} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo text-sm text-indigo">{i + 1}</span>
                <span className="pt-0.5 text-ink-muted">{t(k)}</span>
              </li>
            ))}
          </ol>
        </div>
        <Link href="/shop" className="btn-primary mt-10">{t('continue')}</Link>
      </div>
    </section>
  );
}

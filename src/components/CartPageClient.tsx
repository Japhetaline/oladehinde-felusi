'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { getProduct } from '@/lib/catalog';
import { CartLineItem } from './CartLineItem';
import { Amount } from './Price';
import { ArrowIcon } from './Icons';

export function CartPageClient() {
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const { items, subtotal, hydrated } = useStore();

  if (!hydrated) return <div className="h-64 animate-pulse bg-cotton-200" aria-hidden />;
  if (items.length === 0) {
    return (
      <div className="border border-ink/10 bg-cotton-100 py-20 text-center">
        <p className="font-serif text-3xl text-indigo">{t('empty')}</p>
        <p className="mt-2 text-ink-muted">{t('emptyBody')}</p>
        <Link href="/shop" className="btn-primary mt-8">{tc('shopNow')}</Link>
      </div>
    );
  }
  const hasMto = items.some((i) => getProduct(i.slug)?.stock === 'made-to-order');
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
        {items.map((i) => <CartLineItem key={i.id} item={i} />)}
      </ul>
      <aside className="h-fit border border-ink/10 bg-cotton-100 p-6 lg:col-span-4">
        <div className="flex justify-between text-lg">
          <span>{t('subtotal')}</span>
          <Amount value={subtotal} className="font-medium" />
        </div>
        <p className="mt-2 text-xs text-ink-muted">{t('shippingNote')}</p>
        {hasMto && <p className="mt-2 text-xs text-rust">{t('madeToOrderNote')}</p>}
        <Link href="/checkout" className="btn-primary mt-6 w-full">{t('checkout')} <ArrowIcon width={16} height={16} /></Link>
        <Link href="/shop" className="mt-4 block text-center text-sm underline underline-offset-4 hover:text-rust">{t('continue')}</Link>
      </aside>
    </div>
  );
}

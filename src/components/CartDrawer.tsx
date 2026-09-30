'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { CartLineItem } from './CartLineItem';
import { Amount } from './Price';
import { CloseIcon, ArrowIcon } from './Icons';
import { useInert } from '@/lib/useInert';

export function CartDrawer() {
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const { cartOpen, setCartOpen, items, subtotal, count } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useInert<HTMLDivElement>(!cartOpen);
  const pathname = usePathname();

  useEffect(() => setCartOpen(false), [pathname, setCartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [cartOpen, setCartOpen]);

  const close = () => setCartOpen(false);

  return (
    <div ref={wrapRef} className={`fixed inset-0 z-50 ${cartOpen ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={close} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cotton shadow-2xl transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-serif text-2xl text-indigo">
            {t('title')} <span className="font-sans text-sm text-ink-muted">({t('itemCount', { count })})</span>
          </h2>
          <button ref={closeRef} type="button" onClick={close} className="-me-2 p-2" aria-label={tc('close')}>
            <CloseIcon />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl text-indigo">{t('empty')}</p>
            <p className="text-sm text-ink-muted">{t('emptyBody')}</p>
            <Link href="/shop" onClick={close} className="btn-primary mt-2">{tc('shopNow')}</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {items.map((item) => <CartLineItem key={item.id} item={item} compact onNavigate={close} />)}
            </ul>
            <div className="border-t border-ink/10 px-6 py-5">
              <div className="flex justify-between text-base font-medium">
                <span>{t('subtotal')}</span>
                <Amount value={subtotal} />
              </div>
              <p className="mt-1 text-xs text-ink-muted">{t('shippingNote')}</p>
              <Link href="/checkout" onClick={close} className="btn-primary mt-4 w-full">
                {t('checkout')} <ArrowIcon width={16} height={16} />
              </Link>
              <Link href="/cart" onClick={close} className="btn-outline mt-2 w-full">{t('viewBag')}</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

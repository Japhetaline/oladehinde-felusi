'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { countries } from '@/data/content';
import { shippingRates } from '@/data/prices';
import { getPrice, getProduct } from '@/lib/catalog';
import { formatPrice } from '@/lib/currency';
import { l } from '@/lib/l10n';
import { CheckIcon, ChevronIcon } from './Icons';

type Step = 'contact' | 'shipping' | 'payment';
type Method = keyof typeof shippingRates;

const STEPS: Step[] = ['contact', 'shipping', 'payment'];

export function CheckoutClient() {
  const t = useTranslations('checkout');
  const tc = useTranslations('cart');
  const tco = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const { items, subtotal, currency, hydrated, clearCart } = useStore();
  const [step, setStep] = useState<Step>('contact');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [gateway, setGateway] = useState<'paystack' | 'flutterwave'>('paystack');
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '', address: '', apartment: '', city: '', state: '', postcode: '',
    country: locale === 'ar' ? 'AE' : locale === 'fr' ? 'FR' : 'NG',
  });
  const [method, setMethod] = useState<Method>(locale === 'en' ? 'lagos' : 'international');

  const isNigeria = form.country === 'NG';
  const availableMethods: Method[] = isNigeria ? ['lagos', 'nigeria'] : ['international'];
  const activeMethod: Method = availableMethods.includes(method) ? method : availableMethods[0];
  const shippingCost = step === 'contact' ? null : shippingRates[activeMethod][currency];
  const total = subtotal + (shippingCost ?? 0);
  const fmt = (n: number) => formatPrice(n, currency, locale);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = (fields: (keyof typeof form)[]) => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      if (!form[f].trim()) next[f] = t('fieldRequired');
    });
    if (fields.includes('email') && form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = t('invalidEmail');
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`co-${Object.keys(next)[0]}`)?.focus();
      return false;
    }
    return true;
  };

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    if (validate(['email', 'phone'])) setStep('shipping');
  };
  const submitShipping = (e: FormEvent) => {
    e.preventDefault();
    if (validate(['firstName', 'lastName', 'address', 'city', 'country'])) setStep('payment');
  };
  const pay = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    const orderNumber = `OF-${Date.now().toString().slice(-6)}`;
    const snapshot = {
      orderNumber,
      email: form.email,
      currency,
      total,
      items: items.map((i) => ({ slug: i.slug, quantity: i.quantity, size: i.size })),
    };
    try {
      sessionStorage.setItem('of-last-order', JSON.stringify(snapshot));
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      clearCart();
      router.push('/checkout/confirmation');
    }, 1400);
  };

  const summary = useMemo(
    () =>
      items.map((i) => {
        const p = getProduct(i.slug)!;
        const img = p.images.find((x) => x.src);
        return { ...i, p, img, line: getPrice(i.slug, currency) * i.quantity };
      }),
    [items, currency],
  );

  const field = (k: keyof typeof form, label: string, opts: { type?: string; autoComplete?: string; required?: boolean; dir?: 'ltr' } = {}) => (
    <div>
      <label htmlFor={`co-${k}`} className="field-label">
        {label} {opts.required !== false ? <span aria-hidden className="text-rust">*</span> : <span className="text-xs text-ink-muted">({tco('optional')})</span>}
      </label>
      <input
        id={`co-${k}`}
        type={opts.type ?? 'text'}
        autoComplete={opts.autoComplete}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `co-${k}-err` : undefined}
        className="field"
        dir={opts.dir ?? 'auto'}
      />
      {errors[k] && <p id={`co-${k}-err`} className="field-error">{errors[k]}</p>}
    </div>
  );

  if (!hydrated) return <div className="container h-96 animate-pulse" aria-hidden />;

  return (
    <div className="min-h-screen bg-cotton">
      <div className="bg-ochre px-4 py-2.5 text-center text-sm font-semibold text-ink" role="note">{t('prototypeNotice')}</div>
      <div className="container grid gap-12 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-4xl text-indigo">{t('title')}</h1>

          {/* Stepper */}
          <ol className="mt-6 flex items-center gap-2 text-sm" aria-label={t('title')}>
            {STEPS.map((s, i) => {
              const done = STEPS.indexOf(step) > i;
              const current = step === s;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${current ? 'bg-indigo text-cotton' : done ? 'bg-indigo-200 text-indigo' : 'border border-ink/30 text-ink-muted'}`}>
                    {done ? <CheckIcon width={14} height={14} /> : i + 1}
                  </span>
                  <span className={current ? 'font-medium text-indigo' : 'text-ink-muted'} aria-current={current ? 'step' : undefined}>{t(`steps.${s}`)}</span>
                  {i < STEPS.length - 1 && <ChevronIcon width={14} height={14} className="text-ink-soft" />}
                </li>
              );
            })}
          </ol>

          {items.length === 0 ? (
            <div className="mt-10 border border-ink/10 p-8 text-center">
              <p>{t('emptyBag')}</p>
              <Link href="/shop" className="btn-primary mt-6">{tc('continue')}</Link>
            </div>
          ) : (
            <div className="mt-10">
              {step === 'contact' && (
                <form onSubmit={submitContact} noValidate className="animate-fade-in space-y-5">
                  <h2 className="font-serif text-2xl text-indigo">{t('steps.contact')}</h2>
                  {field('email', t('email'), { type: 'email', autoComplete: 'email', dir: 'ltr' })}
                  {field('phone', t('phone'), { type: 'tel', autoComplete: 'tel', dir: 'ltr' })}
                  <div className="flex items-center justify-between pt-4">
                    <Link href="/cart" className="text-sm underline underline-offset-4">{t('editBag')}</Link>
                    <button type="submit" className="btn-primary">{t('continueToShipping')}</button>
                  </div>
                </form>
              )}

              {step === 'shipping' && (
                <form onSubmit={submitShipping} noValidate className="animate-fade-in space-y-5">
                  <h2 className="font-serif text-2xl text-indigo">{t('steps.shipping')}</h2>
                  <div>
                    <label htmlFor="co-country" className="field-label">{t('country')} <span aria-hidden className="text-rust">*</span></label>
                    <select id="co-country" value={form.country} onChange={set('country')} className="field" autoComplete="country">
                      {countries.map((c) => <option key={c.code} value={c.code}>{l(c.name, locale)}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {field('firstName', t('firstName'), { autoComplete: 'given-name' })}
                    {field('lastName', t('lastName'), { autoComplete: 'family-name' })}
                  </div>
                  {field('address', t('address'), { autoComplete: 'address-line1' })}
                  {field('apartment', t('apartment'), { autoComplete: 'address-line2', required: false })}
                  <div className="grid gap-5 sm:grid-cols-3">
                    {field('city', t('city'), { autoComplete: 'address-level2' })}
                    {field('state', t('state'), { autoComplete: 'address-level1', required: false })}
                    {field('postcode', t('postcode'), { autoComplete: 'postal-code', required: false, dir: 'ltr' })}
                  </div>

                  <fieldset className="pt-4">
                    <legend className="mb-3 font-serif text-xl text-indigo">{t('method')}</legend>
                    <div className="space-y-2">
                      {(['lagos', 'nigeria', 'international'] as Method[]).map((m) => {
                        const disabled = !availableMethods.includes(m);
                        return (
                          <label key={m} htmlFor={`ship-${m}`} className={`flex items-center justify-between gap-4 border p-4 ${activeMethod === m ? 'border-indigo bg-indigo-50' : 'border-ink/20'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                            <span className="flex items-start gap-3">
                              <input id={`ship-${m}`} type="radio" name="method" value={m} checked={activeMethod === m} disabled={disabled} onChange={() => setMethod(m)} className="mt-1 accent-indigo" />
                              <span>
                                <span className="block text-sm font-medium">{t(`methods.${m}`)}</span>
                                <span className="block text-xs text-ink-muted">{disabled ? t('methodUnavailable') : t(`methods.${m}Eta`)}</span>
                              </span>
                            </span>
                            <span className="text-sm font-medium">{fmt(shippingRates[m][currency])}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="flex items-center justify-between pt-4">
                    <button type="button" onClick={() => setStep('contact')} className="text-sm underline underline-offset-4">{t('back')}</button>
                    <button type="submit" className="btn-primary">{t('continueToPayment')}</button>
                  </div>
                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={pay} className="animate-fade-in space-y-5">
                  <h2 className="font-serif text-2xl text-indigo">{t('paymentTitle')}</h2>
                  <div className="border-2 border-dashed border-ochre bg-ochre-100/60 p-5">
                    <p className="font-semibold text-ink">{t('gatewayNotice')}</p>
                    <p className="mt-1 text-sm text-ink-muted">{t('gatewayBody')}</p>
                  </div>
                  <fieldset>
                    <legend className="field-label">{t('payWith')}</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {(['paystack', 'flutterwave'] as const).map((g) => (
                        <label key={g} htmlFor={`gw-${g}`} className={`flex cursor-pointer items-center gap-3 border p-4 ${gateway === g ? 'border-indigo bg-indigo-50' : 'border-ink/20'}`}>
                          <input id={`gw-${g}`} type="radio" name="gateway" checked={gateway === g} onChange={() => setGateway(g)} className="accent-indigo" />
                          <span className="font-medium" dir="ltr">{g === 'paystack' ? 'Paystack' : 'Flutterwave'}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="space-y-4 border border-ink/15 bg-white p-5" aria-describedby="demo-card">
                    <p id="demo-card" className="text-xs font-semibold uppercase tracking-wider text-rust">{t('demoCard')}</p>
                    <div>
                      <label htmlFor="cc-number" className="field-label">{t('cardNumber')}</label>
                      <input id="cc-number" className="field" value="4084 0840 8408 4081" readOnly dir="ltr" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cc-exp" className="field-label">{t('expiry')}</label>
                        <input id="cc-exp" className="field" value="12 / 30" readOnly dir="ltr" />
                      </div>
                      <div>
                        <label htmlFor="cc-cvc" className="field-label">{t('cvc')}</label>
                        <input id="cc-cvc" className="field" value="408" readOnly dir="ltr" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button type="button" onClick={() => setStep('shipping')} className="text-sm underline underline-offset-4">{t('back')}</button>
                    <button type="submit" className="btn-primary" disabled={processing}>
                      {processing ? t('processing') : t('payNow', { amount: fmt(total) })}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Order summary */}
        <aside className="h-fit border border-ink/10 bg-cotton-100 p-6 lg:col-span-5 lg:sticky lg:top-8" aria-label={t('orderSummary')}>
          <h2 className="mb-4 font-serif text-2xl text-indigo">{t('orderSummary')}</h2>
          <ul className="divide-y divide-ink/10">
            {summary.map((s) => (
              <li key={s.id} className="flex items-center gap-4 py-3">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-indigo-100">
                  {s.img?.src && <Image src={s.img.src} alt="" fill sizes="48px" className="object-cover" />}
                  <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo px-1 text-[10px] text-cotton">{s.quantity}</span>
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium">{l(s.p.name, locale)}</p>
                  <p className="text-xs text-ink-muted">
                    {s.p.unit === 'yard' ? tc('yards', { count: s.quantity }) : s.size === 'custom' ? tc('custom') : s.size ? `${tc('size')}: ${s.size}` : ''}
                  </p>
                </div>
                <span className="text-sm" dir={locale === 'ar' ? undefined : 'ltr'}>{fmt(s.line)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between"><dt>{t('subtotal')}</dt><dd>{fmt(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>{t('shipping')}</dt><dd className="text-ink-muted">{shippingCost === null ? t('calculatedNext') : fmt(shippingCost)}</dd></div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-lg font-medium text-indigo"><dt>{t('total')}</dt><dd>{fmt(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

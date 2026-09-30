'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckIcon } from './Icons';

export function NewsletterForm({ tone = 'dark', idPrefix = 'nl' }: { tone?: 'dark' | 'light'; idPrefix?: string }) {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('error');
    setStatus('success');
  };

  const light = tone === 'light';
  if (status === 'success') {
    return (
      <p role="status" className={`flex items-start gap-2 text-sm ${light ? 'text-cotton' : 'text-indigo'}`}>
        <CheckIcon className="mt-0.5 shrink-0" /> {t('success')}
      </p>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${idPrefix}-email`} className="sr-only">{t('label')}</label>
      <div className="flex">
        <input
          id={`${idPrefix}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder={t('placeholder')}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `${idPrefix}-err` : undefined}
          className={`min-w-0 flex-1 border px-4 py-3 text-base focus:outline-none focus:ring-2 ${
            light ? 'border-cotton/40 bg-transparent text-cotton placeholder:text-cotton/60 focus:ring-cotton' : 'border-ink/25 bg-white text-ink focus:ring-indigo'
          }`}
          dir="ltr"
        />
        <button type="submit" className={light ? 'btn-light' : 'btn-primary'}>{t('cta')}</button>
      </div>
      {status === 'error' && <p id={`${idPrefix}-err`} className={`mt-2 text-sm ${light ? 'text-ochre-100' : 'text-rust'}`}>{t('invalid')}</p>}
    </form>
  );
}

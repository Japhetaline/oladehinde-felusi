'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { CheckIcon } from './Icons';

/** Shared mock form shell: native validation, fake "sending" delay, accessible success state. */
export function SimpleForm({ children, submitLabel, successMessage }: { children: ReactNode; submitLabel: string; successMessage: string }) {
  const tc = useTranslations('common');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (state === 'sent') ref.current?.focus(); }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; }
    setState('sending');
    setTimeout(() => setState('sent'), 800);
  };

  if (state === 'sent') {
    return (
      <div ref={ref} tabIndex={-1} role="status" className="flex items-start gap-4 border border-indigo/20 bg-indigo-50 p-6 focus:outline-none">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo text-cotton"><CheckIcon /></span>
        <p className="text-indigo">{successMessage}</p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {children}
      <button type="submit" className="btn-primary" disabled={state === 'sending'}>{state === 'sending' ? tc('sending') : submitLabel}</button>
    </form>
  );
}

export function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label} {required && <span aria-hidden className="text-rust">*</span>}</label>
      {children}
    </div>
  );
}

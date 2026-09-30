'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SimpleForm, Field } from './SimpleForm';

export function WorkshopBooking({ options }: { options: { slug: string; title: string }[] }) {
  const t = useTranslations('workshops');
  const [selected, setSelected] = useState(options[0]?.slug ?? '');

  // Allow "Book this workshop" buttons (#book-<slug>) to preselect the workshop.
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#book-(.+)$/);
      if (m && options.some((o) => o.slug === m[1])) setSelected(m[1]);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [options]);

  return (
    <SimpleForm submitLabel={t('submit')} successMessage={t('success')}>
      <Field id="w-workshop" label={t('workshop')} required>
        <select id="w-workshop" className="field" value={selected} onChange={(e) => setSelected(e.target.value)} required>
          {options.map((o) => <option key={o.slug} value={o.slug}>{o.title}</option>)}
        </select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="w-name" label={t('name')} required><input id="w-name" required autoComplete="name" className="field" /></Field>
        <Field id="w-email" label={t('email')} required><input id="w-email" type="email" required autoComplete="email" className="field" dir="ltr" /></Field>
        <Field id="w-phone" label={t('phone')}><input id="w-phone" type="tel" autoComplete="tel" className="field" dir="ltr" /></Field>
        <Field id="w-participants" label={t('participants')} required><input id="w-participants" type="number" min={1} max={12} defaultValue={1} required className="field" /></Field>
      </div>
      <Field id="w-notes" label={t('notes')}><textarea id="w-notes" rows={3} className="field" /></Field>
    </SimpleForm>
  );
}

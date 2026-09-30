'use client';

import { useTranslations } from 'next-intl';
import { SimpleForm, Field } from './SimpleForm';

export function ContactForm() {
  const t = useTranslations('contact');
  return (
    <SimpleForm submitLabel={t('submit')} successMessage={t('success')}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label={t('name')} required><input id="c-name" required autoComplete="name" className="field" /></Field>
        <Field id="c-email" label={t('email')} required><input id="c-email" type="email" required autoComplete="email" className="field" dir="ltr" /></Field>
      </div>
      <Field id="c-subject" label={t('subject')}>
        <select id="c-subject" className="field">
          {(['order', 'bespoke', 'workshop', 'press', 'other'] as const).map((s) => <option key={s} value={s}>{t(`subjects.${s}`)}</option>)}
        </select>
      </Field>
      <Field id="c-message" label={t('message')} required><textarea id="c-message" rows={6} required className="field" /></Field>
    </SimpleForm>
  );
}

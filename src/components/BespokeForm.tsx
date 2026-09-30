'use client';

import { useEffect, useRef, useState, type DragEvent, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useStore, type Measurements } from '@/context/StoreProvider';
import { bespokeBudgets } from '@/data/prices';
import { formatPrice } from '@/lib/currency';
import { MeasurementFields } from './MeasurementFields';
import { CheckIcon, CloseIcon, UploadIcon } from './Icons';

const COLOURS = [
  { key: 'indigo', hex: '#1E2B5E' }, { key: 'rust', hex: '#A4471F' }, { key: 'ochre', hex: '#C8912E' }, { key: 'emerald', hex: '#1F6B45' },
  { key: 'plum', hex: '#6B2345' }, { key: 'teal', hex: '#0F5C63' }, { key: 'black', hex: '#1C1A17' }, { key: 'cream', hex: '#EFE3CC' },
] as const;

export function BespokeForm() {
  const t = useTranslations('bespoke');
  const tf = useTranslations('fabrics');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { currency } = useStore();
  const [colours, setColours] = useState<string[]>([]);
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [drag, setDrag] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);
  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).filter((f) => f.type.startsWith('image/')).slice(0, 5 - files.length)
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setFiles((prev) => [...prev, ...next]);
  };
  const onDrop = (e: DragEvent) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 900);
  };

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex items-start gap-4 border border-indigo/20 bg-indigo-50 p-8 focus:outline-none">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo text-cotton"><CheckIcon /></span>
        <p className="text-lg text-indigo">{t('success')}</p>
      </div>
    );
  }

  const req = <span aria-hidden className="text-rust">*</span>;
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="b-name" className="field-label">{t('name')} {req}</label><input id="b-name" required autoComplete="name" className="field" /></div>
        <div><label htmlFor="b-email" className="field-label">{t('email')} {req}</label><input id="b-email" type="email" required autoComplete="email" className="field" dir="ltr" /></div>
        <div><label htmlFor="b-phone" className="field-label">{t('phone')}</label><input id="b-phone" type="tel" autoComplete="tel" className="field" dir="ltr" /></div>
        <div>
          <label htmlFor="b-occasion" className="field-label">{t('occasion')} {req}</label>
          <select id="b-occasion" required className="field" defaultValue="">
            <option value="" disabled>—</option>
            {(['wedding', 'asoebi', 'eid', 'birthday', 'everyday', 'other'] as const).map((o) => <option key={o} value={o}>{t(`occasions.${o}`)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-garment" className="field-label">{t('garment')}</label>
          <select id="b-garment" className="field">
            {(['set', 'gown', 'wrap', 'fabric', 'menswear'] as const).map((g) => <option key={g} value={g}>{t(`garments.${g}`)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-fabric" className="field-label">{t('fabric')}</label>
          <select id="b-fabric" className="field">
            <option value="unsure">{t('fabricUnsure')}</option>
            {(['cotton', 'chiffon', 'satin'] as const).map((f) => <option key={f} value={f}>{tf(f)}</option>)}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="field-label">{t('colours')}</legend>
        <div className="flex flex-wrap gap-2">
          {COLOURS.map((c) => {
            const on = colours.includes(c.key);
            return (
              <button key={c.key} type="button" aria-pressed={on} onClick={() => setColours((p) => (on ? p.filter((x) => x !== c.key) : [...p, c.key]))}
                className={`flex items-center gap-2 border px-3 py-2 text-sm ${on ? 'border-indigo bg-indigo-50' : 'border-ink/20 hover:border-indigo'}`}>
                <span className="h-4 w-4 rounded-full border border-ink/20" style={{ background: c.hex }} aria-hidden />
                {t(`colourNames.${c.key}`)}
                {on && <CheckIcon width={14} height={14} />}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="b-deadline" className="field-label">{t('deadline')}</label><input id="b-deadline" type="date" className="field" /></div>
        <div>
          <label htmlFor="b-budget" className="field-label">{t('budget')}</label>
          <select id="b-budget" className="field">
            <option value="unsure">{t('budgetUnsure')}</option>
            {bespokeBudgets.map((b, i) => (
              <option key={i} value={i}>{formatPrice(b.min[currency], currency, locale)} – {formatPrice(b.max[currency], currency, locale)}</option>
            ))}
          </select>
        </div>
      </div>

      <details className="border border-ink/15 bg-white/60 p-5">
        <summary className="cursor-pointer font-medium text-indigo">{t('measurementsTitle')} <span className="text-sm font-normal text-ink-muted">— {t('measurementsOptional')}</span></summary>
        <div className="mt-5"><MeasurementFields value={measurements} onChange={setMeasurements} idPrefix="b-m" required={false} /></div>
      </details>

      <div>
        <span className="field-label" id="b-ref-label">{t('references')}</span>
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed p-8 text-center transition-colors ${drag ? 'border-indigo bg-indigo-50' : 'border-ink/25'}`}
        >
          <UploadIcon width={28} height={28} className="text-indigo" />
          <p className="mt-2 text-sm">{t('referencesHelp')}</p>
          <button type="button" onClick={() => inputRef.current?.click()} className="btn-outline mt-4 !py-2" aria-describedby="b-ref-label">{t('references')}</button>
          <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} aria-labelledby="b-ref-label" onChange={(e) => addFiles(e.target.files)} />
          <p className="mt-3 text-xs text-ink-muted">{t('referencesDemo')}</p>
        </div>
        {files.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {files.map((f, i) => (
              <li key={f.url} className="relative h-24 w-24 overflow-hidden border border-ink/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} aria-label={`${t('removeImage')}: ${f.name}`} className="absolute end-1 top-1 rounded-full bg-cotton p-1">
                  <CloseIcon width={12} height={12} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="b-details" className="field-label">{t('details')}</label>
        <textarea id="b-details" rows={4} placeholder={t('detailsPlaceholder')} className="field" />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>{sending ? tc('sending') : t('submit')}</button>
    </form>
  );
}

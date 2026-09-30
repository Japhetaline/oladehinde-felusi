'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { sizeChart } from '@/data/content';

export function SizeTable() {
  const t = useTranslations('sizeGuide');
  const [inches, setInches] = useState(false);
  const fmt = (cm: number) => (inches ? (cm / 2.54).toFixed(1) : String(cm));
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => setInches((v) => !v)} aria-pressed={inches} className="text-sm underline underline-offset-4 hover:text-rust">
          {inches ? t('toggleUnitCm') : t('toggleUnit')}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="mb-3 text-start text-xs text-ink-muted">{inches ? t('tableCaptionInches') : t('tableCaption')}</caption>
          <thead>
            <tr className="bg-indigo text-cotton">
              {['size', 'uk', 'us', 'bust', 'waist', 'hips'].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 text-start font-medium">{t(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((r, i) => (
              <tr key={r.size} className={i % 2 ? 'bg-cotton-200/50' : 'bg-white/60'}>
                <th scope="row" className="px-4 py-3 text-start font-semibold text-indigo">{r.size}</th>
                <td className="px-4 py-3" dir="ltr">{r.uk}</td>
                <td className="px-4 py-3" dir="ltr">{r.us}</td>
                <td className="px-4 py-3" dir="ltr">{fmt(r.bust)}</td>
                <td className="px-4 py-3" dir="ltr">{fmt(r.waist)}</td>
                <td className="px-4 py-3" dir="ltr">{fmt(r.hips)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

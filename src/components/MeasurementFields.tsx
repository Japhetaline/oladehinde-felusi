'use client';

import { useTranslations } from 'next-intl';
import type { Measurements } from '@/context/StoreProvider';

export const MEASUREMENT_KEYS: (keyof Measurements)[] = ['bust', 'waist', 'hips', 'wrapperLength', 'topLength', 'shoulder', 'sleeve', 'height'];
export const REQUIRED_MEASUREMENTS: (keyof Measurements)[] = ['bust', 'waist', 'hips', 'height'];

export function MeasurementFields({ value, onChange, idPrefix, required = true }: { value: Measurements; onChange: (m: Measurements) => void; idPrefix: string; required?: boolean }) {
  const t = useTranslations('product');
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {MEASUREMENT_KEYS.map((k) => {
        const isReq = required && REQUIRED_MEASUREMENTS.includes(k);
        return (
          <div key={k}>
            <label htmlFor={`${idPrefix}-${k}`} className="mb-1 block text-xs font-medium">
              {t(`measurements.${k}`)} {isReq && <span aria-hidden className="text-rust">*</span>}
            </label>
            <div className="relative" dir="ltr">
              <input
                id={`${idPrefix}-${k}`}
                type="number"
                inputMode="decimal"
                min={0}
                max={250}
                step={0.5}
                required={isReq}
                value={value[k] ?? ''}
                onChange={(e) => onChange({ ...value, [k]: e.target.value })}
                className="field !py-2.5 pe-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-soft">{t('unitCm')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

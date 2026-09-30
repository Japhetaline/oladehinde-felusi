export const currencies = ['NGN', 'USD', 'GBP', 'AED', 'SAR'] as const;
export type Currency = (typeof currencies)[number];
export type PriceSet = Record<Currency, number>;

/** Default currency per locale: Naira for English (/en), US Dollar for French (/fr), Dirham for Arabic (/ar). */
export const defaultCurrencyFor = (locale: string): Currency => (locale === 'ar' ? 'AED' : locale === 'fr' ? 'USD' : 'NGN');

const symbols: Record<Currency, { en: string; fr: string; ar: string; before: boolean }> = {
  NGN: { en: '₦', fr: '₦', ar: '₦', before: true },
  USD: { en: '$', fr: '$', ar: '$', before: true },
  GBP: { en: '£', fr: '£', ar: '£', before: true },
  AED: { en: 'AED ', fr: 'AED', ar: ' د.إ', before: false },
  SAR: { en: 'SAR ', fr: 'SAR', ar: ' ر.س', before: false },
};

const group = (n: number, sep = ',', decimal = '.') => {
  const [int, dec] = n.toFixed(Number.isInteger(n) ? 0 : 2).split('.');
  const g = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return dec ? `${g}${decimal}${dec}` : g;
};

/** Narrow no-break space: the French thousands separator, also used before the currency symbol. */
const NNBSP = '\u202F';

/**
 * Deterministic formatter (identical on server and client → no hydration mismatch).
 * Western digits are used in Arabic too, which is common for Gulf e-commerce.
 * French puts the symbol after the amount: 285 000 ₦, 1 250,50 $.
 */
export function formatPrice(amount: number, currency: Currency, locale: string): string {
  const s = symbols[currency];
  if (locale === 'ar') {
    const num = group(amount);
    return s.before ? `${s.ar}${num}` : `${num}${s.ar}`;
  }
  if (locale === 'fr') {
    return `${group(amount, NNBSP, ',')}${NNBSP}${s.fr}`;
  }
  return `${s.en}${group(amount)}`;
}

export const currencyLabels: Record<Currency, { en: string; fr: string; ar: string }> = {
  NGN: { en: 'Nigerian Naira', fr: 'Naira nigérian', ar: 'نيرة نيجيرية' },
  USD: { en: 'US Dollar', fr: 'Dollar américain', ar: 'دولار أمريكي' },
  GBP: { en: 'British Pound', fr: 'Livre sterling', ar: 'جنيه إسترليني' },
  AED: { en: 'UAE Dirham', fr: 'Dirham des Émirats', ar: 'درهم إماراتي' },
  SAR: { en: 'Saudi Riyal', fr: 'Riyal saoudien', ar: 'ريال سعودي' },
};

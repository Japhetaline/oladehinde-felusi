/**
 * ─────────────────────────────────────────────────────────────
 *  ALL PRICES LIVE HERE — edit this one file to change pricing.
 * ─────────────────────────────────────────────────────────────
 * Prices are stored per currency (not converted on the fly) so the
 * brand can set psychologically "clean" prices in each market.
 * Garments = price per piece. Adire fabrics = price PER YARD.
 * All figures are invented placeholders for the prototype.
 */
import type { PriceSet } from '@/lib/currency';

export const productPrices: Record<string, PriceSet> = {
  // Iro & Buba sets
  'arewa-embellished-iro-buba': { NGN: 285000, USD: 240, GBP: 190, AED: 880, SAR: 900 },
  'oyin-ochre-iro-buba': { NGN: 195000, USD: 165, GBP: 130, AED: 605, SAR: 620 },
  'irawo-midnight-iro-buba': { NGN: 225000, USD: 190, GBP: 150, AED: 700, SAR: 715 },
  'asa-wrap-crop-set': { NGN: 175000, USD: 150, GBP: 118, AED: 550, SAR: 565 },
  'oba-mens-wrapper-set': { NGN: 185000, USD: 155, GBP: 122, AED: 570, SAR: 585 },
  // Tie-dye pieces
  'midnight-gold-tie-dye-wrap': { NGN: 85000, USD: 72, GBP: 57, AED: 265, SAR: 270 },
  'cocoa-halter-dress': { NGN: 145000, USD: 125, GBP: 98, AED: 460, SAR: 470 },
  'ember-halter-dress': { NGN: 140000, USD: 120, GBP: 95, AED: 440, SAR: 450 },
  'plum-column-gown': { NGN: 165000, USD: 140, GBP: 110, AED: 515, SAR: 525 },
  'lagoon-draped-gown': { NGN: 175000, USD: 148, GBP: 116, AED: 545, SAR: 555 },
  'heart-ombre-gown': { NGN: 155000, USD: 132, GBP: 104, AED: 485, SAR: 495 },
  // Adire fabrics — PER YARD
  'indigo-kaleidoscope-adire': { NGN: 16000, USD: 16, GBP: 13, AED: 60, SAR: 62 },
  'indigo-ripple-adire': { NGN: 15000, USD: 15, GBP: 12, AED: 56, SAR: 58 },
  'emerald-garden-adire': { NGN: 17500, USD: 17, GBP: 14, AED: 64, SAR: 66 },
  'ochre-chevron-adire': { NGN: 15500, USD: 15, GBP: 12, AED: 58, SAR: 60 },
  // Bespoke — deposit to begin a commission
  'bespoke-commission': { NGN: 100000, USD: 85, GBP: 68, AED: 315, SAR: 320 },
};

/** Shipping rates per method (flat, placeholder — confirm with the brand's logistics partner). */
export const shippingRates: Record<'lagos' | 'nigeria' | 'international', PriceSet> = {
  lagos: { NGN: 5000, USD: 5, GBP: 4, AED: 18, SAR: 19 },
  nigeria: { NGN: 12000, USD: 10, GBP: 8, AED: 37, SAR: 38 },
  international: { NGN: 85000, USD: 65, GBP: 52, AED: 240, SAR: 245 },
};

/** Workshop prices per person. */
export const workshopPrices: Record<string, PriceSet> = {
  'adire-eleko-intro': { NGN: 65000, USD: 55, GBP: 44, AED: 200, SAR: 205 },
  'tie-dye-weekend': { NGN: 95000, USD: 80, GBP: 63, AED: 295, SAR: 300 },
  'private-studio-session': { NGN: 250000, USD: 210, GBP: 165, AED: 770, SAR: 790 },
};

/** Budget ranges shown on the Bespoke form. */
export const bespokeBudgets: Record<string, PriceSet>[] = [
  { min: { NGN: 150000, USD: 125, GBP: 100, AED: 460, SAR: 470 }, max: { NGN: 250000, USD: 210, GBP: 165, AED: 770, SAR: 790 } },
  { min: { NGN: 250000, USD: 210, GBP: 165, AED: 770, SAR: 790 }, max: { NGN: 450000, USD: 380, GBP: 300, AED: 1400, SAR: 1430 } },
  { min: { NGN: 450000, USD: 380, GBP: 300, AED: 1400, SAR: 1430 }, max: { NGN: 800000, USD: 670, GBP: 530, AED: 2460, SAR: 2510 } },
];

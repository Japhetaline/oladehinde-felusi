/**
 * Catalogue access layer. Pages and components only talk to these functions,
 * so swapping the mock data for a real commerce API (Shopify Storefront,
 * Medusa, Paystack Commerce…) means changing this file only.
 */
import { products, type Product } from '@/data/products';
import { productPrices } from '@/data/prices';
import { collections, type CollectionSlug } from '@/data/collections';
import type { Currency, PriceSet } from './currency';

export const getAllProducts = (): Product[] => products;

export const getProduct = (slug: string): Product | undefined => products.find((p) => p.slug === slug);

export const getProductsByCollection = (slug: CollectionSlug): Product[] =>
  products.filter((p) => p.collection === slug);

export const getFeaturedProducts = (): Product[] => products.filter((p) => p.featured);

export const getPriceSet = (slug: string): PriceSet => {
  const p = productPrices[slug];
  if (!p) throw new Error(`Missing price for product "${slug}" in data/prices.ts`);
  return p;
};

export const getPrice = (slug: string, currency: Currency): number => getPriceSet(slug)[currency];

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const same = products.filter((p) => p.slug !== product.slug && p.collection === product.collection);
  const others = products.filter((p) => p.slug !== product.slug && p.collection !== product.collection && p.collection !== 'bespoke');
  return [...same, ...others].slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const col = collections.find((c) => c.slug === p.collection);
    const hay = [...Object.values(p.name), ...Object.values(p.tagline), ...Object.values(p.technique), p.fabric, ...Object.values(col?.name ?? {})]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
};

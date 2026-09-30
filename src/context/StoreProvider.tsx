'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { currencies, defaultCurrencyFor, type Currency } from '@/lib/currency';
import { getPrice, getProduct } from '@/lib/catalog';
import type { Size } from '@/data/products';

export type Measurements = {
  bust?: string;
  waist?: string;
  hips?: string;
  wrapperLength?: string;
  topLength?: string;
  shoulder?: string;
  sleeve?: string;
  height?: string;
};

export type CartItem = {
  id: string;
  slug: string;
  quantity: number; // pieces, or yards for fabric
  size: Size | 'custom' | null;
  measurements?: Measurements;
  notes?: string;
};

type StoreContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  hydrated: boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'of-cart-v1';
const CURRENCY_KEY = 'of-currency-v1';

const safeGet = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — cart still works in memory */
  }
};

const makeId = (i: Omit<CartItem, 'id'>) =>
  [i.slug, i.size ?? 'na', i.measurements ? JSON.stringify(i.measurements) : '', i.notes ?? ''].join('|');

export function StoreProvider({ locale, children }: { locale: string; children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrencyFor(locale));
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Load persisted state once on the client.
  useEffect(() => {
    const storedCurrency = safeGet(CURRENCY_KEY) as Currency | null;
    if (storedCurrency && (currencies as readonly string[]).includes(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
    const storedCart = safeGet(CART_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartItem[];
        setItems(parsed.filter((i) => getProduct(i.slug)));
      } catch {
        /* ignore corrupt cart */
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) safeSet(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    safeSet(CURRENCY_KEY, c);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const id = makeId(item);
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + item.quantity } : p));
      return [...prev, { ...item, id }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, Math.min(99, quantity)) } : p)));
  }, []);

  const removeItem = useCallback((id: string) => setItems((prev) => prev.filter((p) => p.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + (getProduct(i.slug)?.unit === 'yard' ? 1 : i.quantity), 0);
  const subtotal = items.reduce((sum, i) => sum + getPrice(i.slug, currency) * i.quantity, 0);

  const value = useMemo(
    () => ({
      currency, setCurrency, items, addItem, updateQuantity, removeItem, clearCart, count, subtotal, hydrated,
      cartOpen, setCartOpen, searchOpen, setSearchOpen,
    }),
    [currency, setCurrency, items, addItem, updateQuantity, removeItem, clearCart, count, subtotal, hydrated, cartOpen, searchOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}

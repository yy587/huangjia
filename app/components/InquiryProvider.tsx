"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/catalog";
import { sitePath } from "../lib/site-path";

type InquiryItem = {
  slug: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
};

type InquiryContextValue = {
  items: InquiryItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  count: number;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);
const STORAGE_KEY = "shie-inquiry-selection";

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // A blocked localStorage should not stop the catalogue from working.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Keep the in-memory selection when localStorage is unavailable.
    }
  }, [items, ready]);

  const value = useMemo<InquiryContextValue>(
    () => ({
      items,
      addItem: (product) =>
        setItems((current) => {
          const existing = current.find((item) => item.slug === product.slug);
          if (existing) {
            return current.map((item) =>
              item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [
            ...current,
            {
              slug: product.slug,
              name: product.name,
              image: product.images[0] || sitePath("/images/bathroom.jpg"),
              category: product.category,
              quantity: 1
            }
          ];
        }),
      removeItem: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
      setQuantity: (slug, quantity) =>
        setItems((current) =>
          current.map((item) =>
            item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        ),
      clear: () => setItems([]),
      count: items.reduce((total, item) => total + item.quantity, 0)
    }),
    [items]
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used inside InquiryProvider");
  return context;
}

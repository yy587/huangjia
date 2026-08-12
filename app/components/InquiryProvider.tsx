"use client";

import { Check, ShoppingBag, Undo2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "../lib/catalog";
import { primaryModel } from "../lib/catalog";
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
  addItem: (product: Product, quantity?: number) => void;
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
  const [feedback, setFeedback] = useState<{ slug: string; name: string; added: number; previous: number; total: number } | null>(null);
  const feedbackTimer = useRef<number | null>(null);

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

  useEffect(() => () => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
  }, []);

  const showFeedback = (product: Product, quantity: number, previous: number) => {
    setFeedback({ slug: product.slug, name: primaryModel(product.name), added: quantity, previous, total: previous + quantity });
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 4200);
  };

  const value = useMemo<InquiryContextValue>(
    () => ({
      items,
      addItem: (product, quantity = 1) => {
        const safeQuantity = Math.max(1, quantity);
        const previous = items.find((item) => item.slug === product.slug)?.quantity || 0;
        showFeedback(product, safeQuantity, previous);
        setItems((current) => {
          const existing = current.find((item) => item.slug === product.slug);
          if (existing) {
            return current.map((item) =>
              item.slug === product.slug ? { ...item, quantity: item.quantity + safeQuantity } : item
            );
          }
          return [
            ...current,
            {
              slug: product.slug,
              name: product.name,
              image: sitePath(product.images[0] || "/images/bathroom.jpg"),
              category: product.category,
              quantity: safeQuantity
            }
          ];
        });
      },
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

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <div className={`cart-feedback${feedback ? " is-visible" : ""}`} role="status" aria-live="polite">
        <span className="cart-feedback-icon"><Check size={17} /></span>
        <div>
          <strong>Added to quote list</strong>
          <small>{feedback ? `${feedback.name} · Current quantity ${feedback.total}` : ""}</small>
        </div>
        <button className="cart-feedback-undo" type="button" onClick={() => {
          if (!feedback) return;
          setItems((current) => feedback.previous === 0
            ? current.filter((item) => item.slug !== feedback.slug)
            : current.map((item) => item.slug === feedback.slug ? { ...item, quantity: feedback.previous } : item));
          setFeedback(null);
        }}><Undo2 size={14} /> Undo</button>
        <a href={sitePath("/cart")}><ShoppingBag size={15} /> View list</a>
        <button type="button" onClick={() => setFeedback(null)} aria-label="Dismiss notification"><X size={16} /></button>
      </div>
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used inside InquiryProvider");
  return context;
}

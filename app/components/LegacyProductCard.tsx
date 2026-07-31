"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "../lib/catalog";
import { primaryModel } from "../lib/catalog";
import { useInquiry } from "./InquiryProvider";

export function LegacyProductCard({ product }: { product: Product }) {
  const { addItem, items } = useInquiry();
  const added = items.some((item) => item.slug === product.slug);

  return (
    <article className="legacy-product-card">
      <a href={`/product/${product.slug}`} className="legacy-product-image">
        <img src={product.images[0]} alt={primaryModel(product.name)} loading="lazy" />
        <span>Quick View</span>
      </a>
      <small>{product.category.replace("BASIR", "BASIN")}</small>
      <h3><a href={`/product/${product.slug}`}>{primaryModel(product.name)}</a></h3>
      <div className="legacy-price">
        <span>MSRP: <s>$0.00</s></span>
        <span>Was: <s>$0.00</s></span>
        <strong>Now: $0.00</strong>
      </div>
      <button onClick={() => addItem(product)}>
        <ShoppingBag size={15} /> {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </article>
  );
}

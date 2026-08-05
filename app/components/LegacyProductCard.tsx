"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "../lib/catalog";
import { primaryModel } from "../lib/catalog";
import { sitePath } from "../lib/site-path";
import { useInquiry } from "./InquiryProvider";

export function LegacyProductCard({ product, image }: { product: Product; image?: string }) {
  const { addItem, items } = useInquiry();
  const added = items.some((item) => item.slug === product.slug);

  return (
    <article className="legacy-product-card">
      <a href={sitePath(`/product/${product.slug}`)} className="legacy-product-image">
        <img src={image || product.images[0]} alt={primaryModel(product.name)} />
        <span>Quick View</span>
      </a>
      <small>{product.category.replace("BASIR", "BASIN")}</small>
      <h3><a href={sitePath(`/product/${product.slug}`)}>{primaryModel(product.name)}</a></h3>
      <div className="legacy-price">
        <strong>Price on request</strong>
      </div>
      <button onClick={() => addItem(product)}>
        <ShoppingBag size={15} /> {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </article>
  );
}

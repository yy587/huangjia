"use client";

import { ArrowRight, Plus } from "lucide-react";
import type { Product } from "../lib/catalog";
import { primaryModel, productTitle } from "../lib/catalog";
import { useInquiry } from "./InquiryProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useInquiry();
  const selected = items.some((item) => item.slug === product.slug);

  return (
    <article className="product-card">
      <a className="product-card-image" href={`/product/${product.slug}`}>
        <img
          src={product.images[0] || "/images/bathroom.jpg"}
          alt={primaryModel(product.name)}
          loading="lazy"
        />
        <span>View details <ArrowRight size={14} /></span>
      </a>
      <div className="product-card-body">
        <div>
          <small>{product.category.replace("BASIR", "BASIN")}</small>
          <a href={`/product/${product.slug}`}>
            <h3>{primaryModel(product.name)}</h3>
          </a>
          <p title={productTitle(product.name)}>
            {product.summary || "Huangjia building material collection"}
          </p>
          <span className="product-card-price">Price on request</span>
        </div>
        <button onClick={() => addItem(product)} aria-label={`Add ${primaryModel(product.name)}`}>
          <Plus size={16} />
          {selected ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

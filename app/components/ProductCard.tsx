"use client";

import { Check, Plus } from "lucide-react";
import type { Product } from "../lib/catalog";
import { primaryModel, productTitle } from "../lib/catalog";
import { sitePath } from "../lib/site-path";
import { useInquiry } from "./InquiryProvider";
import { useLanguage } from "./LanguageProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useInquiry();
  const { translate } = useLanguage();
  const selected = items.some((item) => item.slug === product.slug);
  const isEditorialCover = product.slug === "sanitary-2026-08-future-egg-intelligent-toilet";

  return (
    <article className="product-card">
      <a className={`product-card-image${isEditorialCover ? " is-editorial-cover" : ""}`} href={sitePath(`/product/${product.slug}`)}>
        <img
          src={sitePath(product.images[0] || "/images/bathroom.jpg")}
          alt={primaryModel(product.name)}
          loading="lazy"
        />
      </a>
      <div className="product-card-body">
        <div>
          <small>{product.category.replace("BASIR", "BASIN")}</small>
          <a href={sitePath(`/product/${product.slug}`)}>
            <h3>{primaryModel(product.name)}</h3>
          </a>
          <p title={productTitle(product.name)}>
            {product.summary || "Huangjia building material collection"}
          </p>
        </div>
        <button className={selected ? "is-selected" : ""} onClick={() => addItem(product)} aria-label={`Add ${primaryModel(product.name)} to quote list`}>
          {selected ? <Check size={16} /> : <Plus size={16} />}
          {translate(selected ? "In Quote · Add More" : "Add to Quote")}
        </button>
      </div>
    </article>
  );
}

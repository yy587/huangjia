"use client";

import { Check, Plus } from "lucide-react";
import type { Product } from "../lib/catalog";
import { primaryModel } from "../lib/catalog";
import { sitePath } from "../lib/site-path";
import { useInquiry } from "./InquiryProvider";
import { useLanguage } from "./LanguageProvider";

export function LegacyProductCard({ product, image }: { product: Product; image?: string }) {
  const { addItem, items } = useInquiry();
  const { translate } = useLanguage();
  const added = items.some((item) => item.slug === product.slug);
  const isEditorialCover = product.slug === "sanitary-2026-08-future-egg-intelligent-toilet";

  return (
    <article className="legacy-product-card">
      <a href={sitePath(`/product/${product.slug}`)} className={`legacy-product-image${isEditorialCover ? " is-editorial-cover" : ""}`}>
        <img
          src={sitePath(image || product.images[0] || "/images/bathroom.jpg")}
          alt={primaryModel(product.name)}
        />
      </a>
      <small>{product.category.replace("BASIR", "BASIN")}</small>
      <h3><a href={sitePath(`/product/${product.slug}`)}>{primaryModel(product.name)}</a></h3>
      <button onClick={() => addItem(product)}>
        {added ? <Check size={15} /> : <Plus size={15} />} {translate(added ? "In Quote · Add More" : "Add to Quote")}
      </button>
    </article>
  );
}

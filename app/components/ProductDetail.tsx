"use client";

import { ArrowLeft, ArrowRight, Minus, Plus, Share2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { Product } from "../lib/catalog";
import { catalog, primaryModel, productTitle } from "../lib/catalog";
import { sitePath } from "../lib/site-path";
import { useInquiry } from "./InquiryProvider";
import { ProductCard } from "./ProductCard";
import { SiteShell } from "./SiteShell";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [galleryDragging, setGalleryDragging] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryDrag = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useInquiry();

  const related = useMemo(
    () =>
      catalog.products
        .filter((item) => item.slug !== product.slug && item.category === product.category)
        .slice(0, 3),
    [product]
  );

  const add = () => {
    for (let index = 0; index < quantity; index += 1) addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const descriptionLines = product.description
    ? product.description.split("\n")
    : [product.summary || "Contact us for full specifications and project pricing."];

  return (
    <SiteShell>
      <main className="catalog-main">
        <div className="detail-breadcrumbs">
          <a href={sitePath("/products")}><ArrowLeft size={14} /> Products</a>
          {product.categories.slice(1).map((category) => (
            <a key={category} href={sitePath(`/products?category=${encodeURIComponent(category)}`)}>
              / {category.replace("BASIR", "BASIN")}
            </a>
          ))}
        </div>
        <section className="product-detail">
          <div className="product-gallery">
            <div className={`gallery-main${galleryDragging ? " is-dragging" : ""}`}>
              <div
                className="gallery-drag-track"
                ref={galleryRef}
                onScroll={(event) => {
                  const track = event.currentTarget;
                  if (!track.clientWidth) return;
                  setActiveImage(Math.min(product.images.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth))));
                }}
                onPointerDown={(event) => {
                  if (event.button !== 0) return;
                  galleryDrag.current = {
                    pointerId: event.pointerId,
                    x: event.clientX,
                    scrollLeft: event.currentTarget.scrollLeft
                  };
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setGalleryDragging(true);
                }}
                onPointerMove={(event) => {
                  const drag = galleryDrag.current;
                  if (!drag || drag.pointerId !== event.pointerId) return;
                  event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
                }}
                onPointerUp={(event) => {
                  if (!galleryDrag.current || galleryDrag.current.pointerId !== event.pointerId) return;
                  galleryDrag.current = null;
                  setGalleryDragging(false);
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }}
                onPointerCancel={() => {
                  galleryDrag.current = null;
                  setGalleryDragging(false);
                }}
              >
                {(product.images.length ? product.images : ["/images/bathroom.jpg"]).map((image, index) => (
                  <div className="gallery-drag-slide" key={`${image}-${index}`}>
                    <img
                      src={sitePath(image)}
                      alt={`${primaryModel(product.name)} view ${index + 1}`}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
              <span>{String(activeImage + 1).padStart(2, "0")} / {String(product.images.length || 1).padStart(2, "0")}</span>
            </div>
            {product.images.length > 1 && <small className="gallery-drag-hint">Drag to explore</small>}
          </div>
          <div className="product-detail-info">
            <span className="micro-label">{product.category.replace("BASIR", "BASIN")}</span>
            <h1>{primaryModel(product.name)}</h1>
            <p className="model-list">{productTitle(product.name)}</p>
            <div className="detail-rule" />
            <p className="product-summary">
              {product.summary || "Huangjia coordinated building material collection."}
            </p>
            <div className="selection-controls">
              <div>
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button>
              </div>
              <button className={added ? "add-selection is-added" : "add-selection"} onClick={add}>
                {added ? "Added to Cart" : "Add to Cart"}
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="detail-meta">
              <span>Product group</span>
              <b>{product.slug.replace("display-", "HJ / ")}</b>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                <Share2 size={15} /> Share
              </button>
            </div>
          </div>
        </section>

        <section className="specification-section">
          <div>
            <span className="micro-label">Product information</span>
            <h2>Specifications<br />&amp; model details</h2>
          </div>
          <div className="specification-copy">
            {descriptionLines.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="related-products">
            <div className="section-heading-row">
              <div>
                <span className="micro-label">Continue exploring</span>
                <h2>Related products</h2>
              </div>
          <a href={sitePath(`/products?category=${encodeURIComponent(product.category)}`)}>
                View collection <ArrowRight size={16} />
              </a>
            </div>
            <div className="product-grid">
              {related.map((item) => <ProductCard key={item.slug} product={item} />)}
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}

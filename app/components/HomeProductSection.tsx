"use client";

import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "../lib/catalog";
import { sitePath } from "../lib/site-path";
import { LegacyProductCard } from "./LegacyProductCard";

export function HomeProductSection({
  title,
  subtitle,
  products,
  images
}: {
  title: string;
  subtitle: string;
  products: Product[];
  images: readonly string[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 0);
    setPosition(maxScroll ? Math.min(rail.scrollLeft / maxScroll, 1) : 0);
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [updatePosition]);

  return (
    <section className="original-product-section home-product-showcase">
      <div className="home-product-heading">
        <div className="original-section-heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="home-product-actions">
          <a href={sitePath("/products")}>View all <ArrowRight size={15} /></a>
        </div>
      </div>
      <div className="home-product-rail-wrap">
        <div
          className={`legacy-product-grid home-product-rail${dragging ? " is-dragging" : ""}`}
          ref={railRef}
          onScroll={updatePosition}
          onPointerDown={(event) => {
            if (event.button !== 0 || (event.target as HTMLElement).closest("button,input,select,textarea")) return;
            dragState.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              scrollLeft: event.currentTarget.scrollLeft,
              moved: false
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }}
          onPointerMove={(event) => {
            const drag = dragState.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            const distance = event.clientX - drag.x;
            if (Math.abs(distance) > 4) {
              drag.moved = true;
              suppressClick.current = true;
            }
            event.currentTarget.scrollLeft = drag.scrollLeft - distance;
          }}
          onPointerUp={(event) => {
            if (!dragState.current || dragState.current.pointerId !== event.pointerId) return;
            dragState.current = null;
            setDragging(false);
            event.currentTarget.releasePointerCapture(event.pointerId);
            window.setTimeout(() => { suppressClick.current = false; }, 0);
          }}
          onPointerCancel={() => {
            dragState.current = null;
            setDragging(false);
          }}
          onClickCapture={(event) => {
            if (!suppressClick.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const rail = railRef.current;
            if (!rail) return;
            rail.scrollBy({
              left: (event.key === "ArrowRight" ? 1 : -1) * rail.clientWidth * .78,
              behavior: "smooth"
            });
          }}
          tabIndex={0}
          aria-label={`${title} product gallery`}
        >
          {products.map((product, index) => (
            <LegacyProductCard
              key={`${title}-${product.slug}`}
              product={product}
              image={images[index]}
            />
          ))}
        </div>
      </div>
      <div className="home-product-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(position, 0.08)})` }} />
      </div>
      <small className="home-product-hint">Drag to explore</small>
    </section>
  );
}

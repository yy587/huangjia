"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "../lib/catalog";
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
  images: string[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [canMoveBack, setCanMoveBack] = useState(false);
  const [canMoveForward, setCanMoveForward] = useState(true);

  const updatePosition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 0);
    setPosition(maxScroll ? Math.min(rail.scrollLeft / maxScroll, 1) : 0);
    setCanMoveBack(rail.scrollLeft > 24);
    setCanMoveForward(rail.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [updatePosition]);

  const move = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section className="original-product-section home-product-showcase">
      <div className="home-product-heading">
        <div className="original-section-heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="home-product-actions">
          <a href="/products">View all <ArrowRight size={15} /></a>
          <button onClick={() => move(-1)} disabled={!canMoveBack} aria-label="Previous products">
            <ArrowLeft size={18} />
          </button>
          <button onClick={() => move(1)} disabled={!canMoveForward} aria-label="Next products">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        className="legacy-product-grid home-product-rail"
        ref={railRef}
        onScroll={updatePosition}
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
      <div className="home-product-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(position, 0.08)})` }} />
      </div>
      <small className="home-product-hint">Drag or use arrows to explore</small>
    </section>
  );
}

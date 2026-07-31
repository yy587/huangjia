"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero-living-clean.png",
    title: "LIVING ROOM SERIES",
    subtitle: "Space aesthetics · textured lifestyle"
  },
  {
    image: "/images/dining.jpg",
    title: "CERAMIC TILE SERIES",
    subtitle: "Surfaces for residential and commercial spaces"
  },
  {
    image: "/images/bathroom-green.jpg",
    title: "BATHROOM SERIES",
    subtitle: "Sanitaryware, fittings and coordinated finishes"
  },
  {
    image: "/images/mosaic-room.jpg",
    title: "MOSAIC SERIES",
    subtitle: "Stone, ceramic and glass mosaic collections"
  }
];

export function HomeCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5500
    );
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  const slide = slides[active];
  return (
    <section className="original-home-carousel" aria-label="Huangjia product collections">
      <img key={slide.image} src={slide.image} alt={slide.title} />
      <span className="original-carousel-shade" />
      <div className="original-carousel-copy">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </div>
      <button className="carousel-arrow is-left" onClick={() => move(-1)} aria-label="Previous slide">
        <ChevronLeft size={31} />
      </button>
      <button className="carousel-arrow is-right" onClick={() => move(1)} aria-label="Next slide">
        <ChevronRight size={31} />
      </button>
      <div className="carousel-dots">
        {slides.map((item, index) => (
          <button
            key={item.title}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

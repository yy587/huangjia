"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { originalMedia } from "../lib/original-media";

const slides = [
  {
    image: originalMedia.heroes[0],
    title: "BATHROOM"
  },
  {
    image: originalMedia.heroes[1],
    title: "LIVING ROOM"
  },
  {
    image: originalMedia.heroes[2],
    title: "DINING ROOM"
  },
  {
    image: originalMedia.heroes[3],
    title: "KITCHEN"
  }
];

export function HomeCarousel() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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
    <section
      className={`original-home-carousel${active === 0 ? " is-bathroom-active" : active === 1 ? " is-living-active" : active === 2 ? " is-dining-active" : " is-kitchen-active"}`}
      aria-label="Huangjia product collections"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
        setTouchStart(null);
      }}
    >
      <img
        key={slide.image}
        className={active === 0 ? "is-bathroom-slide" : active === 1 ? "is-living-slide" : active === 2 ? "is-dining-slide" : "is-kitchen-slide"}
        src={slide.image}
        alt={slide.title}
      />
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
      <div className="carousel-status" aria-hidden="true">
        <b>{String(active + 1).padStart(2, "0")}</b>
        <span />
        <small>{String(slides.length).padStart(2, "0")}</small>
      </div>
    </section>
  );
}

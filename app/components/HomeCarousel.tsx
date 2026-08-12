"use client";

import { useEffect, useRef, useState } from "react";
import { originalMedia } from "../lib/original-media";

const slides = [
  {
    image: originalMedia.heroes[0],
    title: "BATHROOM",
    subtitle: "Spatial Aesthetics · Textured Living"
  },
  {
    image: originalMedia.heroes[1],
    title: "LIVING ROOM SERIES",
    subtitle: "Space aesthetics · Textured lifestyle"
  },
  {
    image: originalMedia.heroes[2],
    title: "DINING ROOM",
    subtitle: "Space aesthetics · Textured lifestyle"
  },
  {
    image: originalMedia.heroes[3],
    title: "KITCHEN ROOM SERIES",
    subtitle: "Slow down · Feel your space"
  }
];

export function HomeCarousel() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const dragStart = useRef<{ pointerId: number; x: number } | null>(null);

  useEffect(() => {
    if (dragging || paused || !pageVisible) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5500
    );
    return () => window.clearInterval(timer);
  }, [dragging, paused, pageVisible]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  const slide = slides[active];
  return (
    <section
      className={`original-home-carousel${dragging ? " is-dragging" : ""}${active === 0 ? " is-bathroom-active" : active === 1 ? " is-living-active" : active === 2 ? " is-dining-active" : " is-kitchen-active"}`}
      aria-label="Huangjia product collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragStart.current = { pointerId: event.pointerId, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
      }}
      onPointerUp={(event) => {
        if (!dragStart.current || dragStart.current.pointerId !== event.pointerId) return;
        const distance = event.clientX - dragStart.current.x;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
        dragStart.current = null;
        setDragging(false);
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        dragStart.current = null;
        setDragging(false);
      }}
    >
      <img
        key={slide.image}
        className={active === 0 ? "is-bathroom-slide" : active === 1 ? "is-living-slide" : active === 2 ? "is-dining-slide" : "is-kitchen-slide"}
        src={slide.image}
        alt={slide.title}
        draggable={false}
      />
      <div className="carousel-image-copy">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </div>
      <small className="carousel-drag-hint">Drag to switch</small>
      <div className="carousel-status" aria-hidden="true">
        <b>{String(active + 1).padStart(2, "0")}</b>
        <span />
        <small>{String(slides.length).padStart(2, "0")}</small>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLightbox } from "@/lib/lightbox-context";

const galleryItems = [
  {
    image: "/images/promo-cheese-lover.jpg",
    alt: "Cheese Lover pizza — say yes to extra cheese",
    width: 1400,
    height: 1751,
  },
  {
    image: "/images/promo-spin-rolls.jpg",
    alt: "Spin Rolls — ready to roll into deliciousness",
    width: 1400,
    height: 1751,
  },
  { image: "/images/promo-loaded-fries.jpg", alt: "Loaded Fries — snack time essential", width: 1400, height: 1751 },
  {
    image: "/images/promo-oven-fresh.jpg",
    alt: "Oven fresh pizza crafted for true pizza lovers",
    width: 1400,
    height: 1751,
  },
  {
    image: "/images/promo-satisfaction-layer.jpg",
    alt: "Satisfaction in every layer — spin roll",
    width: 1400,
    height: 1750,
  },
  { image: "/images/promo-pizza-perfection.jpg", alt: "Pizza perfection in every bite", width: 1400, height: 1846 },
  { image: "/images/promo-one-bite.jpg", alt: "One bite, zero regrets — roll and fries", width: 1400, height: 1869 },
];

const AUTOPLAY_MS = 5000;

export default function Specials() {
  const { open } = useLightbox();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + galleryItems.length) % galleryItems.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % galleryItems.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  return (
    <section className="section" id="specials">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Specials</span>
          <h2>Straight From Our Feed</h2>
          <p>A taste of what&apos;s baking, rolling and frying at Pizzasta right now.</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div
              className="gallery-item js-lightbox-trigger"
              key={item.image}
              onClick={() => open(item.image, item.alt)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 700px) 45vw, (max-width: 980px) 45vw, 260px"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <div className="specials-carousel-wrap">
          <div className="hero-carousel specials-carousel">
            <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {galleryItems.map((item) => (
                <div
                  key={item.image}
                  className="hero-slide js-lightbox-trigger"
                  onClick={() => open(item.image, item.alt)}
                >
                  <Image src={item.image} alt={item.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="hero-arrow hero-arrow-prev"
              onClick={() => goTo(index - 1)}
              aria-label="Previous special"
            >
              ‹
            </button>
            <button
              type="button"
              className="hero-arrow hero-arrow-next"
              onClick={() => goTo(index + 1)}
              aria-label="Next special"
            >
              ›
            </button>

            <div className="hero-dots">
              {galleryItems.map((item, i) => (
                <button
                  key={item.image}
                  type="button"
                  className={`hero-dot${i === index ? " active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to special ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

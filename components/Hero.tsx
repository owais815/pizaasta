"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";

type Slide = {
  id: number;
  image: string;
  alt: string;
  msg: string;
};

function orderMsg(dealNumber: number, name: string, price: string): string {
  return `🌐 PIZZASTA - Website Order\n\nHi,\nI would like to order:\n\n🍕 Deal ${dealNumber} – ${name} (${price}).\n\nPlease confirm my order.`;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero-deal-1.jpg",
    alt: "Deal 1 — The Perfect Combo: 1 Large Pizza, 1 Special Pasta, 1.5L Drink for Rs 2100",
    msg: orderMsg(1, "The Perfect Combo", "Rs 2,100"),
  },
  {
    id: 2,
    image: "/images/hero-deal-2.jpg",
    alt: "Deal 2 — All-Star Feast: 1 Medium Pizza, 1 Special Roll, 1L Drink for Rs 1799",
    msg: orderMsg(2, "All-Star Feast", "Rs 1,799"),
  },
  {
    id: 3,
    image: "/images/hero-deal-3.jpg",
    alt: "Deal 3 — Double the Flavor: 2 Large Pizzas, 1.5L Drink for Rs 2799",
    msg: orderMsg(3, "Double the Flavor", "Rs 2,799"),
  },
  {
    id: 4,
    image: "/images/hero-deal-4.jpg",
    alt: "Deal 4 — The Ultimate Feast: 1 XL Pizza, 1 Special Pasta, 1 Spin Roll, 1.5L Drink for Rs 3299",
    msg: orderMsg(4, "The Ultimate Feast", "Rs 3,299"),
  },
  {
    id: 5,
    image: "/images/hero-deal-5.jpg",
    alt: "Deal 5 — Double the Crown Crust: 2 Large Crown Crust Pizzas, 1.5L Drink for Rs 2899",
    msg: orderMsg(5, "Double the Crown Crust", "Rs 2,899"),
  },
];

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const { branch } = useBranch();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  return (
    <section className="hero" id="home">
      <div className="hero-carousel">
        <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide) => (
            <a
              key={slide.id}
              href={waHref(branch, slide.msg)}
              target="_blank"
              rel="noopener"
              className="hero-slide"
              aria-label={`Order ${slide.alt}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={slide.id === 1}
                style={{ objectFit: "cover" }}
              />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="hero-arrow hero-arrow-prev"
          onClick={() => goTo(index - 1)}
          aria-label="Previous deal"
        >
          ‹
        </button>
        <button
          type="button"
          className="hero-arrow hero-arrow-next"
          onClick={() => goTo(index + 1)}
          aria-label="Next deal"
        >
          ›
        </button>

        <div className="hero-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-dot${i === index ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to deal ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

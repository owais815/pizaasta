"use client";

import { useLightbox } from "@/lib/lightbox-context";

const galleryItems = [
  { image: "/images/promo-cheese-lover.jpg", alt: "Cheese Lover pizza — say yes to extra cheese" },
  { image: "/images/promo-spin-rolls.jpg", alt: "Spin Rolls — ready to roll into deliciousness" },
  { image: "/images/promo-loaded-fries.jpg", alt: "Loaded Fries — snack time essential" },
  { image: "/images/promo-oven-fresh.jpg", alt: "Oven fresh pizza crafted for true pizza lovers" },
  { image: "/images/promo-satisfaction-layer.jpg", alt: "Satisfaction in every layer — spin roll" },
  { image: "/images/promo-pizza-perfection.jpg", alt: "Pizza perfection in every bite" },
  { image: "/images/promo-one-bite.jpg", alt: "One bite, zero regrets — roll and fries" },
];

export default function Specials() {
  const { open } = useLightbox();

  return (
    <section className="section" id="specials">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Specials</span>
          <h2>Straight From Our Feed</h2>
          <p>A taste of what&apos;s baking, rolling and frying at Pizaasta right now.</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div
              className="gallery-item js-lightbox-trigger"
              key={item.image}
              onClick={() => open(item.image, item.alt)}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLightbox } from "@/lib/lightbox-context";
import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";

type Deal = {
  id: number;
  image: string;
  alt: string;
  name: string;
  price: string;
  msg: string;
};

function orderMsg(dealNumber: number, name: string, price: string): string {
  return `PIZZASTA - Website Order\n\nHi,\nI would like to order:\n\nDeal ${dealNumber} – ${name} (${price}).\n\nPlease confirm my order.`;
}

const deals: Deal[] = [
  {
    id: 1,
    image: "/images/deal-1.jpg",
    alt: "Deal 1 — The Perfect Combo: 1 Large Pizza, 1 Special Pasta, 1.5L Drink for Rs 2100",
    name: "The Perfect Combo",
    price: "Rs 2100",
    msg: orderMsg(1, "The Perfect Combo", "Rs 2,100"),
  },
  {
    id: 2,
    image: "/images/deal-2.jpg",
    alt: "Deal 2 — All-Star Feast: 1 Medium Pizza, 1 Special Roll, 1L Drink for Rs 1799",
    name: "All-Star Feast",
    price: "Rs 1799",
    msg: orderMsg(2, "All-Star Feast", "Rs 1,799"),
  },
  {
    id: 3,
    image: "/images/deal-3.jpg",
    alt: "Deal 3 — Double the Flavor: 2 Large Pizzas, 1.5L Drink for Rs 2799",
    name: "Double the Flavor",
    price: "Rs 2799",
    msg: orderMsg(3, "Double the Flavor", "Rs 2,799"),
  },
  {
    id: 4,
    image: "/images/deal-4.jpg",
    alt: "Deal 4 — The Ultimate Feast: 1 XL Pizza, 1 Special Pasta, 1 Spin Roll, 1.5L Drink for Rs 3299",
    name: "The Ultimate Feast",
    price: "Rs 3299",
    msg: orderMsg(4, "The Ultimate Feast", "Rs 3,299"),
  },
];

export default function Deals() {
  const { open } = useLightbox();
  const { branch } = useBranch();

  return (
    <section className="section" id="deals">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Deals</span>
          <h2>More Bite, Better Price</h2>
          <p>Combo deals built for sharing (or not — we don&apos;t judge).</p>
        </div>

        <div className="deals-grid">
          {deals.map((deal) => (
            <div className="deal-item" key={deal.id}>
              <div className="deal-item-img js-lightbox-trigger" onClick={() => open(deal.image, deal.alt)}>
                <Image
                  src={deal.image}
                  alt={deal.alt}
                  width={1032}
                  height={1350}
                  sizes="(max-width: 600px) 45vw, (max-width: 980px) 30vw, 260px"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <a href={waHref(branch, deal.msg)} target="_blank" rel="noopener" className="btn btn-primary btn-block">
                <svg className="ico-whatsapp" aria-hidden="true">
                  <use href="#icon-whatsapp" />
                </svg>{" "}
                Order Deal {deal.id}
              </a>
            </div>
          ))}
        </div>

        <div className="deal-featured">
          <div
            className="deal-featured-img js-lightbox-trigger"
            onClick={() =>
              open(
                "/images/deal-5.jpg",
                "Deal 5 — Double the Crown Crust: 2 Large Crown Crust Pizzas, 1.5L Drink for Rs 2899",
              )
            }
          >
            <Image
              src="/images/deal-5.jpg"
              alt="Deal 5 — Double the Crown Crust: 2 Large Crown Crust Pizzas, 1.5L Drink for Rs 2899"
              width={1032}
              height={1450}
              sizes="(max-width: 820px) 100vw, 45vw"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="deal-featured-text">
            <span className="section-tag">Featured — Deal 5</span>
            <h3>Double the Crown Crust</h3>
            <p>
              Two large stuffed-crust Crown Crust pizzas plus a 1.5L drink. More cheese, more flavour, more happiness —
              for Rs 2899.
            </p>
            <a
              href={waHref(branch, orderMsg(5, "Double the Crown Crust", "Rs 2,899"))}
              target="_blank"
              rel="noopener"
              className="btn btn-secondary"
            >
              <svg className="ico-whatsapp" aria-hidden="true">
                <use href="#icon-whatsapp" />
              </svg>{" "}
              Order Deal 5
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

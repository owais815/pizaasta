"use client";

import Image from "next/image";
import { useLightbox } from "@/lib/lightbox-context";
import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";
import { midnightDeals } from "@/lib/midnight-deals";

export default function MidnightDeals() {
  const { open } = useLightbox();
  const { branch } = useBranch();

  return (
    <section className="section section-midnight" id="midnight-deals">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Midnight Deals</span>
          <h2>Late Night Cravings? We&apos;ve Got You</h2>
          <p>Just for the night owls — available Monday–Thursday, 12:00 AM – 3:00 AM.</p>
        </div>

        <div className="deals-grid">
          {midnightDeals.map((deal) => (
            <div className="deal-item" key={deal.id}>
              <div
                className="deal-item-img midnight-item-img js-lightbox-trigger"
                onClick={() => open(deal.cardImage, deal.cardAlt)}
              >
                <Image
                  src={deal.cardImage}
                  alt={deal.cardAlt}
                  width={1000}
                  height={1500}
                  sizes="(max-width: 600px) 45vw, (max-width: 980px) 30vw, 260px"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <a href={waHref(branch, deal.msg)} target="_blank" rel="noopener" className="btn btn-primary btn-block">
                <svg className="ico-whatsapp" aria-hidden="true">
                  <use href="#icon-whatsapp" />
                </svg>{" "}
                Order {deal.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

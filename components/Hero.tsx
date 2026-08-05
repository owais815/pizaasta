"use client";

import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";

export default function Hero() {
  const { branch } = useBranch();

  function handleChangeBranch(e: React.MouseEvent<HTMLAnchorElement>) {
    const select = document.getElementById("branchSelect");
    if (select && select.offsetParent !== null) {
      e.preventDefault();
      select.focus();
      select.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="hero-eyebrow">Fresh out of the oven, daily</span>
        <h1>Every Bite <em>Melts</em> Right.</h1>
        <p>
          Hand-stretched dough, loaded with cheese, and baked to order. Pizaasta brings
          wood-fired pizza, spin rolls, cheesy pasta &amp; loaded fries straight to Bahria
          Town, Rawalpindi.
        </p>
        <p className="hero-branch-indicator">
          📍 Ordering from <strong>{branch.label}</strong> ·{" "}
          <a href="#locations" id="heroChangeBranch" onClick={handleChangeBranch}>change</a>
        </p>
        <div className="hero-ctas">
          <a href={waHref(branch)} target="_blank" rel="noopener" className="btn btn-primary">
            <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg> Order Now
          </a>
          <a href="#menu" className="btn btn-outline" style={{ color: "#fff" }}>View Menu</a>
        </div>
      </div>
      <a href="#deals" className="hero-scroll">Scroll</a>
    </section>
  );
}

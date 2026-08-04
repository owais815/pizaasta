export default function Hero() {
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
        <div className="hero-ctas">
          <a href="https://wa.me/923375415777" target="_blank" rel="noopener" className="btn btn-primary">
            <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg> Order — Phase 4
          </a>
          <a href="https://wa.me/923075415777" target="_blank" rel="noopener" className="btn btn-secondary">
            <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg> Order — Phase 8
          </a>
          <a href="#menu" className="btn btn-outline" style={{ color: "#fff" }}>View Menu</a>
        </div>
      </div>
      <a href="#deals" className="hero-scroll">Scroll</a>
    </section>
  );
}

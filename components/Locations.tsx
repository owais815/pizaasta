export default function Locations() {
  return (
    <section className="section section-alt" id="locations">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Locations</span>
          <h2>Find Your Nearest Pizaasta</h2>
          <p>Two branches serving Bahria Town, Rawalpindi. Call, WhatsApp, or walk in.</p>
        </div>

        <div className="locations-grid">
          <div className="location-card">
            <span className="location-tag">Branch — Phase 4</span>
            <h3>Civic Centre</h3>
            <p>Plaza #178, Civic Centre, Near Bank Islami, Phase 4, Bahria Town, Rawalpindi</p>
            <div className="location-actions">
              <a href="tel:+923375415777" className="btn btn-outline btn-sm">📞 0337-5415777</a>
              <a href="https://wa.me/923375415777" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg> WhatsApp
              </a>
            </div>
          </div>

          <div className="location-card">
            <span className="location-tag">Branch — Phase 8</span>
            <h3>Hub Commercial</h3>
            <p>Plaza 113, Hub Commercial, Near Rainbow Mart, Phase 8, Bahria Town, Rawalpindi</p>
            <div className="location-actions">
              <a href="tel:+923075415777" className="btn btn-outline btn-sm">📞 0307-5415777</a>
              <a href="https://wa.me/923075415777" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

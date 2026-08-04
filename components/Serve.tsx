export default function Serve() {
  return (
    <section className="section" id="serve">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">What we serve</span>
          <h2>Crafted for true pizza lovers</h2>
          <p>
            Everything at Pizaasta is made fresh to order — from the dough to the dip.
            Here&apos;s what keeps regulars coming back.
          </p>
        </div>

        <div className="serve-grid">
          <div className="serve-card">
            <img src="/images/menu-grid.jpg" alt="Pizaasta pizza" style={{ objectPosition: "12% 25%" }} />
            <div className="serve-text">
              <h3>Pizza</h3>
              <p>Wood-fired perfection topped with mozzarella, herbs and a burst of flavor in every slice.</p>
            </div>
          </div>
          <div className="serve-card">
            <img src="/images/menu-grid.jpg" alt="Pizaasta spin roll" style={{ objectPosition: "60% 55%" }} />
            <div className="serve-text">
              <h3>Spin Roll</h3>
              <p>A delicate roll stuffed with juicy chicken, cheese and fresh veggies — ready to roll into deliciousness.</p>
            </div>
          </div>
          <div className="serve-card">
            <img src="/images/menu-grid.jpg" alt="Pizaasta pasta" style={{ objectPosition: "15% 88%" }} />
            <div className="serve-text">
              <h3>Pasta</h3>
              <p>Creamy sauce with tender chicken and vegetables, served with your choice of sides.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

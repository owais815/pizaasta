export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#home" className="logo-lockup">
              <span className="logo-badge">
                <img src="/images/logo.png" alt="Pizaasta logo" width={52} height={52} />
              </span>
              <span className="logo-word">
                PIZAASTA
                <span>Every Bite Melts Right</span>
              </span>
            </a>
            <p className="footer-tagline">
              Wood-fired pizza, spin rolls, cheesy pasta &amp; loaded fries — freshly made
              across Bahria Town, Rawalpindi.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#deals">Deals</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#specials">Specials</a></li>
                <li><a href="#locations">Locations</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Phase 4</h4>
              <ul>
                <li><a href="tel:+923375415777">0337-5415777</a></li>
                <li><a href="https://wa.me/923375415777" target="_blank" rel="noopener">WhatsApp Order</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Phase 8</h4>
              <ul>
                <li><a href="tel:+923075415777">0307-5415777</a></li>
                <li><a href="https://wa.me/923075415777" target="_blank" rel="noopener">WhatsApp Order</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; <span>{year}</span> Pizaasta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

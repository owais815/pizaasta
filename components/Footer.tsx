import Image from "next/image";
import FooterOrder from "./FooterOrder";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#home" className="logo-lockup">
              <span className="logo-badge">
                <Image src="/images/logo.png" alt="Pizzasta logo" width={52} height={52} />
              </span>
              <span className="logo-word">
                PIZZASTA
                <span>Every Bite Melts Right</span>
              </span>
            </a>
            <p className="footer-tagline">
              Wood-fired pizza, spin rolls, cheesy pasta &amp; loaded fries — freshly made across Bahria Town,
              Rawalpindi.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#deals">Deals</a>
                </li>
                <li>
                  <a href="#menu">Menu</a>
                </li>
                <li>
                  <a href="#specials">Specials</a>
                </li>
                <li>
                  <a href="#locations">Locations</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Order Now</h4>
              <ul>
                <FooterOrder />
              </ul>
            </div>
            <div className="footer-col">
              <h4>Locations</h4>
              <ul>
                <li>
                  <a href="#locations">Phase 4 — Civic Centre</a>
                </li>
                <li>
                  <a href="#locations">Phase 8 — Hub Commercial</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; <span>{year}</span> Pizzasta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

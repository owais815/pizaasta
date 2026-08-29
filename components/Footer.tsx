import Image from "next/image";

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
              Pizza, Cheezy Pasta, Spin Rolls, and Loaded Fries are freshly made across Rawalpindi / Islamabad.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/people/Pizzasta/61584004487258/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pizzasta on Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#icon-facebook" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pizzastapk/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pizzasta on Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#icon-instagram" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@pizzastapk?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pizzasta on TikTok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#icon-tiktok" />
                </svg>
              </a>
            </div>
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

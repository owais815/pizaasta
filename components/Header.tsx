"use client";

import { useState } from "react";
import Image from "next/image";
import BranchSwitcher from "./BranchSwitcher";
import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { branch } = useBranch();

  return (
    <header className={`header${navOpen ? " nav-open" : ""}`} id="header">
      <div className="container">
        <a href="#home" className="logo-lockup">
          <span className="logo-badge">
            <Image src="/images/logo.png" alt="Pizaasta logo" width={52} height={52} priority />
          </span>
          <span className="logo-word">
            PIZAASTA
            <span>Every Bite Melts Right</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home" onClick={() => setNavOpen(false)}>Home</a>
          <a href="#deals" onClick={() => setNavOpen(false)}>Deals</a>
          <a href="#menu" onClick={() => setNavOpen(false)}>Menu</a>
          <a href="#specials" onClick={() => setNavOpen(false)}>Specials</a>
          <a href="#locations" onClick={() => setNavOpen(false)}>Locations</a>
        </nav>

        <div className="header-actions">
          <BranchSwitcher />
          <a
            href={waHref(branch)}
            target="_blank"
            rel="noopener"
            className="btn btn-primary btn-sm"
          >
            <svg className="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp" /></svg>
            WhatsApp Order
          </a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

# Branch Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's per-deal, per-section dual-branch phone links with one header-driven branch selector (geolocation auto-detect + manual override) that every order/contact link on the page reads from.

**Architecture:** A single `BRANCHES` config object in `js/script.js` is the source of truth for both branches' phone numbers and coordinates. One function, `applyBranch(id)`, is the only code path allowed to write a branch's phone number into the DOM — it updates the header `<select>`, every `.js-order-link` (WhatsApp deep links), every `[data-branch-tel]` element (tel: links), and every `[data-branch-label]` element (branch name display). Selection persists in `localStorage["pizaasta-branch"]`, mirroring the existing `pizaasta-theme` pattern already in this file. On first visit only, browser geolocation + haversine distance picks the nearest branch; on every later visit the saved choice loads instantly with no geolocation call.

**Tech Stack:** Plain HTML/CSS/vanilla JS (ES5-style, no build step, no framework, no test runner) — matches the existing `js/script.js` and `css/style.css`.

## Global Constraints

- Branch data (phone numbers, tel numbers, display numbers, coordinates, labels) lives in exactly one place: the `BRANCHES` object in `js/script.js`. No other file or code path may hardcode a branch phone number after this plan is complete.
- The only function permitted to write a branch's phone number, tel link, or label into the DOM is `applyBranch(id)`.
- Persist selection under `localStorage["pizaasta-branch"]` (values: `"phase4"` or `"phase8"`), mirroring the existing `pizaasta-theme` key already used in `js/script.js`.
- Geolocation only fires automatically on a page load where `localStorage["pizaasta-branch"]` is absent or holds an unrecognized value. Returning visitors with a saved branch never trigger a geolocation prompt automatically.
- No blocking modal and no repeated auto-prompting — permission denial, timeout, or an unsupported `navigator.geolocation` all fall back silently to `DEFAULT_BRANCH = "phase4"`. The manual 🧭 button is the only way to re-trigger detection after that.
- Branch coordinates (from the Google Maps embed links supplied by the user): Phase 4 — Civic Centre `lat 33.5527, lng 73.1120`; Phase 8 — Hub Commercial `lat 33.4917, lng 73.0482`.
- Branch phone data: Phase 4 — `phone "923375415777"`, `tel "+923375415777"`, `display "0337-5415777"`. Phase 8 — `phone "923075415777"`, `tel "+923075415777"`, `display "0307-5415777"`.
- The Locations section (`#locations`) is not modified — both branches keep their full static address/phone/WhatsApp info there, unchanged.
- The existing `.theme-switcher` is hidden below 760px (see `css/style.css:993-998`). The new `.branch-switcher` follows the same precedent and is hidden at the same breakpoint — mobile users still get a correctly-routed default branch (auto-detected or persisted) through the always-visible floating WhatsApp button and every order link on the page; they just can't switch branches from the compact header control below 760px. They can still see/call either branch's number directly from the untouched Locations section.

---

## File Structure

- **Modify `index.html`** — header branch-switcher markup, hero branch indicator + single CTA, deals section order links (drop the alt-branch links), footer restructure, header/floating WhatsApp buttons converted to generic order links.
- **Modify `css/style.css`** — add `.branch-switcher` / `.branch-locate-btn` / `.hero-branch-indicator` styles; remove the now-unused `.deal-alt-branch` / `.deal-alt-branch-light` rules; add `.branch-switcher` to the existing mobile-hide rule.
- **Modify `js/script.js`** — add `BRANCHES` config, `applyBranch()`, `haversineKm()`, `detectNearestBranch()`, and the load/change/click wiring, inside the existing `DOMContentLoaded` handler.

No new files. No test runner exists in this project (static site, no `package.json`/test framework), so every task's deliverable is verified manually in a browser served over `localhost` (required for the Geolocation API to work — it refuses on `file://`).

---

### Task 1: Header/hero/deals/footer markup + styles

**Files:**
- Modify: `index.html:47-63` (header actions), `index.html:71-80` (hero), `index.html:93-145` (deals grid + featured deal), `index.html:404-448` (footer), `index.html:451-453` (floating WhatsApp button)
- Modify: `css/style.css:293-317` (add branch-switcher styles after theme-switcher), `css/style.css:394-399` (add hero-branch-indicator after hero-content p), `css/style.css:647-665` (remove deal-alt-branch rules), `css/style.css:993-998` (add `.branch-switcher` to mobile-hide rule)

**Interfaces:**
- Produces: DOM contract that Task 2/3's JS will read —
  - `#branchSelect` (`<select>`, options `value="phase4"` / `value="phase8"`)
  - `#branchLocate` (`<button>`)
  - `#heroChangeBranch` (`<a>`)
  - `.js-order-link` elements, each optionally carrying `data-order-msg="<url-encoded text>"`
  - `[data-branch-tel]` elements, the footer tel link additionally carrying `data-branch-tel-text`
  - `[data-branch-label]` elements (hero `<strong>`)
- Consumes: nothing (pure markup/CSS task, no JS yet — order links point at `href="#"` until Task 2 wires them up, which is expected and fine for this task's verification)

- [ ] **Step 1: Replace the header actions block**

In `index.html`, replace:

```html
    <div class="header-actions">
      <div class="theme-switcher">
        <label for="themeSelect" class="sr-only">Color theme</label>
        <select id="themeSelect">
          <option value="yellow">🟡 Classic Yellow</option>
          <option value="red">🔴 Vibrant Red</option>
          <option value="minimal">⚫ Minimal Mono</option>
        </select>
      </div>
      <a href="https://wa.me/923375415777" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg>
        WhatsApp Order
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
```

with:

```html
    <div class="header-actions">
      <div class="branch-switcher">
        <label for="branchSelect" class="sr-only">Select branch</label>
        <select id="branchSelect">
          <option value="phase4">📍 Phase 4 — Civic Centre</option>
          <option value="phase8">📍 Phase 8 — Hub Commercial</option>
        </select>
        <button type="button" id="branchLocate" class="branch-locate-btn" aria-label="Use my current location" title="Detect nearest branch">🧭</button>
      </div>
      <div class="theme-switcher">
        <label for="themeSelect" class="sr-only">Color theme</label>
        <select id="themeSelect">
          <option value="yellow">🟡 Classic Yellow</option>
          <option value="red">🔴 Vibrant Red</option>
          <option value="minimal">⚫ Minimal Mono</option>
        </select>
      </div>
      <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-sm js-order-link">
        <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg>
        WhatsApp Order
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
```

- [ ] **Step 2: Replace the hero CTAs**

Replace:

```html
    <p>Hand-stretched dough, loaded with cheese, and baked to order. Pizaasta brings wood-fired pizza, spin rolls, cheesy pasta &amp; loaded fries straight to Bahria Town, Rawalpindi.</p>
    <div class="hero-ctas">
      <a href="https://wa.me/923375415777" target="_blank" rel="noopener" class="btn btn-primary"><svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order — Phase 4</a>
      <a href="https://wa.me/923075415777" target="_blank" rel="noopener" class="btn btn-secondary"><svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order — Phase 8</a>
      <a href="#menu" class="btn btn-outline" style="color:#fff;">View Menu</a>
    </div>
```

with:

```html
    <p>Hand-stretched dough, loaded with cheese, and baked to order. Pizaasta brings wood-fired pizza, spin rolls, cheesy pasta &amp; loaded fries straight to Bahria Town, Rawalpindi.</p>
    <p class="hero-branch-indicator">📍 Ordering from <strong data-branch-label>Phase 4 — Civic Centre</strong> · <a href="#locations" id="heroChangeBranch">change</a></p>
    <div class="hero-ctas">
      <a href="#" target="_blank" rel="noopener" class="btn btn-primary js-order-link"><svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Now</a>
      <a href="#menu" class="btn btn-outline" style="color:#fff;">View Menu</a>
    </div>
```

- [ ] **Step 3: Replace the deals grid (4 deals)**

Replace each of the 4 deal-item blocks. Deal 1 — replace:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-1.jpg">
          <img src="images/deal-1.jpg" alt="Deal 1 — The Perfect Combo: 1 Large Pizza, 1 Special Pasta, 1.5L Drink for Rs 2100" loading="lazy">
        </div>
        <a href="https://wa.me/923375415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%201%20-%20The%20Perfect%20Combo%20(Rs%202100)" target="_blank" rel="noopener" class="btn btn-primary btn-block">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 1
        </a>
        <a href="https://wa.me/923075415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%201%20-%20The%20Perfect%20Combo%20(Rs%202100)" target="_blank" rel="noopener" class="deal-alt-branch">or order from Phase 8: 0307 5415777</a>
      </div>
```

with:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-1.jpg">
          <img src="images/deal-1.jpg" alt="Deal 1 — The Perfect Combo: 1 Large Pizza, 1 Special Pasta, 1.5L Drink for Rs 2100" loading="lazy">
        </div>
        <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-block js-order-link" data-order-msg="Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%201%20-%20The%20Perfect%20Combo%20(Rs%202100)">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 1
        </a>
      </div>
```

Deal 2 — replace:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-2.jpg">
          <img src="images/deal-2.jpg" alt="Deal 2 — All-Star Feast: 1 Medium Pizza, 1 Special Roll, 1L Drink for Rs 1799" loading="lazy">
        </div>
        <a href="https://wa.me/923375415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%202%20-%20All-Star%20Feast%20(Rs%201799)" target="_blank" rel="noopener" class="btn btn-primary btn-block">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 2
        </a>
        <a href="https://wa.me/923075415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%202%20-%20All-Star%20Feast%20(Rs%201799)" target="_blank" rel="noopener" class="deal-alt-branch">or order from Phase 8: 0307 5415777</a>
      </div>
```

with:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-2.jpg">
          <img src="images/deal-2.jpg" alt="Deal 2 — All-Star Feast: 1 Medium Pizza, 1 Special Roll, 1L Drink for Rs 1799" loading="lazy">
        </div>
        <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-block js-order-link" data-order-msg="Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%202%20-%20All-Star%20Feast%20(Rs%201799)">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 2
        </a>
      </div>
```

Deal 3 — replace:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-3.jpg">
          <img src="images/deal-3.jpg" alt="Deal 3 — Double the Flavor: 2 Large Pizzas, 1.5L Drink for Rs 2799" loading="lazy">
        </div>
        <a href="https://wa.me/923375415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%203%20-%20Double%20the%20Flavor%20(Rs%202799)" target="_blank" rel="noopener" class="btn btn-primary btn-block">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 3
        </a>
        <a href="https://wa.me/923075415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%203%20-%20Double%20the%20Flavor%20(Rs%202799)" target="_blank" rel="noopener" class="deal-alt-branch">or order from Phase 8: 0307 5415777</a>
      </div>
```

with:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-3.jpg">
          <img src="images/deal-3.jpg" alt="Deal 3 — Double the Flavor: 2 Large Pizzas, 1.5L Drink for Rs 2799" loading="lazy">
        </div>
        <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-block js-order-link" data-order-msg="Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%203%20-%20Double%20the%20Flavor%20(Rs%202799)">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 3
        </a>
      </div>
```

Deal 4 — replace:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-4.jpg">
          <img src="images/deal-4.jpg" alt="Deal 4 — The Ultimate Feast: 1 XL Pizza, 1 Special Pasta, 1 Spin Roll, 1.5L Drink for Rs 3299" loading="lazy">
        </div>
        <a href="https://wa.me/923375415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%204%20-%20The%20Ultimate%20Feast%20(Rs%203299)" target="_blank" rel="noopener" class="btn btn-primary btn-block">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 4
        </a>
        <a href="https://wa.me/923075415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%204%20-%20The%20Ultimate%20Feast%20(Rs%203299)" target="_blank" rel="noopener" class="deal-alt-branch">or order from Phase 8: 0307 5415777</a>
      </div>
```

with:

```html
      <div class="deal-item">
        <div class="deal-item-img js-lightbox-trigger" data-full="images/deal-4.jpg">
          <img src="images/deal-4.jpg" alt="Deal 4 — The Ultimate Feast: 1 XL Pizza, 1 Special Pasta, 1 Spin Roll, 1.5L Drink for Rs 3299" loading="lazy">
        </div>
        <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-block js-order-link" data-order-msg="Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%204%20-%20The%20Ultimate%20Feast%20(Rs%203299)">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 4
        </a>
      </div>
```

- [ ] **Step 4: Replace the featured Deal 5 block**

Replace:

```html
        <a href="https://wa.me/923375415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%205%20-%20Double%20the%20Crown%20Crust%20(Rs%202899)" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 5
        </a>
        <a href="https://wa.me/923075415777?text=Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%205%20-%20Double%20the%20Crown%20Crust%20(Rs%202899)" target="_blank" rel="noopener" class="deal-alt-branch deal-alt-branch-light">or order from Phase 8: 0307 5415777</a>
```

with:

```html
        <a href="#" target="_blank" rel="noopener" class="btn btn-secondary js-order-link" data-order-msg="Hi%20Pizaasta%2C%20I%27d%20like%20to%20order%20Deal%205%20-%20Double%20the%20Crown%20Crust%20(Rs%202899)">
          <svg class="ico-whatsapp" aria-hidden="true"><use href="#icon-whatsapp"></use></svg> Order Deal 5
        </a>
```

- [ ] **Step 5: Replace the footer's Phase 4 / Phase 8 columns**

Replace:

```html
        <div class="footer-col">
          <h4>Phase 4</h4>
          <ul>
            <li><a href="tel:+923375415777">0337-5415777</a></li>
            <li><a href="https://wa.me/923375415777" target="_blank" rel="noopener">WhatsApp Order</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Phase 8</h4>
          <ul>
            <li><a href="tel:+923075415777">0307-5415777</a></li>
            <li><a href="https://wa.me/923075415777" target="_blank" rel="noopener">WhatsApp Order</a></li>
          </ul>
        </div>
```

with:

```html
        <div class="footer-col">
          <h4>Order Now</h4>
          <ul>
            <li><a href="#" data-branch-tel data-branch-tel-text>0337-5415777</a></li>
            <li><a href="#" target="_blank" rel="noopener" class="js-order-link">WhatsApp Order</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Locations</h4>
          <ul>
            <li><a href="#locations">Phase 4 — Civic Centre</a></li>
            <li><a href="#locations">Phase 8 — Hub Commercial</a></li>
          </ul>
        </div>
```

- [ ] **Step 6: Convert the floating WhatsApp button**

Replace:

```html
<a href="https://wa.me/923375415777" target="_blank" rel="noopener" class="float-whatsapp" aria-label="Order on WhatsApp">
```

with:

```html
<a href="#" target="_blank" rel="noopener" class="float-whatsapp js-order-link" aria-label="Order on WhatsApp">
```

- [ ] **Step 7: Add branch-switcher and hero-branch-indicator CSS**

In `css/style.css`, immediately after the `.theme-switcher select:hover, .theme-switcher select:focus { ... }` block (currently ending at line 316, right before `.nav-toggle {`), insert:

```css
.branch-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
}

.branch-switcher select {
  appearance: none;
  -webkit-appearance: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--black);
  background-color: var(--white);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231A1A1A' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 10px;
  border: 2px solid var(--highlight-soft);
  border-radius: 999px;
  padding: 9px 34px 9px 18px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.branch-switcher select:hover,
.branch-switcher select:focus {
  border-color: var(--primary);
  outline: none;
}

.branch-locate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--highlight-soft);
  background: var(--white);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.branch-locate-btn:hover,
.branch-locate-btn:focus {
  border-color: var(--primary);
  outline: none;
  transform: scale(1.05);
}
```

- [ ] **Step 8: Add hero-branch-indicator CSS**

In `css/style.css`, immediately after the `.hero-content p { ... }` block (currently ending at line 399, right before `.hero-ctas {`), insert:

```css
.hero-branch-indicator {
  margin-top: 14px;
  font-size: 0.9rem;
  color: #f2f2f2;
}

.hero-branch-indicator strong {
  color: var(--highlight);
}

.hero-branch-indicator a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.hero-branch-indicator a:hover {
  color: var(--highlight);
}
```

- [ ] **Step 9: Remove the now-unused deal-alt-branch CSS**

In `css/style.css`, delete this block entirely (currently lines 647-665):

```css
.deal-alt-branch {
  text-align: center;
  font-size: 0.85rem;
  color: #666666;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.deal-alt-branch:hover {
  color: var(--primary);
}

.deal-alt-branch-light {
  color: #cfcfcf;
}

.deal-alt-branch-light:hover {
  color: var(--highlight);
}
```

- [ ] **Step 10: Hide branch-switcher on mobile alongside theme-switcher**

In `css/style.css`, replace:

```css
@media (max-width: 760px) {
  .nav-links,
  .theme-switcher,
  .header-actions .btn {
    display: none;
  }
```

with:

```css
@media (max-width: 760px) {
  .nav-links,
  .branch-switcher,
  .theme-switcher,
  .header-actions .btn {
    display: none;
  }
```

- [ ] **Step 11: Manually verify markup and styles render correctly**

Run: `python -m http.server 8000` from the project root, then open `http://localhost:8000` in a browser.

Expected:
- Header shows a branch dropdown + 🧭 button to the left of the theme switcher (desktop width ≥ 760px); both disappear below 760px along with the theme switcher, leaving only logo + hamburger.
- Hero shows the "📍 Ordering from Phase 4 — Civic Centre · change" line above the CTAs, and a single "Order Now" button (no more two Phase buttons).
- Each deal card shows exactly one "Order Deal N" button with no second "or order from Phase 8" line underneath.
- Footer's middle columns now read "Order Now" (phone + WhatsApp Order) and "Locations" (two links back to `#locations`).
- No console errors. All the new/converted links currently point at `#` or `#locations` since Task 2 hasn't wired the JS yet — that's expected at this point.

- [ ] **Step 12: Commit**

```bash
git add index.html css/style.css
git commit -m "Restructure header, hero, deals, and footer for a single branch selector"
```

---

### Task 2: Branch config, `applyBranch()`, and manual selection

**Files:**
- Modify: `js/script.js` (add near the top of the `DOMContentLoaded` handler, before the existing theme-switcher block)

**Interfaces:**
- Consumes: `#branchSelect`, `#branchLocate`, `#heroChangeBranch`, `.js-order-link[data-order-msg]`, `[data-branch-tel][data-branch-tel-text]`, `[data-branch-label]` — all produced by Task 1.
- Produces: `BRANCHES` (object, keys `"phase4"`/`"phase8"`, each `{ id, label, phone, tel, display, lat, lng }`), `DEFAULT_BRANCH` (string `"phase4"`), `BRANCH_STORAGE_KEY` (string `"pizaasta-branch"`), `applyBranch(id)` (function, no return value) — all consumed by Task 3.

- [ ] **Step 1: Add the BRANCHES config and applyBranch function**

In `js/script.js`, insert this immediately after the opening line `document.addEventListener("DOMContentLoaded", function () {` and before the existing `// Color theme switcher` comment:

```javascript
  // Branch selector
  var BRANCHES = {
    phase4: {
      id: "phase4",
      label: "Phase 4 — Civic Centre",
      phone: "923375415777",
      tel: "+923375415777",
      display: "0337-5415777",
      lat: 33.5527,
      lng: 73.1120
    },
    phase8: {
      id: "phase8",
      label: "Phase 8 — Hub Commercial",
      phone: "923075415777",
      tel: "+923075415777",
      display: "0307-5415777",
      lat: 33.4917,
      lng: 73.0482
    }
  };
  var DEFAULT_BRANCH = "phase4";
  var BRANCH_STORAGE_KEY = "pizaasta-branch";

  function applyBranch(id) {
    var branch = BRANCHES[id] ? BRANCHES[id] : BRANCHES[DEFAULT_BRANCH];
    localStorage.setItem(BRANCH_STORAGE_KEY, branch.id);

    var branchSelect = document.getElementById("branchSelect");
    if (branchSelect) branchSelect.value = branch.id;

    document.querySelectorAll(".js-order-link").forEach(function (link) {
      var msg = link.dataset.orderMsg;
      link.href = "https://wa.me/" + branch.phone + (msg ? "?text=" + msg : "");
    });

    document.querySelectorAll("[data-branch-tel]").forEach(function (link) {
      link.href = "tel:" + branch.tel;
      if ("branchTelText" in link.dataset) link.textContent = branch.display;
    });

    document.querySelectorAll("[data-branch-label]").forEach(function (el) {
      el.textContent = branch.label;
    });
  }

  var branchSelect = document.getElementById("branchSelect");
  var savedBranch = localStorage.getItem(BRANCH_STORAGE_KEY);
  if (savedBranch && BRANCHES[savedBranch]) {
    applyBranch(savedBranch);
  } else {
    applyBranch(DEFAULT_BRANCH);
  }

  if (branchSelect) {
    branchSelect.addEventListener("change", function () {
      applyBranch(branchSelect.value);
    });
  }

  var heroChangeBranch = document.getElementById("heroChangeBranch");
  if (heroChangeBranch && branchSelect) {
    heroChangeBranch.addEventListener("click", function (e) {
      if (branchSelect.offsetParent !== null) {
        e.preventDefault();
        branchSelect.focus();
        branchSelect.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
```

- [ ] **Step 2: Manually verify manual branch switching works**

Run: `python -m http.server 8000` (if not already running) and open `http://localhost:8000`.

Expected:
- On load, every order button (hero, all 5 deals, header, floating button, footer) points to `https://wa.me/923375415777...` (Phase 4) — check by hovering/inspecting `href`, e.g. in devtools: `document.querySelector('.js-order-link').href`.
- Footer's "Order Now" phone link shows `0337-5415777` and its `href` is `tel:+923375415777`.
- Hero indicator reads "Ordering from Phase 4 — Civic Centre".
- Switch the header `#branchSelect` to Phase 8: every one of the above updates immediately to the `923075415777` number, `0307-5415777`, and "Phase 8 — Hub Commercial" respectively.
- Reload the page: the Phase 8 selection persists (check `localStorage.getItem("pizaasta-branch")` is `"phase8"` in devtools console, and the header select still shows Phase 8 on load).
- Click "change" next to the hero indicator (desktop width): focus moves to the header `#branchSelect` and the page scrolls to it.

- [ ] **Step 3: Commit**

```bash
git add js/script.js
git commit -m "Add branch config and applyBranch() to drive all order links from one selection"
```

---

### Task 3: Geolocation auto-detect for first-time visitors

**Files:**
- Modify: `js/script.js` (extends the branch-selector block added in Task 2)

**Interfaces:**
- Consumes: `BRANCHES`, `DEFAULT_BRANCH`, `applyBranch(id)` from Task 2.
- Produces: `haversineKm(lat1, lng1, lat2, lng2)` (function, returns number), `detectNearestBranch()` (function, no return value) — not consumed elsewhere, but exercised by the manual `#branchLocate` button and the first-visit path.

- [ ] **Step 1: Add haversineKm and detectNearestBranch, and wire up first-visit + locate button**

In `js/script.js`, replace:

```javascript
  var branchSelect = document.getElementById("branchSelect");
  var savedBranch = localStorage.getItem(BRANCH_STORAGE_KEY);
  if (savedBranch && BRANCHES[savedBranch]) {
    applyBranch(savedBranch);
  } else {
    applyBranch(DEFAULT_BRANCH);
  }

  if (branchSelect) {
    branchSelect.addEventListener("change", function () {
      applyBranch(branchSelect.value);
    });
  }
```

with:

```javascript
  function haversineKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function detectNearestBranch() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var userLat = pos.coords.latitude;
        var userLng = pos.coords.longitude;
        var nearestId = DEFAULT_BRANCH;
        var nearestDist = Infinity;
        Object.keys(BRANCHES).forEach(function (id) {
          var b = BRANCHES[id];
          var dist = haversineKm(userLat, userLng, b.lat, b.lng);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestId = id;
          }
        });
        applyBranch(nearestId);
      },
      function () {
        // Permission denied, timeout, or position unavailable — DEFAULT_BRANCH already applied, do nothing.
      },
      { timeout: 6000 }
    );
  }

  var branchSelect = document.getElementById("branchSelect");
  var savedBranch = localStorage.getItem(BRANCH_STORAGE_KEY);
  if (savedBranch && BRANCHES[savedBranch]) {
    applyBranch(savedBranch);
  } else {
    applyBranch(DEFAULT_BRANCH);
    detectNearestBranch();
  }

  if (branchSelect) {
    branchSelect.addEventListener("change", function () {
      applyBranch(branchSelect.value);
    });
  }

  var branchLocate = document.getElementById("branchLocate");
  if (branchLocate) {
    branchLocate.addEventListener("click", function () {
      detectNearestBranch();
    });
  }
```

- [ ] **Step 2: Manually verify auto-detect and fallback behavior**

Run: `python -m http.server 8000` (if not already running) and open `http://localhost:8000` in Chrome.

Expected — first visit, geolocation granted near Phase 8:
- Open DevTools → Console, run `localStorage.removeItem("pizaasta-branch")`, then reload.
- Open DevTools → More tools → Sensors, set "Location" to a custom position near Phase 8 (lat `33.4917`, lng `73.0482`).
- On reload with that sensor override active and geolocation permission granted, the header select, hero indicator, and every order link should resolve to Phase 8 within a couple seconds of load.

Expected — first visit, geolocation denied:
- Run `localStorage.removeItem("pizaasta-branch")`, reload, and deny the browser's location permission prompt.
- Page should show Phase 4 (the default) immediately and stay on Phase 4 — no error banner, no repeated prompt, no console errors.

Expected — manual re-detect:
- With Phase 4 active (from the denied case above), grant location permission via the address-bar permission icon, set the Sensors override to the Phase 8 coordinates, then click the header 🧭 button.
- Page should switch to Phase 8 without a reload.

- [ ] **Step 3: Commit**

```bash
git add js/script.js
git commit -m "Add geolocation-based nearest-branch auto-detect for first-time visitors"
```

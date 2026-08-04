# Branch Selector Design

## Problem

Pizaasta has two branches (Phase 4 — Civic Centre, Phase 8 — Hub Commercial), each with its own WhatsApp/phone number. Today every "Order" action on the landing page (hero, all deal cards, header button, floating WhatsApp button, footer) hardcodes the Phase 4 number, and each deal additionally repeats a second "or order from Phase 8: 0307-5415777" link. This duplication is noisy and doesn't scale if a third branch is ever added.

## Goal

Introduce a single, sitewide "selected branch" concept, chosen once (auto-detected or manually picked) and reused everywhere an order/contact action appears, replacing all the per-element dual-branch links.

## Branch data

A single JS config object is the source of truth for branch data:

```js
var BRANCHES = {
  phase4: {
    id: "phase4",
    label: "Phase 4 — Civic Centre",
    phone: "923375415777",      // for wa.me links (no +)
    tel: "+923375415777",       // for tel: links
    display: "0337-5415777",    // human-readable
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
```

Coordinates are derived from the Google Maps embed links the user supplied for each branch (extracted `2d`/`3d` values = lng/lat). They're approximate (branch-level, not exact plaza pin) but the two branches are ~8km apart, which is more than enough separation for straight-line nearest-branch selection to be reliable.

## Persistence & detection flow

State lives in `localStorage["pizaasta-branch"]`, mirroring the existing `pizaasta-theme` pattern in `js/script.js`.

On page load:
1. If `localStorage.pizaasta-branch` holds a valid branch id → apply it immediately. No geolocation call. (Fast path for return visitors.)
2. Otherwise (first visit) → apply `DEFAULT_BRANCH` immediately (so the page is never in a blank/undecided state), then attempt geolocation:
   - `navigator.geolocation.getCurrentPosition(success, error, { timeout: 6000 })`
   - On success: compute haversine distance from the user's coords to each branch's `lat`/`lng`; whichever is smaller wins; call `applyBranch(nearestId)`, which also persists to localStorage.
   - On error, timeout, permission denial, or `navigator.geolocation` being unavailable (e.g. non-secure context): do nothing further — the already-applied `DEFAULT_BRANCH` stands. No error UI, no retry loop.

A compass button in the header (`🧭`, `#branchLocate`) lets the user re-trigger the same detection flow manually at any time (e.g. after initially denying permission, or if they've moved). Selecting a branch from the header `<select>` (`#branchSelect`) always calls `applyBranch(id)` directly and overrides whatever was auto-detected, persisting the manual choice.

## `applyBranch(id)` — single source of truth

This function is the only place that touches branch-dependent DOM:

1. Set `localStorage.pizaasta-branch = id`.
2. Set `#branchSelect.value = id`.
3. For every `.js-order-link` element: build `href = "https://wa.me/" + branch.phone + (el.dataset.orderMsg ? "?text=" + el.dataset.orderMsg : "")`.
4. For every `[data-branch-tel]` element: set `href = "tel:" + branch.tel` and, if the element also has `data-branch-tel-text`, set its `textContent = branch.display`.
5. For every `[data-branch-label]` element (the hero "Ordering from …" indicator): set `textContent = branch.label`.

No other code path is allowed to write a phone number into the DOM — everything routes through this function so the header selector is the only thing that needs to change to keep the whole page in sync.

## Header UI

Add a `.branch-switcher` control in `.header-actions`, positioned before the theme switcher:

```html
<div class="branch-switcher">
  <label for="branchSelect" class="sr-only">Select branch</label>
  <select id="branchSelect">
    <option value="phase4">📍 Phase 4 — Civic Centre</option>
    <option value="phase8">📍 Phase 8 — Hub Commercial</option>
  </select>
  <button type="button" id="branchLocate" class="branch-locate-btn" aria-label="Use my current location" title="Detect nearest branch">🧭</button>
</div>
```

Styled to match the existing `.theme-switcher` (same height/border treatment), so the header gains one more compact control, not a visually distinct new pattern.

## Content changes

**Hero** (`#home`): the two branch-specific buttons ("Order — Phase 4" / "Order — Phase 8") collapse into a single `js-order-link` "Order Now" button (no `data-order-msg`, so it links to plain `wa.me/<number>`). A new small line above the CTAs shows the active branch:

```html
<p class="hero-branch-indicator">📍 Ordering from <strong data-branch-label>Phase 4 — Civic Centre</strong> · <a href="#" id="heroChangeBranch">change</a></p>
```

`#heroChangeBranch` scrolls/focuses the header `#branchSelect` (simple anchor+focus, no modal).

**Deals** (`#deals`): each of the 5 order buttons (4 grid deals + Deal 5 featured) becomes a `js-order-link` with `data-order-msg` set to the existing URL-encoded deal text (unchanged text, just moved from the `href` into a data attribute). The 5 corresponding `.deal-alt-branch` "or order from Phase 8: …" links are deleted, along with the now-unused `.deal-alt-branch` / `.deal-alt-branch-light` CSS rules.

**Header WhatsApp button** and **floating WhatsApp button**: become `js-order-link` with no `data-order-msg`.

**Footer**: the two duplicate "Phase 4" / "Phase 8" columns are replaced with:
- An "Order Now" column: one `tel:` link (`data-branch-tel data-branch-tel-text`) showing the live formatted number, and one `js-order-link` "WhatsApp Order".
- A "Locations" column: two plain anchors to `#locations` (branch names as link text) for anyone who wants the other branch's full address.

**Locations section** (`#locations`): unchanged — both branches keep their full static address/phone/WhatsApp info, since this is the canonical "browse both branches" place.

## Error handling / edge cases

- No `navigator.geolocation` (unsupported browser, insecure context/`file://`): skip detection, `DEFAULT_BRANCH` stands.
- Permission denied or timeout: same — silent fallback, no error banner, no repeated auto-prompting (only the manual 🧭 button re-triggers it).
- Invalid/corrupted `localStorage.pizaasta-branch` value (not `"phase4"` or `"phase8"`): treated as "no saved branch", falls into the first-visit detection flow.

## Testing plan

Manual verification in a browser (this is a static site with no test suite):
1. Clear localStorage, load page, grant geolocation for a point near Phase 8 → confirm header/hero/deals/footer/floating button all resolve to the Phase 8 number.
2. Deny geolocation → confirm silent fallback to Phase 4 everywhere, no console errors, no blocking UI.
3. Manually switch branch via header `<select>` → confirm every order link across the page updates instantly and persists on reload.
4. Click a deal's "Order Deal N" button → confirm the WhatsApp deep link still contains the correct prefilled deal text with the currently selected branch's number.
5. Confirm Locations section still shows both branches' full static info unchanged.

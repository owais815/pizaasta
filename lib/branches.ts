export type BranchId = "phase4" | "phase8";
export type OrderType = "delivery" | "pickup";

export type Branch = {
  id: BranchId;
  label: string;
  phone: string;
  tel: string;
  display: string;
  lat: number;
  lng: number;
};

export const BRANCHES: Record<BranchId, Branch> = {
  phase4: {
    id: "phase4",
    label: "Phase 4 — Civic Centre",
    phone: "923375415777",
    tel: "+923375415777",
    display: "0337-5415777",
    lat: 33.5527,
    lng: 73.112,
  },
  phase8: {
    id: "phase8",
    label: "Phase 8 — Hub Commercial",
    phone: "923075415777",
    tel: "+923075415777",
    display: "0307-5415777",
    lat: 33.4917,
    lng: 73.0482,
  },
};

export const DEFAULT_BRANCH: BranchId = "phase4";
export const BRANCH_STORAGE_KEY = "pizzasta-branch";
export const ORDER_TYPE_STORAGE_KEY = "pizzasta-order-type";

export function waHref(branch: Branch, msg?: string): string {
  return `https://wa.me/${branch.phone}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
}

export function telHref(branch: Branch): string {
  return `tel:${branch.tel}`;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function nearestBranch(lat: number, lng: number): BranchId {
  let nearestId: BranchId = DEFAULT_BRANCH;
  let nearestDist = Infinity;
  (Object.keys(BRANCHES) as BranchId[]).forEach((id) => {
    const dist = haversineKm(lat, lng, BRANCHES[id].lat, BRANCHES[id].lng);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestId = id;
    }
  });
  return nearestId;
}

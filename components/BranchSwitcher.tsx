"use client";

import { useBranch } from "@/lib/branch-context";
import { useOrderModal } from "@/lib/order-modal-context";

export default function BranchSwitcher() {
  const { branch, orderType } = useBranch();
  const { open } = useOrderModal();

  return (
    <button
      type="button"
      className="branch-switcher"
      onClick={open}
      aria-label="Change delivery or pickup location"
    >
      <span aria-hidden="true">{orderType === "pickup" ? "🏬" : "🛵"}</span>
      <span>{branch.label}</span>
      <span aria-hidden="true">▾</span>
    </button>
  );
}

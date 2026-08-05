"use client";

import { useBranch } from "@/lib/branch-context";
import { BRANCHES, type BranchId } from "@/lib/branches";

export default function BranchSwitcher() {
  const { branch, setBranchId, detect } = useBranch();

  return (
    <div className="branch-switcher">
      <label htmlFor="branchSelect" className="sr-only">Select branch</label>
      <select
        id="branchSelect"
        value={branch.id}
        onChange={(e) => setBranchId(e.target.value as BranchId)}
      >
        {(Object.keys(BRANCHES) as BranchId[]).map((id) => (
          <option key={id} value={id}>
            📍 {BRANCHES[id].label}
          </option>
        ))}
      </select>
      <button
        type="button"
        id="branchLocate"
        className="branch-locate-btn"
        aria-label="Use my current location"
        title="Detect nearest branch"
        onClick={detect}
      >
        🧭
      </button>
    </div>
  );
}

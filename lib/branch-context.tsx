"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BRANCHES, BRANCH_STORAGE_KEY, DEFAULT_BRANCH, nearestBranch, type Branch, type BranchId } from "./branches";

type BranchContextValue = {
  branch: Branch;
  setBranchId: (id: BranchId) => void;
  detect: () => void;
};

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branchId, setBranchIdState] = useState<BranchId>(DEFAULT_BRANCH);

  function setBranchId(id: BranchId) {
    setBranchIdState(id);
    localStorage.setItem(BRANCH_STORAGE_KEY, id);
  }

  function detect() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setBranchId(nearestBranch(pos.coords.latitude, pos.coords.longitude));
      },
      () => {
        // Permission denied, timeout, or position unavailable — keep the current branch.
      },
      { timeout: 6000 }
    );
  }

  useEffect(() => {
    // Read after mount, not via a lazy useState initializer: localStorage is
    // unavailable during SSR, so reading it here (not at render time) is what
    // keeps the server-rendered markup and the first client render in sync.
    const saved = localStorage.getItem(BRANCH_STORAGE_KEY) as BranchId | null;
    if (saved && BRANCHES[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBranchIdState(saved);
    } else {
      detect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BranchContext.Provider value={{ branch: BRANCHES[branchId], setBranchId, detect }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within BranchProvider");
  return ctx;
}

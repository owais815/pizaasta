"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  BRANCHES,
  BRANCH_STORAGE_KEY,
  DEFAULT_BRANCH,
  ORDER_TYPE_STORAGE_KEY,
  nearestBranch,
  type Branch,
  type BranchId,
  type OrderType,
} from "./branches";

type BranchContextValue = {
  branch: Branch;
  setBranchId: (id: BranchId) => void;
  detect: () => Promise<BranchId | null>;
  orderType: OrderType | null;
  setOrderType: (type: OrderType) => void;
};

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branchId, setBranchIdState] = useState<BranchId>(DEFAULT_BRANCH);
  const [orderType, setOrderTypeState] = useState<OrderType | null>(null);

  function setBranchId(id: BranchId) {
    setBranchIdState(id);
    localStorage.setItem(BRANCH_STORAGE_KEY, id);
  }

  function setOrderType(type: OrderType) {
    setOrderTypeState(type);
    localStorage.setItem(ORDER_TYPE_STORAGE_KEY, type);
  }

  function detect(): Promise<BranchId | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const id = nearestBranch(pos.coords.latitude, pos.coords.longitude);
          setBranchId(id);
          resolve(id);
        },
        () => {
          // Permission denied, timeout, or position unavailable — keep the current branch.
          resolve(null);
        },
        { timeout: 6000 }
      );
    });
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

    const savedType = localStorage.getItem(ORDER_TYPE_STORAGE_KEY) as OrderType | null;
    if (savedType === "delivery" || savedType === "pickup") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderTypeState(savedType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BranchContext.Provider
      value={{ branch: BRANCHES[branchId], setBranchId, detect, orderType, setOrderType }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within BranchProvider");
  return ctx;
}

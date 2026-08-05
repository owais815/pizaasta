"use client";

import { useEffect, useState } from "react";
import { useOrderModal } from "@/lib/order-modal-context";
import { useBranch } from "@/lib/branch-context";
import { BRANCHES, type BranchId, type OrderType } from "@/lib/branches";

type Step = "type" | "location";

export default function OrderModal() {
  const { isOpen, close } = useOrderModal();
  const { branch, setBranchId, detect, orderType, setOrderType } = useBranch();
  const [step, setStep] = useState<Step>("type");
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (isOpen) setStep(orderType ? "location" : "type");
  }, [isOpen, orderType]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [close]);

  function chooseType(type: OrderType) {
    setOrderType(type);
    setStep("location");
  }

  function chooseBranch(id: BranchId) {
    setBranchId(id);
    close();
  }

  async function autoDetect() {
    setLocating(true);
    await detect();
    setLocating(false);
    close();
  }

  return (
    <div
      className={`order-modal-overlay${isOpen ? " active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="orderModalTitle">
        <button type="button" className="order-modal-close" aria-label="Close" onClick={close}>
          &times;
        </button>

        {step === "type" && (
          <>
            <span className="section-tag">Get started</span>
            <h3 id="orderModalTitle">How would you like your order?</h3>
            <div className="order-modal-tabs">
              <button type="button" className="order-modal-tab" onClick={() => chooseType("delivery")}>
                <span className="order-modal-tab-icon" aria-hidden="true">🛵</span>
                <span>Delivery</span>
                <small>We bring it to your door</small>
              </button>
              <button type="button" className="order-modal-tab" onClick={() => chooseType("pickup")}>
                <span className="order-modal-tab-icon" aria-hidden="true">🏬</span>
                <span>Pickup</span>
                <small>Grab it from the branch</small>
              </button>
            </div>
          </>
        )}

        {step === "location" && (
          <>
            <button type="button" className="order-modal-back" onClick={() => setStep("type")}>
              ← {orderType === "delivery" ? "Delivery" : "Pickup"}
            </button>
            <h3 id="orderModalTitle">
              {orderType === "delivery" ? "Where should we deliver?" : "Which branch will you visit?"}
            </h3>

            <button type="button" className="order-modal-auto" onClick={autoDetect} disabled={locating}>
              📍 {locating ? "Locating…" : "Auto-detect nearest branch"}
            </button>

            <div className="order-modal-branches">
              {(Object.keys(BRANCHES) as BranchId[]).map((id) => {
                const b = BRANCHES[id];
                return (
                  <button
                    type="button"
                    key={id}
                    className={`order-modal-branch${branch.id === id ? " active" : ""}`}
                    onClick={() => chooseBranch(id)}
                  >
                    <span>{b.label}</span>
                    <small>{b.display}</small>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

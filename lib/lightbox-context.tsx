"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type LightboxState = {
  src: string;
  alt: string;
  isOpen: boolean;
};

type LightboxContextValue = LightboxState & {
  open: (src: string, alt: string) => void;
  close: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState>({ src: "", alt: "", isOpen: false });

  const value = useMemo<LightboxContextValue>(
    () => ({
      ...state,
      open: (src: string, alt: string) => setState({ src, alt, isOpen: true }),
      close: () => setState({ src: "", alt: "", isOpen: false }),
    }),
    [state]
  );

  return <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>;
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within a LightboxProvider");
  return ctx;
}

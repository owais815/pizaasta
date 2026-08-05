"use client";

import { useBranch } from "@/lib/branch-context";
import { waHref } from "@/lib/branches";

export default function FloatingWhatsapp() {
  const { branch } = useBranch();

  return (
    <a
      href={waHref(branch)}
      target="_blank"
      rel="noopener"
      className="float-whatsapp"
      aria-label="Order on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true"><use href="#icon-whatsapp" /></svg>
    </a>
  );
}

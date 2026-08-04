"use client";

import { useEffect } from "react";
import { useLightbox } from "@/lib/lightbox-context";

export default function Lightbox() {
  const { src, alt, isOpen, close } = useLightbox();

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [close]);

  return (
    <div
      className={`lightbox${isOpen ? " active" : ""}`}
      id="lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button className="lightbox-close" id="lightboxClose" aria-label="Close" onClick={close}>
        &times;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic, dimension-less src opened on click; underlying files are pre-optimized */}
      <img src={src || undefined} alt={alt} id="lightboxImg" />
    </div>
  );
}

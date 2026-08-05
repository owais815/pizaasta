"use client";

import { useBranch } from "@/lib/branch-context";
import { telHref, waHref } from "@/lib/branches";

export default function FooterOrder() {
  const { branch } = useBranch();

  return (
    <>
      <li><a href={telHref(branch)}>{branch.display}</a></li>
      <li><a href={waHref(branch)} target="_blank" rel="noopener">WhatsApp Order</a></li>
    </>
  );
}

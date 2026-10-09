// src/components/AddToCartPlaceholder.jsx
// Visual-only "Add to Cart" control.
//
// E-COMMERCE NOTE: Cart behavior is intentionally NOT implemented in Phase 1.
// When Stripe + Cloudflare Workers/D1 are added, this becomes a real control
// that dispatches to a cart store and eventually a Stripe Checkout session.

import React from "react";

export default function AddToCartPlaceholder({ label = "Add to Cart", size, className = "" }) {
  return (
    <button
      type="button"
      className={`btn btn--ghost ${size === "sm" ? "btn--sm" : ""} ${className}`.trim()}
      disabled
      aria-disabled="true"
      title="Cart coming soon — Stripe integration planned for a later phase"
    >
      {label}
    </button>
  );
}

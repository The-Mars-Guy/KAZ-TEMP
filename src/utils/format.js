// src/utils/format.js
// Small formatting helpers.

/**
 * Format a numeric price in USD.
 * A price of 0 (or missing) is treated as "to be supplied" placeholder.
 */
export function formatPrice(price) {
  if (!price || Number(price) <= 0) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
}

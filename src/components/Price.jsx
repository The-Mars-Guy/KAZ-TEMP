// src/components/Price.jsx
// Renders a price, or a clear placeholder when a price has not been supplied.

import React from "react";
import { formatPrice } from "../utils/format.js";

export default function Price({ price, className = "" }) {
  const formatted = formatPrice(price);
  if (formatted) {
    return <span className={`price ${className}`.trim()}>{formatted}</span>;
  }
  return (
    <span className={`price--placeholder ${className}`.trim()} title="Price to be supplied">
      Price to be supplied
    </span>
  );
}

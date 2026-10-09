// src/components/Availability.jsx
// Consistent availability badge for books, audio, and store products.

import React from "react";

export default function Availability({ available, availableLabel = "Available", unavailableLabel = "Coming soon" }) {
  return (
    <span className={`badge ${available ? "badge--available" : "badge--unavailable"}`}>
      {available ? availableLabel : unavailableLabel}
    </span>
  );
}

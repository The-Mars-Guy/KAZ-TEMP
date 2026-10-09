// src/components/EmptyState.jsx
// Shared empty-state for filtered/faceted listings with no results.

import React from "react";

export default function EmptyState({ title = "Nothing here yet", children }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

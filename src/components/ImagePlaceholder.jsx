// src/components/ImagePlaceholder.jsx
// Simple labeled block used when an image is intentionally absent.

import React from "react";

export default function ImagePlaceholder({
  alt = "Placeholder image",
  width = "100%",
  height = "200px",
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        background: "color-mix(in srgb, var(--bg) 55%, var(--surface))",
        border: "1px dashed var(--border)",
        borderRadius: "var(--radius)",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--size-caption)",
        fontStyle: "italic",
      }}
    >
      {alt}
    </div>
  );
}

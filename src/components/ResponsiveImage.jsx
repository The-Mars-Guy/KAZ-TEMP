// src/components/ResponsiveImage.jsx
// Responsive image with WebP + JPEG sources. `base` is the public path without
// the size suffix or extension, e.g. "/images/fr-ligeza/father-kaz-portrait".

import React from "react";
import { publicUrl } from "../config/site.js";

export default function ResponsiveImage({
  base,
  widths = [640, 960, 1440],
  fallbackWidth = 960,
  alt,
  width,
  height,
  sizes = "100vw",
  className = "",
  loading = "lazy",
  fetchPriority,
  decoding = "async",
}) {
  const jpgSet = widths
    .map((w) => `${publicUrl(`${base}-${w}.jpg`)} ${w}w`)
    .join(", ");
  const webpSet = widths
    .map((w) => `${publicUrl(`${base}-${w}.webp`)} ${w}w`)
    .join(", ");

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        src={publicUrl(`${base}-${fallbackWidth}.jpg`)}
        srcSet={jpgSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
      />
    </picture>
  );
}

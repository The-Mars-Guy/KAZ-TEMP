// src/data/cds.js
//
// Audio CD recordings.
//
// Real content: "Hallelujah: Golden Light of Resurrection" by Father Kaz.
// `published: true` makes it appear on the site and in the sitemap-managed
// store; flip to false to hide it again.
//
// Shape:
// { id, slug, title, description, format, price, image, previewUrl, available,
//   published, sku, inventory, shippingEligible, storeCategory }

import { selectPublished } from "../config/content.js";

export const cds = [
  {
    id: 1,
    slug: "hallelujah-golden-light-of-resurrection",
    title: "Hallelujah: Golden Light of Resurrection",
    description:
      "An audio recording by Father Kaz Ligeza.",
    format: "CD",
    price: 0,
    image: "/images/cds/hallelujah-golden-light-of-resurrection.jpg",
    previewUrl: "",
    available: true,
    published: true,
    category: "Recorded Music",
    sku: "",
    inventory: null,
    shippingEligible: true,
    storeCategory: "CDs",
  },
];

/** Publicly visible CDs (drafts filtered out in production). */
export const publishedCds = selectPublished(cds);

export function getCdBySlug(slug) {
  return publishedCds.find((item) => item.slug === slug);
}

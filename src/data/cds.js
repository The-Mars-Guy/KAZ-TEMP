// src/data/cds.js
//
// Audio CDs by Fr. Kazimierz Ligeza.
//
// "Hallelujah: Golden Light of Resurrection" is Father Kaz's own recording.
// "Pieśni Fatimskie" / "The Songs of Fatima" come from the publisher
// Wydawnictwo Petrus (cover images re-hosted for the author's own site).
//
// Prices stay at 0 ("to be supplied"). `published: false` hides an entry.
//
// Shape:
// { id, slug, title, description, format, price, image, previewUrl, available,
//   published, year, publisher, language, sku, inventory, shippingEligible, storeCategory }

import { selectPublished } from "../config/content.js";

export const cds = [
  {
    id: 1,
    slug: "hallelujah-golden-light-of-resurrection",
    title: "Hallelujah: Golden Light of Resurrection",
    description: "An audio recording by Father Kaz Ligeza.",
    format: "CD",
    price: 0,
    image: "/images/cds/hallelujah-golden-light-of-resurrection.jpg",
    previewUrl: "",
    available: true,
    published: true,
    year: "",
    publisher: "",
    language: "English",
    sku: "",
    inventory: null,
    shippingEligible: true,
    storeCategory: "CDs",
  },
  {
    id: 918,
    slug: "piesni-fatimskie",
    title: "Pieśni Fatimskie",
    description: "The songs of Fatima, recorded by Father Kaz.",
    format: "CD (mp3)",
    price: 0,
    image: "/images/cds/piesni-fatimskie-918.jpg",
    previewUrl: "",
    available: true,
    published: true,
    year: "2023",
    publisher: "Petrus",
    language: "Polish",
    sku: "",
    inventory: null,
    shippingEligible: true,
    storeCategory: "CDs",
  },
  {
    id: 919,
    slug: "the-songs-of-fatima",
    title: "The Songs of Fatima",
    description: "The songs of Fatima, recorded by Father Kaz.",
    format: "CD (mp3)",
    price: 0,
    image: "/images/cds/the-songs-of-fatima-919.jpg",
    previewUrl: "",
    available: true,
    published: true,
    year: "2023",
    publisher: "Petrus",
    language: "English",
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

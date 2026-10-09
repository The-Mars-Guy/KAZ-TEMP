// src/data/catalog.js
//
// Unified product catalog — the SINGLE source of truth for the store.
//
// Each product appears exactly ONCE. Products are derived from the published
// books module; drafts are excluded in production. No product is duplicated
// across categories.
//
// This is the integration boundary for the future e-commerce backend
// (Cloudflare Workers + D1 + Stripe). When a real backend exists, replace the
// static import below with a fetch/D1 query returning the same shape.

import { publishedBooks } from "./books.js";
import { publishedCds } from "./cds.js";

/** Store category labels, in display order. */
export const STORE_CATEGORIES = ["Books", "CDs", "Other Publications"];

/**
 * Availability logic. A product is presented as purchasable only when it is
 * marked available AND has a real price (> 0). This keeps placeholder entries
 * from ever looking like they can be bought.
 */
export function isPurchasable(product) {
  return Boolean(product && product.available && Number(product.price) > 0);
}

/** @param {object} book */
function bookToProduct(book) {
  const isBook = book.category === "Books";
  const product = {
    id: `book-${book.id}`,
    slug: book.slug,
    title: book.title,
    description: book.description,
    price: book.price,
    image: book.image,
    available: book.available,
    published: book.published === true,
    category: book.category || "Books",
    productType: isBook ? "book" : "publication",
    detailTo: `/books/${book.slug}`,
    sku: book.sku || "",
    inventory: book.inventory ?? null,
    shippingEligible: Boolean(book.shippingEligible),
    format: isBook ? "Paperback" : "Print",
  };
  return { ...product, purchasable: isPurchasable(product) };
}

/** @param {object} item CD record */
function cdToProduct(item) {
  const product = {
    id: `cd-${item.id}`,
    slug: item.slug,
    title: item.title,
    description: item.description,
    price: item.price,
    image: item.image,
    available: item.available,
    published: item.published === true,
    category: item.storeCategory || "CDs",
    productType: "cd",
    detailTo: null,
    sku: item.sku || "",
    inventory: item.inventory ?? null,
    shippingEligible: Boolean(item.shippingEligible),
    format: item.format || "CD",
  };
  return { ...product, purchasable: isPurchasable(product) };
}

/** Full, de-duplicated, published-only product catalog. */
export const products = [
  ...publishedBooks.map(bookToProduct),
  ...publishedCds.map(cdToProduct),
];

/** Count of products per store category (for filter UI). */
export const productCounts = STORE_CATEGORIES.reduce((acc, category) => {
  acc[category] = products.filter((product) => product.category === category).length;
  return acc;
}, {});

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

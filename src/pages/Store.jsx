// src/pages/Store.jsx
//
// Storefront, driven by the unified published product catalog
// (src/data/catalog.js) so no product is duplicated across categories.
//
// Cart, checkout, payment, shipping, and inventory are NOT implemented yet.
// Checkout stays disabled until a secure payment backend exists.

import React, { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { products, STORE_CATEGORIES, productCounts } from "../data/catalog.js";

const PRESENT_CATEGORIES = STORE_CATEGORIES.filter((category) =>
  products.some((product) => product.category === category)
);

const FILTERS = [
  { key: "All", label: "All" },
  ...PRESENT_CATEGORIES.map((category) => ({ key: category, label: category })),
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");

  const hasProducts = products.length > 0;

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  const countFor = (key) => (key === "All" ? products.length : productCounts[key] || 0);

  return (
    <>
      <Seo path="/store" />

      <PageHero
        eyebrow="Store"
        title="Store"
        subtitle="Books, CDs, and publications."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Store" }]}
      />

      <section className="section">
        <div className="container">
          <p className="notice">
            This store is a preview. Cart, checkout, payment, shipping, and
            inventory are not yet available; checkout will remain disabled until a
            secure payment backend is in place.
          </p>

          {hasProducts ? (
            <>
              <div className="store-categories" role="group" aria-label="Product categories">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className="store-cat"
                    aria-pressed={activeCategory === filter.key}
                    onClick={() => setActiveCategory(filter.key)}
                  >
                    {filter.label}
                    <span className="store-cat__count" aria-hidden="true">
                      {countFor(filter.key)}
                    </span>
                  </button>
                ))}
              </div>

              <p className="filters__count" aria-live="polite" style={{ marginBottom: "var(--space-6)" }}>
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>

              {filtered.length > 0 ? (
                <div className="card-grid">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyState title="No products here yet">
                  There are no items in this category right now.
                </EmptyState>
              )}
            </>
          ) : (
            <EmptyState title="Store coming soon">
              Books and publications will appear here once the catalogue is
              published. Checkout is not yet available.
            </EmptyState>
          )}
        </div>
      </section>
    </>
  );
}

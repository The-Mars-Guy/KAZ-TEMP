// src/pages/Store.jsx
//
// Storefront, driven by the unified published product catalog
// (src/data/catalog.js). Filters split by language so Polish and English
// editions are never mixed.
//
// Cart, checkout, payment, shipping, and inventory are NOT implemented yet.

import React, { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { products } from "../data/catalog.js";
import { ENGLISH, POLISH, OTHER } from "../utils/language.js";

const isBook = (p) => p.category === "Books";

// Only filters that actually have products are shown.
const FILTERS = [
  { key: "All", label: "All", test: () => true },
  { key: "English", label: "English books", test: (p) => isBook(p) && p.languageGroup === ENGLISH },
  { key: "Polish", label: "Polish books", test: (p) => isBook(p) && p.languageGroup === POLISH },
  { key: "other", label: "Other languages", test: (p) => isBook(p) && p.languageGroup === OTHER },
  { key: "cds", label: "CDs", test: (p) => p.category === "CDs" },
].filter((filter) => filter.key === "All" || products.some(filter.test));

export default function Store() {
  const [active, setActive] = useState("All");

  const hasProducts = products.length > 0;
  const activeFilter = FILTERS.find((filter) => filter.key === active) || FILTERS[0];

  const filtered = useMemo(
    () => products.filter(activeFilter.test),
    [activeFilter]
  );

  const countFor = (filter) => products.filter(filter.test).length;

  return (
    <>
      <Seo path="/store" />

      <PageHero
        eyebrow="Store"
        title="Store"
        subtitle="Books and recordings, grouped by language."
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
                    aria-pressed={active === filter.key}
                    onClick={() => setActive(filter.key)}
                  >
                    {filter.label}
                    <span className="store-cat__count" aria-hidden="true">
                      {countFor(filter)}
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

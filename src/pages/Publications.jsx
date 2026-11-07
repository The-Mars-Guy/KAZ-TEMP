// src/pages/Publications.jsx

import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import PublicationCard from "../components/PublicationCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Button from "../components/Button.jsx";
import {
  publications,
  availableCategories,
  availableLanguages,
  CATEGORY_LABELS,
} from "../data/publications.js";

import "../styles/publications.css";

export default function Publications() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialise filter values from URL
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const language = searchParams.get("language") || "";
  const sort = searchParams.get("sort") || "title-asc";

  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const filtered = useMemo(() => {
    let list = publications;
    if (q) {
      const lower = q.toLowerCase();
      list = list.filter((p) => p.searchText && p.searchText.includes(lower));
    }
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    if (language) {
      list = list.filter((p) => p.language === language);
    }
    // Sorting
    list = [...list];
    switch (sort) {
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        list.sort((a, b) => {
          if (a.sortYear == null) return 1;
          if (b.sortYear == null) return -1;
          return b.sortYear - a.sortYear;
        });
        break;
      case "oldest":
        list.sort((a, b) => {
          if (a.sortYear == null) return 1;
          if (b.sortYear == null) return -1;
          return a.sortYear - b.sortYear;
        });
        break;
      default:
        break;
    }
    return list;
  }, [q, category, language, sort]);

  return (
    <>
      <Seo path="/publications" />
      <PageHero
        eyebrow="Bibliography"
        title="Publications"
        subtitle="Books, prayer books, articles, and recordings — by Rev. Kazimierz Ligęza, PhD, and works to which he has contributed."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Publications" }]}
      />
      <section className="section">
        <div className="container">
          <h2 className="visually-hidden">Publication catalogue</h2>
          {/* Attribution note */}
          <p className="content-note">
            Titles written by other authors are listed with their authors; Father Kaz's contribution is noted separately.
          </p>
          <div
            id="publication-filters"
            className="filter-bar"
            role="region"
            aria-label="Publication filters"
          >
            <div className="filter-item">
              <label htmlFor="search" className="filter-label">
                Search publications
              </label>
              <input
                id="search"
                type="search"
                className="filter-input"
                placeholder="Title, author, subject, or description"
                value={q}
                onChange={(e) => handleParamChange("q", e.target.value)}
                aria-label="Search publications"
              />
            </div>
            <div className="filter-item">
              <label htmlFor="category" className="filter-label">
                Category
              </label>
              <select
                id="category"
                className="filter-select"
                value={category}
                onChange={(e) => handleParamChange("category", e.target.value)}
                aria-label="Category"
              >
                <option value="">All Publications</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat] || cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label htmlFor="language" className="filter-label">
                Language
              </label>
              <select
                id="language"
                className="filter-select"
                value={language}
                onChange={(e) => handleParamChange("language", e.target.value)}
                aria-label="Language"
              >
                <option value="">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label htmlFor="sort" className="filter-label">
                Sort
              </label>
              <select
                id="sort"
                className="filter-select"
                value={sort}
                onChange={(e) => handleParamChange("sort", e.target.value)}
                aria-label="Sort"
              >
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <Button onClick={resetFilters} variant="secondary" size="sm">
              Reset filters
            </Button>
          </div>
          <p className="filters__count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "publication" : "publications"}
          </p>
          {filtered.length > 0 ? (
            <div className="publications-grid">
              {filtered.map((pub) => (
                <PublicationCard key={pub.slug} publication={pub} />
              ))}
            </div>
          ) : (
            <EmptyState title="No publications match your criteria">
              Try a different search, or use the Reset filters control above.
            </EmptyState>
          )}
          {filtered.length > 0 ? (
            <p className="publications-backlink">
              <a className="link link--quiet" href="#publication-filters">
                Back to filters
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

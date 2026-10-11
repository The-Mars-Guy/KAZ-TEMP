// src/pages/Books.jsx

import React from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import BookCard from "../components/BookCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Button from "../components/Button.jsx";
import { publishedBooks } from "../data/books.js";
import { languageGroup, LANGUAGE_GROUPS, LANGUAGE_GROUP_LABELS } from "../utils/language.js";

export default function Books() {
  // Group by language so Polish and English editions stay separate.
  const groups = LANGUAGE_GROUPS.map((group) => ({
    group,
    label: LANGUAGE_GROUP_LABELS[group],
    items: publishedBooks.filter((book) => languageGroup(book.language) === group),
  })).filter((entry) => entry.items.length > 0);

  return (
    <>
      <Seo path="/books" />

      <PageHero
        eyebrow="Publications"
        title="Books & Publications"
        subtitle="Books and publications by Father Kaz Ligeza, grouped by language."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Books" }]}
      />

      <section className="section">
        <div className="container">
          {groups.length > 0 ? (
            groups.map((entry) => (
              <div className="book-group" key={entry.group}>
                <SectionHeading as="h2" title={entry.label} />
                <div className="card-grid">
                  {entry.items.map((book) => (
                    <BookCard key={book.slug} book={book} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <EmptyState title="Publications coming soon">
                Father Kaz's books and publications are being catalogued. Please
                check back, or get in touch for details.
              </EmptyState>
              <div className="btn-group btn-group--center" style={{ marginTop: "var(--space-6)" }}>
                <Button to="/contact" variant="primary">
                  Contact
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

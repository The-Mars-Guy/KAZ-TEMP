// src/pages/Books.jsx

import React from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import BookCard from "../components/BookCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Button from "../components/Button.jsx";
import { publishedBooks } from "../data/books.js";

export default function Books() {
  const hasBooks = publishedBooks.length > 0;

  return (
    <>
      <Seo path="/books" />

      <PageHero
        eyebrow="Publications"
        title="Books & Publications"
        subtitle="Books and publications by Father Kaz Ligeza."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Books" }]}
      />

      <section className="section">
        <div className="container">
          {hasBooks ? (
            <div className="card-grid">
              {publishedBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
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

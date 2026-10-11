// src/pages/BookDetail.jsx

import React from "react";
import { useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import BookCard from "../components/BookCard.jsx";
import Price from "../components/Price.jsx";
import Availability from "../components/Availability.jsx";
import AddToCartPlaceholder from "../components/AddToCartPlaceholder.jsx";
import Button from "../components/Button.jsx";
import { absoluteUrl, publicUrl } from "../config/site.js";
import { getBookBySlug, getRelatedBooks } from "../data/books.js";

export default function BookDetail() {
  const { slug } = useParams();
  const book = getBookBySlug(slug);

  if (!book) {
    return (
      <>
        <Seo path={`/books/${slug}`} title="Book Not Found" noindex />
        <PageHero
          eyebrow="Books"
          title="Book Not Found"
          breadcrumbs={[
            { to: "/", label: "Home" },
            { to: "/books", label: "Books" },
            { label: "Not Found" },
          ]}
        />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <h3>We couldn't find that book</h3>
              <p>The book you're looking for may have moved or no longer exists.</p>
            </div>
            <div className="btn-group btn-group--center">
              <Button to="/books" variant="primary">
                Back to Books
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const related = getRelatedBooks(book.slug, 3);

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author || "Rev. Kazimierz Ligeza, Ph.D." },
    description: book.description,
    image: absoluteUrl(book.image),
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.publisher ? { publisher: book.publisher } : {}),
  };

  return (
    <>
      <Seo path={`/books/${book.slug}`} title={book.title} description={book.description} jsonLd={bookSchema} />

      <PageHero
        eyebrow="Books & Publications"
        title={book.title}
        subtitle={book.subtitle}
        breadcrumbs={[
          { to: "/", label: "Home" },
          { to: "/books", label: "Books" },
          { label: book.title },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="detail">
            <div className="detail__media">
              <img src={publicUrl(book.image)} alt={`Cover of ${book.title}`} />
            </div>

            <div className="flow">
              <p className="detail__byline">
                {book.author
                  ? `By ${book.author}`
                  : "By Father Kaz Ligeza (Rev. Kazimierz Ligeza, Ph.D.)"}
              </p>
              {book.contribution ? (
                <p className="detail__byline">{book.contribution}</p>
              ) : null}

              <div className="detail__price-row">
                <Price price={book.price} />
                <Availability available={book.available} />
              </div>

              <div className="prose">
                <p>{book.longDescription || book.description}</p>
              </div>

              <div className="detail__actions">
                {/*
                  E-COMMERCE: Cart behavior is intentionally NOT implemented in
                  Phase 1. Later, this control will add the item to a cart and
                  initiate a Stripe Checkout session via Cloudflare Workers + D1.
                */}
                <AddToCartPlaceholder />
                <Button to="/books" variant="secondary">
                  Back to Books
                </Button>
              </div>

              <dl className="detail__specs">
                {book.author ? (
                  <div className="detail__spec">
                    <dt>Author</dt>
                    <dd>{book.author}</dd>
                  </div>
                ) : null}
                {book.contribution ? (
                  <div className="detail__spec">
                    <dt>Contribution</dt>
                    <dd>{book.contribution}</dd>
                  </div>
                ) : null}
                <div className="detail__spec">
                  <dt>Publication Year</dt>
                  <dd>{book.year || "To be supplied"}</dd>
                </div>
                <div className="detail__spec">
                  <dt>Publisher</dt>
                  <dd>{book.publisher || "To be supplied"}</dd>
                </div>
                <div className="detail__spec">
                  <dt>ISBN</dt>
                  <dd>{book.isbn || "To be supplied"}</dd>
                </div>
                <div className="detail__spec">
                  <dt>Language</dt>
                  <dd>{book.language || "To be supplied"}</dd>
                </div>
                <div className="detail__spec">
                  <dt>Availability</dt>
                  <dd>{book.available ? "Available" : "Coming soon"}</dd>
                </div>
                <div className="detail__spec">
                  <dt>Format</dt>
                  <dd>{book.shippingEligible ? "Print (ships)" : "Digital"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section--surface">
          <div className="container">
            <SectionHeading eyebrow="More" title="Related Books" />
            <div className="card-grid">
              {related.map((item) => (
                <BookCard key={item.slug} book={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

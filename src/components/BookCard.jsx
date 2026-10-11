// src/components/BookCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price.jsx";
import Availability from "./Availability.jsx";
import { publicUrl } from "../config/site.js";

export default function BookCard({ book }) {
  return (
    <article className="card card--book">
      <div className="card__media">
        {/* Decorative cover; the title link below carries the accessible name. */}
        <img src={publicUrl(book.image)} alt={`Cover of ${book.title}`} loading="lazy" />
      </div>
      <div className="card__body">
        <span className="card__eyebrow">
          {book.language ? `Book · ${book.language}` : "Book"}
        </span>
        <h3 className="card__title">
          <Link to={`/books/${book.slug}`}>{book.title}</Link>
        </h3>
        {book.subtitle ? <p className="card__desc">{book.subtitle}</p> : null}
        <p className="card__desc">{book.description}</p>
        <div className="card__footer">
          <div className="card__links">
            <Price price={book.price} />
            <Availability available={book.available} />
          </div>
          <Link to={`/books/${book.slug}`} className="btn btn--secondary btn--sm">
            View Book
          </Link>
        </div>
      </div>
    </article>
  );
}

// src/components/PublicationCard.jsx
// One publication card, shared by the homepage and the Publications catalogue.

import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price.jsx";
import { publicUrl } from "../config/site.js";

function Cover({ publication, eager }) {
  if (publication.image) {
    return (
      <img
        src={publicUrl(publication.image)}
        alt={`Cover of ${publication.title}`}
        width="400"
        height="600"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <div className="publication-cover publication-cover--text" aria-hidden="true">
      <span className="publication-cover__journal">{publication.publisher}</span>
      <span className="publication-cover__title">{publication.title}</span>
      <span className="publication-cover__rule" />
      <span className="publication-cover__author">{publication.authorLine}</span>
    </div>
  );
}

export default function PublicationCard({ publication, compact = false, eager = false }) {
  const actionLabel = publication.externalUrl ? "Read article" : "View details";
  const action = publication.externalUrl ? (
    <a
      className="btn btn--secondary btn--sm"
      href={publication.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${actionLabel}: ${publication.title} (opens in a new tab)`}
    >
      {actionLabel}
    </a>
  ) : (
    <Link
      className="btn btn--secondary btn--sm"
      to={publication.detailPath}
      aria-label={`${actionLabel}: ${publication.title}`}
    >
      {actionLabel}
    </Link>
  );

  return (
    <article className={`card card--publication${compact ? " card--publication-compact" : ""}`}>
      <div className="card__media">
        <Cover publication={publication} eager={eager} />
      </div>
      <div className="card__body">
        <p className="card__eyebrow">
          {publication.category}
          {publication.language ? ` · ${publication.language}` : ""}
        </p>
        <h3 className="card__title">
          {publication.detailPath ? (
            <Link to={publication.detailPath}>{publication.title}</Link>
          ) : (
            <a href={publication.externalUrl} target="_blank" rel="noopener noreferrer">
              {publication.title}
            </a>
          )}
        </h3>
        {publication.subtitle ? <p className="card__subtitle">{publication.subtitle}</p> : null}
        <p className="card__author">{publication.authorLine}</p>
        {publication.contributors.length > 0 ? (
          <p className="card__contributor">
            {publication.contributors
              .map((person) => `${person.role} by ${person.name}`)
              .join(" · ")}
          </p>
        ) : null}
        <p className="card__desc">{publication.description}</p>
        <div className="card__meta">
          {publication.year ? <span>{publication.year}</span> : null}
          {publication.publisher ? <span>{publication.publisher}</span> : null}
        </div>
        <div className="card__footer">
          <div className="card__links">
            {publication.price > 0 ? <Price price={publication.price} /> : null}
          </div>
          {action}
        </div>
      </div>
    </article>
  );
}

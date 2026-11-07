// src/pages/PublicationDetail.jsx

import React from "react";
import { useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import PublicationCard from "../components/PublicationCard.jsx";
import Price from "../components/Price.jsx";
import Availability from "../components/Availability.jsx";
import AddToCartPlaceholder from "../components/AddToCartPlaceholder.jsx";
import Button from "../components/Button.jsx";
import { absoluteUrl, publicUrl } from "../config/site.js";
import { getPublicationBySlug, getRelatedPublications } from "../data/publications.js";

import "../styles/publications.css";

export default function PublicationDetail() {
  const { slug } = useParams();
  const pub = getPublicationBySlug(slug);

  if (!pub) {
    return (
      <>
        <Seo path={`/publications/${slug}`} title="Publication Not Found" noindex />
        <PageHero
          eyebrow="Publications"
          title="Publication Not Found"
          breadcrumbs={[{ to: "/", label: "Home" }, { to: "/publications", label: "Publications" }, { label: "Not Found" }]}
        />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <h3>We couldn't find that publication</h3>
              <p>The publication may have moved or no longer exists.</p>
            </div>
            <div className="btn-group btn-group--center">
              <Button to="/publications" variant="primary">
                Back to Publications
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const related = getRelatedPublications(pub.slug, 3);

  // JSON-LD based on type. Attribution is explicit: the cover author(s) are the
  // `author`; Father Kaz is a `contributor` only when listed as one.
  const jsonLd = (() => {
    const people = pub.authors.map((name) => ({ "@type": "Person", name }));
    const contributors = pub.contributors.map((person) => ({
      "@type": "Person",
      name: person.name,
      roleName: person.role,
    }));

    if (pub.typeLabel === "Book" || pub.typeLabel === "Prayer book") {
      const book = {
        "@context": "https://schema.org",
        "@type": "Book",
        name: pub.title,
        author: people,
        description: pub.description,
        inLanguage: pub.language || undefined,
      };
      if (pub.image) book.image = absoluteUrl(pub.image);
      if (pub.isbn) book.isbn = pub.isbn;
      if (pub.publisher) book.publisher = { "@type": "Organization", name: pub.publisher };
      if (pub.sortYear) book.datePublished = String(pub.sortYear);
      if (contributors.length > 0) book.contributor = contributors;
      return book;
    }

    if (pub.typeLabel === "Audio recording") {
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: pub.title,
        author: people,
        description: pub.description,
        inLanguage: pub.language || undefined,
      };
    }

    return {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      name: pub.title,
      author: people,
      description: pub.description,
      inLanguage: pub.language || undefined,
      ...(pub.publisher ? { isPartOf: { "@type": "Periodical", name: pub.publisher } } : {}),
      ...(pub.sortYear ? { datePublished: String(pub.sortYear) } : {}),
      ...(pub.externalUrl ? { sameAs: pub.externalUrl } : {}),
    };
  })();

  return (
    <>
      <Seo
        path={`/publications/${pub.slug}`}
        title={pub.title}
        description={pub.description}
        image={pub.image || undefined}
        type={
          pub.typeLabel === "Audio recording"
            ? "music.album"
            : pub.category === "Articles"
              ? "article"
              : "book"
        }
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow={pub.category}
        title={pub.title}
        subtitle={pub.subtitle}
        breadcrumbs={[{ to: "/", label: "Home" }, { to: "/publications", label: "Publications" }, { label: pub.title }]}
      />

      <section className="section">
        <div className="container">
          <div className="detail">
            <div className="detail__media">
              {pub.image ? (
                <img
                  src={publicUrl(pub.image)}
                  alt={`Cover of ${pub.title}`}
                  loading="lazy"
                  width="400"
                  height="600"
                />
              ) : (
                <div className="publication-cover publication-cover--text" aria-hidden="true">
                  <span className="publication-cover__journal">{pub.publisher}</span>
                  <span className="publication-cover__title">{pub.title}</span>
                  <span className="publication-cover__rule" />
                  <span className="publication-cover__author">{pub.authorLine}</span>
                </div>
              )}
            </div>
            <div className="flow">
              <p className="detail__byline">{pub.authorLine}</p>
              {pub.contributors && pub.contributors.length > 0 && (
                <p className="detail__byline">
                  {pub.contributors.map((c) => `${c.role} by ${c.name}`).join(" · ")}
                </p>
              )}
              <div className="detail__price-row">
                {pub.price > 0 && <Price price={pub.price} />}
                {pub.category === "Articles" ? (
                  <span className="badge badge--available">Online article</span>
                ) : pub.purchasable ? (
                  <Availability available={pub.available} />
                ) : (
                  <span className="badge badge--unavailable">Details only</span>
                )}
              </div>
              {pub.category !== "Articles" && !pub.purchasable ? (
                <p className="detail__availability-note">
                  This title is presented for information and is not currently sold
                  through this website.
                </p>
              ) : null}
              <div className="prose">
                <p>{pub.longDescription || pub.description}</p>
              </div>
              <div className="detail__actions">
                {pub.externalUrl ? (
                  <Button
                    href={pub.externalUrl}
                    variant="primary"
                    size="sm"
                    aria-label={`Read article: ${pub.title} (opens in a new tab)`}
                  >
                    Read article
                  </Button>
                ) : (
                  <>
                    <AddToCartPlaceholder />
                    <span className="detail__checkout-note">
                      Checkout is not yet available.
                    </span>
                  </>
                )}
                <Button to="/publications" variant="secondary">
                  Back to Publications
                </Button>
              </div>
              <dl className="detail__specs">
                <div className="detail__spec">
                  <dt>Category</dt>
                  <dd>{pub.category}</dd>
                </div>
                <div className="detail__spec">
                  <dt>Type</dt>
                  <dd>{pub.typeLabel}</dd>
                </div>
                {pub.year && (
                  <div className="detail__spec">
                    <dt>Publication Year</dt>
                    <dd>{pub.year}</dd>
                  </div>
                )}
                {pub.publisher && (
                  <div className="detail__spec">
                    <dt>Publisher</dt>
                    <dd>{pub.publisher}</dd>
                  </div>
                )}
                {pub.isbn && (
                  <div className="detail__spec">
                    <dt>ISBN</dt>
                    <dd>{pub.isbn}</dd>
                  </div>
                )}
                {pub.language && (
                  <div className="detail__spec">
                    <dt>Language</dt>
                    <dd>{pub.language}</dd>
                  </div>
                )}
                {pub.format && (
                  <div className="detail__spec">
                    <dt>Format</dt>
                    <dd>{pub.format}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Back cover gallery if present */}
          {pub.backImage && (
            <div className="detail__back-cover">
              <h2 className="eyebrow">Back cover</h2>
              <img
                src={publicUrl(pub.backImage)}
                alt={`Back cover of ${pub.title}`}
                loading="lazy"
                width="400"
                height="600"
              />
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <SectionHeading eyebrow="More" title="Related Publications" />
            <div className="card-grid">
              {related.map((item) => (
                <PublicationCard key={item.slug} publication={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

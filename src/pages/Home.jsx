// src/pages/Home.jsx

import React from "react";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import BookCard from "../components/BookCard.jsx";
import { SITE, publicUrl } from "../config/site.js";
import { featuredBooks } from "../data/books.js";

const AREAS = [
  {
    num: "01",
    title: "Liturgy",
    desc: "The theology and spiritual meaning of the Church's liturgical life.",
  },
  {
    num: "02",
    title: "Homiletics",
    desc: "The theology, preparation, and proclamation of Catholic preaching.",
  },
  {
    num: "03",
    title: "Theology of Liturgy",
    desc: "Study of worship as an expression of the Church's faith and life.",
  },
  {
    num: "04",
    title: "Catholic Social Teaching",
    desc: "The Church's teaching concerning human dignity, solidarity, charity, justice, and service to the poor.",
  },
];

export default function Home() {
  const hasBooks = featuredBooks.length > 0;

  return (
    <>
      <Seo path="/" />

      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <h1 className="hero__title">Father Kaz Ligeza</h1>
            <p className="hero__subtitle">{SITE.formalName}</p>
            <p className="hero__tags">Priest · Author · Scholar</p>
            <p className="hero__intro">
              Explore the writings and ministry of Father Kaz, a Catholic priest
              dedicated to sharing the richness of faith through teaching,
              preaching, and service.
            </p>
            <div className="hero__actions">
              <Button to="/books" variant="primary" size="lg">
                Explore Publications
              </Button>
              <Button to="/about" variant="secondary" size="lg">
                About Father Kaz
              </Button>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__portrait">
              <img src={publicUrl("/images/fr-ligeza/father-kaz.jpg")} alt="Father Kaz Ligeza" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section">
        <div className="container split split--media-first">
          <div className="home-about__portrait">
            <img
              src={publicUrl("/images/fr-ligeza/father-kaz-portrait.jpg")}
              alt="Father Kaz Ligeza"
              loading="lazy"
            />
          </div>
          <div className="flow">
            <SectionHeading
              eyebrow="About"
              title="A priest, author, and scholar"
              description="Service to the Church through liturgy, preaching, and teaching."
            />
            <p className="lead">
              Father Kazimierz Ligeza, Ph.D., is a priest of the Diocese of Tarnów,
              Poland, and exercised his pastoral ministry in the United States from
              2005, when he began as the associate pastor of a parish in Gainesville,
              Florida, to 2018. Fr. Ligeza possesses an academic concentration in
              liturgy, specializing in homiletics, theology of liturgy, and social
              teaching of the Church. He has authored books and articles covering a
              wide variety of topics in the Catholic Church.
            </p>
            <div className="btn-group">
              <Button to="/about" variant="primary">
                Read Full Biography
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      {hasBooks ? (
        <section className="section section--surface">
          <div className="container">
            <SectionHeading
              eyebrow="Books & Publications"
              title="Featured Books"
              description="A selection of Father Kaz's published work."
            />
            <div className="stack-lg">
              <div className="card-grid">
                {featuredBooks.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
              <div className="btn-group">
                <Button to="/books" variant="primary">
                  View All Books
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* AREAS OF STUDY */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Study"
            title="Areas of Study"
            description="Four fields that shape his scholarship and ministry."
            center
          />
          <div className="areas-grid">
            {AREAS.map((area) => (
              <article className="area-card" key={area.num}>
                <span className="area-card__num">{area.num}</span>
                <h3 className="area-card__title">{area.title}</h3>
                <p className="area-card__desc">{area.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE & OUTREACH */}
      <section className="section section--surface">
        <div className="container">
          <div className="service">
            <div className="service__media">
              <img
                src={publicUrl("/images/fr-ligeza/ministering.svg")}
                alt="Illustration representing service and outreach (placeholder)"
                loading="lazy"
              />
            </div>
            <div className="flow">
              <SectionHeading eyebrow="Charity" title="Service & Outreach" />
              <p>
                Father Kaz believes that helping the poorest of the poor is
                identifying Jesus in them. Service to those in need is an essential
                part of Catholic life, and he has worked alongside organizations
                dedicated to the poor, including Cross Catholic Outreach — an
                external organization.
              </p>
              <p className="service__note">
                This personal website is not operated or officially endorsed by
                Cross Catholic Outreach. The link below is provided for reference.
              </p>
              <div className="btn-group">
                <Button href="https://www.crosscatholic.org/" variant="secondary">
                  Cross Catholic Outreach
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section">
        <div className="container">
          <figure className="quote">
            <div className="quote__mark" aria-hidden="true">❞</div>
            <blockquote className="quote__text">
              Do small things with great love.
            </blockquote>
            <figcaption className="quote__cite">St. Teresa of Calcutta</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-panel">
            <h2>Books &amp; publications</h2>
            <p className="lead">
              Explore Father Kaz's published work, or get in touch with any
              questions.
            </p>
            <div className="btn-group">
              <Button to="/books" variant="primary">
                Explore Publications
              </Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

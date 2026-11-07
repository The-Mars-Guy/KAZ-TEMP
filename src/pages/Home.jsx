// src/pages/Home.jsx

import React from "react";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import PublicationCard from "../components/PublicationCard.jsx";
import PolandUsHero from "../components/PolandUsHero.jsx";
import { featuredPublications } from "../data/publications.js";

import "../styles/home.css";

const CALLINGS = [
  {
    title: "Priest",
    body:
      "A priest of the Diocese of Tarnów, Poland, ordained in 1990 and shaped by sacramental ministry and pastoral care.",
    to: "/ministry",
    label: "Ministry & service",
  },
  {
    title: "Author",
    body:
      "Books, homilies, and articles on Catholic faith, liturgy, and the life of the Church.",
    to: "/publications",
    label: "Browse publications",
  },
  {
    title: "Scholar",
    body:
      "A Doctor of Theology in homiletics, writing and teaching on liturgy, rhetoric, preaching, and Catholic social teaching.",
    to: "/academic-work",
    label: "Academic work",
  },
];

export default function Home() {
  return (
    <>
      <Seo path="/" />

      <PolandUsHero />

      {/* About preview */}
      <section className="section">
        <div className="container home-about">
          <div className="home-about__text">
            <SectionHeading
              eyebrow="A life between two countries"
              title="A priest, author, and scholar"
              description="Service to the Church through worship, preaching, teaching, and writing."
            />
            <div className="prose">
              <p>
                Father Kazimierz Ligęza, PhD, is a priest of the Diocese of Tarnów,
                Poland. He exercised his pastoral ministry in the United States from
                2005 — when he began as the associate pastor of a parish in
                Gainesville, Florida — to 2018.
              </p>
              <p>
                His academic concentration is liturgy, specializing in homiletics,
                the theology of liturgy, and the social teaching of the Church. He
                has authored books and articles on a wide variety of topics in the
                Catholic Church.
              </p>
            </div>
            <div className="btn-group">
              <Button to="/about" variant="primary">
                Read the biography
              </Button>
              <Button to="/academic-work" variant="secondary">
                Academic work
              </Button>
            </div>
          </div>

          <aside className="home-about__panel" aria-label="Ministry at a glance">
            <p className="home-about__panel-eyebrow">At a glance</p>
            <dl className="home-about__facts">
              <div>
                <dt>Ordained</dt>
                <dd>1990</dd>
              </div>
              <div>
                <dt>Diocese</dt>
                <dd>Tarnów, Poland</dd>
              </div>
              <div>
                <dt>United States</dt>
                <dd>2005–2018</dd>
              </div>
              <div>
                <dt>Doctorate</dt>
                <dd>Homiletics</dd>
              </div>
            </dl>
            <p className="home-about__panel-note">
              A ministry that joins Polish roots to a decade of pastoral service in
              the United States.
            </p>
          </aside>
        </div>
      </section>

      {/* Three callings */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            title="Three facets of one vocation"
            description="A life ordered toward worship, writing, and the study of the Church's faith."
            center
          />
          <div className="callings">
            {CALLINGS.map((item) => (
              <article className="calling" key={item.title}>
                <h3 className="calling__title">{item.title}</h3>
                <p className="calling__body">{item.body}</p>
                <Button to={item.to} variant="ghost" size="sm">
                  {item.label}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected publications */}
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Featured works"
            description="A small selection from the bibliography."
          />
          <div className="card-grid">
            {featuredPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} eager />
            ))}
          </div>
          <div className="btn-group home-section-actions">
            <Button to="/publications" variant="primary">
              Browse all publications
            </Button>
          </div>
        </div>
      </section>

      {/* Service & outreach */}
      <section className="section section--ink">
        <div className="container service-band">
          <div>
            <SectionHeading
              title="Identifying Jesus in the poorest of the poor"
              description="Service to those in need is an essential dimension of Catholic life."
            />
            <div className="prose">
              <p>
                Father Kaz has worked alongside organizations dedicated to the poor
                and to the promotion of human dignity and solidarity, including
                Cross Catholic Outreach.
              </p>
            </div>
            <p className="service__note">
              This personal website is not operated or officially endorsed by Cross
              Catholic Outreach. The link is provided for reference only.
            </p>
            <div className="btn-group">
              <Button to="/ministry" variant="gold">
                Ministry &amp; service
              </Button>
            </div>
          </div>
          <figure className="service-band__quote">
            <blockquote className="quote__text">
              Do small things with great love.
            </blockquote>
            <figcaption className="quote__cite">St. Teresa of Calcutta</figcaption>
          </figure>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-panel">
            <h2>Explore Father Kaz's work</h2>
            <p className="lead">
              Browse the publications, read the biography, or get in touch with any
              questions.
            </p>
            <div className="btn-group">
              <Button to="/publications" variant="primary" size="lg">
                Publications
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

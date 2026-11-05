// src/pages/AcademicWork.jsx

import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import { publications } from "../data/publications.js";
// import { SITE } from "../config/site.js"; // not used
import "../styles/academic.css";

// Filter only verified journal articles (category "Articles")
const articles = publications.filter((pub) => pub.category === "Articles");

export default function AcademicWork() {
  return (
    <>
      <Seo path="/academic-work" />

      <PageHero
        eyebrow="Scholarship"
        title="Academic Work"
        subtitle="The study of liturgy, homiletics, and the Church's communication with the world."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Academic Work" }]}
      />

      {/* Opening statement */}
      <section className="section">
        <div className="container prose">
          <p className="lead">
            Father Kaz holds a Doctor of Theology in homiletics; his scholarship is shaped by the study of Catholic worship and preaching.
          </p>
        </div>
      </section>

      {/* Doctorate and affiliation */}
      <section className="section section--tight">
        <div className="container">
          <SectionHeading
            eyebrow="Doctorate"
            title="Doctor of Theology (Homiletics)"
            description="An academic concentration in liturgy and a scholarly focus on preaching."
          />
          <p>
            His doctorate in theology concentrates on homiletics. He is associated
            with Saint Leo University in Florida, and the publisher Wydawnictwo
            Petrus lists his doctorate in homiletics in its author record.
          </p>
        </div>
      </section>

      {/* Research interests */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Interests"
            title="Research Interests"
            description="Fields that shape his scholarship and teaching."
          />
          <dl className="interest-grid">
            <div>
              <dt>Homiletics</dt>
              <dd>Theology, preparation, and proclamation of Catholic preaching.</dd>
            </div>
            <div>
              <dt>Rhetoric</dt>
              <dd>Rhetorical traditions that shape preaching.</dd>
            </div>
            <div>
              <dt>History of preaching</dt>
              <dd>Study of preachers and preaching traditions, including work on Stanisław Bielicki SJ.</dd>
            </div>
            <div>
              <dt>Liturgy & Theology of Liturgy</dt>
              <dd>Worship as the expression of the Church's faith and life.</dd>
            </div>
            <div>
              <dt>Church and media</dt>
              <dd>The Church's encounter with media culture.</dd>
            </div>
            <div>
              <dt>Communication & Theology of Media</dt>
              <dd>Theological interpretation of communication.</dd>
            </div>
            <div>
              <dt>Catholic social teaching</dt>
              <dd>Human dignity, solidarity, charity, justice, and service to the poor.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Teaching and formation */}
      <section className="section section--tight">
        <div className="container">
          <SectionHeading
            eyebrow="Teaching"
            title="Teaching & Formation"
            description="Formation in the liturgical and pastoral tradition."
          />
          <p>
            His work includes lecturing on liturgical and pastoral themes and forming preachers and students in the theology of the liturgy.
          </p>
        </div>
      </section>

      {/* Selected publications */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Publications" title="Selected Articles" description="Selected journal articles with verified bibliographic details." />
          <ul className="citation-list">
            {articles.map((art) => (
              <li key={art.id}>
                {art.title}
                {art.subtitle ? ` (${art.subtitle})` : ""} — {art.publisher}, {art.year}. {art.language && <span>{art.language}. </span>}
                {art.externalUrl && (
                  <a href={art.externalUrl} target="_blank" rel="noopener noreferrer" className="link">
                    DOI/Link
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p>
            For books, homilies, and a full bibliography, see the <Link to="/publications" className="link">Publications</Link> page.
          </p>
        </div>
      </section>

      {/* Scholarly works note */}
      <section className="section section--tight">
        <div className="container">
          <SectionHeading
            eyebrow="Works"
            title="Books & Homilies"
            description="Selected examples from the bibliography."
          />
          <p>
            The catalogue includes a study of Stanisław Bielicki SJ and several
            homiletic volumes. Publisher, ISBN, and year details for all works are
            maintained in the Publications catalogue.
          </p>
          <p>
            <Link to="/publications" className="link">
              Browse the full bibliography
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight section--surface">
        <div className="container center">
          <div className="btn-group btn-group--center">
            <Button to="/publications" variant="gold">
              Browse publications
            </Button>
            <Button to="/about" variant="primary">
              About Father Kaz
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

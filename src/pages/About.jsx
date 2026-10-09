// src/pages/About.jsx

import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import { SITE, publicUrl } from "../config/site.js";

const SECTIONS = [
  {
    num: "01",
    title: "Priesthood",
    body: (
      <>
        <p>
          Father Kaz is a Roman Catholic priest of the Diocese of Tarnów, Poland,
          where he was formed for the priesthood and began his ministry. His
          priestly life is centered on the celebration of the sacraments and the
          pastoral care of the faithful.
        </p>
        <p>
          <em>
            Specific details such as ordination date and assignments are pending
            confirmation and are shown here as placeholders.
          </em>
        </p>
      </>
    ),
  },
  {
    num: "02",
    title: "Ministry in the United States",
    body: (
      <>
        <p>
          Since 2005, Father Kaz has also served in pastoral ministry in the United
          States, accompanying parishes and communities through the sacraments,
          preaching, and teaching.
        </p>
        <p>
          <em>
            Individual parishes and assignments are not listed here, as they have
            not yet been verified for publication.
          </em>
        </p>
      </>
    ),
  },
  {
    num: "03",
    title: "Academic Work",
    body: (
      <>
        <p>
          Father Kaz holds a doctorate and devotes his scholarship to the study of
          Catholic worship and preaching. His areas of interest include:
        </p>
        <ul>
          <li>Liturgy</li>
          <li>Homiletics</li>
          <li>Theology of liturgy</li>
          <li>Catholic social teaching</li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Author & Teacher",
    body: (
      <>
        <p>
          As an author and teacher, Father Kaz writes books and publications,
          lectures on liturgical and pastoral themes, and forms preachers and
          students in the theology of the liturgy.
        </p>
        <p>
          The catalogue of his publications is being assembled. See{" "}
          <Link className="link" to="/books">
            Books
          </Link>{" "}
          for listings as they become available.
        </p>
      </>
    ),
  },
  {
    num: "05",
    title: "Service to the Poor",
    body: (
      <>
        <p>
          Service to those in need is, for Father Kaz, an essential dimension of
          Catholic life. He has worked with organizations dedicated to the poor and
          to the promotion of human dignity and solidarity.
        </p>
        <p className="service__note">
          Father Kaz has worked with{" "}
          <a
            className="link"
            href="https://www.crosscatholic.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cross Catholic Outreach
          </a>
          , an external organization. This personal website is not operated by, and
          does not officially represent, that organization.
        </p>
      </>
    ),
  },
];

export default function About() {
  return (
    <>
      <Seo path="/about" />

      <PageHero
        eyebrow="Biography"
        title={`About ${SITE.publicName}`}
        subtitle={`${SITE.formalName} — Roman Catholic priest of the Diocese of Tarnów, Poland; author, scholar, and homilist.`}
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "About" }]}
      />

      {/* Intro */}
      <section className="section">
        <div className="container split split--media-first">
          <div className="home-about__portrait">
            <img
              src={publicUrl("/images/fr-ligeza/father-kaz-portrait.jpg")}
              alt="Father Kaz Ligeza"
            />
          </div>
          <div className="prose">
            <p className="lead">
              {SITE.formalName} is a Roman Catholic priest of the Diocese of Tarnów,
              Poland. A scholar and author, his work centers on liturgy, homiletics,
              the theology of liturgy, and Catholic social teaching, alongside
              pastoral ministry in Poland and the United States.
            </p>
            <p>
              <em>
                This biography uses clearly-labeled placeholders where details have
                not yet been confirmed. Specific dates, institutions, and assignments
                will be added when verified information is provided.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Numbered sections */}
      {SECTIONS.map((section) => (
        <section className="about-section" key={section.num}>
          <div className="container">
            <SectionHeading eyebrow={section.num} title={section.title} />
            <div className="about-section__grid">
              <aside className="about-section__aside">
                <ImagePlaceholder
                  alt={`Image for ${section.title} — to be supplied`}
                  height="220px"
                />
              </aside>
              <div className="prose">{section.body}</div>
            </div>
          </div>
        </section>
      ))}

      {/* Ministry philosophy */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="06" title="Personal Ministry Philosophy" center />
          <figure className="quote">
            <div className="quote__mark" aria-hidden="true">❞</div>
            <blockquote className="quote__text">
              Do small things with great love.
            </blockquote>
            <figcaption className="quote__cite">St. Teresa of Calcutta</figcaption>
          </figure>
          <div className="btn-group btn-group--center">
            <Button to="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

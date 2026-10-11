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
          From 2005 to 2018, Father Kaz exercised his pastoral ministry in the
          United States, beginning as the associate pastor of a parish in
          Gainesville, Florida. He accompanied parishes and communities through the
          sacraments, preaching, and teaching.
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
          Father Kaz believes that helping the poorest of the poor is identifying
          Jesus in them. Service to those in need is, for him, an essential dimension
          of Catholic life, and he has worked with organizations dedicated to the
          poor and to the promotion of human dignity and solidarity.
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
              Father Kazimierz Ligeza, Ph.D., is a priest of the Diocese of Tarnów,
              Poland, and exercised his pastoral ministry in the United States from
              2005, when he began as the associate pastor of a parish in Gainesville,
              Florida, to 2018. Fr. Ligeza possesses an academic concentration in
              liturgy, specializing in homiletics, theology of liturgy, and social
              teaching of the Church. He has authored books and articles covering a
              wide variety of topics in the Catholic Church.
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
          <SectionHeading
            eyebrow="06"
            title="Personal Ministry Philosophy"
            description="Father Kaz is especially fond of a quote from St. Teresa of Calcutta."
            center
          />
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

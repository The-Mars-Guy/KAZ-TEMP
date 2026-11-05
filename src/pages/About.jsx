// src/pages/About.jsx

import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { SITE } from "../config/site.js";
import "../styles/about.css";

export default function About() {
  return (
    <>
      <Seo path="/about" />

      <PageHero
        eyebrow="Biography"
        title="About Father Kaz"
        subtitle={`${SITE.formalName} — Roman Catholic priest of the Diocese of Tarnów, Poland; author, scholar, and homilist.`}
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "About Father Kaz" }]}
      />

      {/* Intro with portrait and lead */}
      <section className="section about-intro">
        <div className="container split split--media-first">
          <ResponsiveImage
            base="/images/fr-ligeza/father-kaz-portrait"
            widths={[640, 960, 1440]}
            fallbackWidth={960}
            width={1920}
            height={2890}
            sizes="(min-width: 992px) 420px, 90vw"
            alt="Portrait of Rev. Kazimierz Ligęza, PhD, in a black clerical suit and Roman collar"
            className="about-portrait"
            loading="eager"
          />
          <div className="prose">
            <p className="lead">
              Father Kazimierz Ligęza, PhD, is a priest of the Diocese of Tarnów, Poland; exercised pastoral ministry in the United States from 2005, when he began as the associate pastor of a parish in Gainesville, Florida, to 2018. He possesses an academic concentration in liturgy, specializing in homiletics, theology of liturgy, and social teaching of the Church. He has authored books and articles covering a wide variety of topics in the Catholic Church.
            </p>
          </div>
        </div>
      </section>

      {/* From Poland to the United States */}
      <section className="section">
        <div className="container">
          <SectionHeading
            title="From Poland to the United States"
            description="Polish roots, diocesan priesthood, and the move to the United States."
          />
          <div className="prose">
            <p>
              Father Kaz was formed for the priesthood in his native Poland and ordained a priest of the Diocese of Tarnów in 1990. He later moved to the United States, where he accompanied parishes and communities across cultures, providing sacramental, preaching, and teaching support.
            </p>
          </div>
        </div>
      </section>

      {/* Priesthood */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Priesthood" />
          <figure className="image-figure">
            <ResponsiveImage
              base="/images/fr-ligeza/father-kaz-vestments"
              widths={[640, 960]}
              fallbackWidth={960}
              width={1024}
              height={1536}
              sizes="(min-width: 992px) 420px, 90vw"
              alt="Father Kaz in liturgical vestments inside a church"
            />
            <figcaption>Father Kaz in liturgical vestments.</figcaption>
          </figure>
          <div className="prose">
            <p>
              Ordained a priest of the Diocese of Tarnów in 1990, he has centered his
              priestly life on the sacraments and the pastoral care of the faithful.
            </p>
            <p className="verification-note">
              Exact ordination date: <span>[ORDINATION DATE — VERIFICATION REQUIRED]</span>
            </p>
          </div>
        </div>
      </section>

      {/* Ministry in the United States */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Ministry in the United States" />
          <figure className="image-figure">
            <ResponsiveImage
              base="/images/fr-ligeza/priests-red-vestments"
              widths={[640, 960, 1440]}
              fallbackWidth={960}
              width={1536}
              height={1152}
              sizes="(min-width: 992px) 560px, 90vw"
              alt="Two priests in red vestments standing before a religious image"
            />
            <figcaption>Two priests in red vestments before a religious image.</figcaption>
          </figure>
          <div className="prose">
            <p>
              From 2005 to 2018, Father Kaz exercised his pastoral ministry in the United States, beginning as the associate pastor of a parish in Gainesville, Florida. He accompanied parishes and communities through the sacraments, preaching, and teaching.
            </p>
          </div>
        </div>
      </section>

      {/* Scholar & Teacher */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Scholar & Teacher" />
          <div className="prose">
            <p>
              Father Kaz holds a doctorate in homiletics (Doctor of Theology) and devotes his scholarship to the study of liturgy. His academic concentration includes liturgy, homiletics, theology of liturgy, and Catholic social teaching. He is associated with Saint Leo University in Florida.
            </p>
            <p>
              <Link className="link" to="/academic-work">Explore his academic work</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Author" />
          <div className="prose">
            <p>
              Father Kaz has written books and articles on a wide range of Catholic topics. Works authored by other writers that include his contributions are listed with their respective authors; his role (e.g., introduction) is noted separately.
            </p>
            <p>
              <Link className="link" to="/publications">Browse publications</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Service to the Poor */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Service to the Poor" />
          <div className="prose">
            <p>
              Helping the poorest of the poor is identifying Jesus in them; service to those in need is an essential dimension of Catholic life. He has worked with organizations dedicated to the poor, including Cross Catholic Outreach.
            </p>
            <p className="service__note">
              This personal website is not operated by, and does not officially represent, Cross Catholic Outreach.
            </p>
          </div>
        </div>
      </section>

      {/* Ministry timeline */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Ministry timeline" />
          <ol className="timeline">
            <li>
              <span className="timeline-date">1965</span>
              <span className="timeline-event">Born (verified by the publisher's author record).</span>
            </li>
            <li>
              <span className="timeline-date">1990</span>
              <span className="timeline-event">Ordained a priest of the Diocese of Tarnów.</span>
            </li>
            <li>
              <span className="timeline-date">27 August 1990</span>
              <span className="timeline-event">Began as vicar in Szczepanów (verified by the parish's historical list).</span>
            </li>
            <li>
              <span className="timeline-date">2005–2018</span>
              <span className="timeline-event">Pastoral ministry in the United States, beginning as associate pastor of a parish in Gainesville, Florida.</span>
            </li>
            <li>
              <span className="timeline-date">Present</span>
              <span className="timeline-event">Lives in Florida; associated with Saint Leo University; active retreat preacher in the United States and Poland (verified by the publisher's author record).</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Quote and CTA */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading
            eyebrow="Philosophy"
            title="Personal Ministry Philosophy"
            description="Father Kaz is especially fond of a quote from St. Teresa of Calcutta."
            center
          />
          <figure className="quote">
            <div className="quote__mark" aria-hidden="true">❞</div>
            <blockquote className="quote__text">Do small things with great love.</blockquote>
            <figcaption className="quote__cite">St. Teresa of Calcutta</figcaption>
          </figure>
          <div className="btn-group btn-group--center">
            <Button to="/academic-work" variant="primary">Academic Work</Button>
            <Button to="/ministry" variant="secondary">Ministry &amp; Service</Button>
            <Button to="/publications" variant="ghost">Publications</Button>
          </div>
        </div>
      </section>
    </>
  );
}

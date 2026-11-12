// CONTENT NOTE: No photograph clearly documents a verified Catholic outreach activity of Father Kaz. Do not substitute an unrelated stock image. See src/data/contentNotes.js.

import React from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import "../styles/ministry.css";

export default function Ministry() {
  return (
    <>
      <Seo path="/ministry" />

      <PageHero
        eyebrow="Priesthood"
        title="Ministry & Service"
        subtitle="Sacramental ministry, preaching, and service to the poor — in Poland and the United States."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Ministry & Service" }]}
      />

      {/* Intro statement */}
      <section className="section">
        <div className="container prose">
          <p className="lead">
            Father Kaz’s priestly life is rooted in the celebration of the sacraments, pastoral care of the faithful, preaching, and a commitment to serve those in need.
          </p>
        </div>
      </section>

      {/* Priesthood and sacramental ministry */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Priesthood and sacramental ministry" />
          <div className="prose">
            <p>
              He was formed for the priesthood in the Diocese of Tarnów, Poland, and was ordained on 2 June 1990. His priestly life is centered on the celebration of the sacraments and the pastoral care of the faithful.
            </p>
          </div>
        </div>
      </section>

      {/* Ministry in the United States */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Ministry in the United States" />
          <div className="prose">
            <p>
              From 2005 to 2018, Father Kaz exercised his pastoral ministry in the United States, beginning as the associate pastor of a parish in Gainesville, Florida. He accompanied parishes and communities through the sacraments, preaching, and teaching.
            </p>
          </div>
        </div>
      </section>

      {/* Preaching, retreats, and formation */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Preaching, retreats, and formation" />
          <div className="prose">
            <p>
              He is an active retreat preacher in both the United States and Poland. His writing and ministry include homilies, catechesis, and the formation of preachers.
            </p>
          </div>
        </div>
      </section>

      {/* Service to the poor */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Service to the poor" />
          <div className="prose">
            <p>
              Helping the poorest of the poor is identifying Jesus in them; service to those in need is an essential part of Catholic life.
            </p>
            <p className="service__note">
              Father Kaz has worked with{' '}
              <a
                className="link"
                href="https://www.crosscatholic.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cross Catholic Outreach (opens in a new tab)"
              >
                Cross Catholic Outreach
              </a>
              . This personal website is not operated or officially endorsed by Cross Catholic Outreach; the link is for reference.
            </p>
          </div>
        </div>
      </section>

      {/* Ministry in images */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading title="A ministry in images" description="Clergy prostrate in prayer during a liturgical rite. The event and participants are not identified." />
          <figure className="ministry-image">
            <ResponsiveImage
              base="/images/fr-ligeza/liturgical-prostration"
              widths={[640, 960, 1440]}
              fallbackWidth={960}
              width={1536}
              height={1024}
              sizes="(min-width: 992px) 720px, 90vw"
              alt="Clergy lying prostrate in prayer during a liturgical rite"
            />
            <figcaption className="caption">
              Clergy prostrate in prayer during a liturgical rite. The event and participants are not identified.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Quote panel */}
      <section className="section section--surface">
        <div className="container">
          <div className="service-quote">
            <blockquote className="quote__text">Do small things with great love.</blockquote>
            <cite className="quote__cite">St. Teresa of Calcutta</cite>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container btn-group btn-group--center">
          <Button to="/about" variant="primary">About Father Kaz</Button>
          <Button to="/publications" variant="secondary">Publications</Button>
          <Button to="/contact" variant="ghost">Contact</Button>
        </div>
      </section>
    </>
  );
}

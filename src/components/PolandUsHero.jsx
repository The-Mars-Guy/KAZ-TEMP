// src/components/PolandUsHero.jsx
// The homepage signature: accurate Poland and contiguous-USA silhouettes with
// the professional portrait centered between them.

import React from "react";
import Button from "./Button.jsx";
import ResponsiveImage from "./ResponsiveImage.jsx";
import { US_MAP, POLAND_MAP } from "../assets/maps.js";

export default function PolandUsHero() {
  return (
    <section className="hero hero--home">
      <div className="container">
        <div className="hero__atlas">
          <div className="hero__map hero__map--poland">
            <svg
              viewBox={POLAND_MAP.viewBox}
              role="img"
              aria-labelledby="hero-poland-title"
            >
              <title id="hero-poland-title">Silhouette of Poland</title>
              <path d={POLAND_MAP.path} />
            </svg>
            <span className="hero__map-label">Poland</span>
          </div>

          <div className="hero__portrait-frame">
            <ResponsiveImage
              base="/images/fr-ligeza/father-kaz-portrait"
              widths={[640, 960, 1440]}
              fallbackWidth={960}
              width={1920}
              height={2890}
              alt="Portrait of Rev. Kazimierz Ligęza, PhD, in a black clerical suit and Roman collar"
              sizes="(min-width: 992px) 340px, (min-width: 600px) 250px, 190px"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero__map hero__map--us">
            <svg
              viewBox={US_MAP.viewBox}
              role="img"
              aria-labelledby="hero-us-title"
            >
              <title id="hero-us-title">Silhouette of the contiguous United States</title>
              <path d={US_MAP.path} />
            </svg>
            <span className="hero__map-label">United States</span>
          </div>
        </div>

        <div className="hero__content">
          <span className="eyebrow">From Poland to the United States</span>
          <h1 className="hero__title">Rev. Kazimierz Ligęza, PhD</h1>
          <p className="hero__tags">Priest · Author · Scholar</p>
          <div className="hero__actions">
            <Button to="/about" variant="primary" size="lg">
              About Father Kaz
            </Button>
            <Button to="/publications" variant="secondary" size="lg">
              Publications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

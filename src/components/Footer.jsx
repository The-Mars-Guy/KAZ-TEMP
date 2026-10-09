// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site.js";
import { FOOTER_LINKS, EXTERNAL_LINKS } from "../config/navigation.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand-name">{SITE.publicName}</p>
            <p className="site-footer__brand-role">{SITE.formalName}</p>
            <p className="site-footer__blurb">
              Roman Catholic priest of the Diocese of Tarnów, Poland. Writing and
              preaching on liturgy, homiletics, the theology of liturgy, and
              Catholic social teaching.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul className="site-footer__list">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>External links</h2>
            <ul className="site-footer__list">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="site-footer__note">
          This is a personal website. It is not operated or officially endorsed by
          the Diocese of Tarnów, Cross Catholic Outreach, or any other
          organization. External links are provided for reference only.
        </p>

        <div className="site-footer__bottom">
          <span>
            © {year} {SITE.publicName} ({SITE.formalName}). All rights reserved.
          </span>
          <span className="site-footer__diocese">
            Priest of the Diocese of Tarnów, Poland
          </span>
        </div>
      </div>
    </footer>
  );
}

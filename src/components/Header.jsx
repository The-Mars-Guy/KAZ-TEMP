// src/components/Header.jsx
// Primary identity "Father Kaz Ligeza" + formal name as secondary identifier.
// Traditional horizontal navigation on desktop, accessible hamburger on mobile.

import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "../config/site.js";
import { NAV_LINKS } from "../config/navigation.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelId = useId();

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on Escape and lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const linkClass = ({ isActive }) => `site-nav__link${isActive ? " is-active" : ""}`;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-title" aria-label={`${SITE.publicName} — home`}>
          <span className="site-title__name">{SITE.publicName}</span>
          <span className="site-title__meta">{SITE.formalName}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="mobile-panel" id={panelId}>
          <div className="container">
            <nav aria-label="Mobile">
              <ul className="mobile-nav__list">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className="mobile-nav__link"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              to="/contact"
              className="btn btn--primary mobile-nav__cta"
              onClick={() => setOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

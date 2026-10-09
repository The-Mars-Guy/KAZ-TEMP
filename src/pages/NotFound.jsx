// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/store", label: "Store" },
  { to: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex />
      <section className="section not-found">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>Page Not Found</h1>
          <p className="lead">
            Sorry, we couldn't find the page you were looking for.
          </p>
          <nav className="not-found__links" aria-label="Helpful links">
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="btn btn--secondary">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}

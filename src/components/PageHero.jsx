// src/components/PageHero.jsx
// Standard interior-page hero (breadcrumbs + eyebrow + h1 + subtitle).
// `breadcrumbs` accepts: an array of nodes, an array of {to,label} objects,
// a mix of strings (used as separators), or a single node.

import React from "react";
import { Link } from "react-router-dom";

function renderCrumb(item, index) {
  if (item === null || item === undefined || item === false) return null;

  if (typeof item === "string") {
    const trimmed = item.trim();
    if (trimmed === "/" || trimmed === "") {
      return (
        <span key={`sep-${index}`} className="breadcrumbs__sep" aria-hidden="true">
          /
        </span>
      );
    }
    return <span key={`txt-${index}`}>{item}</span>;
  }

  if (React.isValidElement(item)) {
    return <React.Fragment key={`node-${index}`}>{item}</React.Fragment>;
  }

  if (typeof item === "object" && item.label) {
    return (
      <React.Fragment key={`obj-${index}`}>
        {index > 0 ? (
          <span className="breadcrumbs__sep" aria-hidden="true">
            /
          </span>
        ) : null}
        {item.to ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span aria-current="page">{item.label}</span>
        )}
      </React.Fragment>
    );
  }

  return null;
}

export default function PageHero({ eyebrow, title, subtitle, breadcrumbs, children }) {
  const crumbs = Array.isArray(breadcrumbs)
    ? breadcrumbs
    : breadcrumbs
      ? [breadcrumbs]
      : [];

  return (
    <section className="page-hero">
      <div className="container">
        {crumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {crumbs.map(renderCrumb)}
          </nav>
        ) : null}
        {eyebrow ? <span className="eyebrow page-hero__eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p className="page-hero__subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

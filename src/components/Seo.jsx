// src/components/Seo.jsx
// Per-route document metadata + structured data (client-side).
//
// NOTE: Client-side metadata is fine for users and for browsers, but crawlers
// and social scrapers that do not execute JS will only see the static tags in
// index.html. `npm run build` runs a prerender step (scripts/prerender.mjs)
// that bakes per-route <title>/meta into dist/, so this component is the
// in-app source of truth and the prerender script mirrors it.

import { useEffect } from "react";
import { SITE, resolveSeo, absoluteUrl } from "../config/site.js";

export { SITE };

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.formalName,
    alternateName: SITE.publicName,
    jobTitle: "Roman Catholic Priest, Author, Scholar",
    description: SITE.description,
    url: SITE.url,
    knowsAbout: SITE.knowsAbout,
  };
}

export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  jsonLd,
  noindex = false,
}) {
  useEffect(() => {
    const meta = resolveSeo({ title, description, path, image, type });

    document.title = meta.fullTitle;
    upsertMeta("name", "description", meta.description);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow"
    );
    upsertMeta("property", "og:title", meta.fullTitle);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:type", meta.type);
    upsertMeta("property", "og:url", meta.url);
    upsertMeta("property", "og:image", meta.image);
    upsertMeta("property", "og:site_name", SITE.publicName);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.fullTitle);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", meta.image);
    upsertLink("canonical", meta.url);

    upsertJsonLd("site-person-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        personSchema(),
        {
          "@type": "WebSite",
          name: SITE.publicName,
          alternateName: SITE.formalName,
          url: SITE.url,
        },
      ],
    });

    if (jsonLd) {
      upsertJsonLd("page-jsonld", jsonLd);
    } else {
      const stale = document.getElementById("page-jsonld");
      if (stale) stale.remove();
    }
  }, [title, description, path, image, type, jsonLd, noindex]);

  return null;
}

/** Convenience for JSON-LD on list/detail pages. */
export function canonical(path) {
  return absoluteUrl(path);
}

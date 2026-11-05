// src/config/site.js
//
// Central site configuration — the single source of truth for branding, the
// production domain, SEO defaults, and per-route metadata.
//
// This module is intentionally dependency-free and safe to import from both the
// browser bundle AND the Node build script (see scripts/postbuild.mjs).

import { envString, envBool } from "./env.js";

const DEFAULT_URL = "https://frkazligeza.com";

/** Canonical origin (env override, trailing slash stripped). */
const siteUrl = (envString("VITE_SITE_URL") || DEFAULT_URL).replace(/\/+$/, "");

/**
 * When true, every page ships `noindex` and robots.txt disallows all crawling.
 * Used for temporary/preview deployments (e.g. GitHub Pages) so they are not
 * indexed. Production leaves this unset.
 */
export const NOINDEX = envBool("VITE_NOINDEX", false);

export const SITE = {
  /** Primary public-facing identity. Polish diacritics are preserved. */
  publicName: "Father Kaz Ligęza",
  /** Secondary / formal identity, used in metadata and structured data. */
  formalName: "Rev. Kazimierz Ligęza, PhD",
  /** Short informal name. */
  shortName: "Father Kaz",
  /** Identity line used under the wordmark. */
  tagline: "Priest · Author · Scholar",
  /** Canonical production origin (no trailing slash). */
  url: siteUrl,
  locale: "en_US",
  /** Default social sharing image (absolute path resolved against SITE.url). */
  ogImage: "/images/social/og-image.jpg",
  /**
   * Verified public contact details. Empty until provided by Father Kaz.
   * Do NOT invent an address here.
   */
  email: "",
  phone: "",
  /**
   * Default meta description. Written as neutral, verifiable biography —
   * no invented dates, institutions, awards, or positions.
   */
  description:
    "Rev. Kazimierz Ligęza, PhD — Father Kaz — is a Roman Catholic priest of the Diocese of Tarnów, Poland, ordained in 1990. A homilist, author, and scholar, he has served parishes in the United States and writes on liturgy, homiletics, the theology of liturgy, and Catholic social teaching.",
  /** Topics for structured data (schema.org knowsAbout). */
  knowsAbout: [
    "Liturgy",
    "Homiletics",
    "Theology of Liturgy",
    "Rhetoric",
    "History of Preaching",
    "Church and Media",
    "Communication and Theology of Media",
    "Catholic Social Teaching",
  ],
  /** External, authoritative pages used for schema.org `sameAs`. */
  sameAs: [
    "https://crosscatholic.org/outreach-priest/ligeza/",
    "https://wydawnictwopetrus.pl/autor,397,kazimierz-ligeza",
    "https://orcid.org/0009-0007-8820-3687",
  ],
};

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

/**
 * Prefix a public-asset path with the deployment base so files resolve both at
 * a domain root ('/images/x.jpg') and under a GitHub Pages subpath
 * ('/KAZ-TEMP/images/x.jpg'). Safe in Node (falls back to '/').
 */
export function publicUrl(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = (() => {
    try {
      return import.meta.env.BASE_URL || "/";
    } catch {
      return "/";
    }
  })();
  return `${base.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

/** Compose a full document title from a page title. */
export function titleFor(title) {
  return title ? `${title} | ${SITE.formalName}` : `${SITE.formalName} | ${SITE.tagline}`;
}

/**
 * Per-route metadata. Keys are canonical paths.
 * `title: ""` means "use the site default title".
 */
export const PAGE_META = {
  "/": {
    title: "",
    description: SITE.description,
  },
  "/about": {
    title: "About Father Kaz",
    description:
      "The life and ministry of Rev. Kazimierz Ligęza, PhD — a Roman Catholic priest of the Diocese of Tarnów, Poland, ordained in 1990, who served parishes in the United States from 2005 to 2018.",
  },
  "/academic-work": {
    title: "Academic Work",
    description:
      "The scholarship of Rev. Kazimierz Ligęza, PhD — Doctor of Theology in homiletics, with research in liturgy, rhetoric, the history of preaching, Church and media, and Catholic social teaching.",
  },
  "/ministry": {
    title: "Ministry & Service",
    description:
      "The priestly ministry and charitable service of Rev. Kazimierz Ligęza, PhD — sacramental ministry, preaching, retreats, and service to the poor.",
  },
  "/publications": {
    title: "Publications",
    description:
      "Books, prayer books, articles, and recordings by Rev. Kazimierz Ligęza, PhD, and works to which he has contributed — searchable and filterable by category, language, and year.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Contact Rev. Kazimierz Ligęza, PhD — general inquiries, speaking invitations, book and media inquiries.",
  },
  "/404": {
    title: "Page Not Found",
    description: "The page you were looking for could not be found.",
  },
};

/** Resolve metadata for a path, falling back to site defaults. */
export function resolveSeo({ title, description, path = "/", image, type = "website" } = {}) {
  const fallback = PAGE_META[path] || {};
  const resolvedTitle = title !== undefined ? title : fallback.title || "";
  return {
    title: resolvedTitle,
    fullTitle: titleFor(resolvedTitle),
    description: description || fallback.description || SITE.description,
    url: absoluteUrl(path),
    image: absoluteUrl(image || SITE.ogImage),
    type,
  };
}

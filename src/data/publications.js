// src/data/publications.js
//
// The single, normalized record set behind the consolidated Publications page.
//
// Sources:
//   - src/data/books.js    (books, prayer books, recommended titles)
//   - src/data/cds.js      (audio recordings)
//   - src/data/articles.js (selected journal articles)
//
// Attribution is deliberately explicit: a book whose cover names another author
// is never presented as Father Kaz's own book. His contribution (for example,
// the introduction to Saint Rita) is shown separately.

import { SITE } from "../config/site.js";
import { publishedBooks } from "./books.js";
import { publishedCds } from "./cds.js";
import { publishedArticles } from "./articles.js";
import { languageGroup, ENGLISH, POLISH } from "../utils/language.js";

const FATHER_KAZ = SITE.formalName;

/** Display categories, in order. Only categories with content are exposed. */
export const PUBLICATION_CATEGORIES = ["Books", "Prayer Books", "Articles", "Other"];

export const CATEGORY_LABELS = {
  Books: "Books",
  "Prayer Books": "Prayer Books",
  Articles: "Articles",
  Other: "Other",
};

export const TYPE_LABELS = {
  book: "Book",
  "prayer-book": "Prayer book",
  article: "Journal article",
  cd: "Audio recording",
};

function firstYear(value) {
  const match = String(value || "").match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

function isPurchasable(item) {
  return Boolean(item && item.available && Number(item.price) > 0);
}

function bookToPublication(book) {
  const isPrayerBook = book.publicationType === "prayer-book";
  const category = isPrayerBook ? "Prayer Books" : "Books";
  const authors = book.author ? [book.author] : [FATHER_KAZ];
  const contributors = book.contributors || [];
  const recommended = Boolean(book.recommended);

  return {
    id: `book-${book.id}`,
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle || "",
    category,
    typeLabel: isPrayerBook ? TYPE_LABELS["prayer-book"] : TYPE_LABELS.book,
    language: book.language || "",
    languageGroup: languageGroup(book.language),
    year: book.year || "",
    sortYear: firstYear(book.year),
    publisher: book.publisher || "",
    isbn: book.isbn || "",
    authors,
    contributors,
    authorLine: `By ${authors.join(", ")}`,
    recommended,
    description: book.description || "",
    longDescription: book.longDescription || book.description || "",
    image: book.image || "",
    backImage: book.backImage || "",
    price: Number(book.price) || 0,
    available: Boolean(book.available),
    purchasable: isPurchasable(book),
    format: "Paperback",
    detailPath: `/publications/${book.slug}`,
    externalUrl: "",
    featured: Boolean(book.featured),
    published: book.published === true,
    source: "books",
    searchText: [
      book.title,
      book.subtitle,
      authors.join(" "),
      contributors.map((c) => `${c.name} ${c.role}`).join(" "),
      book.description,
      book.longDescription,
      category,
      book.language,
      book.year,
      book.publisher,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

function cdToPublication(cd) {
  return {
    id: `cd-${cd.id}`,
    slug: cd.slug,
    title: cd.title,
    subtitle: "",
    category: "Other",
    typeLabel: TYPE_LABELS.cd,
    language: cd.language || "",
    languageGroup: languageGroup(cd.language),
    year: cd.year || "",
    sortYear: firstYear(cd.year),
    publisher: cd.publisher || "",
    isbn: "",
    authors: [FATHER_KAZ],
    contributors: [],
    authorLine: `By ${FATHER_KAZ}`,
    recommended: false,
    description: cd.description || "",
    longDescription: cd.description || "",
    image: cd.image || "",
    backImage: "",
    price: Number(cd.price) || 0,
    available: Boolean(cd.available),
    purchasable: isPurchasable(cd),
    format: cd.format || "CD",
    detailPath: `/publications/${cd.slug}`,
    externalUrl: "",
    featured: false,
    published: cd.published === true,
    source: "cds",
    searchText: [cd.title, cd.description, cd.language, cd.year, cd.publisher, cd.format]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

function articleToPublication(article) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.originalTitle || "",
    category: "Articles",
    typeLabel: TYPE_LABELS.article,
    language: article.language || "",
    languageGroup: languageGroup(article.language),
    year: article.year || "",
    sortYear: firstYear(article.year),
    publisher: article.journal || "",
    isbn: "",
    authors: [FATHER_KAZ],
    contributors: [],
    authorLine: `By ${FATHER_KAZ}`,
    recommended: false,
    description: article.description || "",
    longDescription: article.description || "",
    image: "",
    backImage: "",
    price: 0,
    available: false,
    purchasable: false,
    format: "Online",
    detailPath: "",
    externalUrl: article.externalUrl || "",
    featured: false,
    published: article.published === true,
    source: "articles",
    searchText: [
      article.title,
      article.originalTitle,
      article.journal,
      article.description,
      article.language,
      article.year,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

/** All published publications, normalized to one shape. */
export const publications = [
  ...publishedBooks.map(bookToPublication),
  ...publishedCds.map(cdToPublication),
  ...publishedArticles.map(articleToPublication),
];

/** Count per category (only positive categories are shown in the UI). */
export const publicationCounts = PUBLICATION_CATEGORIES.reduce((acc, category) => {
  const count = publications.filter((item) => item.category === category).length;
  if (count > 0) acc[category] = count;
  return acc;
}, {});

/** Categories that actually contain at least one publication. */
export const availableCategories = PUBLICATION_CATEGORIES.filter(
  (category) => (publicationCounts[category] || 0) > 0
);

/** Languages present in the catalogue, with English and Polish first. */
export const availableLanguages = Array.from(
  new Set(publications.map((item) => item.language).filter(Boolean))
).sort((a, b) => {
  const rank = (language) => (language === ENGLISH ? 0 : language === POLISH ? 1 : 2);
  return rank(a) - rank(b) || a.localeCompare(b);
});

/** Homepage selection: Father Kaz's own featured books first. */
export const featuredPublications = (() => {
  const ownFeatured = publications.filter(
    (item) => item.source === "books" && item.featured && !item.recommended
  );
  const own = publications.filter(
    (item) => item.source === "books" && !item.recommended
  );
  const pool = [...ownFeatured, ...own.filter((item) => !ownFeatured.includes(item))];
  return pool.slice(0, 3);
})();

export function getPublicationBySlug(slug) {
  return publications.find((item) => item.slug === slug);
}

/** Related publications: same category first, then the rest. */
export function getRelatedPublications(slug, limit = 3) {
  const current = getPublicationBySlug(slug);
  if (!current) return publications.slice(0, limit);
  const sameCategory = publications.filter(
    (item) => item.slug !== slug && item.category === current.category
  );
  const rest = publications.filter(
    (item) => item.slug !== slug && item.category !== current.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

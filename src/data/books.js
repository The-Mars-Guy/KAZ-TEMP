// src/data/books.js
//
// Books & publications.
//
// DRAFT STATUS: every entry below is a development fixture (`published: false`).
// Real titles, covers, prices, publishers, years, and ISBNs must be supplied by
// Father Kaz before launch; flip `published: true` once verified. Drafts render
// in local dev but are excluded from the production site and sitemap.xml.
//
// Shape:
// {
//   id, slug, title, subtitle, description, longDescription,
//   price, image, featured, available, year, publisher, isbn,
//   published,               // false until verified for public display
//   sku, category, inventory, shippingEligible
// }

import { selectPublished, isVisible } from "../config/content.js";

export const books = [
  {
    id: 100,
    slug: "365-reflections-on-the-word-of-god",
    title: "365 Reflections on the Word of God",
    subtitle: "",
    description:
      "A collection of 365 reflections on the Word of God.",
    longDescription:
      "365 Reflections on the Word of God gathers daily reflections drawn from Scripture and the Catholic tradition.",
    price: 0,
    image: "/images/books/365-reflections-on-the-word-of-god.jpg",
    featured: true,
    available: true,
    published: true,
    year: "",
    publisher: "Petrus",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 1,
    slug: "placeholder-book-liturgy",
    title: "[Placeholder] Book on Liturgy",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a book on the liturgical life of the Church once a real title and description are provided.",
    longDescription:
      "Placeholder long description. This is where the full publisher summary will appear when supplied by Father Kaz. Nothing here should be read as a real title, date, or claim.",
    price: 0,
    image: "/images/books/book-1.svg",
    featured: true,
    available: true,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 2,
    slug: "placeholder-book-homiletics",
    title: "[Placeholder] Book on Homiletics",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a book on the theology and practice of Catholic preaching.",
    longDescription:
      "Placeholder long description. Replace with the real publisher summary when available. No factual claims are made here.",
    price: 0,
    image: "/images/books/book-2.svg",
    featured: true,
    available: true,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 3,
    slug: "placeholder-book-social-teaching",
    title: "[Placeholder] Book on Catholic Social Teaching",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a book on Catholic social teaching, human dignity, and service to the poor.",
    longDescription:
      "Placeholder long description. Awaiting the real title and summary from the author. Treat all fields as placeholder.",
    price: 0,
    image: "/images/books/book-3.svg",
    featured: true,
    available: false,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 4,
    slug: "placeholder-book-theology-of-liturgy",
    title: "[Placeholder] Book on the Theology of Liturgy",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a study of worship as an expression of the Church's faith and life.",
    longDescription:
      "Placeholder long description. To be replaced with real catalog copy when provided.",
    price: 0,
    image: "/images/books/book-4.svg",
    featured: false,
    available: true,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 5,
    slug: "placeholder-book-spiritual-life",
    title: "[Placeholder] Book on the Spiritual Life",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a book of reflections for prayer and the spiritual life.",
    longDescription:
      "Placeholder long description. Awaiting real content. Nothing here is a factual claim.",
    price: 0,
    image: "/images/books/book-5.svg",
    featured: false,
    available: true,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 6,
    slug: "placeholder-publication-collected-articles",
    title: "[Placeholder] Collected Articles",
    subtitle: "[Placeholder subtitle — to be supplied]",
    description:
      "Placeholder description. This entry will describe a collection of scholarly and pastoral articles.",
    longDescription:
      "Placeholder long description. To be supplied. Treat as placeholder only.",
    price: 0,
    image: "/images/books/book-6.svg",
    featured: false,
    available: false,
    published: false,
    year: "",
    publisher: "",
    isbn: "",
    sku: "",
    category: "Other Publications",
    inventory: null,
    shippingEligible: true,
  },
];

/** Publicly visible books (drafts filtered out in production). */
export const publishedBooks = selectPublished(books);

/** Featured books for the homepage (falls back to the first three). */
export const featuredBooks = (() => {
  const featured = publishedBooks.filter((b) => b.featured);
  const pool = featured.length > 0 ? featured : publishedBooks;
  return pool.slice(0, 3);
})();

export function getBookBySlug(slug) {
  const book = books.find((item) => item.slug === slug);
  return isVisible(book) ? book : undefined;
}

/** Related books for a detail page (same list minus current, capped). */
export function getRelatedBooks(slug, limit = 3) {
  return publishedBooks.filter((book) => book.slug !== slug).slice(0, limit);
}

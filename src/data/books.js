// src/data/books.js
//
// Books & publications by Fr. Kazimierz Ligeza, Ph.D.
//
// Catalogue and cover images sourced from the publisher, Wydawnictwo Petrus
// (https://www.wydawnictwopetrus.pl/autor,397,kazimierz-ligeza). Titles are the
// publisher's; covers are re-hosted here for the author's own site.
//
// Prices are intentionally left at 0 ("to be supplied") until the store's
// currency and shipping are decided. `published: false` hides an entry.
//
// Shape:
// { id, slug, title, subtitle, description, longDescription, price, image,
//   featured, available, published, year, publisher, isbn, language,
//   sku, category, inventory, shippingEligible }

import { selectPublished, isVisible } from "../config/content.js";

function petrus({ id, slug, title, language, description, year, isbn, image, featured = false }) {
  return {
    id,
    slug,
    title,
    subtitle: "",
    description,
    longDescription: description,
    price: 0,
    image,
    featured,
    available: true,
    published: true,
    year,
    publisher: "Petrus",
    isbn,
    language,
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  };
}

export const books = [
  // --- English-language titles (also what Father Kaz supplies directly) ---
  {
    id: 100,
    slug: "365-reflections-on-the-word-of-god",
    title: "365 Reflections on the Word of God",
    subtitle: "",
    description: "A collection of 365 reflections on the Word of God.",
    longDescription:
      "365 Reflections on the Word of God gathers daily reflections drawn from Scripture and the Catholic tradition.",
    price: 0,
    image: "/images/books/365-reflections-on-the-word-of-god.jpg",
    featured: true,
    available: true,
    published: true,
    year: "2023",
    publisher: "Petrus",
    isbn: "978-83-7720-744-4",
    language: "English",
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  petrus({
    id: 1393,
    slug: "reflections-on-love",
    title: "Reflections on Love",
    language: "English",
    description: "Reflections on St. Paul's hymn to love (1 Corinthians 13).",
    year: "2026",
    isbn: "978-83-7720-934-9",
    image: "/images/books/reflections-on-love-1393.jpg",
    featured: true,
  }),
  petrus({
    id: 1348,
    slug: "fr-stanislaw-bielicki-sj-outstanding-preacher-18th-century",
    title: "Fr. Stanisław Bielicki SJ — An Outstanding Preacher of the 18th Century",
    language: "English",
    description:
      "On Stanisław Bielicki SJ, an outstanding preacher of the eighteenth century.",
    year: "2025",
    isbn: "978-83-7720-910-3",
    image:
      "/images/books/fr-stanislaw-bielicki-sj-an-outstanding-preacher-of-the-18th-century-1348.jpg",
  }),

  // --- Polish-language titles ---
  petrus({
    id: 708,
    slug: "homilie-na-temat-credo",
    title: 'Homilie na temat "Credo"',
    language: "Polish",
    description: "Homilies on the Creed.",
    year: "2020",
    isbn: "978-83-7720-411-5",
    image: "/images/books/homilie-na-temat-credo-708.jpg",
  }),
  petrus({
    id: 910,
    slug: "365-rozwazan-na-kazdy-dzien-roku",
    title: "365 rozważań na każdy dzień roku",
    language: "Polish",
    description:
      "Polish edition — daily reflections on the Word of God for every day of the year.",
    year: "2023",
    isbn: "978-83-7720-737-6",
    image: "/images/books/365-rozwazan-na-kazdy-dzien-roku-910.jpg",
  }),
  petrus({
    id: 1053,
    slug: "homilie-na-temat-czesci-stalych-mszy-swietej",
    title: "Homilie na temat części stałych Mszy Świętej",
    language: "Polish",
    description: "Homilies on the unchanging parts of Holy Mass.",
    year: "2024",
    isbn: "978-83-7720-807-6",
    image: "/images/books/homilie-na-temat-czesci-stalych-mszy-swietej-1053.jpg",
  }),
  petrus({
    id: 1254,
    slug: "rozwazania-o-milosci-1kor-13",
    title: "Rozważania o miłości (1Kor 13)",
    language: "Polish",
    description: "Reflections on love (1 Corinthians 13).",
    year: "2025",
    isbn: "978-83-7720-873-1",
    image: "/images/books/rozwazania-o-milosci-1kor-13-1254.jpg",
  }),
  petrus({
    id: 1061,
    slug: "kazania-katechizmowe-1",
    title: "Kazania katechizmowe. Tom 1",
    language: "Polish",
    description: "Catechetical sermons, volume 1.",
    year: "2010 (wznowienie 2025)",
    isbn: "978-83-7720-056-8",
    image: "/images/books/kazania-katechizmowe-1-1061.jpg",
  }),
  petrus({
    id: 1113,
    slug: "kazania-katechizmowe-2",
    title: "Kazania katechizmowe. Tom 2",
    language: "Polish",
    description: "Catechetical sermons, volume 2.",
    year: "2011 (wznowienie 2025)",
    isbn: "978-83-7720-088-9",
    image: "/images/books/kazania-katechizmowe-2-1113.jpg",
  }),
  petrus({
    id: 1114,
    slug: "kazania-katechizmowe-3",
    title: "Kazania katechizmowe. Tom 3",
    language: "Polish",
    description: "Catechetical sermons, volume 3.",
    year: "2011 (wznowienie 2025)",
    isbn: "978-83-7720-136-7",
    image: "/images/books/kazania-katechizmowe-3-1114.jpg",
  }),
  petrus({
    id: 1115,
    slug: "kazania-katechizmowe-4",
    title: "Kazania katechizmowe. Tom 4",
    language: "Polish",
    description: "Catechetical sermons, volume 4.",
    year: "2012 (wznowienie 2025)",
    isbn: "978-83-7720-069-8",
    image: "/images/books/kazania-katechizmowe-4-1115.jpg",
  }),
  petrus({
    id: 1116,
    slug: "kazania-katechizmowe-5",
    title: "Kazania katechizmowe. Tom 5",
    language: "Polish",
    description: "Catechetical sermons, volume 5.",
    year: "2013 (wznowienie 2025)",
    isbn: "978-83-7720-113-8",
    image: "/images/books/kazania-katechizmowe-5-1116.jpg",
  }),
  petrus({
    id: 1121,
    slug: "kazania-katechizmowe-6",
    title: "Kazania katechizmowe. Tom 6",
    language: "Polish",
    description: "Catechetical sermons, volume 6.",
    year: "2013 (wznowienie 2025)",
    isbn: "978-83-7720-157-2",
    image: "/images/books/kazania-katechizmowe-6-1121.jpg",
  }),
  petrus({
    id: 1032,
    slug: "refreny-psalmow-responsoryjnych-homilie-2014",
    title: "Refreny Psalmów Responsoryjnych. Homilie",
    language: "Polish",
    description: "Homilies on the responsorial psalms.",
    year: "2014",
    isbn: "978-83-7720-791-8",
    image: "/images/books/refreny-psalmow-responsoryjnych-homilie-1032.jpg",
  }),
  petrus({
    id: 1033,
    slug: "refreny-psalmow-responsoryjnych-homilie-2015",
    title: "Refreny Psalmów Responsoryjnych. Homilie",
    language: "Polish",
    description: "Homilies on the responsorial psalms.",
    year: "2015",
    isbn: "978-83-7720-792-5",
    image: "/images/books/refreny-psalmow-responsoryjnych-homilie-1033.jpg",
  }),
  petrus({
    id: 1036,
    slug: "refreny-psalmow-responsoryjnych-homilie-2016",
    title: "Refreny Psalmów Responsoryjnych. Homilie",
    language: "Polish",
    description: "Homilies on the responsorial psalms.",
    year: "2016 (wznowienie 2024)",
    isbn: "978-83-7720-794-9",
    image: "/images/books/refreny-psalmow-responsoryjnych-homilie-1036.jpg",
  }),
  petrus({
    id: 1263,
    slug: "stanislaw-bielicki-sj-wybitny-kaznodzieja-xviii-wieku",
    title: "Stanisław Bielicki SJ — wybitny kaznodzieja XVIII wieku",
    language: "Polish",
    description:
      "On Stanisław Bielicki SJ, an outstanding preacher of the eighteenth century.",
    year: "2026",
    isbn: "978-83-7720-879-3",
    image: "/images/books/stanislaw-bielicki-sj-wybitny-kaznodzieja-xviii-wieku-1263.jpg",
  }),

  // --- Other languages of the Bielicki study ---
  petrus({
    id: 1349,
    slug: "p-stanislaw-bielicki-sj-destacado-predicador-siglo-xviii",
    title: "P. Stanisław Bielicki SJ — destacado predicador del siglo XVIII",
    language: "Spanish",
    description: "Sobre Stanisław Bielicki SJ, un destacado predicador del siglo XVIII.",
    year: "2025",
    isbn: "978-83-7720-911-0",
    image: "/images/books/p-stanislaw-bielicki-sj-destacado-predicador-del-siglo-xviii-1349.jpg",
  }),
  petrus({
    id: 1350,
    slug: "stanislaw-bielicki-sj-herausragender-prediger-18-jahrhundert",
    title: "Stanisław Bielicki SJ — ein herausragender Prediger des 18. Jahrhunderts",
    language: "German",
    description:
      "Über Stanisław Bielicki SJ, einen herausragenden Prediger des 18. Jahrhunderts.",
    year: "2025",
    isbn: "978-83-7720-912-7",
    image:
      "/images/books/stanislaw-bielicki-sj-ein-herausragender-prediger-des-18-jahrhunderts-1350.jpg",
  }),
  petrus({
    id: 1351,
    slug: "le-pere-stanislaw-bielicki-sj-eminent-predicateur-xviiie-siecle",
    title: "Le père Stanisław Bielicki SJ — un éminent prédicateur du XVIIIe siècle",
    language: "French",
    description: "Sur Stanisław Bielicki SJ, un éminent prédicateur du XVIIIe siècle.",
    year: "2025",
    isbn: "978-83-7720-913-4",
    image:
      "/images/books/le-pere-stanislaw-bielicki-sj-un-eminent-predicateur-du-xviiie-siecle-1351.jpg",
  }),
  petrus({
    id: 1352,
    slug: "padre-stanislaw-bielicki-sj-eminente-predicatore-xviii-secolo",
    title: "Padre Stanisław Bielicki SJ — un eminente predicatore del XVIII secolo",
    language: "Italian",
    description: "Su Stanisław Bielicki SJ, un eminente predicatore del XVIII secolo.",
    year: "2025",
    isbn: "978-83-7720-914-1",
    image:
      "/images/books/padre-stanislaw-bielicki-sj-un-emenente-predicatore-del-xviii-secolo-1352.jpg",
  }),
  petrus({
    id: 1394,
    slug: "reflexiones-sobre-el-amor",
    title: "Reflexiones sobre el amor",
    language: "Spanish",
    description: "Reflexiones sobre el amor (1 Corintios 13).",
    year: "2026",
    isbn: "978-83-7720-935-6",
    image: "/images/books/reflexiones-sobre-el-amor-1394.jpg",
  }),

  // --- Recommended reading (written by other authors, not by Father Kaz) ---
  {
    id: 1364,
    slug: "archangels-near-us",
    title: "Archangels Near Us",
    subtitle: "The Seven Glorious Archangels and the Nine Choirs of Angels",
    description:
      "A Catholic prayer book on the Seven Glorious Archangels and the Nine Choirs of Angels, with reflections, prayers, and litanies.",
    longDescription:
      "A Catholic prayer book on the Seven Glorious Archangels and the Nine Choirs of Angels, with reflections, prayers, and litanies.",
    price: 0,
    image: "/images/books/archangels-near-us-1364.jpg",
    featured: false,
    available: true,
    published: true,
    year: "2026",
    publisher: "Petrus",
    isbn: "978-83-7720-916-5",
    language: "English",
    author: "Lidia Frydzińska-Świątczak",
    recommended: true,
    sku: "",
    category: "Books",
    inventory: null,
    shippingEligible: true,
  },
  {
    id: 1353,
    slug: "saint-rita-in-moments-of-helplessness",
    title: "Saint Rita in Moments of Helplessness",
    subtitle: "",
    description:
      "A Catholic prayer book for people experiencing suffering, fear, illness, family crises, grief, and moments of doubt.",
    longDescription:
      "A Catholic prayer book for people experiencing suffering, fear, illness, family crises, grief, and moments of doubt — with prayers, novenas, litanies, and meditations.",
    price: 0,
    image: "/images/books/saint-rita-in-moments-of-helplessness-1353.jpg",
    featured: false,
    available: true,
    published: true,
    year: "2026",
    publisher: "Petrus",
    isbn: "978-83-7720-915-8",
    language: "English",
    author: "Violetta Bartela",
    contribution: "Introduction by Fr. Kazimierz Ligeza, Ph.D.",
    recommended: true,
    sku: "",
    category: "Books",
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

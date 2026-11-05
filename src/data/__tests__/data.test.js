import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import {
  books,
  publishedBooks,
  featuredBooks,
  getBookBySlug,
  getRelatedBooks,
} from "../books.js";
import { cds, publishedCds } from "../cds.js";
import {
  products,
  STORE_CATEGORIES,
  productCounts,
  getProductBySlug,
  isPurchasable,
} from "../catalog.js";
import {
  publications,
  availableCategories,
  availableLanguages,
  featuredPublications,
  getPublicationBySlug,
  getRelatedPublications,
  publicationCounts,
} from "../publications.js";
import { SHOW_DRAFTS } from "../../config/content.js";

const expectUniqueSlugs = (items) => {
  const slugs = new Set();
  items.forEach((item) => {
    expect(typeof item.slug).toBe("string");
    expect(item.slug.length).toBeGreaterThan(0);
    expect(slugs.has(item.slug)).toBe(false);
    slugs.add(item.slug);
  });
};

const expectImageExists = (publicPath) => {
  expect(typeof publicPath).toBe("string");
  const full = path.resolve("public", publicPath.replace(/^\//, ""));
  expect(fs.existsSync(full)).toBe(true);
};

describe("books data", () => {
  it("has the expected field shape", () => {
    books.forEach((book) => {
      expect(typeof book.id).not.toBe("undefined");
      expect(typeof book.title).toBe("string");
      expect(typeof book.description).toBe("string");
      expect(typeof book.longDescription).toBe("string");
      expect(typeof book.price).toBe("number");
      expect(typeof book.featured).toBe("boolean");
      expect(typeof book.available).toBe("boolean");
      expect(typeof book.published).toBe("boolean");
      expect(typeof book.sku).toBe("string");
      expect(typeof book.shippingEligible).toBe("boolean");
      expect(book.inventory === null || typeof book.inventory === "number").toBe(true);
      expectImageExists(book.image);
    });
    expectUniqueSlugs(books);
  });

  it("keeps draft fixtures clearly labelled and published items real", () => {
    books.forEach((book) => {
      if (book.published) {
        expect(book.title.toLowerCase()).not.toContain("[placeholder]");
      } else {
        expect(book.title.toLowerCase()).toContain("[placeholder]");
      }
    });
  });

  it("published selector respects draft mode", () => {
    if (SHOW_DRAFTS) {
      expect(publishedBooks.length).toBe(books.length);
    } else {
      expect(publishedBooks.every((b) => b.published === true)).toBe(true);
    }
  });

  it("draft lookups are hidden in production mode", () => {
    const draft = books.find((b) => b.published === false);
    if (draft && !SHOW_DRAFTS) {
      expect(getBookBySlug(draft.slug)).toBeUndefined();
    }
  });

  it("related helpers return published items only", () => {
    const related = getRelatedBooks("nope", 3);
    expect(related.length).toBeLessThanOrEqual(3);
    if (!SHOW_DRAFTS) related.forEach((b) => expect(b.published).toBe(true));
  });

  it("featuredBooks returns at most three", () => {
    expect(featuredBooks.length).toBeLessThanOrEqual(3);
  });
});

describe("cds data", () => {
  it("has the expected field shape", () => {
    cds.forEach((item) => {
      expect(typeof item.title).toBe("string");
      expect(typeof item.description).toBe("string");
      expect(typeof item.published).toBe("boolean");
      expect(typeof item.shippingEligible).toBe("boolean");
      expectImageExists(item.image);
    });
    expectUniqueSlugs(cds);
  });

  it("publishes the real CD", () => {
    const cd = publishedCds.find((c) => c.slug === "hallelujah-golden-light-of-resurrection");
    if (!SHOW_DRAFTS) {
      expect(cd).toBeDefined();
      expect(cd.title).toMatch(/hallelujah/i);
    }
  });
});

describe("unified product catalog", () => {
  it("derives products from his published books and CDs", () => {
    const ownBooks = publishedBooks.filter((b) => !b.recommended);
    expect(products.length).toBe(ownBooks.length + publishedCds.length);
  });

  it("keeps recommended (other-author) books out of his store", () => {
    products.forEach((p) => expect(p.recommended).not.toBe(true));
  });

  it("has one entry per product (no duplicates)", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    const keys = products.map((p) => `${p.category}:${p.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("categories are Books and CDs only", () => {
    expect(STORE_CATEGORIES).toEqual(["Books", "CDs"]);
    products.forEach((p) => expect(STORE_CATEGORIES).toContain(p.category));
  });

  it("every product carries a language group", () => {
    products.forEach((p) => {
      expect(["English", "Polish", "Other"]).toContain(p.languageGroup);
    });
  });

  it("keeps English and Polish books in distinct groups", () => {
    const english = products.filter((p) => p.category === "Books" && p.languageGroup === "English");
    const polish = products.filter((p) => p.category === "Books" && p.languageGroup === "Polish");
    expect(english.length).toBeGreaterThan(0);
    expect(polish.length).toBeGreaterThan(0);
    english.forEach((p) => expect(p.language).toBe("English"));
    polish.forEach((p) => expect(p.language).toBe("Polish"));
  });

  it("excludes drafts in production mode", () => {
    if (!SHOW_DRAFTS) {
      expect(products.every((p) => p.published === true)).toBe(true);
    }
  });

  it("every product carries e-commerce fields", () => {
    products.forEach((p) => {
      expect(typeof p.sku).toBe("string");
      expect(p.inventory === null || typeof p.inventory === "number").toBe(true);
      expect(typeof p.shippingEligible).toBe("boolean");
      expect(typeof p.purchasable).toBe("boolean");
    });
  });

  it("isPurchasable requires available AND a real price", () => {
    expect(isPurchasable({ available: true, price: 0 })).toBe(false);
    expect(isPurchasable({ available: false, price: 20 })).toBe(false);
    expect(isPurchasable({ available: true, price: 20 })).toBe(true);
  });

  it("productCounts matches the catalog", () => {
    STORE_CATEGORIES.forEach((category) => {
      const actual = products.filter((p) => p.category === category).length;
      expect(productCounts[category]).toBe(actual);
    });
  });

  it("lookup returns undefined for unknown slug", () => {
    expect(getProductBySlug("nonexistent")).toBeUndefined();
  });
});

describe("normalized publications", () => {
  it("has one record per published work and unique slugs", () => {
    const slugs = publications.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("carries the normalized fields needed by cards and filters", () => {
    publications.forEach((item) => {
      expect(typeof item.title).toBe("string");
      expect(typeof item.category).toBe("string");
      expect(typeof item.language).toBe("string");
      expect(typeof item.authorLine).toBe("string");
      expect(Array.isArray(item.authors)).toBe(true);
      expect(Array.isArray(item.contributors)).toBe(true);
      expect(typeof item.searchText).toBe("string");
      expect(["English", "Polish", "Other"]).toContain(item.languageGroup);
      if (item.image) expectImageExists(item.image);
    });
  });

  it("only exposes categories that contain publications", () => {
    expect(availableCategories.length).toBeGreaterThan(0);
    availableCategories.forEach((category) => {
      expect(publicationCounts[category]).toBeGreaterThan(0);
    });
    expect(availableCategories).toContain("Books");
    expect(availableCategories).toContain("Prayer Books");
    expect(availableCategories).toContain("Articles");
    expect(availableCategories).toContain("Other");
  });

  it("lists languages actually present in the catalogue", () => {
    expect(availableLanguages).toContain("English");
    expect(availableLanguages).toContain("Polish");
    availableLanguages.forEach((language) =>
      expect(publications.some((item) => item.language === language)).toBe(true)
    );
  });

  it("attributes Archangels Near Us to its cover author, not Father Kaz", () => {
    const item = getPublicationBySlug("archangels-near-us");
    expect(item).toBeDefined();
    expect(item.authors).toEqual(["Lidia Frydzińska-Świątczak"]);
    expect(item.authors).not.toContain("Rev. Kazimierz Ligęza, PhD");
    expect(item.category).toBe("Prayer Books");
  });

  it("attributes Saint Rita to Paweł Piotrowski with Father Kaz's introduction", () => {
    const item = getPublicationBySlug("saint-rita-in-moments-of-helplessness");
    expect(item).toBeDefined();
    expect(item.authors).toEqual(["Paweł Piotrowski"]);
    expect(item.contributors).toEqual([
      { name: "Rev. Kazimierz Ligęza, PhD", role: "Introduction" },
    ]);
    expect(item.subtitle).toBe("Prayer Book");
    expect(item.category).toBe("Prayer Books");
  });

  it("returns featured publications and related items safely", () => {
    expect(featuredPublications.length).toBeLessThanOrEqual(3);
    const related = getRelatedPublications("archangels-near-us", 3);
    expect(related.length).toBeLessThanOrEqual(3);
    related.forEach((item) => expect(item.slug).not.toBe("archangels-near-us"));
  });

  it("returns undefined for an unknown publication slug", () => {
    expect(getPublicationBySlug("nonexistent")).toBeUndefined();
  });
});

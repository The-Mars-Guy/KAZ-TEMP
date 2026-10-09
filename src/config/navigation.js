// src/config/navigation.js
// Central navigation + external link definitions, shared by Header and Footer.

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/store", label: "Store" },
  { to: "/contact", label: "Contact" },
];

/** Primary group shown in the footer "Explore" column. */
export const FOOTER_LINKS = [
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/store", label: "Store" },
  { to: "/contact", label: "Contact" },
];

/** External organizations referenced by the site (reference only). */
export const EXTERNAL_LINKS = [
  { href: "https://www.crosscatholic.org/", label: "Cross Catholic Outreach" },
  { href: "https://www.diecezja.tarnow.pl/", label: "Diocese of Tarnów" },
];

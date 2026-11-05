// src/config/navigation.js
// Central navigation + external link definitions, shared by Header and Footer.

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Father Kaz" },
  { to: "/academic-work", label: "Academic Work" },
  { to: "/ministry", label: "Ministry & Service" },
  { to: "/publications", label: "Publications" },
];

/** Primary group shown in the footer "Explore" column. */
export const FOOTER_LINKS = [
  { to: "/about", label: "About Father Kaz" },
  { to: "/academic-work", label: "Academic Work" },
  { to: "/ministry", label: "Ministry & Service" },
  { to: "/publications", label: "Publications" },
  { to: "/contact", label: "Contact" },
];

/** External organizations and references (reference only). */
export const EXTERNAL_LINKS = [
  { href: "https://www.crosscatholic.org/", label: "Cross Catholic Outreach" },
  { href: "https://www.diecezja.tarnow.pl/", label: "Diocese of Tarnów" },
  { href: "https://www.wydawnictwopetrus.pl/", label: "Wydawnictwo Petrus" },
];

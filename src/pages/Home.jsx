// src/pages/Home.jsx
// The landing page is deliberately just the hero: maps, portrait, identity, and
// the two destinations. Everything else lives on the About, Academic, Ministry,
// and Publications pages.

import React from "react";
import Seo from "../components/Seo.jsx";
import PolandUsHero from "../components/PolandUsHero.jsx";

import "../styles/home.css";

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <PolandUsHero />
    </>
  );
}

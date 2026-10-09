// src/components/Layout.jsx
// Page shell: skip link, header, routed main, footer.

import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import SkipLink from "./SkipLink.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <SkipLink />
      <Header />
      <ScrollToTop />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

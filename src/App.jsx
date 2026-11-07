// src/App.jsx
// The site is small enough to ship one page bundle: this avoids a route-level
// loading fallback and the layout shift it caused on first paint.

import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AcademicWork from "./pages/AcademicWork.jsx";
import Ministry from "./pages/Ministry.jsx";
import Publications from "./pages/Publications.jsx";
import PublicationDetail from "./pages/PublicationDetail.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

/** Compatibility redirect: the old standalone Books page. */
function BooksRedirect() {
  return <Navigate to="/publications" replace />;
}

/** Compatibility redirect: the old Store page. */
function StoreRedirect() {
  return <Navigate to="/publications" replace />;
}

/** Compatibility redirect: old book detail URLs. */
function BookDetailRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/publications/${slug}` : "/publications"} replace />;
}

export default function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic-work" element={<AcademicWork />} />
          <Route path="/ministry" element={<Ministry />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:slug" element={<PublicationDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Legacy destinations — keep old links working. */}
          <Route path="/books" element={<BooksRedirect />} />
          <Route path="/books/:slug" element={<BookDetailRedirect />} />
          <Route path="/store" element={<StoreRedirect />} />
          <Route path="/store/:slug" element={<BookDetailRedirect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}

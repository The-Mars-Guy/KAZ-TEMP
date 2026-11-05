// src/App.jsx
// Routes are code-split with React.lazy so the initial bundle stays small;
// each page (and its data) loads on demand.

import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const AcademicWork = lazy(() => import("./pages/AcademicWork.jsx"));
const Ministry = lazy(() => import("./pages/Ministry.jsx"));
const Publications = lazy(() => import("./pages/Publications.jsx"));
const PublicationDetail = lazy(() => import("./pages/PublicationDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function RouteFallback() {
  return (
    <div className="container" style={{ paddingBlock: "var(--space-10)" }}>
      <p className="field__hint" role="status">
        Loading…
      </p>
    </div>
  );
}

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
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

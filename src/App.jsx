// src/App.jsx
// Routes are code-split with React.lazy so the initial bundle stays small;
// each page (and its data) loads on demand.

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Books = lazy(() => import("./pages/Books.jsx"));
const BookDetail = lazy(() => import("./pages/BookDetail.jsx"));
const Store = lazy(() => import("./pages/Store.jsx"));
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

export default function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:slug" element={<BookDetail />} />
            <Route path="/store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

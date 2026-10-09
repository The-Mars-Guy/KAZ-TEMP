// src/components/ErrorBoundary.jsx
// Catches render-time errors so a single broken page never blanks the site.

import React from "react";
import Button from "./Button.jsx";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface the error for local debugging without breaking the UI.
    // eslint-disable-next-line no-console
    console.error("Page render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section not-found">
          <div className="container">
            <span className="eyebrow">Error</span>
            <h1>Something went wrong</h1>
            <p className="lead">
              We're sorry — this page failed to load. Please try again, or return
              to the home page.
            </p>
            <nav className="not-found__links" aria-label="Helpful links">
              <Button to="/" variant="primary">
                Back to Home
              </Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </nav>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

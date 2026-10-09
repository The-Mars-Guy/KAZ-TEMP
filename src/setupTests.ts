import "@testing-library/jest-dom";

// jsdom does not implement scrollTo; stub it so ScrollToTop does not warn.
if (typeof window !== "undefined") {
  window.scrollTo = () => {};
}

// jsdom lacks matchMedia; provide a minimal stub for components/queries that
// may reference it. (No responsive JS is used by the current Header.)
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

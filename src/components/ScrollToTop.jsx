// src/components/ScrollToTop.jsx
// Resets scroll position on route change and moves focus to the main landmark
// so SPA navigation is announced to keyboard and screen-reader users.

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const main = document.getElementById("main-content");
    if (main) main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

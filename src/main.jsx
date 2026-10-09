// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/cards.css";
import "./styles/pages.css";

// BASE_URL is '/' for a custom domain and '/KAZ-TEMP/' on a GitHub Pages
// project site, so routing works in both places.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

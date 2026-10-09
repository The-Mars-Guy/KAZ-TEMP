// scripts/postbuild.mjs
//
// Build-time SEO step for a Vite SPA deployed to Cloudflare Pages.
//
// 1. Reads the built dist/index.html (the Vite shell).
// 2. Emits a static HTML file per route with route-specific <title>, meta,
//    canonical, Open Graph / Twitter tags baked into the <head>, so crawlers
//    and social scrapers see correct metadata without executing JS. The React
//    app then mounts on top as usual.
// 3. Writes dist/sitemap.xml from the same route list.
//
// PUBLISHING: detail routes and the sitemap are generated from PUBLISHED content
// only (see src/data/books.js `publishedBooks` + src/config/content.js). Draft
// fixtures are excluded unless VITE_SHOW_DRAFTS=true (staging preview). Draft
// detail routes are never emitted, so they cannot be indexed.
//
// Run automatically by `npm run build`. No extra dependencies.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SITE, resolveSeo, PAGE_META } from "../src/config/site.js";
import { publishedBooks } from "../src/data/books.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SHELL = path.join(DIST, "index.html");

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Static pages always exist, except the 404 (not sitemapped).
const STATIC_ROUTES = Object.keys(PAGE_META).filter((route) => route !== "/404");

const routes = [
  ...STATIC_ROUTES.map((route) => ({ path: route })),
  ...publishedBooks.map((b) => ({
    path: `/books/${b.slug}`,
    title: b.title,
    description: b.description,
    type: "book",
  })),
];

function injectMeta(html, { path: routePath, title, description, type, noindex = false }) {
  const meta = resolveSeo({ path: routePath, title, description, type: type || "website" });

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.fullTitle)}</title>`);
  out = out.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(meta.description)}" />`
  );
  out = out.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(meta.url)}" />`
  );
  out = out.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(meta.fullTitle)}" />`
  );
  out = out.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(meta.description)}" />`
  );
  out = out.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${esc(meta.url)}" />`
  );
  out = out.replace(
    /<meta property="og:image"[^>]*>/,
    `<meta property="og:image" content="${esc(meta.image)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${esc(meta.fullTitle)}" />`
  );
  out = out.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`
  );
  out = out.replace(
    /<meta name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`
  );

  if (noindex) {
    out = out.replace(
      /<meta name="robots"[^>]*>/,
      `<meta name="robots" content="noindex, follow" />`
    );
  }

  out = out.replace("<!--PRERENDER-->", "");
  return out;
}

function outFileFor(routePath) {
  // Emit sibling .html files (dist/about.html, dist/books/<slug>.html) rather
  // than directory index files. Cloudflare Pages serves `/about` from
  // `about.html` with NO trailing-slash redirect, so the served URL matches the
  // canonical (which has no trailing slash). Unknown paths fall back to the SPA
  // shell via Pages' automatic SPA behavior.
  if (routePath === "/") return path.join(DIST, "index.html");
  return path.join(DIST, `${routePath.replace(/^\//, "")}.html`);
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE.url}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
  if (!fs.existsSync(SHELL)) {
    console.error(`[postbuild] missing ${SHELL} — run vite build first.`);
    process.exit(1);
  }

  const shell = fs.readFileSync(SHELL, "utf8");
  let written = 0;

  for (const route of routes) {
    const html = injectMeta(shell, route);
    const target = outFileFor(route.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html, "utf8");
    written += 1;
  }

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap(), "utf8");

  // SPA fallback for hosts that serve a 404 page (e.g. GitHub Pages): unknown
  // paths render the app, which then shows the in-app Not Found route.
  const notFoundHtml = injectMeta(shell, {
    path: "/404",
    title: "Page Not Found",
    noindex: true,
  });
  fs.writeFileSync(path.join(DIST, "404.html"), notFoundHtml, "utf8");

  const detailCount = routes.length - STATIC_ROUTES.length;
  console.log(
    `[postbuild] prerendered ${written} routes (${detailCount} detail) + 404.html + sitemap.xml`
  );
}

main();

# Deployment — Father Kaz Ligeza (frkazligeza.com)

The site is a static React + Vite SPA. `npm run build` produces a fully static
`dist/` folder plus:

- a prerendered **sibling `.html` file per route** (`dist/about.html`,
  `dist/books/<slug>.html`, …) with route-specific `<title>`, meta, canonical,
  Open Graph, and JSON-LD baked into `<head>` — so crawlers and social scrapers
  see correct metadata without executing JS;
- `sitemap.xml` (published routes only);
- `robots.txt`;
- `_redirects` and `_headers` — both understood natively by Cloudflare Pages.

> **Routing note.** `_redirects` deliberately contains **no catch-all**. Per
> Cloudflare's docs, `_redirects` rules run *before* static assets and are
> "always followed, regardless of whether or not an asset matches". A
> `/* /index.html 200` rule would override the prerendered files and discard
> their metadata. Instead the build emits sibling `.html` files and relies on
> Pages' built-in behavior: serve the matching static file, else fall back to the
> SPA shell. Do **not** re-add a catch-all.

---

## 1. Build locally

```bash
npm ci
npm run build     # vite build + prerender (scripts/postbuild.mjs)
npm run preview   # serve dist/ locally
npm test          # vitest
```

Output: `dist/`.

## 2. Cloudflare Pages settings

| Setting              | Value            |
| -------------------- | ---------------- |
| Framework preset     | None / Vite      |
| Build command        | `npm run build`  |
| Build output directory | `dist`         |
| Node version         | 18 or 20         |

Environment variables (optional, see `.env.example`):

- `VITE_SITE_URL` — defaults to `https://frkazligeza.com` in `src/config/site.js`.
- `VITE_CONTACT_ENDPOINT` — leave unset until a contact backend exists.
- `VITE_SHOW_DRAFTS` — leave unset/`false` on production. Set `true` only on a
  staging/preview deployment to review draft fixtures.

Connect the repository in the Cloudflare dashboard (Workers & Pages → Create →
Pages → Connect to Git), or deploy with Wrangler:

```bash
npm i -g wrangler
wrangler pages deploy dist --project-name frkazligeza
```

## 3. Custom domain

1. Cloudflare dashboard → Workers & Pages → your Pages project → **Custom
   domains** → **Set up a custom domain** → add `frkazligeza.com`.
2. Add `www.frkazligeza.com` as a second custom domain, or create a redirect
   rule so `www` → apex:
   - **Rules → Redirect Rules → Create**: when hostname equals
     `www.frkazligeza.com`, redirect to `https://frkazligeza.com/$1`, status
     `301`.
3. HTTPS is provisioned automatically once DNS resolves through Cloudflare.

> DNS changes are intentionally NOT performed by this repo. Apply them in the
> Cloudflare dashboard with authorization.

## 4. Direct-navigation / refresh

The build emits a sibling `.html` per route (`about.html`,
`books/<slug>.html`, …). Cloudflare Pages serves `/about` from `about.html`
with no trailing-slash redirect, and falls back to the SPA shell for unmatched
paths — so deep links such as `/books/<slug>` work on refresh, with the correct
route-specific metadata in the served HTML.

`public/_redirects` intentionally defines **no** catch-all (see the routing note
above). If a future route genuinely needs a rewrite, add a specific rule there.

## 4a. Draft vs. published content

Content records carry `published: true | false` (see `src/config/content.js`):

- **Local dev / staging** — drafts render (default `VITE_SHOW_DRAFTS=true` under
  `vite dev`, or set `true` on a preview deployment) so layouts can be reviewed.
- **Production** — only `published: true` records ship. Draft detail routes are
  not emitted by the prerender and are excluded from `sitemap.xml`, so they
  cannot be indexed.

To publish a record: replace its placeholder fields with verified content and set
`published: true`. To publish nothing yet, leave the fixtures as-is — the public
pages show graceful "coming soon" states instead of placeholder data.

## 5. Future e-commerce (Phase 2) — integration boundaries

The frontend is already prepared; nothing below is implemented yet.

- **Product catalog** — `src/data/catalog.js` is the single source of truth and
  already carries `sku`, `inventory`, `shippingEligible`, `category`, `price`.
  Swap the static imports for a `fetch('/api/products')` call returning the same
  shape.
- **Cart / checkout** — `src/components/AddToCartPlaceholder.jsx` is the swap
  point. Replace the disabled control with a real cart action, then redirect to
  a Stripe Checkout session created **server-side**.
- **Cloudflare Worker + D1** — add a `/functions` directory (Pages Functions) or
  a separate Worker. Store orders, order status, and tracking numbers in D1.
- **Stripe** — create Checkout sessions on the server only. Verify webhooks with
  the signing secret. **Never expose `STRIPE_SECRET_KEY` to the browser**; only a
  publishable key may be client-side, and even that only if required.
- **Contact form** — set `VITE_CONTACT_ENDPOINT` to a Worker route that sends
  email; the form already POSTs JSON and only reports success on HTTP 2xx.
  Requirements for that backend: re-validate every field server-side, enforce
  rate limiting, add spam protection (the form already sends a `company`
  honeypot field — reject when non-empty; add Turnstile if needed), and send via
  a transactional provider with a verified From domain.

Server-side secrets (Stripe keys, D1 binding, email API keys) belong in the
Cloudflare Worker environment — not in this repo and not in `VITE_` variables.

## 6. Post-deploy checklist

- [ ] `https://frkazligeza.com/` loads over HTTPS.
- [ ] Deep link refresh works (e.g. `/books/<slug>` for a published book).
- [ ] View-source `/about` shows a route-specific `<title>` and canonical (the
      prerendered `about.html` is served, not the generic SPA shell).
- [ ] `https://frkazligeza.com/sitemap.xml` and `/robots.txt` respond.
- [ ] `sitemap.xml` lists only published routes (no draft slugs).
- [ ] `www` redirects (301) to the apex domain.
- [ ] Google Search Console: add the domain and submit the sitemap.

# DESIGN.md — Rev. Kazimierz Ligęza, PhD

## Atmosphere / identity
Scholarly, warm, reverent. A priest-author's study rather than a commercial
storefront. The public identity is **Father Kaz Ligęza**; the formal identity is
**Rev. Kazimierz Ligęza, PhD** (Polish diacritics preserved everywhere).

Central triad: **Priest · Author · Scholar**.

## Color (tokens in `src/styles/global.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f8f4ec` | Warm ivory page background |
| `--surface` | `#fffdf8` | Cards, panels, inputs |
| `--cream` | `#f1eadc` | Deeper ivory bands |
| `--primary` | `#6b1f2a` | Burgundy — actions, links, accents |
| `--primary-dark` | `#3f1218` | Deep burgundy — footer, ink bands |
| `--gold` | `#a8863f` | Antique gold — rules, borders, accents |
| `--gold-light` | `#d6c08a` | Light gold — decorative accents |
| `--gold-text` | `#6f5626` | Darker gold for small text (AA on `--bg`) |
| `--navy` | `#1f2a3a` | Scholarly navy (restrained secondary) |
| `--text` | `#24211d` | Body text |
| `--muted` | `#5f5a52` | Secondary text |
| `--border` | `#e2dbcd` | Dividers / outlines |

Use `--gold-text` (not `--gold`) for small uppercase text so it meets AA contrast.

## Typography
- **Display**: Cormorant Garamond — headings, hero, pull-quotes.
- **Body**: Source Serif 4 — long-form prose, descriptions.
- **Interface**: Inter — nav, labels, buttons, eyebrows, metadata.

Scale tokens: `--size-h1..h4`, `--size-body`, `--size-lead`, `--size-small`,
`--size-caption`. Line-height 1.7 body / 1.15 headings.

## Spacing / layout
- 4px grid via `--space-1..10`.
- Container `--max-width: 1200px`; prose `--content-width: 70ch`.
- Sections: `.section` (+ `--tight`, `--surface`, `--cream`, `--ink`).
- Breakpoints: 480 / 600 / 768 / 992 / 1200.

## Components
- **Button**: `.btn` + `.btn--primary|secondary|ghost|gold`; sizes `--sm`/`--lg`,
  `--block`; `--lg` for hero/CTA.
- **Publication card**: `.card--publication`; cover aspect 2:3, object-fit
  contain; typographic fallback cover for articles.
- **Field**: `.field`, `.field__label/input/select`, `.field__error`.
- **Notice**: `.notice` — informational messaging.
- **Badges**: `.badge--available` / `.badge--unavailable`; `.price` / `.price--placeholder`.

## Homepage hero
The hero is the visual signature: an accurate Poland silhouette on the left and
an accurate contiguous-United States silhouette on the right, slightly
overlapping, with the professional portrait centered between them. The SVG paths
are generated from Natural Earth geometry (`scripts/generate-maps.mjs`) and are
**not** redrawn or distorted. The portrait sits in an arch/rounded frame with a
thin gold rule. On mobile the composition stacks/simplifies but keeps both
countries and the portrait. The handwritten sketch is a design reference only
and never appears on the site.

## Motion / interaction
- Transition 200ms ease-out; restrained hover lift/scale.
- `prefers-reduced-motion` disables motion globally.
- No heavy animation, parallax, or autoplay.

## Accessibility
- `:focus-visible` 3px `--primary` outline, 3px offset.
- Visible skip link, semantic landmarks, single `<h1>` per page.
- Form labels + `aria-invalid` + `aria-describedby` error text.
- Publications filters: native labels, `aria-live` result count, keyboard
  operation, empty state, reset.
- Image alt text is factual; captions do not invent events, people, or places.

## Depth / surface
1px `--border` outlines; restrained `--shadow-md` on cards and `--shadow-lg` on
the hero portrait. No gradients beyond subtle tonal washes.

## Architecture notes
- `src/config/site.js` — branding, domain, per-route SEO; single source of truth.
- `src/config/navigation.js` — primary nav (Home, About Father Kaz, Academic
  Work, Ministry & Service, Publications) + footer + external links.
- `src/data/books.js` — book/prayer-book records, including contributor roles.
- `src/data/cds.js` — audio recordings.
- `src/data/articles.js` — selected verified journal articles.
- `src/data/publications.js` — normalized publication model + filter helpers.
- `src/data/contentNotes.js` — internal verification notes; never rendered.
- `src/assets/maps.js` — generated accurate country silhouettes.
- `src/data/catalog.js` — retained e-commerce integration boundary (no checkout).
- `scripts/postbuild.mjs` — build-time prerender + sitemap.
- `scripts/generate-maps.mjs` — regenerates the country silhouettes.
- `scripts/prepare-images.py` — regenerates responsive photo variants from the
  numbered replace-me kit.
- `public/images/replace-me/` — numbered image replacement kit (see its README).

## Sections
Home · About Father Kaz · Academic Work · Ministry & Service · Publications
(+ publication detail) · Contact · 404. The old Books and Store pages are
permanently redirected to Publications; no duplicate catalogue exists.

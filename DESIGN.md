# DESIGN.md — Father Kaz Ligeza

## Atmosphere / Identity
Scholarly, warm, reverent. Serif-led heritage feel, contemplative reading, like
a priest-author's study. Primary public identity: **Father Kaz Ligeza**
(`Rev. Kazimierz Ligeza, Ph.D.` as secondary).

## Color (tokens in `src/styles/global.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f7f4ed` | Warm cream page background |
| `--surface` | `#ffffff` | Cards, panels, inputs |
| `--primary` | `#651f28` | Burgundy — primary actions, links |
| `--primary-dark` | `#43141a` | Deep burgundy — footer, hovers |
| `--gold` | `#9b7b3d` | Antique gold — accents, rules, borders |
| `--gold-light` | `#c5ad76` | Light gold — decorative accents |
| `--gold-text` | `#6f5626` | Darker gold for small text (WCAG AA on `--bg`) |
| `--text` | `#25221e` | Dark charcoal body text |
| `--muted` | `#706b63` | Secondary text |
| `--border` | `#ddd7ca` | Dividers / outlines |

Use `--gold-text` (not `--gold`) for small uppercase text so it meets AA contrast.

## Typography
- **Display**: Cormorant Garamond — headings, hero, pull-quotes.
- **Body**: Source Serif 4 — long-form prose, descriptions.
- **Interface**: Inter — nav, labels, buttons, eyebrows, metadata.

Scale tokens: `--size-h1..h4`, `--size-body`, `--size-lead`, `--size-small`,
`--size-caption`. Line-height 1.7 body / 1.15 headings.

## Spacing / Layout
- 4px grid via `--space-1..10`.
- Container `--max-width: 1200px`; prose `--content-width: 70ch`.
- Sections: `.section` (+ `--tight`, `--surface`, `--ink`).
- Breakpoints: 480 / 768 / 992 / 1200 (plus 600 for card-grid columns).

## Components
- **Button**: `.btn` + `.btn--primary|secondary|ghost|gold`, sizes `--sm`/`--lg`,
  `--block`; `--lg` for hero/CTA.
- **Card**: `.card` with modifiers `--book`, `--product`; consistent media aspect ratios.
- **Field**: `.field`, `.field__label/input/select/textarea`, `.field__error`.
- **Notice**: `.notice` — placeholder / preview messaging.
- **Badges**: `.badge--available` / `.badge--unavailable`; `.price` / `.price--placeholder`.

## Motion / Interaction
- Transition 200ms ease-out; hover lift/scale restrained.
- `prefers-reduced-motion` disables motion globally.

## Accessibility
- `:focus-visible` 2px `--primary` outline, 3px offset.
- Visible skip link, semantic landmarks, single `<h1>` per page.
- Form labels + `aria-invalid` + `aria-describedby` error text.

## Depth / Surface
1px `--border` outlines, restrained `--shadow-md` on hover only. No gradients
beyond the hero's subtle cream→gold radial wash. Max z-index 100 (skip link).

## Architecture notes
- `src/config/site.js` — branding, domain, per-route SEO; the single source of truth.
- `src/config/navigation.js` — nav + footer + external links (Home, About, Books, Store, Contact).
- `src/config/content.js` — draft/published content control.
- `src/data/books.js` — book/publication records; `src/data/cds.js` — audio CDs; `src/data/catalog.js` — de-duplicated store catalog (future Stripe/D1).
- `scripts/postbuild.mjs` — build-time prerender + sitemap generation.

## Sections
Home · About · Books (+ detail) · Store · Contact · 404. Articles, Homilies,
Audio, and Speaking were intentionally removed to keep the site focused.

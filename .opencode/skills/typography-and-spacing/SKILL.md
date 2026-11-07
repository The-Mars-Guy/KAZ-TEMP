---
name: typography-and-spacing
description: Enforce the Father Kaz site's typography, measure, weight, and spacing standards. Use when editing headings, body copy, labels, cards, sections, forms, or CSS tokens on this project.
---

# Typography and spacing standards

Source of truth: the tokens in `src/styles/global.css` and the decisions in `DESIGN.md`.
If a rule here conflicts with a token, the token wins; update both together.

## 1. Families and loading

| Role | Family | Fallbacks |
| --- | --- | --- |
| Display | Cormorant Garamond | Iowan Old Style, Georgia, Times New Roman, serif |
| Body | Source Serif 4 | Iowan Old Style, Georgia, Times New Roman, serif |
| Interface | Libre Franklin | Franklin Gothic Medium, system sans stack |

- Do not add a fourth family.
- Display is for headings, hero type, and pull quotes only.
- Body is for prose and descriptions. Never use display type for body copy.
- Interface is for navigation, buttons, labels, captions, metadata, filters, and forms.
- Fonts load from Google Fonts in `index.html` with `display=swap` and preconnect.
  If self-hosting later, keep the same families and weights.
- Allowed weights: **400** body; **500** secondary display, H4, nav, small labels;
  **600** headings, buttons, eyebrows, strong. **700** is not used in the current
  system; introduce it only for display type above 40px and document why.
- Italic is reserved for pull quotes and quote citations. Display italic must have
  `line-height >= 1.25`; body italic inherits the body line height of `1.75`.

## 2. Type scale by role

Do not use sizes outside this table.

| Role | Token | Value | Family | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| H1 / hero | `--size-h1` | `clamp(2.4rem, 1.6rem + 3.2vw, 3.75rem)` | Cormorant | 600 | `1.03–1.15` | `-0.02em` to `-0.03em` |
| H2 | `--size-h2` | `clamp(1.9rem, 1.4rem + 2vw, 2.75rem)` | Cormorant | 600 | `1.15` | `-0.01em` |
| H3 | `--size-h3` | `clamp(1.5rem, 1.2rem + 1.1vw, 2rem)` | Cormorant | 600 | `1.15` | `-0.01em` |
| H4 | `--size-h4` | `clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)` | Cormorant | 500 | `1.15` | `-0.01em` |
| Lead | `--size-lead` | `clamp(1.2rem, 1.05rem + 0.6vw, 1.4rem)` | Source Serif | 400 | `1.6` | `0` |
| Body | `--size-body` | `1.125rem` / 18px | Source Serif | 400 | `1.75` | `0` |
| Small | `--size-small` | `1rem` / 16px | Source Serif or Libre Franklin | 400–500 | `1.6–1.75` | `0–0.04em` |
| Caption / label | `--size-caption` | `0.9375rem` / 15px | Libre Franklin | 500–600 | `1.4–1.6` | `0.04–0.08em` |
| Pull quote | component | `clamp(1.7rem, 1.3rem + 1.8vw, 2.6rem)` | Cormorant italic | 500 | `1.25` | `0` |

- **15px is the floor.** Never ship body copy or captions below 15px.
- Body text is 18px. Do not shrink it to fit a container; let the container reflow.
- Headings use **weight and color** for hierarchy as well as size. Do not make every
  heading larger than the last one.
- No single-word color/italic accent inside a headline.
- `strong` / `b` is **600**, not a jump to 700.

## 3. Measure

- Body prose: `max-width: var(--content-width)` — **70ch**.
- Hero intro: **58ch**.
- Section heading block: **62ch**.
- Pull quotes: **22ch**.
- Do not run body copy across the full container. If a paragraph is wider than
  **75ch**, wrap it in `.prose` or a `--content-width` container.
- Text is left-aligned in prose. Center only hero copy, section headings, quotes,
  and short CTA panels. Never justify.

## 4. Spacing scale

Use `var(--space-*)` for all layout padding, margin, and gap.

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | 4px | Hairline offsets, tight inline gaps |
| `--space-2` | 8px | Inside labels, icon gaps |
| `--space-3` | 12px | Field gaps, compact lists |
| `--space-4` | 16px | Buttons, card body gaps |
| `--space-5` | 24px | Card padding, prose rhythm |
| `--space-6` | 32px | Card padding, group gaps |
| `--space-7` | 40px | Large group gaps |
| `--space-8` | 48px | Tight section padding, media gaps |
| `--space-9` | 64px | Section padding on mobile/tablet |
| `--space-10` | 96px | Section padding on desktop |

Rules:

- Space **between** groups must be larger than space **inside** them.
- `.section` uses `64px` on small screens and `96px` from `992px` up.
- `.section--tight` uses `48px`.
- Prose paragraphs use `--space-5` (24px) between blocks; headings use `--space-7`
  or `--space-8` above.
- Container max width: **1200px**; inline padding **24px** small, **48px** from
  `768px` up.
- Raw values are allowed only for: 1–3px borders/outlines, 44–48px interactive
  targets, 76px sticky header, 96px scroll padding, image dimensions, and optical
  insets inside decorative frames (≤12px). Do not use raw values for section
  rhythm or component padding.

## 5. Editorial structure

- Uppercase is allowed only for short UI chrome: navigation, buttons, badges,
  identity lines, and card metadata. Editorial eyebrows and section labels are
  **sentence case**.
- No all-caps eyebrow above every heading. At most one eyebrow per section, and
  only when it adds context the heading does not already provide.
- No numbered markers (`01 / 02 / 03`) unless the content is an actual sequence.
  Non-sequential three-column content uses hairline rules, not numbers.
- No middle-dot meta strings (`A · B · C`) except the required
  **Priest · Author · Scholar** tagline.
- Do not wrap every group in an identical card. Cards are for bounded, comparable
  items (publication covers, facts, form states), not for general page sections.
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Structural devices (rules, borders, captions, numbering) must encode information.
  Remove them when they only decorate.

## 6. Responsive rules

Breakpoints: **480 / 600 / 768 / 992 / 1200**.

- 320–480px: container padding 24px; one-column grids; hero may simplify; section
  padding 64px.
- 600px: two-column card grids where content supports it.
- 768px: container padding 48px; two-column text/media splits; three-column
  editorial triptychs.
- 992px: desktop navigation; three-column card grids; full hero composition.
- 1200px: max container 1200px; no further widening.
- Body measure stays at or below 75ch at every width.
- No fixed heights that clip text. No horizontal scrolling at 320, 375, 768, 1024,
  1440, 200% zoom, or 400% reflow.
- Inputs use at least 16px text on mobile to avoid browser zoom.

## 7. Accessibility checks

- Normal text: **4.5:1** minimum. Large text (≥24px, or ≥18.66px bold) and UI
  boundaries: **3:1** minimum.
- `--gold` is for decorative rules and large quote marks. For small text on ivory
  use `--gold-text`. Dark text on gold buttons must use `--primary-dark`; white on
  gold fails AA.
- Focus: 3px outline, 3px offset. Use `--primary` on ivory and `--gold-light` on
  burgundy/footer surfaces.
- Body line height is **1.75**, above the WCAG 1.5 text-spacing expectation.
- Use tabular figures (`font-variant-numeric: tabular-nums`) for prices, years,
  counts, specs, and timeline dates.
- Every heading level is semantic; one `<h1>` per page.
- Every control has a visible label; placeholders are examples, never labels.
- Respect `prefers-reduced-motion`.

## 8. Token and component discipline

- Use `var(--font-*)`, `var(--size-*)`, `var(--space-*)`, `var(--radius-*)`,
  `var(--shadow-*)`, and color tokens. Do not hardcode hex values, font names,
  font sizes, or layout spacing in page CSS.
- Reuse `.container`, `.section`, `.prose`, `.btn`, `.field`, `.card--publication`,
  `.eyebrow`, and `.section-head`. Do not create parallel variants of an existing
  component.
- If a new size, space, font, radius, or color is genuinely required, add the token
  to `src/styles/global.css` and update `DESIGN.md` in the same change.
- Do not add a dependency for typography or spacing that can be solved with tokens
  and CSS.

## Review checklist

- [ ] Only Cormorant Garamond, Source Serif 4, and Libre Franklin are used.
- [ ] Every size comes from the table above; body is 18px; no text below 15px.
- [ ] Body prose is ≤70ch; no paragraph exceeds 75ch.
- [ ] Headings are 600 (H4 500); body is 400; no unexplained 700.
- [ ] Padding, margin, and gap use `--space-*`; section rhythm is 64/96px.
- [ ] Editorial labels are sentence case; uppercase is confined to UI chrome and
      metadata.
- [ ] No numbered markers for non-sequential content; no eyebrow above every
      heading; no decorative middle-dot chains.
- [ ] Contrast passes at 4.5:1 / 3:1; focus rings are visible on light and dark
      surfaces.
- [ ] Numbers use tabular figures.
- [ ] 320/375/768/1024/1440px and 200%/400% zoom reflow without overflow or
      clipped text.
- [ ] No duplicate component styles or raw spacing values outside the allowed
      exceptions.

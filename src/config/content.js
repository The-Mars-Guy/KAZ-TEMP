// src/config/content.js
//
// Draft vs. published content control.
//
// Every content record carries `published: true | false`. Unpublished (draft)
// records are development fixtures: they render in `vite dev` and in staging
// previews (VITE_SHOW_DRAFTS=true) so layouts and assets can be reviewed, but
// they are EXCLUDED from the production site and from sitemap.xml.
//
// Default:
//   - local dev (`vite dev`)  → SHOW_DRAFTS = true  (browsable fixtures)
//   - production build        → SHOW_DRAFTS = false (only real content ships)
// Override explicitly with VITE_SHOW_DRAFTS=true|false at build/dev time.

import { envBool, IS_DEV } from "./env.js";

export const SHOW_DRAFTS = envBool("VITE_SHOW_DRAFTS", IS_DEV);

/**
 * Filter a collection to what may be shown publicly.
 * When draft mode is on (development/staging) every record is visible.
 */
export function selectPublished(items) {
  if (!Array.isArray(items)) return [];
  return SHOW_DRAFTS ? items : items.filter((item) => item && item.published === true);
}

/** True when an individual record may be shown publicly. */
export function isVisible(item) {
  if (!item) return false;
  return SHOW_DRAFTS ? true : item.published === true;
}

// src/config/contact.js
//
// Contact-form configuration.
//
// The delivery endpoint is supplied via the environment (VITE_CONTACT_ENDPOINT)
// rather than hardcoded. When it is empty, the form stays in its honest
// "not connected" state — it never simulates delivery.

import { envString } from "./env.js";
import { SITE } from "./site.js";

/** Endpoint that accepts a JSON POST and returns 2xx on acceptance. */
export const CONTACT_ENDPOINT = envString("VITE_CONTACT_ENDPOINT") || "";

/** True when a real delivery backend is configured. */
export const CONTACT_CONFIGURED = CONTACT_ENDPOINT !== "";

/**
 * A verified public email address, if one has been supplied in site config.
 * Used as an accessible alternative contact method.
 */
export const CONTACT_EMAIL = SITE.email || "";

/** Build a mailto: URL with a prefilled subject, or null when no email is set. */
export function contactMailto(subject) {
  if (!CONTACT_EMAIL) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT_EMAIL}${query}`;
}

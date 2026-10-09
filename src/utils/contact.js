// src/utils/contact.js
// Pure, dependency-free contact helpers — unit tested in contact.test.js.

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Speaking Invitation",
  "Book Inquiry",
  "Media Inquiry",
  "Other",
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EMPTY_CONTACT = { name: "", email: "", subject: "", message: "" };

/** Max lengths mirror the validation the future backend must also enforce. */
export const LIMITS = { name: 120, email: 254, message: 5000 };

/**
 * Validate contact form values.
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateContact(values = {}) {
  const errors = {};

  const name = (values.name || "").trim();
  const email = (values.email || "").trim();
  const subject = (values.subject || "").trim();
  const message = (values.message || "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > LIMITS.email) errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please choose a subject.";
  else if (!CONTACT_SUBJECTS.includes(subject)) errors.subject = "Please choose a listed subject.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Normalize values before sending (trim only — never mutate what we validate). */
export function normalizeContact(values = {}) {
  return {
    name: (values.name || "").trim(),
    email: (values.email || "").trim(),
    subject: (values.subject || "").trim(),
    message: (values.message || "").trim(),
    // Honeypot field: real users leave it empty. Backend must reject when filled.
    company: (values.company || "").trim(),
  };
}

/**
 * POST the contact payload to the configured endpoint.
 * Resolves only on an accepted (2xx) response; rejects otherwise.
 *
 * SECURITY NOTE for the future backend (Cloudflare Worker):
 *  - Re-validate every field server-side; never trust the client.
 *  - Enforce rate limiting + a spam check (honeypot above, and/or Turnstile).
 *  - Verify the recipient/From domain; send via a transactional provider.
 *
 * @param {object} payload
 * @param {string} endpoint
 * @param {{ fetchImpl?: typeof fetch }} [options]
 */
export async function submitContact(payload, endpoint, options = {}) {
  if (!endpoint) {
    throw new Error("CONTACT_ENDPOINT_NOT_CONFIGURED");
  }
  const doFetch = options.fetchImpl || fetch;

  const response = await doFetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`CONTACT_REQUEST_FAILED:${response.status}`);
  }
  return true;
}

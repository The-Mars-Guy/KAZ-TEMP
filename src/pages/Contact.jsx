// src/pages/Contact.jsx
//
// INTEGRATION STATUS: delivery is controlled by VITE_CONTACT_ENDPOINT (see
// src/config/contact.js). When it is unset, the form validates and then tells
// the visitor clearly that delivery is not enabled — it never claims a message
// was sent. When it IS set, the form POSTs JSON and only reports success on a
// 2xx response. A verified public email (SITE.email), if supplied, is offered as
// an accessible alternative.

import React, { useId, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import Button from "../components/Button.jsx";
import { SITE } from "../config/site.js";
import { CONTACT_ENDPOINT, CONTACT_CONFIGURED, CONTACT_EMAIL, contactMailto } from "../config/contact.js";
import {
  CONTACT_SUBJECTS,
  EMPTY_CONTACT,
  LIMITS,
  normalizeContact,
  submitContact,
  validateContact,
} from "../utils/contact.js";

export default function Contact() {
  const id = useId();
  const [values, setValues] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'info'|'success'|'error', message }
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const { valid, errors: nextErrors } = validateContact(values);
    setErrors(nextErrors);
    if (!valid) {
      setStatus({ type: "error", message: "Please correct the highlighted fields." });
      return;
    }

    // Delivery not configured: be honest, do not simulate success.
    if (!CONTACT_CONFIGURED) {
      setStatus({
        type: "info",
        message: CONTACT_EMAIL
          ? "This form is not yet connected to an email service, so your message was not sent. Please use the email address listed on this page instead."
          : "Thank you. This form is not yet connected to an email service, so your message was not sent. Contact details will be published here once available.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await submitContact(normalizeContact(values), CONTACT_ENDPOINT);
      setStatus({ type: "success", message: "Thank you — your message has been sent." });
      setValues(EMPTY_CONTACT);
    } catch {
      setStatus({
        type: "error",
        message: "Sorry, your message could not be sent. Please try again, or use the email address listed on this page.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const describedBy = (field) => (errors[field] ? `${id}-${field}-error` : undefined);
  const mailto = contactMailto("Inquiry from frkazligeza.com");

  return (
    <>
      <Seo path="/contact" />

      <PageHero
        eyebrow="Contact"
        title="Contact"
        subtitle="For general inquiries, speaking invitations, book inquiries, and media requests."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="container contact-grid">
          <form className="form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
            {!CONTACT_CONFIGURED ? (
              <p className="notice">
                This form is not yet connected to an email service. Until it is
                configured, messages are not delivered.
              </p>
            ) : null}

            <div className="field">
              <label className="field__label" htmlFor={`${id}-name`}>
                Name <span className="field__required" aria-hidden="true">*</span>
              </label>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                className="field__input"
                autoComplete="name"
                maxLength={LIMITS.name}
                value={values.name}
                onChange={update("name")}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy("name")}
              />
              {errors.name ? (
                <p className="field__error" id={`${id}-name-error`}>
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${id}-email`}>
                Email <span className="field__required" aria-hidden="true">*</span>
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                className="field__input"
                autoComplete="email"
                maxLength={LIMITS.email}
                value={values.email}
                onChange={update("email")}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
              />
              {errors.email ? (
                <p className="field__error" id={`${id}-email-error`}>
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${id}-subject`}>
                Subject <span className="field__required" aria-hidden="true">*</span>
              </label>
              <select
                id={`${id}-subject`}
                name="subject"
                className="field__select"
                value={values.subject}
                onChange={update("subject")}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={describedBy("subject")}
              >
                <option value="">Select a subject…</option>
                {CONTACT_SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject ? (
                <p className="field__error" id={`${id}-subject-error`}>
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${id}-message`}>
                Message <span className="field__required" aria-hidden="true">*</span>
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                className="field__textarea"
                rows="6"
                maxLength={LIMITS.message}
                value={values.message}
                onChange={update("message")}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy("message")}
              />
              {errors.message ? (
                <p className="field__error" id={`${id}-message-error`}>
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="field">
              <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </div>

            {status ? (
              <p
                className={`form__status form__status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            ) : null}
          </form>

          <aside className="contact-aside">
            <h2>Contact details</h2>
            {CONTACT_EMAIL ? (
              <p>
                Email:{" "}
                <a className="link" href={mailto}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            ) : (
              <p>
                A public contact email and telephone number will be added here once
                confirmed. In the meantime, this page is provided as a placeholder.
              </p>
            )}
            <dl>
              <div>
                <dt>Speaking invitations</dt>
                <dd>Choose “Speaking Invitation” in the subject field.</dd>
              </div>
              <div>
                <dt>Book inquiries</dt>
                <dd>Choose “Book Inquiry” in the subject field.</dd>
              </div>
              <div>
                <dt>Media</dt>
                <dd>Choose “Media Inquiry” in the subject field.</dd>
              </div>
            </dl>
            <p className="field__hint">
              This website is maintained as a personal site of {SITE.publicName} and
              is not operated by any diocese or external organization.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

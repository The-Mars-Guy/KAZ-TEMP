import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mutable state shared with the module mocks (hoisted so factories can read it).
const state = vi.hoisted(() => ({ configured: false, submit: null }));

vi.mock("../../config/contact.js", () => ({
  get CONTACT_CONFIGURED() {
    return state.configured;
  },
  get CONTACT_ENDPOINT() {
    return state.configured ? "/api/contact" : "";
  },
  CONTACT_EMAIL: "hello@example.org",
  contactMailto: (subject) =>
    subject ? `mailto:hello@example.org?subject=${encodeURIComponent(subject)}` : "mailto:hello@example.org",
}));

vi.mock("../../utils/contact.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    submitContact: (...args) => state.submit(...args),
  };
});

import Contact from "../Contact.jsx";

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: "jane@example.org" } });
  fireEvent.change(screen.getByLabelText(/^subject/i), { target: { value: "General Inquiry" } });
  fireEvent.change(screen.getByLabelText(/^message/i), { target: { value: "Hello Father Kaz." } });
}

beforeEach(() => {
  state.configured = false;
  state.submit = vi.fn().mockResolvedValue(true);
});

describe("Contact — validation", () => {
  it("shows field errors on empty submit and marks fields invalid", () => {
    renderContact();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a subject/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").every((el) => el.getAttribute("aria-invalid") === "true")).toBe(true);
  });

  it("rejects an invalid email", () => {
    renderContact();
    fillValidForm();
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: "bad" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });
});

describe("Contact — unconfigured backend", () => {
  it("never claims delivery and points to the email fallback", () => {
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/not yet connected/i);
    expect(status).not.toHaveTextContent(/has been sent/i);
    expect(state.submit).not.toHaveBeenCalled();
  });

  it("renders the verified email as a mailto link", () => {
    renderContact();
    const mailto = screen.getByRole("link", { name: /hello@example\.org/i });
    expect(mailto).toHaveAttribute("href", expect.stringContaining("mailto:hello@example.org"));
  });
});

describe("Contact — configured backend", () => {
  it("shows a loading state, then success, and clears the form", async () => {
    state.configured = true;
    let resolveSubmit;
    state.submit = vi.fn(() => new Promise((resolve) => { resolveSubmit = resolve; }));

    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Loading state while the request is in flight.
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });

    resolveSubmit(true);
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/has been sent/i);
    });
    expect(screen.getByLabelText(/^name/i)).toHaveValue("");
  });

  it("shows an error when delivery fails", async () => {
    state.configured = true;
    state.submit = vi.fn().mockRejectedValue(new Error("boom"));

    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/could not be sent/i);
    });
    // Form is not marked successful.
    expect(screen.getByLabelText(/^name/i)).toHaveValue("Jane Doe");
  });
});

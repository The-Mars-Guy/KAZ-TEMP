import { describe, it, expect, vi } from "vitest";
import {
  validateContact,
  normalizeContact,
  submitContact,
  CONTACT_SUBJECTS,
  LIMITS,
  EMPTY_CONTACT,
} from "../contact.js";

const validValues = {
  name: "Jane Doe",
  email: "jane@example.org",
  subject: "General Inquiry",
  message: "Hello Father Kaz.",
};

describe("validateContact", () => {
  it("accepts a well-formed submission", () => {
    const { valid, errors } = validateContact(validValues);
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it("rejects empty values with per-field errors", () => {
    const { valid, errors } = validateContact(EMPTY_CONTACT);
    expect(valid).toBe(false);
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "subject"]);
  });

  it("rejects malformed email", () => {
    expect(validateContact({ ...validValues, email: "not-an-email" }).errors.email).toBeTruthy();
    expect(validateContact({ ...validValues, email: "a@b" }).errors.email).toBeTruthy();
  });

  it("rejects an unknown subject", () => {
    const { valid, errors } = validateContact({ ...validValues, subject: "Hacked" });
    expect(valid).toBe(false);
    expect(errors.subject).toBeTruthy();
  });

  it("accepts every listed subject", () => {
    CONTACT_SUBJECTS.forEach((subject) => {
      expect(validateContact({ ...validValues, subject }).valid).toBe(true);
    });
  });

  it("enforces max lengths", () => {
    expect(validateContact({ ...validValues, name: "x".repeat(LIMITS.name + 1) }).valid).toBe(false);
    expect(validateContact({ ...validValues, message: "x".repeat(LIMITS.message + 1) }).valid).toBe(false);
  });
});

describe("normalizeContact", () => {
  it("trims fields and defaults the honeypot", () => {
    const out = normalizeContact({ name: "  A  ", email: " b@c.co ", subject: " Other ", message: " hi " });
    expect(out).toEqual({
      name: "A",
      email: "b@c.co",
      subject: "Other",
      message: "hi",
      company: "",
    });
  });
});

describe("submitContact", () => {
  it("throws when the endpoint is not configured", async () => {
    await expect(submitContact(validValues, "")).rejects.toThrow("CONTACT_ENDPOINT_NOT_CONFIGURED");
  });

  it("resolves true on a 2xx response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    await expect(submitContact(validValues, "/api/contact", { fetchImpl })).resolves.toBe(true);
    expect(fetchImpl).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("rejects on a non-2xx response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(submitContact(validValues, "/api/contact", { fetchImpl })).rejects.toThrow(
      "CONTACT_REQUEST_FAILED:500"
    );
  });

  it("rejects when the network request throws", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    await expect(submitContact(validValues, "/api/contact", { fetchImpl })).rejects.toThrow(
      "network down"
    );
  });
});

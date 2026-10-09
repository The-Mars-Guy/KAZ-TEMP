// src/config/env.js
//
// Environment access that works in BOTH the browser bundle (Vite) AND plain
// Node ESM (the build script).
//
// WHY THE try/catch GETTERS: Vite statically replaces the literal token
// `import.meta.env.VITE_X` at build time. That replacement only happens for the
// browser bundle; the build script runs the SAME module under plain Node, where
// `import.meta.env` is undefined and a bare dotted access would throw. Wrapping
// each static access in a getter keeps Vite's literal replacement working for
// the browser while degrading safely to `undefined` in Node (which then reads
// `process.env`). We deliberately never use dynamic `import.meta.env[key]`,
// which Vite does not reliably support.
//
// Only VITE_-prefixed variables reach the browser. Nothing here may ever read
// or expose a server secret.

function safe(getter, fallback = undefined) {
  try {
    return getter();
  } catch {
    return fallback;
  }
}

// --- Static, replaceable reads (allowlist) ---
const VITE_SITE_URL = safe(() => import.meta.env.VITE_SITE_URL);
const VITE_CONTACT_ENDPOINT = safe(() => import.meta.env.VITE_CONTACT_ENDPOINT);
const VITE_SHOW_DRAFTS = safe(() => import.meta.env.VITE_SHOW_DRAFTS);
const VITE_DEV = safe(() => import.meta.env.DEV, false);

const SPEC = {
  VITE_SITE_URL: { vite: VITE_SITE_URL, node: "VITE_SITE_URL" },
  VITE_CONTACT_ENDPOINT: { vite: VITE_CONTACT_ENDPOINT, node: "VITE_CONTACT_ENDPOINT" },
  VITE_SHOW_DRAFTS: { vite: VITE_SHOW_DRAFTS, node: "VITE_SHOW_DRAFTS" },
};

/** Read a known variable from Vite's env or Node's process.env. */
export function readEnv(key) {
  const entry = SPEC[key];
  if (entry) {
    if (entry.vite !== undefined) return entry.vite;
    if (typeof process !== "undefined" && process.env && process.env[entry.node] !== undefined) {
      return process.env[entry.node];
    }
    return undefined;
  }
  // Unknown key: only consult Node env (never expose arbitrary browser env).
  if (typeof process !== "undefined" && process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  return undefined;
}

/** True when running under `vite dev`. */
export const IS_DEV = Boolean(VITE_DEV);

/** Parse a boolean-ish env value with a fallback. */
export function envBool(key, fallback = false) {
  const raw = readEnv(key);
  if (raw === undefined || raw === "") return fallback;
  const value = String(raw).toLowerCase();
  return value === "true" || value === "1";
}

/** Trimmed string env value, or undefined. */
export function envString(key) {
  const raw = readEnv(key);
  if (raw === undefined) return undefined;
  const trimmed = String(raw).trim();
  return trimmed === "" ? undefined : trimmed;
}

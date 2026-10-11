// src/utils/language.js
// Group free-text languages into three display buckets so Polish and English
// editions are never mixed in one list.

export const ENGLISH = "English";
export const POLISH = "Polish";
export const OTHER = "Other";

/** Map a language string to its display group. */
export function languageGroup(language) {
  if (language === ENGLISH) return ENGLISH;
  if (language === POLISH) return POLISH;
  return OTHER;
}

/** Display order for groups. */
export const LANGUAGE_GROUPS = [ENGLISH, POLISH, OTHER];

export const LANGUAGE_GROUP_LABELS = {
  [ENGLISH]: "English",
  [POLISH]: "Polish",
  [OTHER]: "Other languages",
};

// src/data/contentNotes.js
//
// INTERNAL content-verification notes. This module is intentionally not
// imported by any page. It records outstanding assets/facts so a future editor
// can finish the work without publishing unverified claims.
//
// Do not render these notes publicly.

export const CONTENT_NOTES = {
  ordinationExactDate: {
    status: "verified — 2 June 1990",
    note: "Fr. Kazimierz Ligęza was ordained a priest of the Diocese of Tarnów on 2 June 1990, as confirmed by the site owner. His first recorded appointment was as vicar of Szczepanów from 27 August 1990.",
  },
  liturgicalPhotography: {
    status: "supplied",
    note: "The supplied photographs father-kaz-vestments.jpg, liturgical-prostration.jpg, and priests-red-vestments.jpg are integrated. The prostration photograph must never be captioned as Father Kaz's ordination: the event and participants are not identified.",
  },
  outreachPhotography: {
    status: "not supplied",
    note: "No photograph clearly documents a verified Catholic outreach activity of Father Kaz. The Service to the Poor section therefore uses text and the supplied ministry photographs only. Do not substitute an unrelated stock image.",
  },
  publicationBackCovers: {
    status: "not supplied",
    note: "The back covers of Archangels Near Us and Saint Rita in Moments of Helplessness (files 23748 and 23746 in the brief) were not present in the project. The detail views currently show the verified front covers and bibliographic text. Add backImage values in src/data/books.js when the files are available.",
  },
  queenOfPeace: {
    status: "content restriction",
    note: "Do not add promotional references, institutional branding, or captions identifying Queen of Peace Church. The biography may say 'a parish in Gainesville, Florida', which is the verified public formulation.",
  },
  articleMetadata: {
    status: "verified",
    note: "The two articles in src/data/articles.js are listed with journal, year, DOI/URL, and language from the publishers' public records. Re-check the Polonia Sacra PDF URL before a future redesign.",
  },
};

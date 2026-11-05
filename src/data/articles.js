// src/data/articles.js
//
// Selected journal articles by Rev. Kazimierz Ligęza, PhD.
//
// Only articles with verifiable bibliographic metadata are listed. External
// links point to the publisher / DOI landing page; no PDFs are re-hosted.
//
// Shape:
// { id, slug, title, originalTitle, journal, year, language, description,
//   externalUrl, published }

export const articles = [
  {
    id: "article-secularism",
    slug: "social-philosophical-implications-of-secularism",
    title:
      "The Social and Philosophical Implications of Secularism from an American Perspective",
    originalTitle:
      "Społeczne i filozoficzne implikacje sekularyzmu z perspektywy amerykańskiej",
    journal: "Homo et Societas",
    year: "2024",
    language: "Polish",
    description:
      "A scholarly analysis of secularism in American law, politics, and public life, asking whether secularism is a neutral framework or a contested philosophical position.",
    externalUrl: "https://doi.org/10.4467/25436104HS.23.012.19124",
    published: true,
  },
  {
    id: "article-church-advertising",
    slug: "the-church-and-the-world-of-advertising",
    title: "The Church and the World of Advertising",
    originalTitle: "Kościół a świat reklamy",
    journal: "Polonia Sacra",
    year: "2002",
    language: "Polish",
    description:
      "A study of the Church's encounter with advertising, media culture, and the ethical questions raised by commercial communication.",
    externalUrl:
      "https://theo-logos.pl/server/api/core/bitstreams/90b326e5-d8da-487a-bda6-15c5bf8cc216/content",
    published: true,
  },
];

export const publishedArticles = articles.filter((article) => article.published === true);

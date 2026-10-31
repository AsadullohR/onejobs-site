// Trust facts shown to employers. Only real, confirmed figures go here.
// Anything left empty ("" or null) is hidden on the site, never replaced with a placeholder.
export const FACTS = {
  workersPlaced: "500+", // confirmed by the owner, 2026-10-17
  since: 2018, // One Group (One Academy & Consulting) founded 2018; OneJobs is part of the group
  countries: ["BG", "ME", "DE", "TR", "HR"],
  shortlistDays: "7–14",

  // From the licence issued by the Migration Agency under the Cabinet of Ministers of Uzbekistan
  // (public/documents/onejobs-licence-1919952.pdf). Empty = not shown.
  licence: "1919952",
  licenceRegistry: "L-2561501325451",
  licenceFrom: "2026-10-19", // valid indefinitely

  // From the state registration certificate (public/documents/onejobs-registration-certificate.pdf).
  legalName: "\"ONE JOBS XUSUSIY BANDLIK AGENTLIGI\" LLC",
  tin: "313 355 800",
  registered: "2026-09-22",
  street: "1/B Milliy Tiklanish St., Mustaqillik MFY",
  city: "Andijan",

  // A real employer quote. null = section hidden.
  // { text: { en: "…", bg: "…", me: "…", ru: "…", uz: "…" }, name: "Full name", role: "Title", company: "Company", country: "BG" }
  employerQuote: {
    text: {
      en: "We are pleased working with OneJobs, they are fast and responsive.",
      bg: "Доволни сме от работата с OneJobs — бързи и отзивчиви са.",
      me: "Zadovoljni smo saradnjom sa OneJobs-om — brzi su i uvijek dostupni.",
      ru: "Мы довольны работой с OneJobs — они быстрые и отзывчивые.",
      uz: "OneJobs bilan ishlashdan mamnunmiz — ular tezkor va doim aloqada.",
    },
    name: "IDA Group D.o.o.",
    role: "",
    company: "",
    country: "",
  },
};

export const yearsOperating = () => new Date().getFullYear() - FACTS.since;

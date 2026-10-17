// Trust facts shown to employers. Only real, confirmed figures go here.
// Anything left empty ("" or null) is hidden on the site, never replaced with a placeholder.
export const FACTS = {
  workersPlaced: "500+", // confirmed by the owner, 2026-10-17
  since: 2018, // One Group (One Academy & Consulting) founded 2018; OneJobs is part of the group
  countries: ["BG", "ME", "DE", "TR", "HR"],
  shortlistDays: "7–14",

  // Uzbekistan licence number for private employment agencies (digits only). Empty = not shown.
  licence: "1479485",

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

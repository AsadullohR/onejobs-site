// Trust facts shown to employers. Only real, confirmed figures go here.
// Anything left empty ("" or null) is hidden on the site, never replaced with a placeholder.
export const FACTS = {
  workersPlaced: "500+", // confirmed by the owner, 2026-10-17
  since: 2018, // One Group (One Academy & Consulting) founded 2018; OneJobs is part of the group
  countries: ["BG", "ME", "DE", "TR", "HR"],
  shortlistDays: "5–10",

  // Uzbekistan licence for private employment agencies, e.g. "№ 0000". Empty = not shown.
  licence: "",

  // A real employer quote. null = section hidden.
  // { text: { en: "…", bg: "…", me: "…", ru: "…", uz: "…" }, name: "Full name", role: "Title", company: "Company", country: "BG" }
  employerQuote: null,
};

export const yearsOperating = () => new Date().getFullYear() - FACTS.since;

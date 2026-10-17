import { Link, useParams } from "react-router-dom";
import { Reveal, SectionHead, Timeline } from "../components/ui";
import Vacancies from "../components/Vacancies";
import CountryCards from "../components/CountryCards";
import NotFound from "./NotFound";
import Flag from "../components/Flag";
import { useLang, useT, useLocalePath, pick } from "../i18n/lang";
import { countryBySlug, countryUi, countryText } from "../content/countries";
import { useSeo } from "../components/useSeo";
import { jobseekers } from "../content/jobseekers";

const FACT_ICONS = { salary: "💰", visa: "🛂", housing: "🏠", language: "🗣️" };

export default function Country() {
  const { slug } = useParams();
  const { lang } = useLang();
  const js = useT(jobseekers);
  const lp = useLocalePath();
  const country = countryBySlug(slug);
  useSeo("country", country ? countryText(country, lang).name : "");
  if (!country) return <NotFound />;

  const t = countryText(country, lang);
  const ui = pick(countryUi, lang);
  const applyTo = lp(`/jobseekers?country=${country.slug}#apply`);

  return (
    <>
      <section className="country-hero" style={{ backgroundImage: `url(${country.photo})` }}>
        <div className="country-hero-inner">
          <Link to={lp("/countries")} className="country-back fade-up-1">{ui.back}</Link>
          <div className="hero-badge fade-up-1"><Flag code={country.code} /> {t.name}</div>
          <h1 className="fade-up-2">{ui.workIn(t.where)}</h1>
          <p className="lead fade-up-3">{t.tagline}</p>
          <div className="hero-actions fade-up-4">
            <Link to={applyTo} className="btn btn-primary">{ui.apply}</Link>
            <a href="#vacancies" className="btn btn-ghost">{ui.vacancies(t.where)}</a>
          </div>
        </div>
        {country.credit && (
          <a className="photo-credit" href={country.credit.url} target="_blank" rel="noopener noreferrer">
            {ui.photo}: {country.credit.author}, {country.credit.license}
          </a>
        )}
      </section>

      <section className="section bg-white">
        <div className="country-facts">
          {Object.entries(t.facts).map(([key, value], i) => (
            <Reveal className="fact-tile" delay={i * 70} key={key}>
              <div className="fact-icon" aria-hidden>{FACT_ICONS[key]}</div>
              <div className="fact-label">{ui.facts[key]}</div>
              <div className="fact-value">{value}</div>
            </Reveal>
          ))}
        </div>
        <p className="fact-note">{ui.salaryNote}</p>

        <Reveal className="country-overview">
          <p>{t.overview}</p>
        </Reveal>

        <div className="country-lists">
          <Reveal className="info-card">
            <h3>💼 {ui.jobs}</h3>
            <ul>{t.jobs.map((x) => <li key={x}>{x}</li>)}</ul>
          </Reveal>
          <Reveal className="info-card" delay={80}>
            <h3>✅ {ui.requirements}</h3>
            <ul>{t.requirements.map((x) => <li key={x}>{x}</li>)}</ul>
          </Reveal>
          <Reveal className="info-card" delay={160}>
            <h3>📄 {ui.documents}</h3>
            <ul>{t.documents.map((x) => <li key={x}>{x}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <Vacancies
        id="vacancies"
        countryCode={country.code}
        limit={6}
        eyebrow={t.name.toUpperCase()}
        title={ui.vacancies(t.where)}
        emptyText={ui.noVacancies(t.where)}
        className="bg-soft"
      />

      <section className="section bg-navy on-dark">
        <SectionHead eyebrow={js.processEyebrow} title={ui.process} />
        <Timeline steps={js.steps} />
      </section>

      <section className="apply-section country-cta-band">
        <div className="apply-inner">
          <div className="section-head">
            <h2 className="h2">{ui.ctaTitle(t.where)}</h2>
            <p>{ui.ctaText}</p>
          </div>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link to={applyTo} className="btn btn-primary">{ui.apply}</Link>
          </div>
        </div>
      </section>

      <CountryCards exclude={country.slug} className="bg-white" />
    </>
  );
}

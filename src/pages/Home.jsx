import { Link } from "react-router-dom";
import { Reveal, SectionHead, WhatsAppB2B } from "../components/ui";
import SuccessStories from "../components/SuccessStories";
import RequestForm from "../components/RequestForm";
import Flag from "../components/Flag";
import EmployerQuote from "../components/EmployerQuote";
import LegalDocs from "../components/LegalDocs";
import { useSeo } from "../components/useSeo";
import { useLang, useT, useLocalePath } from "../i18n/lang";
import { home } from "../content/home";
import { common } from "../content/common";
import { FACTS } from "../content/facts";
import { COUNTRIES, countryText } from "../content/countries";

const SECTOR_ICONS = ["🏗️", "🍽️", "🌾", "🚛"];
const INCLUDED_ICONS = ["🎯", "📜", "🛂", "✈️", "🤝", "💬"];

// Trust facts in the order an employer scans them. Empty facts are skipped.
function TrustRow({ t }) {
  const items = [
    FACTS.workersPlaced && { value: FACTS.workersPlaced, label: t.placed },
    { value: FACTS.countries.length, label: t.countries },
    FACTS.since && { value: FACTS.since, label: t.since },
    FACTS.licence ? { value: FACTS.licence, label: t.licence } : { value: FACTS.shortlistDays, label: t.shortlist },
  ].filter(Boolean);
  return (
    <ul className="trust-row">
      {items.map((it) => (
        <li key={it.label}>
          <strong>{it.value}</strong>
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  useSeo("home");
  const { lang } = useLang();
  const lp = useLocalePath();
  const t = useT(home);
  const c = useT(common);

  return (
    <>
      <section className="emp-hero">
        <div className="emp-hero-copy">
          <div className="pill fade-up-1">
            <span className="pill-dot" />
            {t.eyebrow}
          </div>
          <h1 className="emp-hero-title fade-up-2">
            {t.title[0]} <span>{t.title[1]}</span>
          </h1>
          <ul className="sector-chips fade-up-2">
            {t.sectors.map((s, i) => (
              <li key={s.title}>
                <span aria-hidden>{SECTOR_ICONS[i]}</span>
                {s.title}
              </li>
            ))}
          </ul>
          <p className="hero-lead fade-up-3">{t.lead}</p>
          <div className="hero-actions fade-up-3">
            <a href="#request" className="btn btn-primary btn-lg">{t.ctaPrimary}</a>
            <WhatsAppB2B message={c.whatsapp.employerMsg} label={c.whatsapp.talk} className="btn-lg" />
          </div>
        </div>
        <div className="emp-hero-media">
          <img src="/hero-workers.jpg" alt={t.heroAlt} fetchPriority="high" />
          <div className="flag-card fade-up-3">
            <TrustRow t={t.trust} />
            <div className="flag-card-title">{t.countriesTitle}</div>
            <div className="flag-card-list">
              {COUNTRIES.map((co) => (
                <span key={co.code}><Flag code={co.code} /> {countryText(co, lang).name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="supply" className="section bg-soft">
        <SectionHead eyebrow={t.supplyEyebrow} title={t.supplyTitle} />
        <div className="supply-grid">
          {t.sectors.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <Link to={`${lp("/")}?sector=${i}#request`} className="supply-card">
                <div className="supply-icon" aria-hidden>{SECTOR_ICONS[i]}</div>
                <h3>{s.title}</h3>
                <p>{s.roles}</p>
                <span className="more">{t.requestSector}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow={t.includedEyebrow} title={t.includedTitle} />
        <div className="grid-3">
          {t.included.map((f, i) => (
            <Reveal className="feature-card" delay={i * 60} key={f.title}>
              <div className="emoji" aria-hidden>{INCLUDED_ICONS[i]}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="section bg-navy on-dark">
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <div className="process-steps">
          {t.process.map((p, i) => (
            <Reveal className="process-step" delay={i * 100} key={p.title}>
              <div className="step-num">{i + 1}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="process-cta">
          <a href="#request" className="btn btn-primary btn-lg">{t.ctaPrimary}</a>
        </div>
      </section>

      <EmployerQuote />

      <SuccessStories className="bg-white" />

      <LegalDocs />

      <RequestForm eyebrow={t.formEyebrow} title={t.formTitle} text={t.formText} />

      <section className="seekers-band">
        <span>{c.seekers.text}</span>
        <Link to={lp("/jobseekers")}>{c.seekers.link}</Link>
      </section>
    </>
  );
}

import { Link } from "react-router-dom";
import { Reveal } from "./ui";
import { useFeed } from "./useFeed";
import { useLang, useT } from "../i18n/lang";
import { common } from "../content/common";
import { COUNTRIES } from "../content/countries";

// Browsers ship incomplete Uzbek locale data, so month and country names come from the site itself.
const MONTHS = {
  uz: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
  ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
const NAME_BY_CODE = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));

function useFormatters(lang) {
  return {
    date: (iso) => {
      if (!iso) return "";
      const d = new Date(iso);
      return `${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
    },
    country: (v) => NAME_BY_CODE[v.countryCode]?.[lang].name || v.country,
  };
}

function VacancyCard({ v, delay, t, fmt }) {
  const country = fmt.country(v);
  const label = country ? `${v.title} (${country})` : v.title;
  const applyTo = `/jobseekers?vacancy=${encodeURIComponent(label)}#apply`;
  const facts = [
    v.location && [t.location, v.location],
    v.start && [t.start, v.start],
    v.openings && [t.openings, v.openings],
    v.schedule && [t.schedule, v.schedule],
    ...v.details.slice(0, 2).map((d) => [d.label, d.value]),
  ].filter(Boolean).slice(0, 3);

  return (
    <Reveal className="vacancy-card" delay={delay}>
      {v.photo && <img className="vacancy-photo" src={v.photo} alt="" loading="lazy" />}
      <div className="vacancy-body">
        <div className="vacancy-meta">
          {country && <span className="vacancy-country">{country}</span>}
          {v.date && <span className="vacancy-date">{fmt.date(v.date)}</span>}
        </div>
        {v.headline && <div className="vacancy-headline">{v.headline}</div>}
        <h3>{v.title}</h3>
        {v.salary && <div className="vacancy-salary">{v.salary}</div>}
        {facts.length > 0 && (
          <ul className="vacancy-details">
            {facts.map(([k, val]) => (
              <li key={k}><strong>{k}:</strong> {val}</li>
            ))}
          </ul>
        )}
        {v.perks.length > 0 && (
          <ul className="vacancy-perks">
            {v.perks.slice(0, 3).map((p) => (
              <li key={p}><span aria-hidden>✓</span>{p}</li>
            ))}
          </ul>
        )}
        {v.requirements.length > 0 && (
          <div className="vacancy-req"><strong>{t.requirements}:</strong> {v.requirements.slice(0, 3).join(" · ")}</div>
        )}
        {!v.salary && !v.perks.length && !v.requirements.length && v.summary && <p className="vacancy-summary">{v.summary}</p>}
        <div className="vacancy-actions">
          <Link to={applyTo} className="btn btn-primary btn-xs">{t.apply}</Link>
          <a href={v.url} target="_blank" rel="noopener noreferrer" className="vacancy-tg">{t.details}</a>
        </div>
      </div>
    </Reveal>
  );
}

// Latest vacancies pulled from the company's Telegram channel.
// `countryCode` limits the list to one country (ISO code from the post's flag).
// Renders nothing if the feed is not configured, so the page still looks complete.
export default function Vacancies({ limit = 6, eyebrow, title, moreLink, id, countryCode, emptyText, className = "bg-white" }) {
  const { lang } = useLang();
  const t = useT(common).vacancies;
  const fmt = useFormatters(lang);
  const { loading, items, url, error } = useFeed("vacancies", "vacancies");
  const vacancies = countryCode ? items.filter((v) => v.countryCode === countryCode) : items;

  if (!loading && !items.length && !url) return null;

  return (
    <section id={id} className={`section ${className}`}>
      <Reveal className="row-head">
        <div>
          <div className="eyebrow">{eyebrow || t.eyebrow}</div>
          <h2 className="h2">{title || t.title}</h2>
        </div>
        {moreLink ||
          (url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              {t.follow}
            </a>
          ))}
      </Reveal>

      {loading ? (
        <div className="vacancy-grid">
          {Array.from({ length: Math.min(limit, 3) }, (_, i) => (
            <div className="vacancy-card skeleton" key={i} />
          ))}
        </div>
      ) : vacancies.length ? (
        <div className="vacancy-grid">
          {vacancies.slice(0, limit).map((v, i) => (
            <VacancyCard v={v} t={t} fmt={fmt} delay={i * 70} key={v.id} />
          ))}
        </div>
      ) : (
        <div className="vacancy-empty">
          {error ? t.loadError : emptyText || t.none}{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">{t.seeChannel}</a>
        </div>
      )}
    </section>
  );
}

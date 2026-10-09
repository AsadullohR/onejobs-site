import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./ui";

const ENDPOINT = "/.netlify/functions/vacancies";

// One request per page load, shared by every Vacancies block on the page.
let cache = null;
function loadVacancies() {
  if (!cache) {
    cache = fetch(ENDPOINT)
      .then((r) => r.json())
      .catch(() => ({ vacancies: [], error: "network" }));
  }
  return cache;
}

function useVacancies() {
  const [state, setState] = useState({ loading: true, vacancies: [], url: null, error: null });
  useEffect(() => {
    let alive = true;
    loadVacancies().then((d) => {
      if (alive) setState({ loading: false, vacancies: d.vacancies || [], url: d.url || null, error: d.error || null });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "";

function VacancyCard({ v, delay }) {
  const applyTo = `/jobseekers?vacancy=${encodeURIComponent(v.title)}#apply`;
  return (
    <Reveal className="vacancy-card" delay={delay}>
      {v.photo && <img className="vacancy-photo" src={v.photo} alt="" loading="lazy" />}
      <div className="vacancy-body">
        <div className="vacancy-meta">
          {v.country && <span className="vacancy-country">{v.country}</span>}
          {v.date && <span className="vacancy-date">{fmtDate(v.date)}</span>}
        </div>
        <h3>{v.title}</h3>
        {v.salary && <div className="vacancy-salary">{v.salary}</div>}
        <ul className="vacancy-details">
          {v.schedule && <li><strong>Schedule:</strong> {v.schedule}</li>}
          {v.requirements && <li><strong>Requirements:</strong> {v.requirements}</li>}
          {v.details.slice(0, 3).map((d) => (
            <li key={d.label}><strong>{d.label}:</strong> {d.value}</li>
          ))}
        </ul>
        {!v.country && !v.salary && v.summary && <p className="vacancy-summary">{v.summary}</p>}
        <div className="vacancy-actions">
          <Link to={applyTo} className="btn btn-primary btn-xs">Apply →</Link>
          <a href={v.url} target="_blank" rel="noopener noreferrer" className="vacancy-tg">View in Telegram ↗</a>
        </div>
      </div>
    </Reveal>
  );
}

// Latest vacancies pulled from the company's Telegram channel.
// Renders nothing if the feed is not configured, so the page still looks complete.
export default function Vacancies({ limit = 6, eyebrow = "LATEST VACANCIES", title = "Fresh Job Openings", moreLink, id }) {
  const { loading, vacancies, url, error } = useVacancies();

  if (!loading && !vacancies.length && !url) return null;

  return (
    <section id={id} className="section bg-white">
      <Reveal className="row-head">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        {moreLink ||
          (url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              Follow on Telegram ↗
            </a>
          ))}
      </Reveal>

      {loading ? (
        <div className="grid-3">
          {Array.from({ length: Math.min(limit, 3) }, (_, i) => (
            <div className="vacancy-card skeleton" key={i} />
          ))}
        </div>
      ) : vacancies.length ? (
        <div className="grid-3">
          {vacancies.slice(0, limit).map((v, i) => (
            <VacancyCard v={v} delay={i * 70} key={v.id} />
          ))}
        </div>
      ) : (
        <div className="vacancy-empty">
          {error ? "We couldn't load vacancies right now." : "No open vacancies posted right now."}{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">See our Telegram channel ↗</a>
        </div>
      )}
    </section>
  );
}

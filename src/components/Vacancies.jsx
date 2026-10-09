import { Link } from "react-router-dom";
import { Reveal } from "./ui";
import { useFeed } from "./useFeed";

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "";

function VacancyCard({ v, delay }) {
  const label = v.country ? `${v.title} (${v.country})` : v.title;
  const applyTo = `/jobseekers?vacancy=${encodeURIComponent(label)}#apply`;
  const facts = [
    v.location && ["Location", v.location],
    v.start && ["Start", v.start],
    v.openings && ["Openings", v.openings],
    v.schedule && ["Schedule", v.schedule],
    ...v.details.slice(0, 2).map((d) => [d.label, d.value]),
  ].filter(Boolean).slice(0, 3);

  return (
    <Reveal className="vacancy-card" delay={delay}>
      {v.photo && <img className="vacancy-photo" src={v.photo} alt="" loading="lazy" />}
      <div className="vacancy-body">
        <div className="vacancy-meta">
          {v.country && <span className="vacancy-country">{v.country}</span>}
          {v.date && <span className="vacancy-date">{fmtDate(v.date)}</span>}
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
          <div className="vacancy-req"><strong>Requirements:</strong> {v.requirements.slice(0, 3).join(" · ")}</div>
        )}
        {!v.salary && !v.perks.length && !v.requirements.length && v.summary && <p className="vacancy-summary">{v.summary}</p>}
        <div className="vacancy-actions">
          <Link to={applyTo} className="btn btn-primary btn-xs">Apply →</Link>
          <a href={v.url} target="_blank" rel="noopener noreferrer" className="vacancy-tg">Full details ↗</a>
        </div>
      </div>
    </Reveal>
  );
}

// Latest vacancies pulled from the company's Telegram channel.
// Renders nothing if the feed is not configured, so the page still looks complete.
export default function Vacancies({ limit = 6, eyebrow = "LATEST VACANCIES", title = "Fresh Job Openings", moreLink, id }) {
  const { loading, items: vacancies, url, error } = useFeed("vacancies", "vacancies");

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

import { Link } from "react-router-dom";
import { Reveal } from "./ui";
import Flag from "./Flag";
import { useLang, useLocalePath, pick } from "../i18n/lang";
import { COUNTRIES, countryUi, countryText } from "../content/countries";

// The five destination countries; each card opens that country's page.
export default function CountryCards({ id, className = "bg-soft", exclude, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  const { lang } = useLang();
  const lp = useLocalePath();
  const ui = pick(countryUi, lang);
  const list = COUNTRIES.filter((c) => c.slug !== exclude);

  return (
    <section id={id} className={`section ${className}`}>
      <Reveal className="row-head">
        <div>
          <div className="eyebrow">{ui.eyebrow}</div>
          <Heading className="h2">{ui.title}</Heading>
        </div>
      </Reveal>
      <div className={`countries-grid count-${list.length}`}>
        {list.map((country, i) => {
          const t = countryText(country, lang);
          return (
            <Reveal className="country-card" delay={i * 70} key={country.slug}>
              <Link to={lp(`/countries/${country.slug}`)} className="country-link" aria-label={`${t.name}: ${ui.readMore}`}>
                <img src={country.photo} alt={t.name} loading="lazy" />
                <div className="country-body">
                  <div className="country-top">
                    <span className="country-tag"><Flag code={country.code} /> {t.name.toUpperCase()}</span>
                    <span className="country-badge">{t.badge}</span>
                  </div>
                  <div>
                    <h3>{ui.workIn(t.where)}</h3>
                    <ul className="check-list">
                      {t.perks.map((p) => (
                        <li key={p}><span aria-hidden>✓</span>{p}</li>
                      ))}
                    </ul>
                    <span className="country-cta">{ui.readMore}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

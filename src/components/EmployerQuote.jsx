import { Reveal } from "./ui";
import { useLang, pick } from "../i18n/lang";
import { FACTS } from "../content/facts";
import Flag from "./Flag";

// A real employer reference from content/facts.js. Renders nothing until one is added.
export default function EmployerQuote() {
  const { lang } = useLang();
  const q = FACTS.employerQuote;
  if (!q) return null;
  return (
    <section className="section bg-white">
      <Reveal className="employer-quote">
        <div className="eq-mark" aria-hidden>“</div>
        <blockquote>{pick(q.text, lang)}</blockquote>
        <div className="eq-who">
          <strong>{q.name}</strong>
          <span>{[q.role, q.company].filter(Boolean).join(", ")} {q.country && <Flag code={q.country} />}</span>
        </div>
      </Reveal>
    </section>
  );
}

import { Reveal, SectionHead } from "./ui";
import { useT } from "../i18n/lang";
import { legal } from "../content/legal";
import { FACTS } from "../content/facts";

// "2026-10-19" → "19.10.2026", the format on the documents themselves.
const date = (iso) => iso.split("-").reverse().join(".");

// Licence and state registration, each with a thumbnail and a link to the PDF (original + English).
export default function LegalDocs({ className = "bg-soft" }) {
  const t = useT(legal);
  if (!FACTS.licence) return null;
  const docs = [
    {
      title: t.licenceTitle,
      pdf: `/documents/onejobs-licence-${FACTS.licence}.pdf`,
      rows: [
        [t.licenceNo, FACTS.licence],
        [t.registry, FACTS.licenceRegistry],
        [t.issuedBy, t.issuer],
        [t.valid, t.validValue(date(FACTS.licenceFrom))],
      ],
    },
    {
      title: t.regTitle,
      pdf: "/documents/onejobs-registration-certificate.pdf",
      rows: [
        [t.company, FACTS.legalName],
        [t.tin, FACTS.tin],
        [t.registered, date(FACTS.registered)],
        [t.address, `${FACTS.street}, ${FACTS.city}`],
      ],
    },
  ];

  return (
    <section id="documents" className={`section ${className}`}>
      <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.text} />
      <div className="legal-grid">
        {docs.map((d, i) => (
          <Reveal className="legal-card" delay={i * 80} key={d.pdf}>
            <a href={d.pdf} target="_blank" rel="noopener" className="legal-thumb">
              <img src={d.pdf.replace(/\.pdf$/, ".jpg")} alt={d.title} loading="lazy" />
            </a>
            <div className="legal-body">
              <h3>{d.title}</h3>
              <dl>
                {d.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <a href={d.pdf} target="_blank" rel="noopener" className="legal-link">{t.view}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

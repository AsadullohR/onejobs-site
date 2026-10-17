import { useSearchParams } from "react-router-dom";
import { NetlifyForm, Field, WhatsAppB2B } from "./ui";
import { useLang, useT } from "../i18n/lang";
import { request, SECTOR_VALUES } from "../content/request";
import { common } from "../content/common";
import { countryName } from "../content/countries";

// Employer's likely country of work, from the site language.
const COUNTRY_HINT = { bg: "BG", me: "ME" };

// "Request workers" form (Netlify form "job-order"). ?sector=<index> pre-selects a sector.
export default function RequestForm({ eyebrow, title, text, className = "bg-soft", id = "request" }) {
  const { lang } = useLang();
  const t = useT(request);
  const c = useT(common);
  const [params] = useSearchParams();
  const sectorParam = params.get("sector");
  const preselected = sectorParam !== null && SECTOR_VALUES[Number(sectorParam)] ? SECTOR_VALUES[Number(sectorParam)] : "";

  return (
    <section id={id} className={`section ${className}`}>
      <div className="narrow">
        <div className="section-head" style={{ marginBottom: "2.5rem" }}>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p>{text}</p>
          <div className="wa-row">
            <span>{c.whatsapp.faster}</span>
            <WhatsAppB2B message={c.whatsapp.employerMsg} />
          </div>
        </div>
        <NetlifyForm
          name="job-order"
          className="light-form"
          submitLabel={t.submit}
          submitClass="btn btn-primary btn-block span-2"
          footer={<p className="form-privacy span-2">{t.privacy}</p>}
        >
          <Field label={t.company} name="company" required autoComplete="organization" />
          <Field label={t.contact} name="contact" required autoComplete="name" />
          <Field label={t.email} name="email" required autoComplete="email" />
          <Field label={t.country} name="country" placeholder={t.countryPh} defaultValue={COUNTRY_HINT[lang] ? countryName(COUNTRY_HINT[lang], lang) : ""} />
          <Field label={t.sector} name="industry" as="select" key={preselected || "none"} defaultValue={preselected} required>
            <option value="">{t.sectorPh}</option>
            {SECTOR_VALUES.map((v, i) => (
              <option key={v} value={v}>{t.sectors[i]}</option>
            ))}
          </Field>
          <Field label={t.start} name="deadline" placeholder={t.startPh} />
          <Field label={t.roles} name="roles" placeholder={t.rolesPh} className="span-2" required />
          <Field label={t.details} name="details" as="textarea" rows={4} placeholder={t.detailsPh} className="span-2" />
          <input type="hidden" name="language" value={lang} />
        </NetlifyForm>
      </div>
    </section>
  );
}

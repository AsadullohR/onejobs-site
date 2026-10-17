import { useSearchParams } from "react-router-dom";
import Vacancies from "../components/Vacancies";
import SuccessStories from "../components/SuccessStories";
import CountryCards from "../components/CountryCards";
import { SectionHead, HeroStats, FeatureGrid, Timeline, Faq, NetlifyForm, Field } from "../components/ui";
import { useLang, useT } from "../i18n/lang";
import { jobseekers } from "../content/jobseekers";
import { common } from "../content/common";
import { COUNTRIES, countryBySlug, countryText } from "../content/countries";
import { useSeo } from "../components/useSeo";

export default function Jobseekers() {
  useSeo("jobseekers");
  const { lang } = useLang();
  const t = useT(jobseekers);
  const c = useT(common);
  const [params, setParams] = useSearchParams();
  const vacancy = params.get("vacancy") || "";
  const preselected = countryBySlug(params.get("country") || "");

  return (
    <div className="theme-blue">
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="hero-badge fade-up-1">{t.badge}</div>
            <h1 className="fade-up-2">
              {t.title[0]}
              <br />
              <span>{t.title[1]}</span>
            </h1>
            <p className="lead fade-up-3">{t.lead}</p>
            <div className="hero-actions fade-up-4">
              <a href="#apply" className="btn btn-accent">{t.ctaApply}</a>
              <a href="#destinations" className="btn btn-ghost">{t.ctaDestinations}</a>
            </div>
          </div>
          <HeroStats stats={t.stats} />
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow={t.whyEyebrow} title={t.whyTitle} />
        <FeatureGrid items={t.features} />
      </section>

      <Vacancies id="vacancies" limit={9} title={t.vacanciesTitle} />

      <CountryCards id="destinations" />

      <section className="section bg-navy on-dark">
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <Timeline steps={t.steps} />
      </section>

      <SuccessStories visaLimit={12} className="bg-soft" />

      <section id="faq" className="section bg-white">
        <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <Faq items={t.faq} />
      </section>

      <section id="apply" className="apply-section">
        <div className="apply-inner">
          <div className="section-head">
            <div className="eyebrow" style={{ color: "var(--blue-light)" }}>{t.applyEyebrow}</div>
            <h2 className="h2">{t.applyTitle}</h2>
            <p>{t.applyText}</p>
          </div>
          <NetlifyForm name="jobseeker-application" className="stack-form dark-fields" submitLabel={t.form.submit}>
            {vacancy && (
              <div className="applying-for">
                <span>{c.applyingFor} <strong>{vacancy}</strong></span>
                <button type="button" onClick={() => setParams({}, { replace: true })}>{c.clear}</button>
              </div>
            )}
            <input type="hidden" name="vacancy" value={vacancy} />
            <Field label={t.form.name} name="name" placeholder={t.form.namePh} required />
            <Field label={t.form.contact} name="contact" placeholder="+998 XX XXX XX XX" required />
            {/* Value is the English name so submissions read the same whatever the site language. */}
            <Field
              label={t.form.country}
              name="country"
              as="select"
              key={preselected?.slug || "none"}
              defaultValue={preselected ? preselected.en.name : ""}
            >
              <option value="">{t.form.countryPh}</option>
              {COUNTRIES.map((co) => (
                <option key={co.slug} value={co.en.name}>{countryText(co, lang).name}</option>
              ))}
            </Field>
            <Field label={t.form.skills} name="skills" as="textarea" rows={3} placeholder={t.form.skillsPh} />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

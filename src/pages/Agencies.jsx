import { Reveal, SectionHead, HeroStats, FeatureGrid, Timeline, Faq, NetlifyForm, Field, WhatsAppB2B } from "../components/ui";
import { SITE } from "../site";
import { useT } from "../i18n/lang";
import { agencies, MODEL_STYLE } from "../content/agencies";
import { common } from "../content/common";

export default function Agencies() {
  const t = useT(agencies);
  const c = useT(common);
  // Submissions always carry the English model name so they read the same in Netlify.
  const modelValues = agencies.en.models.map((m) => m.title);

  return (
    <div className="theme-green">
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="hero-badge fade-up-1">{t.badge}</div>
            <h1 className="fade-up-2">
              {t.title[0]}
              <br />
              <span>{t.title[1]}</span>
              <br />
              {t.title[2]}
            </h1>
            <p className="lead fade-up-3">{t.lead}</p>
            <div className="hero-actions fade-up-4">
              <a href="#partner" className="btn btn-accent">{t.ctaPartner}</a>
              <a href="#models" className="btn btn-ghost">{t.ctaModels}</a>
            </div>
            <p className="hero-wa fade-up-4">
              {c.whatsapp.prefer} <a href={SITE.whatsappB2BHref} target="_blank" rel="noopener noreferrer">{SITE.whatsappB2B}</a>
            </p>
          </div>
          <HeroStats stats={t.stats} />
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow={t.whyEyebrow} title={t.whyTitle} />
        <FeatureGrid items={t.features} />
      </section>

      <section id="models" className="section bg-soft">
        <SectionHead eyebrow={t.modelsEyebrow} title={t.modelsTitle} />
        <div className="grid-3">
          {t.models.map((m, i) => {
            const s = MODEL_STYLE[i];
            return (
              <Reveal
                className={`model-card${s.featured ? " featured" : ""}`}
                delay={i * 100}
                key={i}
                style={{ "--model-color": s.color }}
              >
                {s.featured && <div className="model-flag">{t.popular}</div>}
                <div className="model-icon" style={{ background: s.tint }} aria-hidden>🤝</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <ul>
                  {m.perks.map((p) => (
                    <li key={p}><span aria-hidden>✓</span>{p}</li>
                  ))}
                </ul>
                <a href="#partner" className="model-cta">{t.applyModel}</a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section bg-navy on-dark">
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <Timeline steps={t.steps} />
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <Faq items={t.faq} />
      </section>

      <section id="partner" className="apply-section on-dark">
        <div className="apply-inner">
          <div className="section-head">
            <div className="eyebrow">{t.applyEyebrow}</div>
            <h2 className="h2">{t.applyTitle}</h2>
            <p>{t.applyText}</p>
            <div className="wa-row">
              <span>{c.whatsapp.faster}</span>
              <WhatsAppB2B message={c.whatsapp.agencyMsg} />
            </div>
          </div>
          <NetlifyForm name="agency-partnership" className="stack-form dark-fields" submitLabel={t.form.submit}>
            <Field label={t.form.agency} name="agency" placeholder={t.form.agencyPh} required />
            <Field label={t.form.person} name="contact_person" placeholder={t.form.personPh} required />
            <Field label={t.form.contact} name="contact" placeholder={t.form.contactPh} required />
            <Field label={t.form.country} name="country" placeholder={t.form.countryPh} required />
            <Field label={t.form.model} name="model" as="select" defaultValue="">
              <option value="">{t.form.modelPh}</option>
              {t.models.map((m, i) => (
                <option key={i} value={modelValues[i]}>{m.title}</option>
              ))}
            </Field>
            <Field label={t.form.details} name="details" as="textarea" rows={4} placeholder={t.form.detailsPh} />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

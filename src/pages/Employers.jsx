import { Reveal, SectionHead, HeroStats, FeatureGrid, NetlifyForm, Field, WhatsAppB2B } from "../components/ui";
import { SITE } from "../site";
import { useT } from "../i18n/lang";
import { employers } from "../content/employers";
import { common } from "../content/common";

export default function Employers() {
  const t = useT(employers);
  const c = useT(common);

  return (
    <div className="theme-amber">
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
              <a href="#hire" className="btn btn-accent">{t.ctaPost}</a>
              <a href="#process" className="btn btn-ghost">{t.ctaHow}</a>
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

      <section className="section bg-soft">
        <SectionHead eyebrow={t.sectorsEyebrow} title={t.sectorsTitle} />
        <div className="grid-3 gap-sm">
          {t.sectors.map((s, i) => (
            <Reveal className="sector-card" delay={i * 70} key={i}>
              <div className="sector-icon" aria-hidden>{s.icon}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="section bg-navy on-dark">
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <div className="grid-3 num-grid">
          {t.steps.map((s, i) => (
            <Reveal className="num-step" delay={i * 80} key={i}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="hire" className="section bg-soft">
        <div className="narrow">
          <div className="section-head" style={{ marginBottom: "3rem" }}>
            <div className="eyebrow">{t.hireEyebrow}</div>
            <h2 className="h2">{t.hireTitle}</h2>
            <p>{t.hireText}</p>
            <div className="wa-row">
              <span>{c.whatsapp.faster}</span>
              <WhatsAppB2B message={c.whatsapp.employerMsg} />
            </div>
          </div>
          <NetlifyForm name="job-order" className="light-form" submitLabel={t.form.submit} submitClass="btn btn-navy btn-block span-2">
            <Field label={t.form.company} name="company" required />
            <Field label={t.form.contact} name="contact" required />
            <Field label={t.form.email} name="email" required />
            <Field label={t.form.industry} name="industry" required />
            <Field label={t.form.roles} name="roles" required />
            <Field label={t.form.details} name="details" as="textarea" rows={4} className="span-2" required />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

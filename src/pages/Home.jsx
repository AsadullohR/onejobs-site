import { Link } from "react-router-dom";
import { Reveal, SectionHead, NetlifyForm } from "../components/ui";
import { SITE } from "../site";
import Vacancies from "../components/Vacancies";
import SuccessStories from "../components/SuccessStories";
import CountryCards from "../components/CountryCards";
import { useT } from "../i18n/lang";
import { home } from "../content/home";
import { common } from "../content/common";

const AVATARS = ["1507003211169-0a1dd7228f2d", "1438761681033-6461ffad8d80", "1500648767791-00dcc994a43e"];

const AUDIENCE_STYLE = [
  { to: "/jobseekers", icon: "🌍", tint: "#ebf2ff", color: "#1565e0" },
  { to: "/employers", icon: "🏢", tint: "#fff8e1", color: "#f59e0b" },
  { to: "/agencies", icon: "🤝", tint: "#f0fff4", color: "#16a34a" },
];
const STAT_ICONS = ["🌐", "👥", "✅", "🎧"];
const SERVICE_ICONS = ["📋", "🪪", "📄", "🏛️", "✈️", "💬"];

export default function Home() {
  const t = useT(home);
  const c = useT(common);

  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="pill fade-up-1">
            <span className="pill-dot" />
            {t.pill}
          </div>
          <h1 className="hero-title fade-up-2">
            {t.title[0]}
            <br />
            {t.title[1]}<span>{t.title[2]}</span>
          </h1>
          <p className="hero-lead fade-up-3">{t.lead}</p>
          <div className="hero-actions fade-up-3">
            <a href="#contact" className="btn btn-primary">{t.ctaPrimary}</a>
            <a href="#services" className="btn btn-outline">{t.ctaSecondary}</a>
          </div>
          <div className="social-proof fade-up-4">
            <div className="avatars">
              {AVATARS.map((id) => (
                <img key={id} src={`https://images.unsplash.com/photo-${id}?w=72&h=72&fit=crop`} alt="" loading="lazy" />
              ))}
            </div>
            <div>
              <div className="proof-title">{t.proofTitle}</div>
              <div className="proof-sub">{t.proofSub}</div>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=1200&fit=crop&auto=format" alt={t.heroAlt} />
          <div className="float-card">
            <div className="float-icon" aria-hidden>✈️</div>
            <div>
              <div className="proof-title">{t.floatTitle}</div>
              <div className="proof-sub">{t.floatSub}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight bg-soft">
        <SectionHead eyebrow={t.audienceEyebrow} title={t.audienceTitle} />
        <div className="grid-3">
          {t.audiences.map((a, i) => {
            const s = AUDIENCE_STYLE[i];
            return (
              <Reveal key={s.to} delay={i * 80}>
                <Link to={s.to} className="audience-card">
                  <div className="icon-tile" style={{ background: s.tint }} aria-hidden>{s.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <span className="more" style={{ color: s.color }}>{t.learnMore}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {t.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-icon" aria-hidden>{STAT_ICONS[i]}</div>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="section bg-white">
        <SectionHead eyebrow={t.servicesEyebrow} title={t.servicesTitle} />
        <div className="services-grid">
          {t.services.map((s, i) => (
            <Reveal className="service-card" delay={i * 80} key={i}>
              <div className="emoji" aria-hidden>{SERVICE_ICONS[i]}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#contact" className="more">{t.learnMore}</a>
            </Reveal>
          ))}
        </div>
      </section>

      <CountryCards id="countries" />

      <Vacancies
        limit={3}
        moreLink={<Link to="/jobseekers#vacancies" className="btn btn-outline btn-sm">{c.vacancies.all}</Link>}
      />

      <section id="process" className="section bg-navy on-dark">
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <div className="process-steps">
          {t.process.map((p, i) => (
            <Reveal className="process-step" delay={i * 100} key={i}>
              <div className="step-num">{i + 1}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SuccessStories className="bg-white" />

      <section id="contact" className="cta">
        <div className="cta-plane" aria-hidden>✈</div>
        <div className="cta-inner">
          <div className="cta-copy">
            <h2>
              {t.contactTitle[0]}
              <br />
              {t.contactTitle[1]}<span>{t.contactTitle[2]}</span>
            </h2>
            <p>{t.contactText}</p>
          </div>
          <NetlifyForm
            name="contact"
            className="glass-form dark-fields"
            submitLabel={t.form.submit}
            submitClass="btn btn-primary btn-block"
            footer={<div className="form-note">{c.footer.hours} · {SITE.phone}</div>}
          >
            <input className="input" name="name" placeholder={t.form.name} aria-label={t.form.name} required />
            <input className="input" name="contact" placeholder={t.form.contact} aria-label={t.form.contact} required />
            <textarea className="input" name="message" rows={3} placeholder={t.form.message} aria-label={t.form.message} required />
          </NetlifyForm>
        </div>
      </section>
    </>
  );
}

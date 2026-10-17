import { Reveal, SectionHead, HeroStats, FeatureGrid } from "../components/ui";
import RequestForm from "../components/RequestForm";
import EmployerQuote from "../components/EmployerQuote";
import { useSeo } from "../components/useSeo";
import { SITE } from "../site";
import { useT } from "../i18n/lang";
import { employers } from "../content/employers";
import { common } from "../content/common";
import { FACTS } from "../content/facts";

export default function Employers() {
  useSeo("employers");
  const t = useT(employers);
  const c = useT(common);
  const stats = [
    FACTS.workersPlaced && { icon: "👷", value: FACTS.workersPlaced, label: t.statLabels.placed },
    { icon: "⚡", value: FACTS.shortlistDays, label: t.statLabels.shortlist },
    { icon: "🌍", value: String(FACTS.countries.length), label: t.statLabels.countries },
    { icon: "🔄", value: t.statLabels.guaranteeValue, label: t.statLabels.guarantee },
  ].filter(Boolean);

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
              <a href="#request" className="btn btn-accent">{t.ctaPost}</a>
              <a href="#process" className="btn btn-ghost">{t.ctaHow}</a>
            </div>
            <p className="hero-wa fade-up-4">
              {c.whatsapp.prefer} <a href={SITE.whatsappB2BHref} target="_blank" rel="noopener noreferrer">{SITE.whatsappB2B}</a>
            </p>
          </div>
          <HeroStats stats={stats} />
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

      <EmployerQuote />

      <RequestForm eyebrow={t.hireEyebrow} title={t.hireTitle} text={t.hireText} />
    </div>
  );
}

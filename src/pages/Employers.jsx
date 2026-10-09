import { Reveal, SectionHead, HeroStats, FeatureGrid, NetlifyForm, Field } from "../components/ui";

const STATS = [
  { icon: "⚡", value: "5–10", label: "Days to Shortlist" },
  { icon: "✅", value: "100%", label: "Pre-Screened Talent" },
  { icon: "🌍", value: "15+", label: "Countries Sourced" },
  { icon: "🔄", value: "90 days", label: "Replacement Guarantee" },
];

const FEATURES = [
  { icon: "🎯", title: "Pre-Screened Talent", text: "Every candidate is skills-tested, reference-checked, and medically cleared before you see their profile." },
  { icon: "📜", title: "Full Legal Compliance", text: "We handle work permits, employment contracts, and in-country registration — fully compliant with local law." },
  { icon: "⚡", title: "Fast Turnaround", text: "Receive a shortlist of qualified candidates within 5–10 business days of submitting your vacancy." },
  { icon: "💼", title: "Sector Expertise", text: "Deep networks in construction, manufacturing, logistics, healthcare, and hospitality across Central Asia." },
  { icon: "🔄", title: "Replacement Guarantee", text: "If a placement leaves within 90 days for our fault, we find a replacement at no additional cost." },
  { icon: "📊", title: "Transparent Reporting", text: "You receive weekly pipeline updates and a final placement report with all documentation." },
];

const SECTORS = [
  { icon: "🏗️", title: "Construction", text: "Welders, formworkers, crane operators, site supervisors" },
  { icon: "🏭", title: "Manufacturing", text: "CNC operators, quality control, assembly line, logistics" },
  { icon: "🏥", title: "Healthcare", text: "Nurses, carers, lab technicians, medical assistants" },
  { icon: "🛒", title: "Retail & Logistics", text: "Warehouse staff, forklift operators, inventory managers" },
  { icon: "🍽️", title: "Hospitality", text: "Chefs, kitchen staff, hotel housekeeping, front desk" },
  { icon: "💻", title: "Technology", text: "Developers, QA engineers, IT support, data analysts" },
];

const STEPS = [
  { title: "Submit Your Vacancy", text: "Share your job requirements, number of positions, start date, and any specific criteria." },
  { title: "Scope & Agreement", text: "We confirm timelines, fees, and the service scope. You receive a signed service agreement within 48 hours." },
  { title: "Candidate Search", text: "Our recruitment team activates its talent database and partner network to source matching profiles." },
  { title: "Shortlist Delivery", text: "Receive CVs, video introductions, and skills assessments for your review within 5–10 days." },
  { title: "Interview & Selection", text: "We coordinate interviews, handle communication, and manage offer negotiations on your behalf." },
  { title: "Documentation & Onboarding", text: "Visa processing, work permits, travel, and arrival coordination — all handled by our team." },
];

const QUOTES = [
  { where: "🇩🇪 Germany", who: "Klaus Weber", role: "HR Director, BauGruppe GmbH", text: "We needed 40 skilled welders for a German construction project within 8 weeks. OneJobs delivered 44 candidates — all with valid qualifications and medical clearances." },
  { where: "🇰🇷 South Korea", who: "Park Ji-soo", role: "Operations Manager, KorTech Industries", text: "The compliance support alone was worth it. They handled every piece of paperwork for our 25 new hires entering Korea. Zero delays on our production line." },
  { where: "🇭🇷 Croatia", who: "Marko Horvat", role: "Plant Director, Adriatic Build", text: "Honest, fast, and thorough. Their replacement guarantee was never needed — every placement has been with us for over a year." },
];

export default function Employers() {
  return (
    <div className="theme-amber">
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="hero-badge fade-up-1">🏢 For Employers</div>
            <h1 className="fade-up-2">
              Hire Qualified
              <br />
              <span>International Talent</span>
              <br />
              Without the Complexity
            </h1>
            <p className="lead fade-up-3">
              We source, screen, and deliver ready-to-work candidates from Central Asia — handling every permit, document, and visa so your team can focus on the job.
            </p>
            <div className="hero-actions fade-up-4">
              <a href="#hire" className="btn btn-accent">Post a Vacancy →</a>
              <a href="#process" className="btn btn-ghost">How It Works</a>
            </div>
          </div>
          <HeroStats stats={STATS} />
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow="WHY ONEJOBS" title="The Employer Advantage" />
        <FeatureGrid items={FEATURES} />
      </section>

      <section className="section bg-soft">
        <SectionHead eyebrow="SECTORS" title="Industries We Serve" />
        <div className="grid-3 gap-sm">
          {SECTORS.map((s, i) => (
            <Reveal className="sector-card" delay={i * 70} key={s.title}>
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
        <SectionHead eyebrow="HOW IT WORKS" title="From Vacancy to Onboarded" />
        <div className="grid-3 num-grid">
          {STEPS.map((s, i) => (
            <Reveal className="num-step" delay={i * 80} key={s.title}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow="CLIENT RESULTS" title="What Employers Say" />
        <div className="grid-3">
          {QUOTES.map((q, i) => (
            <Reveal className="client-quote" delay={i * 100} key={q.who}>
              <div className="where">{q.where}</div>
              <div className="mark" aria-hidden>"</div>
              <p>{q.text}</p>
              <div className="who">{q.who}</div>
              <div className="role">{q.role}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="hire" className="section bg-soft">
        <div className="narrow">
          <div className="section-head" style={{ marginBottom: "3rem" }}>
            <div className="eyebrow">POST A VACANCY</div>
            <h2 className="h2">Tell Us What You Need</h2>
            <p>We'll respond with a proposal and timeline within 48 hours.</p>
          </div>
          <NetlifyForm
            name="job-order"
            className="light-form"
            submitLabel="Submit Vacancy Request →"
            submitClass="btn btn-navy btn-block span-2"
          >
            <Field label="Company Name" name="company" required />
            <Field label="Contact Person" name="contact" required />
            <Field label="Email / Phone" name="email" required />
            <Field label="Industry / Sector" name="industry" required />
            <Field label="Number of Positions" name="roles" required />
            <Field label="Role Requirements & Details" name="details" as="textarea" rows={4} className="span-2" required />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

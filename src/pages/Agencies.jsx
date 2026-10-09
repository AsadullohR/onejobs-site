import { Reveal, SectionHead, HeroStats, FeatureGrid, Timeline, Faq, NetlifyForm, Field } from "../components/ui";

const STATS = [
  { icon: "🌍", value: "12", label: "Partner Countries" },
  { icon: "👥", value: "34", label: "Active Partners" },
  { icon: "💰", value: "18%", label: "Avg. Referral Fee" },
  { icon: "📦", value: "1,200+", label: "Shared Placements" },
];

const FEATURES = [
  { icon: "🌐", title: "Extended Reach", text: "Tap into our Central Asian talent database of 280,000+ verified candidates across 40+ occupational categories." },
  { icon: "📤", title: "Job Order Sharing", text: "Share your unfilled vacancies with us. We source matching candidates and split placement fees on agreed terms." },
  { icon: "📥", title: "Candidate Referrals", text: "Refer candidates you cannot place yourself and earn a referral commission for every successful placement." },
  { icon: "📋", title: "Compliance Co-Support", text: "We handle in-country documentation, translation, and legal filings so you stay clean on both sides of the border." },
  { icon: "🤝", title: "Co-Branding Options", text: "Present our services under your own brand. We operate as a white-label back-office for partner agencies." },
  { icon: "📊", title: "Shared Dashboard", text: "Track shared vacancies, candidate pipelines, and placement milestones in our partner portal." },
];

const MODELS = [
  {
    title: "Referral Partner",
    text: "Send us candidates you cannot place. We do the work; you earn a referral fee.",
    perks: ["No minimum volume", "Simple referral agreement", "Earn 15–20% of placement fee", "Ideal for boutique agencies"],
    color: "#1565e0",
    tint: "#ebf2ff",
  },
  {
    title: "Job Order Partner",
    text: "Share your open vacancies and we'll source qualified candidates from our network.",
    perks: ["Access to 280K+ talent pool", "5–10 day shortlist delivery", "Co-branded candidate packs", "Split fee on placement"],
    color: "#16a34a",
    tint: "#f0fff4",
    featured: true,
  },
  {
    title: "White-Label Partner",
    text: "We operate as your back-office. Our services are delivered under your brand.",
    perks: ["Full white-label documentation", "Dedicated account manager", "Custom SLA & reporting", "For established agencies"],
    color: "#d97706",
    tint: "#fff8e1",
  },
];

const STEPS = [
  { title: "Initial Discussion", text: "We hop on a call to understand your agency, markets, and what kind of partnership makes sense." },
  { title: "Partnership Agreement", text: "A clear, straightforward MOU covering fee splits, referral rates, exclusivity terms, and escalation paths." },
  { title: "System Onboarding", text: "Access to our partner portal, candidate database filters, and your dedicated account manager." },
  { title: "First Placement", text: "We target your first shared vacancy or candidate referral within 10 days of agreement signing." },
  { title: "Grow Together", text: "Monthly reviews, pipeline forecasting, and joint marketing opportunities for strategic partners." },
];

const FAQ = [
  { q: "Do I need to be a licensed recruitment agency to partner?", a: "Yes. All partner agencies must hold valid recruitment licenses in their operating jurisdiction. We verify credentials before signing any agreement." },
  { q: "How are fees structured?", a: "Fee splits depend on the partnership model. Referral partners receive 15–20% of our placement fee. Job Order and White-Label partners negotiate terms during the MOU discussion." },
  { q: "Is there a minimum volume commitment?", a: "Referral partnerships have no minimum. Job Order and White-Label arrangements typically require a minimum of 5 placements per quarter." },
  { q: "Can we work together in markets where you are not yet present?", a: "Yes — this is one of the key reasons agencies partner with us. We can mobilise into new employer markets through a joint arrangement." },
  { q: "How do you handle candidate data privacy?", a: "All candidate data is handled in compliance with local data protection law and our mutual confidentiality agreement. No data is shared beyond the agreed scope." },
];

export default function Agencies() {
  return (
    <div className="theme-green">
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="hero-badge fade-up-1">🤝 For Recruitment Agencies</div>
            <h1 className="fade-up-2">
              Partner with Us.
              <br />
              <span>Place More.</span>
              <br />
              Earn More.
            </h1>
            <p className="lead fade-up-3">
              Join our partner network to share job orders, refer candidates, and co-place talent across borders — with a team that handles the complexity so you don't have to.
            </p>
            <div className="hero-actions fade-up-4">
              <a href="#partner" className="btn btn-accent">Become a Partner →</a>
              <a href="#models" className="btn btn-ghost">Partnership Models</a>
            </div>
          </div>
          <HeroStats stats={STATS} />
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow="WHAT YOU GET" title="Built for Agency Success" />
        <FeatureGrid items={FEATURES} />
      </section>

      <section id="models" className="section bg-soft">
        <SectionHead eyebrow="PARTNERSHIP MODELS" title="Choose How We Work Together" />
        <div className="grid-3">
          {MODELS.map((m, i) => (
            <Reveal
              className={`model-card${m.featured ? " featured" : ""}`}
              delay={i * 100}
              key={m.title}
              style={{ "--model-color": m.color }}
            >
              {m.featured && <div className="model-flag">Most Popular</div>}
              <div className="model-icon" style={{ background: m.tint }} aria-hidden>🤝</div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <ul>
                {m.perks.map((p) => (
                  <li key={p}><span aria-hidden>✓</span>{p}</li>
                ))}
              </ul>
              <a href="#partner" className="model-cta">Apply for This Model →</a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-navy on-dark">
        <SectionHead eyebrow="ONBOARDING" title="How We Start Working Together" />
        <Timeline steps={STEPS} />
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow="FAQ" title="Partnership Questions" />
        <Faq items={FAQ} />
      </section>

      <section id="partner" className="apply-section on-dark">
        <div className="apply-inner">
          <div className="section-head">
            <div className="eyebrow">APPLY NOW</div>
            <h2 className="h2">Start the Partnership Conversation</h2>
            <p>We respond to all agency enquiries within 2 business days.</p>
          </div>
          <NetlifyForm name="agency-partnership" className="stack-form dark-fields" submitLabel="Submit Partnership Application →">
            <Field label="Agency Name" name="agency" placeholder="Your company name" required />
            <Field label="Contact Person" name="contact_person" placeholder="Full name" required />
            <Field label="Email / Phone" name="contact" placeholder="contact@agency.com" required />
            <Field label="Operating Country" name="country" placeholder="Where is your agency based?" required />
            <Field label="Preferred Partnership Model" name="model" as="select" defaultValue="">
              <option value="">Select a model…</option>
              {MODELS.map((m) => (
                <option key={m.title} value={m.title}>{m.title}</option>
              ))}
            </Field>
            <Field
              label="Tell Us About Your Agency"
              name="details"
              as="textarea"
              rows={4}
              placeholder="Sectors you serve, current markets, what you're looking to achieve..."
            />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

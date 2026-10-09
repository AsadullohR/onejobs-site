import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, SectionHead, NetlifyForm } from "../components/ui";
import { SITE } from "../site";
import Vacancies from "../components/Vacancies";

const img = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const AVATARS = ["1507003211169-0a1dd7228f2d", "1438761681033-6461ffad8d80", "1500648767791-00dcc994a43e"];

const AUDIENCES = [
  { to: "/jobseekers", icon: "🌍", tint: "#ebf2ff", color: "#1565e0", title: "For Jobseekers", text: "Find verified international jobs, get visa support, and start your career abroad with full end-to-end help." },
  { to: "/employers", icon: "🏢", tint: "#fff8e1", color: "#f59e0b", title: "For Employers", text: "Hire pre-screened, motivated international talent. We handle compliance, documentation, and onboarding." },
  { to: "/agencies", icon: "🤝", tint: "#f0fff4", color: "#16a34a", title: "For Agencies", text: "Partner with us to expand your candidate pool, share job orders, and co-place talent across borders." },
];

const STATS = [
  { icon: "🌐", value: "15+", label: "Countries", sub: "Employment destinations" },
  { icon: "👥", value: "10,000+", label: "Happy Clients", sub: "Served worldwide" },
  { icon: "✅", value: "98%", label: "Visa Success", sub: "Approval rate" },
  { icon: "🎧", value: "24/7", label: "Support", sub: "Always here for you" },
];

const SERVICES = [
  { icon: "📋", title: "Job Placement", text: "We help you find employment at international companies across partner countries." },
  { icon: "🪪", title: "Work Permit Support", text: "Complete support with work permits and employment documentation." },
  { icon: "📄", title: "Visa Services", text: "Document preparation and submission for international work visas." },
  { icon: "✈️", title: "Travel Arrangement", text: "Flight booking, accommodation, and full pre-departure preparation." },
  { icon: "💬", title: "24/7 Support", text: "Fast, professional answers to all your questions at any hour." },
];

const COUNTRIES = [
  { tag: "GERMANY", badge: "€2800–€3500", photo: "1467269204594-9661b134dd2b", title: "Work in Germany", perks: ["High salary", "Official employment", "Housing included"] },
  { tag: "KOREA", badge: "E-7 VISA", blue: true, photo: "1517154421773-0529f29ea451", title: "Work in Korea", perks: ["High salary", "Official employment", "Up to 4-yr contract"] },
  { tag: "CROATIA", badge: "€1100–€1500", photo: "1555990793-da11153b2473", title: "Work in Croatia", perks: ["Construction sector", "Official employment", "Housing included"] },
  { tag: "POLAND", badge: "€1000–€1400", photo: "1519197924294-4ba991a11128", title: "Work in Poland", perks: ["Factory work", "Official employment", "Housing included"] },
];

const PROCESS = [
  { title: "Apply Online", text: "Submit your application via our website or visit our office." },
  { title: "Consultation", text: "Our specialist helps you choose the best destination." },
  { title: "Document Prep", text: "Required documents are prepared and officially certified." },
  { title: "Job Application", text: "Your profile is submitted to vetted international employers." },
  { title: "Departure", text: "After visa approval, your future awaits!" },
];

const TESTIMONIALS = [
  { name: "Jasurbek R.", role: "Korea, E-7 Visa", text: "Through OneJobs Consulting I found work in Korea quickly and easily. The team was incredibly helpful throughout. Thank you!" },
  { name: "Mohinur A.", role: "Germany, Work Visa", text: "Finding a job in Germany was a dream. OneJobs turned it into reality — they guided me through every step." },
  { name: "Sarvar M.", role: "Poland, Work Visa", text: "Working in Poland is great. The salary and conditions are exactly as promised. Honest and professional team!" },
  { name: "Dilshoda T.", role: "Croatia, Work Visa", text: "Very professional team! They answered every question quickly and helped me prepare all my employment documents perfectly." },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="section bg-white">
      <SectionHead eyebrow="CLIENT VOICES" title="Happy Clients" />
      <div className="testimonials-grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {TESTIMONIALS.map((t, i) => (
          <button key={t.name} className={`quote-card${i === active ? " active" : ""}`} onClick={() => setActive(i)}>
            <div className="quote-mark" aria-hidden>"</div>
            <p>{t.text}</p>
            <div className="quote-author">
              <div className="quote-avatar" aria-hidden>{t.name[0]}</div>
              <div>
                <div className="quote-name">{t.name}</div>
                <div className="quote-role">{t.role}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="dots">
        {TESTIMONIALS.map((t, i) => (
          <button key={t.name} className={i === active ? "active" : ""} aria-label={`Show testimonial ${i + 1}`} onClick={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="pill fade-up-1">
            <span className="pill-dot" />
            International Employment Consulting
          </div>
          <h1 className="hero-title fade-up-2">
            We Open Doors
            <br />
            to Your <span>Future</span>
          </h1>
          <p className="hero-lead fade-up-3">
            International employment opportunities that transform your life. Trusted by 10,000+ clients across 15 countries.
          </p>
          <div className="hero-actions fade-up-3">
            <a href="#contact" className="btn btn-primary">Free Consultation →</a>
            <a href="#services" className="btn btn-outline">Our Services →</a>
          </div>
          <div className="social-proof fade-up-4">
            <div className="avatars">
              {AVATARS.map((id) => (
                <img key={id} src={`https://images.unsplash.com/photo-${id}?w=72&h=72&fit=crop`} alt="" loading="lazy" />
              ))}
            </div>
            <div>
              <div className="proof-title">10,000+ clients</div>
              <div className="proof-sub">already achieved their goals</div>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <img src={img("1436491865332-7a61a109cc05", 1200, 1200)} alt="View of a plane wing above the clouds" />
          <div className="float-card">
            <div className="float-icon" aria-hidden>✈️</div>
            <div>
              <div className="proof-title">15+ Countries</div>
              <div className="proof-sub">Employment destinations</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight bg-soft">
        <SectionHead eyebrow="WHO WE SERVE" title="Built for Everyone in the Hiring Journey" />
        <div className="grid-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.to} delay={i * 80}>
              <Link to={a.to} className="audience-card">
                <div className="icon-tile" style={{ background: a.tint }} aria-hidden>{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="more" style={{ color: a.color }}>Learn more →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-icon" aria-hidden>{s.icon}</div>
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
        <SectionHead eyebrow="OUR SERVICES" title="We Provide Complete Support" />
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal className="service-card" delay={i * 80} key={s.title}>
              <div className="emoji" aria-hidden>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#contact" className="more">Learn more →</a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="countries" className="section bg-soft">
        <Reveal className="row-head">
          <div>
            <div className="eyebrow">OPPORTUNITIES</div>
            <h2 className="h2">Work Opportunities Worldwide</h2>
          </div>
          <Link to="/jobseekers#destinations" className="btn btn-outline btn-sm">All Countries →</Link>
        </Reveal>
        <div className="countries-grid">
          {COUNTRIES.map((c, i) => (
            <Reveal className="country-card" delay={i * 80} key={c.tag}>
              <img src={img(c.photo, 500, 640)} alt={c.title} loading="lazy" />
              <div className="country-body">
                <div className="country-top">
                  <span className="country-tag">{c.tag}</span>
                  <span className={`country-badge${c.blue ? " blue" : ""}`}>{c.badge}</span>
                </div>
                <div>
                  <h3>{c.title}</h3>
                  <ul className="check-list">
                    {c.perks.map((p) => (
                      <li key={p}><span aria-hidden>✓</span>{p}</li>
                    ))}
                  </ul>
                  <Link to="/jobseekers#apply" className="country-cta">Learn More →</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Vacancies
        limit={3}
        moreLink={<Link to="/jobseekers#vacancies" className="btn btn-outline btn-sm">All Vacancies →</Link>}
      />

      <section id="process" className="section bg-navy on-dark">
        <SectionHead eyebrow="THE PROCESS" title="How Do We Work?" />
        <div className="process-steps">
          {PROCESS.map((p, i) => (
            <Reveal className="process-step" delay={i * 100} key={p.title}>
              <div className="step-num">{i + 1}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <section id="contact" className="cta">
        <div className="cta-plane" aria-hidden>✈</div>
        <div className="cta-inner">
          <div className="cta-copy">
            <h2>
              Take the first step
              <br />
              toward your dreams <span>today!</span>
            </h2>
            <p>Get a free consultation and let us plan your future together.</p>
          </div>
          <NetlifyForm
            name="contact"
            className="glass-form dark-fields"
            submitLabel="Get Free Consultation →"
            submitClass="btn btn-primary btn-block"
            footer={<div className="form-note">{SITE.hours} · {SITE.phone}</div>}
          >
            <input className="input" name="name" placeholder="Full Name" aria-label="Full name" required />
            <input className="input" name="contact" placeholder="Phone / Email" aria-label="Phone or email" required />
            <textarea className="input" name="message" rows={3} placeholder="How can we help?" aria-label="How can we help?" required />
          </NetlifyForm>
        </div>
      </section>
    </>
  );
}

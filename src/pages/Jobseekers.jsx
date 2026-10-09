import { useSearchParams } from "react-router-dom";
import Vacancies from "../components/Vacancies";
import { Reveal, SectionHead, HeroStats, FeatureGrid, Timeline, Faq, NetlifyForm, Field } from "../components/ui";

const STATS = [
  { icon: "🌐", value: "15+", label: "Countries" },
  { icon: "✅", value: "8,400+", label: "Jobs Filled" },
  { icon: "📋", value: "98%", label: "Visa Success" },
  { icon: "💰", value: "3×", label: "Avg. Salary Boost" },
];

const FEATURES = [
  { icon: "🌍", title: "Verified Job Offers", text: "Every job we list is directly contracted with the employer — no middlemen, no fake postings." },
  { icon: "📋", title: "Full Document Support", text: "We prepare, translate, and certify all documents needed for your application and visa." },
  { icon: "✈️", title: "Travel & Relocation", text: "From flight booking to arrival support, we take care of your entire journey." },
  { icon: "🏠", title: "Housing Assistance", text: "Most positions come with employer-provided accommodation or housing support." },
  { icon: "🎓", title: "Language Prep", text: "Access free pre-departure orientation and language basics for your destination country." },
  { icon: "📞", title: "24/7 Helpline", text: "Once you are abroad, our support team is always reachable for any issue you face." },
];

const DESTINATIONS = [
  { flag: "🇩🇪", name: "Germany", roles: "Welding, Logistics, Care", salary: "€2,800 – €3,500 / mo", visa: "Work Visa / Blue Card" },
  { flag: "🇰🇷", name: "South Korea", roles: "Manufacturing, Construction", salary: "₩3.0M – ₩4.5M / mo", visa: "E-7 / E-9 Visa" },
  { flag: "🇭🇷", name: "Croatia", roles: "Construction, Tourism", salary: "€1,100 – €1,500 / mo", visa: "Work Permit" },
  { flag: "🇵🇱", name: "Poland", roles: "Factory, Warehouse, IT", salary: "€1,000 – €1,400 / mo", visa: "Work Permit" },
  { flag: "🇯🇵", name: "Japan", roles: "Manufacturing, Hospitality", salary: "¥250,000 – ¥350,000 / mo", visa: "SSW Visa" },
  { flag: "🇦🇪", name: "UAE", roles: "Engineering, Finance, Trade", salary: "AED 5,000 – 12,000 / mo", visa: "Employment Visa" },
];

const STEPS = [
  { title: "Register & Tell Us Your Goals", text: "Fill out our free profile form — your skills, experience, and which countries interest you." },
  { title: "Meet Your Personal Consultant", text: "We assign a dedicated consultant who matches you to live opportunities and advises on your options." },
  { title: "Document Collection", text: "We guide you through every document needed, provide templates, and handle translations." },
  { title: "Employer Interview", text: "We prepare you for interviews and coordinate all communication with the hiring company." },
  { title: "Visa & Departure", text: "We submit your visa application and accompany you through every step until you board your flight." },
];

const FAQ = [
  { q: "Is there a fee to use your services?", a: "Our job placement services are completely free for jobseekers. We are paid by the employer or through our government-approved fee structure." },
  { q: "How long does the process take?", a: "Typically 4–8 weeks from registration to departure, depending on the destination country and visa processing times." },
  { q: "Do I need to speak the local language?", a: "Not necessarily. Many roles require only basic English. We also provide pre-departure language orientation." },
  { q: "What documents do I need?", a: "A valid passport, medical certificate, diploma/skills certificates, and a criminal background check. We guide you through everything." },
  { q: "Can I bring my family?", a: "Many employment visas allow family reunification after a qualifying period. Your consultant will advise based on your destination country." },
];

export default function Jobseekers() {
  const [params, setParams] = useSearchParams();
  const vacancy = params.get("vacancy") || "";

  return (
    <div className="theme-blue">
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="hero-badge fade-up-1">🌍 For Jobseekers</div>
            <h1 className="fade-up-2">
              Your International
              <br />
              <span>Career Starts Here</span>
            </h1>
            <p className="lead fade-up-3">
              We match qualified candidates with verified employers across 15 countries — and handle everything from documents to departure. No fees. No stress.
            </p>
            <div className="hero-actions fade-up-4">
              <a href="#apply" className="btn btn-accent">Apply for Free →</a>
              <a href="#destinations" className="btn btn-ghost">View Destinations</a>
            </div>
          </div>
          <HeroStats stats={STATS} />
        </div>
      </section>

      <section className="section bg-white">
        <SectionHead eyebrow="WHY CHOOSE US" title="Everything You Need, All in One Place" />
        <FeatureGrid items={FEATURES} />
      </section>

      <Vacancies id="vacancies" limit={9} title="Open Vacancies Right Now" />

      <section id="destinations" className="section bg-soft">
        <SectionHead eyebrow="OPEN DESTINATIONS" title="Where Could You Work?" />
        <div className="grid-3 gap-sm">
          {DESTINATIONS.map((d, i) => (
            <Reveal className="dest-card" delay={i * 70} key={d.name}>
              <div className="dest-head">
                <span className="flag" aria-hidden>{d.flag}</span>
                <span className="name">{d.name}</span>
              </div>
              <div className="dest-row"><strong>Roles:</strong> {d.roles}</div>
              <div className="dest-row"><strong>Salary:</strong> {d.salary}</div>
              <div className="dest-row"><strong>Visa:</strong> {d.visa}</div>
              <a href="#apply" className="dest-link">Apply now →</a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-navy on-dark">
        <SectionHead eyebrow="THE PROCESS" title="Your Journey, Step by Step" />
        <Timeline steps={STEPS} />
      </section>

      <section id="faq" className="section bg-white">
        <SectionHead eyebrow="FAQ" title="Common Questions" />
        <Faq items={FAQ} />
      </section>

      <section id="apply" className="apply-section">
        <div className="apply-inner">
          <div className="section-head">
            <div className="eyebrow" style={{ color: "var(--blue-light)" }}>GET STARTED</div>
            <h2 className="h2">Ready to Apply?</h2>
            <p>Fill in your details and a consultant will contact you within 24 hours — free of charge.</p>
          </div>
          <NetlifyForm name="jobseeker-application" className="stack-form dark-fields" submitLabel="Submit Application — It's Free →">
            {vacancy && (
              <div className="applying-for">
                <span>Applying for: <strong>{vacancy}</strong></span>
                <button type="button" onClick={() => setParams({}, { replace: true })}>Clear</button>
              </div>
            )}
            <input type="hidden" name="vacancy" value={vacancy} />
            <Field label="Full Name" name="name" placeholder="Your full name" required />
            <Field label="Phone / Email" name="contact" placeholder="+998 XX XXX XX XX" required />
            <Field label="Preferred Country" name="country" as="select" defaultValue="">
              <option value="">Select destination…</option>
              {DESTINATIONS.map((d) => (
                <option key={d.name} value={d.name}>{d.flag} {d.name}</option>
              ))}
            </Field>
            <Field label="Your Skills / Profession" name="skills" as="textarea" rows={3} placeholder="e.g. Welder, 5 years experience" />
          </NetlifyForm>
        </div>
      </section>
    </div>
  );
}

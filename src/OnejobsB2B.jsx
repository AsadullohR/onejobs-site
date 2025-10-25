import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  Globe2,
  Users2,
  ShieldCheck,
  PhoneCall,
  Mail,
  Send,
  Rocket,
  CheckCircle2,
  Languages,
  FileCheck2,
  MapPin,
  Factory,
  Construction,
  Hotel,
  UtensilsCrossed,
} from "lucide-react";

// Smooth scroll behavior for anchor links
function useSmoothScroll() {
  useEffect(() => {
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Stat = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-md backdrop-blur">
    <div className="text-3xl font-semibold text-white">{value}</div>
    <div className="mt-1 text-sm text-white/70">{label}</div>
  </div>
);

const FeatureCard = ({ Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-md backdrop-blur"
  >
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-white/10 p-3"><Icon className="h-6 w-6 text-white"/></div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="mt-3 text-sm text-white/80 leading-relaxed">{desc}</p>
  </motion.div>
);

const IndustryPill = ({ Icon, label }) => (
  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
    <Icon className="h-4 w-4" /> {label}
  </div>
);

const PartnerLogo = ({ name }) => (
  <div className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-white/70">
    {name}
  </div>
);

export default function OnejobsB2B() {
  useSmoothScroll();
  const [jobOrderStatus, setJobOrderStatus] = useState("idle");
  const handleJobOrderSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("form-name")) data.set("form-name", "job-order");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      setJobOrderStatus("success");
      form.reset();
    } catch (err) {
      setJobOrderStatus("error");
    }
  };

  return (
    <div className="min-h-screen scroll-smooth bg-[#0B1220] text-white">
      {/* Gradient BG decorations */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"/>
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl"/>
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"/>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5">
        <Container className="flex items-center justify-between py-4">
          <a href="#top" className="group flex items-center gap-2">
            <div className="rounded-xl bg-white/10 p-2"><Rocket className="h-5 w-5"/></div>
            <span className="text-lg font-semibold">
              <span className="text-indigo-400">One</span>jobs Consulting
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm text-white/80 hover:text-white">Services</a>
            <a href="#industries" className="text-sm text-white/80 hover:text-white">Industries</a>
            <a href="#process" className="text-sm text-white/80 hover:text-white">Process</a>
            <a href="#compliance" className="text-sm text-white/80 hover:text-white">Compliance</a>
            <a href="#cases" className="text-sm text-white/80 hover:text-white">Cases</a>
            <a href="#contact" className="text-sm text-white/80 hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="rounded-xl border border-indigo-400/40 px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-500/10">Partner with us</a>
            <a href="#joborder" className="hidden rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 md:inline-block">Send Job Order</a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section id="top" className="pt-10 md:pt-20">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Badge>International B2B Recruitment & Workforce Solutions</Badge>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Hire <span className="text-indigo-400">reliably</span>, scale <span className="text-cyan-400">faster</span> — with a partner rooted in Central Asia
            </h1>
            <p className="mt-4 text-white/80">
              Onejobs Consulting connects vetted talent from Uzbekistan & wider Asia with employers across the Gulf, EU, and CEE. We manage the end‑to‑end pipeline — sourcing, compliance, deployment, and post‑arrival support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#joborder" className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium hover:bg-indigo-600">Submit Job Order</a>
              <a href="#compliance" className="rounded-xl border border-white/15 px-5 py-3 text-sm hover:bg-white/5">Licenses & Compliance</a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <Stat label="Candidate pool" value="> 25,000" />
              <Stat label="Avg. lead time" value="14–28 days" />
              <Stat label="Client retention" value="93%" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-400/30 via-cyan-400/20 to-fuchsia-400/20"/>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-40 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/80 md:block">
              <div className="mb-2 font-semibold text-white">Quick facts</div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5"/> Licensed private agency</li>
                <li className="flex items-center gap-2"><Languages className="h-3.5 w-3.5"/> EN/RU/UZ/TR/AR support</li>
                <li className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5"/> Deploy to EU & GCC</li>
              </ul>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">What we do</h2>
            <p className="mt-3 text-white/80">From first brief to first shift — a single accountable team.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard Icon={Briefcase} title="Targeted Sourcing" desc="Localized marketing, referrals, and talent communities deliver pre‑qualified candidates fast."/>
            <FeatureCard Icon={Users2} title="Screening & Skills Checks" desc="Structured interviews, trade tests, language checks and document vetting."/>
            <FeatureCard Icon={FileCheck2} title="Permits & Paperwork" desc="Apostille, notarization, consular legalization, work permits, medicals, insurance — handled."/>
            <FeatureCard Icon={ShieldCheck} title="Compliance & Ethics" desc="Licensed operations, GDPR‑aware data handling, and transparent fees."/>
            <FeatureCard Icon={Send} title="Deployment & Logistics" desc="Flights, accommodation coordination, onboarding, and first‑week support."/>
            <FeatureCard Icon={PhoneCall} title="Post‑arrival Care" desc="Retention check‑ins, attendance tracking, and swift issue resolution."/>
          </div>
        </Container>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries" className="py-16">
        <Container>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Industries we serve</h2>
            <p className="mt-3 text-white/80">Blue‑ and grey‑collar hiring at scale across EU & GCC.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <IndustryPill Icon={Construction} label="Construction"/>
            <IndustryPill Icon={Factory} label="Manufacturing"/>
            <IndustryPill Icon={UtensilsCrossed} label="Hospitality & F&B"/>
            <IndustryPill Icon={Building2} label="Facilities & Cleaning"/>
            <IndustryPill Icon={Briefcase} label="Admin & Support"/>
            <IndustryPill Icon={Globe2} label="Logistics & Warehousing"/>
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Simple, transparent process</h2>
            <p className="mt-3 text-white/80">Clear milestones, regular updates, and accountable timelines.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {["Brief", "Sourcing", "Selection", "Deployment"].map((step, i) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/60">Step {i+1}</div>
                <div className="mt-1 text-lg font-semibold">{step}</div>
                <p className="mt-2 text-sm text-white/80">
                  {i===0 && "Define roles, volumes, budgets, timelines, and compliance."}
                  {i===1 && "Launch campaigns, gather applicants, pre‑screen, and schedule tests."}
                  {i===2 && "Interviews, trade tests, document checks, offers and contracts."}
                  {i===3 && "Work permits, travel, onboarding, attendance tracking and care."}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PARTNERS / LOGOS */}
      <Section id="partners" className="py-12">
        <Container>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold sm:text-2xl">Trusted by employers across EU & GCC</h2>
            <p className="mt-2 text-white/70">Selected partners & projects</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {["Perutnina", "Al Shaya", "Hilton", "Gulermak", "DP World", "Bosch"].map((n) => (
              <PartnerLogo key={n} name={n} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CASES */}
      <Section id="cases" className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Recent placements & results</h2>
            <p className="mt-3 text-white/80">A snapshot of speed and retention at volume.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {title:"Food processing (SI)", metric:"120 hires in 21 days", note:"88% 90‑day retention"},
              {title:"Hotel staff (QA)", metric:"60 hires in 18 days", note:"95% attendance"},
              {title:"Construction (LT)", metric:"75 hires in 30 days", note:"Zero compliance issues"},
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm text-white/60"><CheckCircle2 className="h-4 w-4"/> {c.title}</div>
                <div className="mt-3 text-lg font-semibold">{c.metric}</div>
                <div className="mt-1 text-sm text-white/80">{c.note}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* COMPLIANCE */}
      <Section id="compliance" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Licenses, compliance & footprint</h2>
            <p className="mt-3 text-white/80">Operating lawfully with auditable processes and multilingual support.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard Icon={ShieldCheck} title="Licensed Private Agency" desc="Registered in Uzbekistan. Documents available on request."/>
            <FeatureCard Icon={Languages} title="Multilingual Ops" desc="English, Uzbek, Russian, Turkish, Arabic — across candidate & client journeys."/>
            <FeatureCard Icon={Globe2} title="Deploy Regions" desc="GCC (UAE, QA, KW, SA) • EU/CEE (SI, LT, LV, PL, BG, RO)"/>
          </div>
        </Container>
      </Section>

      {/* JOB ORDER CTA */}
      <Section id="joborder" className="py-16">
        <Container>
          <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold">Ready to brief your roles?</h3>
                <p className="mt-2 text-white/80">Tell us your volumes, shifts, salary bands, and deployment deadlines. We will revert with a sourcing and compliance plan within 24 hours.</p>
                <ul className="mt-4 grid gap-2 text-sm text-white/80">
                  <li className="flex items-center gap-2"><Rocket className="h-4 w-4"/> Quick launch in 48h</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Transparent fees & milestones</li>
                  <li className="flex items-center gap-2"><FileCheck2 className="h-4 w-4"/> Documentation handled end‑to‑end</li>
                </ul>
              </div>
              {/* Netlify form */}
              <form name="job-order" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-3" onSubmit={handleJobOrderSubmit} action="/thank-you">
                <input type="hidden" name="form-name" value="job-order"/>
                <p className="hidden">
                  <label>Don’t fill this out: <input name="bot-field" /></label>
                </p>
                <div>
                  <label className="text-sm text-white/80">Company name</label>
                  <input name="company" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400" placeholder="e.g., Perutnina Ptuj Slovenija"/>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/80">Contact person</label>
                    <input name="contact" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="Full name"/>
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Work email</label>
                    <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="name@company.com"/>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/80">Roles & headcount</label>
                    <input name="roles" className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="e.g., 50 pickers, 20 waiters"/>
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Deployment target</label>
                    <input name="deadline" className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="e.g., Nov 30, 2025"/>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/80">Additional details</label>
                  <textarea name="details" rows={4} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="Shifts, salary bands, housing, transport, language, trade tests…"/>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium hover:bg-indigo-600"><Send className="h-4 w-4"/>Submit Job Order</button>
                {jobOrderStatus === "success" && (
                  <p className="text-sm text-emerald-300">Thanks! Your job order was sent successfully. We’ll reply within one business day.</p>
                )}
                {jobOrderStatus === "error" && (
                  <p className="text-sm text-rose-300">Sorry—something went wrong. Please email us or try again.</p>
                )}
              </form>
            </div>
          </div>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-16 md:py-24">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Contact</h2>
            <p className="mt-3 text-white/80">Let’s discuss your hiring plan. We usually respond within one business day.</p>
            <div className="mt-6 space-y-3 text-white/80">
              <div className="flex items-center gap-2"><Mail className="h-5 w-5"/> jobs@trt.uz</div>
              <div className="flex items-center gap-2"><PhoneCall className="h-5 w-5"/> +998 (97) 676-33-77</div>
              <div className="flex items-center gap-2"><MapPin className="h-5 w-5"/> Andijan, Uzbekistan</div>
            </div>
          </div>
          {/* Netlify contact form */}
          <form name="contact" method="POST" data-netlify="true" className="space-y-3" netlify-honeypot="bot-field" action="/thank-you">
            <input type="hidden" name="form-name" value="contact"/>
            <p className="hidden">
              <label>Don’t fill this out: <input name="bot-field" /></label>
            </p>
            <div>
              <label className="text-sm text-white/80">Your name</label>
              <input name="name" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="Full name"/>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-white/80">Work email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="name@company.com"/>
              </div>
              <div>
                <label className="text-sm text-white/80">Company</label>
                <input name="company" className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="Company name"/>
              </div>
            </div>
            <div>
              <label className="text-sm text-white/80">Message</label>
              <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" placeholder="How can we help?"/>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15">
              <Send className="h-4 w-4"/> Send message
            </button>
          </form>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-white/60">© {new Date().getFullYear()} Onejobs Consulting. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <a href="#compliance" className="hover:text-white">Compliance</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}

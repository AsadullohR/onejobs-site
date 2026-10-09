import { useEffect, useRef, useState } from "react";
import { useNetlifyForm } from "./useNetlifyForm";

// Fades children in the first time they scroll into view.
export function Reveal({ as = "div", className = "", delay = 0, fromLeft = false, style, children, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ["reveal", fromLeft && "from-left", visible && "is-visible", className].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={classes} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="h2">{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

export function HeroStats({ stats }) {
  return (
    <div className="hero-stats fade-up-3">
      {stats.map((s) => (
        <div className="hero-stat" key={s.label}>
          <div className="emoji" aria-hidden>{s.icon}</div>
          <div className="value">{s.value}</div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function FeatureGrid({ items }) {
  return (
    <div className="grid-3">
      {items.map((f, i) => (
        <Reveal className="feature-card" delay={i * 70} key={f.title}>
          <div className="emoji" aria-hidden>{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Timeline({ steps }) {
  return (
    <div className="timeline">
      {steps.map((s, i) => (
        <Reveal className="timeline-item" fromLeft delay={i * 80} key={s.title}>
          <div className="timeline-num">{String(i + 1).padStart(2, "0")}</div>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="narrow">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal className={`faq-item${isOpen ? " open" : ""}`} delay={i * 60} key={item.q}>
            <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden>+</span>
            </button>
            <div className="faq-a">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function NetlifyForm({ name, className, children, submitLabel, submitClass = "btn btn-accent btn-block", footer }) {
  const { onSubmit, status } = useNetlifyForm(name);
  return (
    <form name={name} method="POST" data-netlify="true" netlify-honeypot="bot-field" className={className} onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden-field">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {children}
      <button type="submit" className={submitClass} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      {status === "error" && <div className="form-error">Something went wrong. Please call or email us instead.</div>}
      {footer}
    </form>
  );
}

export function Field({ label, name, as = "input", className = "", children, ...props }) {
  const Tag = as;
  const id = `f-${name}`;
  return (
    <div className={`field ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <Tag id={id} name={name} className="input" {...props}>
        {children}
      </Tag>
    </div>
  );
}

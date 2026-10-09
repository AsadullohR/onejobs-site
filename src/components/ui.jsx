import { useEffect, useRef, useState } from "react";
import { useNetlifyForm } from "./useNetlifyForm";
import { SITE } from "../site";

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

// WhatsApp contact for employers and partner agencies.
export function WhatsAppB2B({ message, className = "" }) {
  const href = message ? `${SITE.whatsappB2BHref}?text=${encodeURIComponent(message)}` : SITE.whatsappB2BHref;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${className}`}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 6.66 2.76 9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42m8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.75l6.13-1.61a11.33 11.33 0 0 0 5.32 1.35h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03"/>
      </svg>
      WhatsApp {SITE.whatsappB2B}
    </a>
  );
}

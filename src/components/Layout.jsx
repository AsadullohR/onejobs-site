import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo-onejobs.png";
import { SITE } from "../site";
import { LANGS, useLang, useT } from "../i18n/lang";
import { common } from "../content/common";
import { COUNTRIES } from "../content/countries";

// Scroll to the #hash target after navigation, or to the top on a new page.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  const t = useT(common);
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === lang ? "active" : ""}
          aria-pressed={l.code === lang}
          title={l.name}
          lang={l.code}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Nav() {
  const t = useT(common).nav;
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  const items = [
    { to: "/", label: t.home, end: true },
    { to: "/jobseekers", label: t.jobseekers },
    { to: "/countries", label: t.countries },
    { to: "/employers", label: t.employers },
    { to: "/agencies", label: t.agencies },
  ];
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <>
      <nav className="nav" aria-label="Main">
        <Link to="/" className="nav-logo" aria-label={`${SITE.name} — ${t.home}`}>
          <img src={logo} alt={SITE.name} />
        </Link>
        <div className="nav-links">
          {items.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="nav-link">{t.contact}</Link>
        </div>
        <div className="nav-right">
          <LangSwitch />
          <Link to="/#contact" className="btn btn-primary nav-cta">{t.cta}</Link>
          <button
            className={`hamburger${open ? " open" : ""}`}
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu">
          {items.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#contact">{t.contact}</Link>
          <Link to="/#contact" className="btn btn-primary">{t.cta}</Link>
        </div>
      )}
    </>
  );
}

function Footer() {
  const { lang } = useLang();
  const c = useT(common);
  const f = c.footer;
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={logo} alt={SITE.name} className="footer-logo" />
          <p className="footer-blurb">{f.blurb}</p>
        </div>
        <div>
          <div className="footer-title">{f.company}</div>
          <ul className="footer-links">
            <li><Link to="/jobseekers">{c.nav.jobseekers}</Link></li>
            <li><Link to="/employers">{c.nav.employers}</Link></li>
            <li><Link to="/agencies">{c.nav.agencies}</Link></li>
            <li><Link to="/jobseekers#faq">{f.faq}</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">{f.countries}</div>
          <ul className="footer-links">
            {COUNTRIES.map((co) => (
              <li key={co.slug}><Link to={`/countries/${co.slug}`}>{co.flag} {co[lang].name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-title">{f.services}</div>
          <ul className="footer-links">
            {f.serviceLinks.map((s) => (
              <li key={s}><Link to="/#services">{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-title">{f.contact}</div>
          <ul className="footer-links">
            <li><span>{f.address}</span></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><span>{f.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. {f.rights}</span>
        <Link to="/#contact" style={{ color: "rgba(255,255,255,0.4)" }}>{f.consult}</Link>
      </div>
    </footer>
  );
}

export default function Layout() {
  useScrollOnNavigate();
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

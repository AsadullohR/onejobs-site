import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-onejobs.png";
import { SITE } from "../site";
import Flag from "./Flag";
import { LANGS, useLang, useT, useLocalePath, saveLang, splitLangPath, withLang } from "../i18n/lang";
import { common } from "../content/common";
import { COUNTRIES, countryText } from "../content/countries";
import { FACTS } from "../content/facts";

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
  const { lang } = useLang();
  const t = useT(common);
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const choose = (code) => {
    saveLang(code);
    // Netlify reads this cookie when redirecting the bare domain (see public/_redirects).
    document.cookie = `nf_lang=${code}; path=/; max-age=31536000; samesite=lax`;
    navigate(withLang(splitLangPath(pathname).rest, code) + search + hash);
  };

  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === lang ? "active" : ""}
          aria-pressed={l.code === lang}
          title={l.name}
          lang={l.locale}
          onClick={() => choose(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Nav() {
  const t = useT(common).nav;
  const lp = useLocalePath();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  const items = [
    { to: lp("/"), label: t.home, end: true },
    { to: lp("/employers"), label: t.employers },
    { to: lp("/agencies"), label: t.agencies },
    { to: lp("/countries"), label: t.countries },
    { to: lp("/jobseekers"), label: t.jobseekers },
  ];
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <>
      <nav className="nav" aria-label="Main">
        <Link to={lp("/")} className="nav-logo" aria-label={`${SITE.name} — ${t.home}`}>
          <img src={logo} alt={SITE.name} />
        </Link>
        <div className="nav-links">
          {items.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-right">
          <LangSwitch />
          <Link to={lp("/#request")} className="btn btn-primary nav-cta">{t.cta}</Link>
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
          <Link to={lp("/#request")} className="btn btn-primary">{t.cta}</Link>
        </div>
      )}
    </>
  );
}

function Footer() {
  const { lang } = useLang();
  const lp = useLocalePath();
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
            <li><Link to={lp("/employers")}>{c.nav.employers}</Link></li>
            <li><Link to={lp("/agencies")}>{c.nav.agencies}</Link></li>
            <li><Link to={lp("/jobseekers")}>{c.nav.jobseekers}</Link></li>
            <li><Link to={lp("/jobseekers#faq")}>{f.faq}</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">{f.services}</div>
          <ul className="footer-links">
            {f.serviceLinks.map((s, i) => (
              <li key={s}><Link to={`${lp("/")}?sector=${i}#request`}>{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-title">{f.countries}</div>
          <ul className="footer-links">
            {COUNTRIES.map((co) => (
              <li key={co.slug}><Link to={lp(`/countries/${co.slug}`)}><Flag code={co.code} /> {countryText(co, lang).name}</Link></li>
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
            {FACTS.licence && <li><span>{f.licence} {FACTS.licence}</span></li>}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. {f.rights}</span>
        <Link to={lp("/#request")} style={{ color: "rgba(255,255,255,0.4)" }}>{f.consult}</Link>
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

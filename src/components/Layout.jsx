import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo-onejobs.png";
import { SITE } from "../site";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/jobseekers", label: "For Jobseekers" },
  { to: "/employers", label: "For Employers" },
  { to: "/agencies", label: "For Agencies" },
];

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

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <>
      <nav className="nav" aria-label="Main">
        <Link to="/" className="nav-logo" aria-label={`${SITE.name} home`}>
          <img src={logo} alt={SITE.name} />
        </Link>
        <div className="nav-links">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="nav-link">Contact</Link>
        </div>
        <div className="nav-right">
          <Link to="/#contact" className="btn btn-primary nav-cta">Free Consultation →</Link>
          <button
            className={`hamburger${open ? " open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
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
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#contact">Contact</Link>
          <Link to="/#contact" className="btn btn-primary">Free Consultation →</Link>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={logo} alt={SITE.name} className="footer-logo" />
          <p className="footer-blurb">International employment opportunities — guiding your career forward.</p>
        </div>
        <div>
          <div className="footer-title">COMPANY</div>
          <ul className="footer-links">
            <li><Link to="/jobseekers">For Jobseekers</Link></li>
            <li><Link to="/employers">For Employers</Link></li>
            <li><Link to="/agencies">For Agencies</Link></li>
            <li><Link to="/jobseekers#faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">SERVICES</div>
          <ul className="footer-links">
            <li><Link to="/#services">Job Placement</Link></li>
            <li><Link to="/#services">Work Permit Support</Link></li>
            <li><Link to="/#services">Visa Services</Link></li>
            <li><Link to="/#services">Travel Arrangement</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">CONTACT</div>
          <ul className="footer-links">
            <li><span>{SITE.address}</span></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><span>{SITE.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <Link to="/#contact" style={{ color: "rgba(255,255,255,0.4)" }}>Get a free consultation</Link>
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

import { Link } from "react-router-dom";
import { SITE } from "../site";
import { useT, useLocalePath } from "../i18n/lang";
import { common } from "../content/common";

export default function ThankYou() {
  const t = useT(common).thanks;
  const lp = useLocalePath();
  return (
    <section className="simple-page">
      <div>
        <div className="big" aria-hidden>✅</div>
        <h1>{t.title}</h1>
        <p>
          {t.text}{" "}
          <a href={SITE.phoneHref} style={{ color: "#fff", fontWeight: 600 }}>{SITE.phone}</a>.
        </p>
        <Link to={lp("/")} className="btn btn-primary">{t.back}</Link>
      </div>
    </section>
  );
}

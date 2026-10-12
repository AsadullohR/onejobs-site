import { Link } from "react-router-dom";
import { useT } from "../i18n/lang";
import { common } from "../content/common";

export default function NotFound() {
  const t = useT(common).notFound;
  return (
    <section className="simple-page">
      <div>
        <div className="big">404</div>
        <h1>{t.title}</h1>
        <p>{t.text}</p>
        <Link to="/" className="btn btn-primary">{t.back}</Link>
      </div>
    </section>
  );
}

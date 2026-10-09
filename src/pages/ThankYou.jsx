import { Link } from "react-router-dom";
import { SITE } from "../site";

export default function ThankYou() {
  return (
    <section className="simple-page">
      <div>
        <div className="big" aria-hidden>✅</div>
        <h1>Thank you! We got your request.</h1>
        <p>
          A OneJobs consultant will contact you shortly. If it's urgent, call us at{" "}
          <a href={SITE.phoneHref} style={{ color: "#fff", fontWeight: 600 }}>{SITE.phone}</a>.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}

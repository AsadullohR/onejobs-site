import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="simple-page">
      <div>
        <div className="big">404</div>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}

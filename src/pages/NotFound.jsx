import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Page not found</h2>
          <p>The page you are looking for doesn’t exist yet.</p>
        </div>
      </div>
      <article className="card wide-card">
        <p>Return to the home page and continue building your learning path.</p>
        <Link className="card-link" to="/">
          Back to Home
        </Link>
      </article>
    </div>
  );
}

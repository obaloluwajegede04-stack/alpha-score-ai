import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-shell form-page">
      <h2>Login to Alpha Score</h2>
      <p className="section-copy">
        Access your study dashboard, saved scores, and progress.
      </p>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </label>
        <button type="submit" className="primary-button">
          Sign In
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
      <p className="form-footer">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

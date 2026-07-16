import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-shell form-page">
      <h2>Create your account</h2>
      <p className="section-copy">
        Register to save scores, continue practice, and open your dashboard.
      </p>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </label>
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
            placeholder="Create a password"
          />
        </label>
        <button type="submit" className="primary-button">
          Register
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
      <p className="form-footer">
        Already a member? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
}

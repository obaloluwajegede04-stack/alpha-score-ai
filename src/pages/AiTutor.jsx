import { useState } from "react";
import { useAuth } from "../AuthContext";
import { askAiTutor } from "../api";

export default function AiTutor() {
  const { isAuthenticated } = useAuth();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setAnswer("");

    if (!question.trim()) {
      setError("Please type a question for the AI tutor.");
      return;
    }

    try {
      const response = await askAiTutor({ question });
      setAnswer(response.answer);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>AI Tutor Chat</h2>
          <p>
            Ask a study question and get a simple explanation or problem
            walkthrough.
          </p>
        </div>
      </div>

      <div className="form-card ai-chat-card">
        <label>
          Your question
          <textarea
            rows={4}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about math, science, exam tips, or study strategies."
          />
        </label>
        <button type="button" className="primary-button" onClick={handleSubmit}>
          Ask AI Tutor
        </button>
        {error && <p className="form-error">{error}</p>}
      </div>

      {answer && (
        <article className="card wide-card">
          <h3>AI reply</h3>
          <p>{answer}</p>
        </article>
      )}

      {!isAuthenticated && (
        <article className="card wide-card empty-card">
          <p>Login to use the AI tutor and save your study history.</p>
        </article>
      )}
    </div>
  );
}

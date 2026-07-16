import { useEffect, useState } from "react";
import { getDailyQuiz } from "../api";

export default function DailyQuiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    getDailyQuiz()
      .then(setQuestions)
      .catch(() => {});
  }, []);

  const question = questions[index] || null;

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prev) => (questions.length ? (prev + 1) % questions.length : 0));
  };

  if (!question) {
    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <h2>Daily Quiz</h2>
            <p>Answer a new question every day and build steady confidence.</p>
          </div>
        </div>
        <article className="card wide-card">
          <p>Loading daily quiz content...</p>
        </article>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Daily Quiz</h2>
          <p>Answer a new question every day and build steady confidence.</p>
        </div>
      </div>

      <article className="question-card">
        <div className="question-label">
          {question.exam} • {question.subject}
        </div>
        <h3>{question.question}</h3>
        <div className="question-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setShowAnswer((open) => !open)}
          >
            {showAnswer ? "Hide answer" : "Show answer"}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={handleNext}
          >
            Next question
          </button>
        </div>
        {showAnswer && <div className="answer-text">{question.answer}</div>}
      </article>
    </div>
  );
}

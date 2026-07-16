import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjects, getDailyQuiz, getPastQuestions } from "../api";

const overviewCards = [
  {
    title: "AI Tutor Chat",
    description:
      "Ask questions and get simple study explanations for math, science, and exam topics.",
    path: "/ai-tutor",
  },
  {
    title: "Daily Quiz",
    description: "Practice a new daily question and track your quiz streak.",
    path: "/daily-quiz",
  },
  {
    title: "Past Questions CBT",
    description:
      "Review WAEC, JAMB, NECO, and GCE questions with quick answer previews.",
    path: "/past-questions",
  },
  {
    title: "Study Notes",
    description: "Read subject summaries, formulas, and revision guides.",
    path: "/study-notes",
  },
];

export default function Home() {
  const [counts, setCounts] = useState({ subjects: 0, daily: 0, past: 0 });

  useEffect(() => {
    Promise.all([getSubjects(), getDailyQuiz(), getPastQuestions()])
      .then(([subjects, daily, past]) => {
        setCounts({
          subjects: subjects.length,
          daily: daily.length,
          past: past.length,
        });
      })
      .catch(() => {
        // ignore errors in homepage counts
      });
  }, []);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div>
          <h2>Welcome to Alpha Score Tutorial AI</h2>
          <p>
            The smart study hub for WAEC, JAMB, NECO, and GCE. Start with daily
            quiz practice, review past CBT questions, or let the AI tutor
            explain a topic.
          </p>
        </div>
        <div className="stats-panel">
          <div className="stat-card">
            <span>{counts.daily}</span>
            <p>Daily quiz items</p>
          </div>
          <div className="stat-card">
            <span>{counts.past}</span>
            <p>Past questions</p>
          </div>
          <div className="stat-card">
            <span>{counts.subjects}</span>
            <p>Study subjects</p>
          </div>
        </div>
      </div>

      <div className="grid-cards">
        {overviewCards.map((card) => (
          <article key={card.title} className="card wide-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link className="card-link" to={card.path}>
              Open now
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

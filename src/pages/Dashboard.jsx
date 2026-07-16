import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjects, getLeaderboard, getProgress } from "../api";
import { useAuth } from "../AuthContext";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [leaderboardCount, setLeaderboardCount] = useState(0);
  const [progress, setProgress] = useState({ score: 0, quizzesCompleted: 0 });

  useEffect(() => {
    getSubjects()
      .then((subjects) => setSubjectsCount(subjects.length))
      .catch(() => {});
    getLeaderboard()
      .then((leaders) => setLeaderboardCount(leaders.length))
      .catch(() => {});

    if (isAuthenticated) {
      getProgress()
        .then(setProgress)
        .catch(() => {});
    }
  }, [isAuthenticated]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div>
          <h2>Your dashboard</h2>
          <p>
            Track progress, view recent activity, and jump into the next study
            session.
          </p>
        </div>
        <div className="stats-panel">
          <div className="stat-card">
            <span>{subjectsCount}</span>
            <p>Subjects available</p>
          </div>
          <div className="stat-card">
            <span>{progress.score}</span>
            <p>Study score</p>
          </div>
          <div className="stat-card">
            <span>{leaderboardCount}</span>
            <p>Leaderboard competitors</p>
          </div>
        </div>
      </div>

      <div className="grid-cards">
        <article className="card wide-card">
          <h3>Continue practice</h3>
          <p>
            Keep your streak going with the latest daily quiz and AI support.
          </p>
          <Link className="card-link" to="/daily-quiz">
            Start quiz
          </Link>
        </article>
        <article className="card wide-card">
          <h3>Review notes</h3>
          <p>Open study summaries and formulas for your next topic.</p>
          <Link className="card-link" to="/study-notes">
            Open notes
          </Link>
        </article>
        <article className="card wide-card">
          <h3>Past questions</h3>
          <p>Practice exam-style questions from WAEC, JAMB, NECO, and GCE.</p>
          <Link className="card-link" to="/past-questions">
            Practice CBT
          </Link>
        </article>
      </div>
    </div>
  );
}

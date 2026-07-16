import { useEffect, useState } from "react";
import { getLeaderboard } from "../api";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderboard()
      .then(setLeaders)
      .catch(() => {});
  }, []);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Leaderboard</h2>
          <p>See top students and compare your study score.</p>
        </div>
      </div>

      <div className="grid-cards">
        {leaders.map((item) => (
          <article key={item.id} className="card wide-card">
            <h3>{item.name}</h3>
            <p>
              Score: <strong>{item.score}</strong>
            </p>
            <p>Rank: {item.rank}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

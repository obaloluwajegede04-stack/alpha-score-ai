import { useEffect, useState } from "react";
import { getSubjects } from "../api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects()
      .then(setSubjects)
      .catch(() => {});
  }, []);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Subjects</h2>
          <p>Choose a subject and exam to start studying the right material.</p>
        </div>
      </div>

      <div className="grid-cards">
        {subjects.map((item) => (
          <article key={item.id} className="card wide-card">
            <div className="card-tag">{item.exam}</div>
            <h3>{item.subject}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

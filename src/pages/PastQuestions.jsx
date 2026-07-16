import { useEffect, useState } from "react";
import { getPastQuestions } from "../api";

export default function PastQuestions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getPastQuestions()
      .then(setItems)
      .catch(() => {});
  }, []);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Past Questions CBT</h2>
          <p>Practice official past questions in a CBT-style layout.</p>
        </div>
      </div>

      <div className="grid-cards">
        {items.map((item) => (
          <article key={item.id} className="card wide-card">
            <div className="card-tag">{item.exam}</div>
            <h3>{item.subject}</h3>
            <p>{item.question}</p>
            <div className="answer-text">Answer: {item.answer}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

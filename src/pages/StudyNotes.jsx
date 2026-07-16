import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { createNote, getNotes } from "../api";

export default function StudyNotes() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setNotes([]);
      return;
    }

    getNotes()
      .then(setNotes)
      .catch(() => {
        setNotes([]);
      });
  }, [isAuthenticated]);

  const filtered = notes.filter(
    (note) =>
      note.subject.toLowerCase().includes(query.toLowerCase()) ||
      note.title.toLowerCase().includes(query.toLowerCase()),
  );

  const addNote = async (event) => {
    event.preventDefault();
    setError("");

    if (!subject || !title || !content) {
      setError("Subject, title, and content are required.");
      return;
    }

    try {
      await createNote({ subject, title, content });
      setSubject("");
      setTitle("");
      setContent("");
      getNotes()
        .then(setNotes)
        .catch(() => {});
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h2>Study Notes</h2>
          <p>Browse summaries, formulas, and revision guides by subject.</p>
        </div>
      </div>

      {!isAuthenticated ? (
        <article className="card wide-card empty-card">
          <p>Please login to view and save your study notes.</p>
        </article>
      ) : (
        <>
          <form className="form-card" onSubmit={addNote}>
            <label>
              Subject
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Mathematics, Biology, English"
              />
            </label>
            <label>
              Note title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Quadratic formula"
              />
            </label>
            <label>
              Content
              <textarea
                rows={4}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your revision note here."
              />
            </label>
            <button type="submit" className="primary-button">
              Save note
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>

          <div className="note-toolbar">
            <input
              type="search"
              placeholder="Search notes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="grid-cards">
            {filtered.map((note) => (
              <article key={note.id} className="card wide-card">
                <div className="card-tag">{note.subject}</div>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </article>
            ))}
            {filtered.length === 0 && (
              <article className="card wide-card empty-card">
                <p>No notes match your search. Try another topic.</p>
              </article>
            )}
          </div>
        </>
      )}
    </div>
  );
}

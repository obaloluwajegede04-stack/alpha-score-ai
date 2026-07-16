import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import AiTutor from "./pages/AiTutor";
import DailyQuiz from "./pages/DailyQuiz";
import PastQuestions from "./pages/PastQuestions";
import StudyNotes from "./pages/StudyNotes";
import Leaderboard from "./pages/Leaderboard";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const navItems = [
  { path: "/", label: "Home", end: true },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/subjects", label: "Subjects" },
  { path: "/ai-tutor", label: "AI Tutor" },
  { path: "/daily-quiz", label: "Daily Quiz" },
  { path: "/past-questions", label: "Past Questions" },
  { path: "/study-notes", label: "Study Notes" },
  { path: "/leaderboard", label: "Leaderboard" },
  { path: "/subscription", label: "Subscription" },
  { path: "/login", label: "Login", hideWhenAuth: true },
  { path: "/register", label: "Register", hideWhenAuth: true },
];

function AppShell() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="top-bar">
          <div>
            <p className="eyebrow">Alpha Score Tutorial AI</p>
            <h1>Study smarter for WAEC, JAMB, NECO, and GCE</h1>
            <p className="intro-copy">
              Navigate the student app: login, dashboard, AI tutor, quizzes,
              past questions, notes, and leaderboard.
            </p>
          </div>
          <div className="auth-panel">
            {isAuthenticated ? (
              <>
                <span className="user-badge">Hi, {user.name}</span>
                <button
                  className="secondary-button logout-button"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="inline-links">
                <NavLink className="card-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="card-link" to="/register">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </header>

        <main className="content">
          <aside className="navigation-panel">
            <p className="nav-label">Main pages</p>
            {navItems
              .filter((item) => !(isAuthenticated && item.hideWhenAuth))
              .map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? "nav-button active" : "nav-button"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
          </aside>

          <section className="panel">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/ai-tutor" element={<AiTutor />} />
              <Route path="/daily-quiz" element={<DailyQuiz />} />
              <Route path="/past-questions" element={<PastQuestions />} />
              <Route path="/study-notes" element={<StudyNotes />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </section>
        </main>

        <footer className="footer-note">
          <p>
            The app now includes a full page structure for the student flow.
            Next you can connect auth, AI backend, and score persistence.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

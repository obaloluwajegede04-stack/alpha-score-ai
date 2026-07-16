const TOKEN_KEY = "alphaScoreAuthToken";
const USER_KEY = "alphaScoreAuthUser";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

async function handleResponse(response) {
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!response.ok) {
    const message =
      json?.message || response.statusText || "API request failed.";
    throw new Error(message);
  }

  return json;
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
}

export function login({ email, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register({ name, email, password }) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function getSubjects() {
  return apiFetch("/content/subjects", { method: "GET" });
}

export function getNotes() {
  return apiFetch("/content/notes", { method: "GET" });
}

export function createNote({ subject, title, content }) {
  return apiFetch("/content/notes", {
    method: "POST",
    body: JSON.stringify({ subject, title, content }),
  });
}

export function getPastQuestions() {
  return apiFetch("/content/past-questions", { method: "GET" });
}

export function getDailyQuiz() {
  return apiFetch("/content/daily-quiz", { method: "GET" });
}

export function getLeaderboard() {
  return apiFetch("/content/leaderboard", { method: "GET" });
}

export function getProgress() {
  return apiFetch("/content/progress", { method: "GET" });
}

export function updateProgress({ score, quizzesCompleted }) {
  return apiFetch("/content/progress", {
    method: "POST",
    body: JSON.stringify({ score, quizzesCompleted }),
  });
}

export function askAiTutor({ question, subject }) {
  return apiFetch("/ai/tutor", {
    method: "POST",
    body: JSON.stringify({ question, subject }),
  });
}

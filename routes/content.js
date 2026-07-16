import { WaecQuestion } from "../models/WaecQuestion.js";
import { JambQuestion } from "../models/JambQuestion.js";
import { DailyQuiz } from "../models/DailyQuiz.js";
import { Note } from "../models/Note.js";
import { Score } from "../models/Score.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  subjects,
  pastQuestions,
  dailyQuiz,
  leaderboard as staticLeaderboard,
} from "../data.js";

export function contentRoutes(app) {
  app.get("/api/content/subjects", (req, res) => {
    res.json(subjects);
  });

  app.get("/api/content/past-questions", (req, res) => {
    res.json(pastQuestions);
  });

  app.get("/api/content/daily-quiz", async (req, res) => {
    try {
      const quizzes = await DailyQuiz.find().sort({ createdAt: -1 });
      if (!quizzes.length) {
        return res.json(dailyQuiz);
      }
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching daily quiz:", error);
      res.status(500).json({ message: "Failed to fetch daily quiz." });
    }
  });

  app.get("/api/content/notes", authMiddleware, async (req, res) => {
    try {
      const notes = await Note.find({ userId: req.user.userId }).sort({
        updatedAt: -1,
      });
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: "Failed to fetch notes." });
    }
  });

  app.post("/api/content/notes", authMiddleware, async (req, res) => {
    const { subject, title, content } = req.body;

    const trimmedSubject = subject?.trim();
    const trimmedTitle = title?.trim();
    const trimmedContent = content?.trim();

    if (!trimmedSubject || !trimmedTitle || !trimmedContent) {
      return res
        .status(400)
        .json({ message: "Subject, title, and content are required." });
    }

    try {
      const newNote = await Note.create({
        userId: req.user.userId,
        subject: trimmedSubject,
        title: trimmedTitle,
        content: trimmedContent,
      });

      res.status(201).json(newNote);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ message: "Failed to create note." });
    }
  });

  app.put("/api/content/notes/:id", authMiddleware, async (req, res) => {
    const { subject, title, content } = req.body;
    try {
      const note = await Note.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });
      if (!note) {
        return res.status(404).json({ message: "Note not found." });
      }

      if (subject !== undefined) {
        const trimmed = subject.trim();
        if (!trimmed) {
          return res.status(400).json({ message: "Subject cannot be empty." });
        }
        note.subject = trimmed;
      }
      if (title !== undefined) {
        const trimmed = title.trim();
        if (!trimmed) {
          return res.status(400).json({ message: "Title cannot be empty." });
        }
        note.title = trimmed;
      }
      if (content !== undefined) {
        const trimmed = content.trim();
        if (!trimmed) {
          return res.status(400).json({ message: "Content cannot be empty." });
        }
        note.content = trimmed;
      }

      await note.save();
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Failed to update note." });
    }
  });

  app.delete("/api/content/notes/:id", authMiddleware, async (req, res) => {
    try {
      const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });
      if (!note) {
        return res.status(404).json({ message: "Note not found." });
      }

      res.json({ message: "Note deleted.", note });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ message: "Failed to delete note." });
    }
  });

  app.get("/api/questions/waec", async (req, res) => {
    try {
      const questions = await WaecQuestion.find().sort({
        year: -1,
        subject: 1,
      });
      res.json(questions);
    } catch (error) {
      console.error("Error fetching WAEC questions:", error);
      res.status(500).json({ message: "Failed to fetch WAEC questions." });
    }
  });

  app.get("/api/questions/waec/:id", async (req, res) => {
    try {
      const question = await WaecQuestion.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found." });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching WAEC question:", error);
      res.status(500).json({ message: "Failed to fetch WAEC question." });
    }
  });

  app.get("/api/questions/jamb", async (req, res) => {
    try {
      const questions = await JambQuestion.find().sort({
        year: -1,
        subject: 1,
      });
      res.json(questions);
    } catch (error) {
      console.error("Error fetching JAMB questions:", error);
      res.status(500).json({ message: "Failed to fetch JAMB questions." });
    }
  });

  app.get("/api/questions/jamb/:id", async (req, res) => {
    try {
      const question = await JambQuestion.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found." });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching JAMB question:", error);
      res.status(500).json({ message: "Failed to fetch JAMB question." });
    }
  });

  app.post("/api/content/scores", authMiddleware, async (req, res) => {
    const { exam, score, maxScore, subject } = req.body;
    const validExams = ["WAEC", "JAMB", "NECO", "GCE"];

    if (!exam || !validExams.includes(exam) || typeof score !== "number") {
      return res
        .status(400)
        .json({ message: "Valid exam and numeric score are required." });
    }

    try {
      const newScore = await Score.create({
        userId: req.user.userId,
        exam,
        score,
        maxScore: typeof maxScore === "number" ? maxScore : score,
        subject: subject?.trim(),
      });

      res.status(201).json(newScore);
    } catch (error) {
      console.error("Error creating score:", error);
      res.status(500).json({ message: "Failed to create score." });
    }
  });

  app.get("/api/content/scores", authMiddleware, async (req, res) => {
    try {
      const scores = await Score.find({ userId: req.user.userId }).sort({
        quizDate: -1,
      });
      res.json(scores);
    } catch (error) {
      console.error("Error fetching scores:", error);
      res.status(500).json({ message: "Failed to fetch scores." });
    }
  });

  app.get("/api/content/leaderboard", async (req, res) => {
    try {
      const leaderboard = await Score.aggregate([
        {
          $group: {
            _id: "$userId",
            bestScore: { $max: "$score" },
          },
        },
        { $sort: { bestScore: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            id: "$_id",
            name: "$user.name",
            score: "$bestScore",
          },
        },
      ]);

      if (!leaderboard.length) {
        return res.json(staticLeaderboard);
      }

      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard." });
    }
  });

  app.get("/api/content/progress", authMiddleware, async (req, res) => {
    try {
      const scores = await Score.find({ userId: req.user.userId });
      const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
      res.json({
        totalScore,
        quizzesCompleted: scores.length,
        latestScore: scores[0]?.score || 0,
      });
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress." });
    }
  });

  app.post("/api/content/progress", authMiddleware, async (req, res) => {
    const { exam, score, subject } = req.body;
    if (typeof score !== "number") {
      return res.status(400).json({ message: "Numeric score is required." });
    }

    try {
      const newScore = await Score.create({
        userId: req.user.userId,
        exam: exam || "WAEC",
        score,
        maxScore: score,
        subject,
      });

      res.status(201).json(newScore);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress." });
    }
  });
}

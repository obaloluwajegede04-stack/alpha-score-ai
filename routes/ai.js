import dotenv from "dotenv";
import { OpenAI } from "openai";
import { authMiddleware } from "../middleware/auth.js";

dotenv.config();

// Use uncloseai.com (free OpenAI-compatible API) instead of OpenAI
const openai = new OpenAI({
  baseURL: "https://hermes.ai.unturf.com/v1",
  apiKey: "not-needed", // uncloseai.com doesn't require an API key
});

export function aiRoutes(app) {
  app.post("/api/ai/tutor", authMiddleware, async (req, res) => {
    const { question, subject } = req.body;
    if (!question) {
      return res.status(400).json({ message: "A question is required." });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic", // Use available model from uncloseai
        messages: [
          {
            role: "user",
            content: `Student question: ${question}${subject ? `\nSubject: ${subject}` : ""}\nAnswer simply and clearly for a student preparing for WAEC, JAMB, NECO, or GCE.`,
          },
        ],
        max_tokens: 400,
      });

      const answer =
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't generate an answer right now.";
      res.json({ answer });
    } catch (error) {
      console.error("UncloseAI request failed:", error);
      res.status(500).json({
        message: "AI request failed.",
        error: error.message,
      });
    }
  });
}

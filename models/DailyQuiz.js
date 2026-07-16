import mongoose from "mongoose";

const dailyQuizSchema = new mongoose.Schema(
  {
    exam: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: [{ type: String }],
    topic: String,
  },
  { timestamps: true },
);

export const DailyQuiz = mongoose.model("DailyQuiz", dailyQuizSchema);
